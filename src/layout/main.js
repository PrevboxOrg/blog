import Head from 'next/head';

import Header from './../components/header';
import Footer from './../components/footer';

export default function MainLayout ({ children, contents }) {

  return <>
    <Head>
      <title>{contents.TITLE || contents.title} | Prevbox</title>
      <meta name='viewport' content='width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no' />

      {(contents.META || contents.meta).map((meta, index) => {
        return <meta name={meta.TYPE || meta.type} content={meta.CONTENT || meta.value} key={`meta-${meta.TYPE || meta.type}-${index}`} />;
      })}

      <link rel='icon' type='image/x-icon' href='/favicon.ico' />
    </Head>

    <Header />

    { children }

    <Footer />
  </>;
}
