import Commerce from '@chec/commerce.js';
import getSavedContext from '../getSavedContext';

export default async function getStaticProps() {
  const preview = process.env.COMMERCEJS_RAYS_MODE === 'preview';

  let merchant = null;
  if (!preview) {
    const commerce = new Commerce(process.env.NEXT_PUBLIC_CHEC_PUBLIC_KEY, false, {
      url: process.env.NEXT_PUBLIC_CHEC_API_DOMAIN || 'https://api.chec.io',
    });
    merchant = await commerce.merchants.about();
  }

  return {
    props: {
      merchant,
      preview,
      rayContext: preview ? null : await getSavedContext(),
    },
    // Revalidate the config in development mode so regeneration will occur
    revalidate: preview ? 1 : undefined,
  };
}
