import { Form, useSearchParams } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const [loginPrams] = useSearchParams();
  const mode = loginPrams.get('mode');

  const isLogin = mode === 'login';
  console.log('isLogin__', isLogin);

  // const [isLogin, setIsLogin] = useState(true);

  // function switchAuthHandler() {
  //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  // }

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? '로그인' : '회원가입'}</h1>
        <p>
          <label htmlFor="email">이메일</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">비밀번호</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <button type="button">
            {isLogin ? '회원가입하러 가기' : '로그인하러 가기'}
          </button>
          <button>✔️</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
