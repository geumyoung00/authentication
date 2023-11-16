import NewsletterSignup from '../components/NewsletterSignup';
import PageContent from '../components/PageContent';

function NewsletterPage() {
  return (
    <PageContent title="뉴스레터를 받아보세요!">
      <NewsletterSignup />
    </PageContent>
  );
}

export default NewsletterPage;

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get('email');

  // 백단 뉴스레터 서버에게 전송...
  console.log(email);
  return { message: 'Signup successful!' };
}
