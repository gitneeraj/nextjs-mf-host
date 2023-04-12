import { createFederatedCatchAll } from '@/components/shared';

export default createFederatedCatchAll();

// import dynamic from 'next/dynamic';
// const page = import('remote1/pages/contact');
// const Page = dynamic(() => import('remote1/pages/contact'));
//
// // Page.getInitialProps = async ctx => {
// //   const getInitialProps = (await page).default?.getInitialProps;
// //   console.log(getInitialProps(ctx));
// //   if (getInitialProps) {
// //     return getInitialProps(ctx);
// //   }
// //   return {};
// // };
// export async function getServerSideProps(context) {
//   const fedPage = await page;
//   console.log('slug', fedPage);
//   if (fedPage.getServerSideProps) {
//     return fedPage.getServerSideProps(context);
//   }
//   return {
//     props: {} // will be passed to the page component as props
//   };
// }
// export default Page;
