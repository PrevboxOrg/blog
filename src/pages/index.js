import MainLayout from './../layout/main';
import contents from './../contents/pages/index.json';

import MainSection from './../sections/main';
import MostViewedSection from './../sections/most-viewed';
import FeaturedVideosSection from './../sections/featured-videos';
import CTA from './../components/cta';

export default function IndexPage () {
  return (
    <MainLayout contents={contents}>
      <MainSection />
      <MostViewedSection />
      <FeaturedVideosSection />
      <CTA />
    </MainLayout>
  );
}
