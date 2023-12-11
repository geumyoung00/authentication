import { Link, useSubmit } from 'react-router-dom';
import { getToken } from '../util/auth';

import classes from './EventItem.module.css';

function EventItem({ event }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('삭제할까요?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }
  const token = getToken();

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        {token ? (
          <>
            <Link to="edit">수정</Link>
            <button onClick={startDeleteHandler}>삭제</button>
          </>
        ) : null}
      </menu>
    </article>
  );
}

export default EventItem;
