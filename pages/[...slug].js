import dynamic from 'next/dynamic';
const page = import('../realPages/[...slug]');
const Page = dynamic(() => import('../realPages/[...slug]'));

// Page.getInitialProps = async ctx => {
//   const getInitialProps = (await page).default?.getInitialProps;
//   console.log(getInitialProps(ctx));
//   if (getInitialProps) {
//     return getInitialProps(ctx);
//   }
//   return {};
// };
export async function getServerSideProps(context) {
  const fedPage = await page;
  // console.log(fedPage.getServerSideProps);
  if (fedPage.getServerSideProps) {
    // console.log('asfasdfdsf');
    return fedPage.getServerSideProps(context);
  }
  return {
    props: {} // will be passed to the page component as props
  };
}

export default Page;
