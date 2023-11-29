import { redirect } from 'react-router-dom';

export const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

export const checkToken = () => {
  const token = getToken();

  if (!token) {
    return redirect('/auth?mode=login');
  }

  return;
};
