import MainLayout from './../layout/main';

import MainSection from './../sections/main';
import MostViewedSection from './../sections/most-viewed';
import CTARequest from './../components/cta-request';
import CTANewsletter from './../components/cta-newsletter';

export default function IndexPage ({ mainPosts, mostViewedPosts, categories }) {
  const contents = {
    TITLE: 'Início',
    META: [
      { TYPE: 'description', VALUE: 'Página inicial blog prevbox' }
    ]
  };

  return (
    <MainLayout contents={contents}>
      <MainSection mainPosts={mainPosts} />
      <MostViewedSection mostViewedPosts={mostViewedPosts} categories={categories} />
      <CTARequest />
      <CTANewsletter />
    </MainLayout>
  );
}
