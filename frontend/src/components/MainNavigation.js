import { NavLink, Form, useRouteLoaderData } from 'react-router-dom';
import { getToken } from '../util/auth';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  const token = getToken();
  useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              일정
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              구독
            </NavLink>
          </li>
          {token ? (
            <li>
              <Form action="/logout" method="POST">
                <button>로그아웃</button>
              </Form>
            </li>
          ) : (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                로그인
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
