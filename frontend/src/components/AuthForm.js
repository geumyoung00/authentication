import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  useNavigation,
} from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  // 1. 서치파라미터가 login or signup 에 따라
  const [loginPrams] = useSearchParams();
  const mode = loginPrams.get('mode');

  // 2. API 호출 주소를 바꿔준다.
  const isLogin = mode === 'login';

  // 3-1. login -> http://localhost:8080/login
  // 3-2. signup -> http://localhost:8080/signup

  const authData = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? '로그인' : '회원가입'}</h1>
        {authData?.errors ? <p>{authData.message}</p> : null}
        <p>
          <label htmlFor="email">이메일</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">비밀번호</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`/auth?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? '회원가입하러 가기' : '로그인하러 가기'}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? '제출 중' : '✔️'}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
