import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
	const fetcher = useFetcher();
	const { data, state } = fetcher;

	useEffect(() => {
		if (state === 'idle' && data && data.message) {
			window.alert(data.message);
		}
	}, [data, state]);

	return (
		<fetcher.Form
			method="post"
			action="/newsletter"
			className={classes.newsletter}
		>
			<input
				type="email"
				placeholder="뉴스레터를 구독해 보세요"
				aria-label="뉴스레터를 구독해 보세요"
			/>
			<button>구독하기</button>
		</fetcher.Form>
	);
}

export default NewsletterSignup;
