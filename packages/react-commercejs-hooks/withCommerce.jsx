import Commerce from '@chec/commerce.js';
import CommerceContext from './CommerceContext';

const withCommerce = (publicKey, debug = false, options = {}) => (Component) => {
  const sdk = new Commerce(publicKey, debug, options);

  return (props) => (
    <CommerceContext.provider value={sdk}>
      <Component {...props} />
    </CommerceContext.provider>
  );
}

export default withCommerce;
