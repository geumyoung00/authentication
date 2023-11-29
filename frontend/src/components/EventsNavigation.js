import { NavLink } from 'react-router-dom';
import { getToken } from '../util/auth';

import classes from './EventsNavigation.module.css';

function EventsNavigation() {
  const token = getToken();

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              모든 일정
            </NavLink>
          </li>
          {token ? (
            <li>
              <NavLink
                to="/events/new"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                새 일정
              </NavLink>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
