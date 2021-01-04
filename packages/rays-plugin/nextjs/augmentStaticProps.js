import Commerce from '@chec/commerce.js';
import getStaticProps from './getStaticProps';
import resolveResourcesInContext from '../resolveResourcesInContext';

const augmentStaticProps = (schema) => async (staticProps = {}) => {
  const defaults = await getStaticProps();
  const resolvedProps = {};

  if (process.env.NEXT_PUBLIC_CHEC_PUBLIC_KEY && defaults.props.rayContext) {
    // Update the context provided by the ray with resources that should be loaded from the API
    resolvedProps.rayContext = await resolveResourcesInContext(
      new Commerce(process.env.NEXT_PUBLIC_CHEC_PUBLIC_KEY, false, {
        url: process.env.NEXT_PUBLIC_CHEC_API_DOMAIN || 'https://api.chec.io',
      }),
      schema,
      defaults.props.rayContext,
    );
  }

  return {
    ...staticProps,
    ...defaults,
    props: {
      ...(staticProps.props || {}),
      ...defaults.props,
      ...resolvedProps,
    }
  }
}

export default augmentStaticProps;
