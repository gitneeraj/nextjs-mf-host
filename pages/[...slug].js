import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { injectScript } from '@module-federation/utilities';
import { matchFederatedPage } from '@/components/shared';

async function getRemoteModule(remote, mod) {
  if (!remote || !mod) return null;

  return injectScript(remote).then(container => {
    return container.get(mod).then(factory => {
      return factory();
    });
  });
}

async function getMatchedPage(route) {
  const matchedPage = await matchFederatedPage(route);
  const remote = matchedPage?.value?.remote;
  const mod = matchedPage?.value?.module;
  return { remote, mod };
}

export default function CatchAll(props) {
  const router = useRouter();
  const [DynamicComponent, setDynamicComponent] = useState(null);

  const getDynamicComponent = path =>
    React.lazy(async () => {
      const { remote, mod } = await getMatchedPage(path);
      return getRemoteModule(remote, mod);
    });

  useEffect(() => {
    setDynamicComponent(getDynamicComponent(router.asPath));
  }, [router.asPath]);

  return (
    <>
      <React.Suspense fallback={'Loading...'}>
        {DynamicComponent && <DynamicComponent {...props} />}
      </React.Suspense>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { remote, mod } = await getMatchedPage(ctx.resolvedUrl);
  const FedPage = await getRemoteModule(remote, mod);

  if (!FedPage) {
    return {
      notFound: true
    };
  }

  if (FedPage.getServerSideProps) {
    return await FedPage.getServerSideProps(ctx);
  }

  return {
    props: {}
  };
}
