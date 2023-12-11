import { redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;
export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const data = await request.formData();

  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const mode = searchParams.get('mode');

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(authData),
  });

  if (response.status === 401 || response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw new Error('not OK!');
  }

  //Token 저장해서 권한 설정하기.
  const json = await response.json();
  localStorage.setItem('token', json.token);

  return redirect('/');
};

// 4nn error :  422, 401 => 응답값의 형태 {error:{}, message: '이미 등록된 이메일입니다.'};
// 이 응답값을  return, : back과 front의 약속으로 정해진 메세지를 리턴 {error : {'이메일에 문제가 있음'}, message : '유효성 검사를 통과하지 못했어요.'}

// 성공적으로 호출이 됐다면? 홈화면으로 redirect
