import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

import PageContent from '../components/PageContent';

function ErrorPage() {
	const error = useRouteError();

	let title = '⚠️ Error ⚠️';
	let message = '뭔가 잘못 하셨나봅니다 🥺';

	if (error.status === 500) {
		message = error.data.message;
	}

	if (error.status === 404) {
		title = '❌ NOT FOUND ❌';
		message = '리소스나 페이지를 찾을 수 없습니다 😵';
	}

	return (
		<>
			<MainNavigation />
			<PageContent title={title}>
				<p>{message}</p>
			</PageContent>
		</>
	);
}

export default ErrorPage;
