import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

// 1. 서치파라미터가 login or signup 에 따라
// 2. API 호출 주소를 바꿔준다.
// 3-1. login -> http://localhost:8080/login
// 3-2. signup -> http://localhost:8080/signup

// 4nn error :  422, 401 => 응답값의 형태 {error:{}, message: '이미 등록된 이메일입니다.'};
// 이 응답값을  return, : back과 front의 약속으로 정해진 메세지를 리턴 {error : {'이메일에 문제가 있음'}, message : '유효성 검사를 통과하지 못했어요.'}

// 성공적으로 호출이 됐다면? 홈화면으로 redirect
