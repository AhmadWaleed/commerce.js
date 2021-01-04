import useLineItems from './useLineItems';

export default function useSanitizedLineItems() {
  const lineItems = useLineItems();

  return lineItems.reduce((data, lineItem) => {
    const item = data;
    let variantData = null;

    if (lineItem.variants.length) {
      variantData = {
        [lineItem.variants[0].variant_id]: lineItem.variants[0].option_id,
      };
    }
    item[lineItem.id] = {
      quantity: lineItem.quantity,
      variants: variantData,
    };
    return item;
  }, {});
}
