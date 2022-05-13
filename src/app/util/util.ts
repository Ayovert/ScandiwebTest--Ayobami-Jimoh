import { Cart, CartItems, CartParams } from "../model/Cart";
import { DefaultAttribute, Product } from "../model/Product";

export function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export function CartToCartParams(item: CartItems) {
  let product: Product = {
    id: item.productId,

    name: item.name,
    prices: item.prices,
    category: item.category,
    description: item.description,
    gallery: item.gallery,
    attributes: item.attributes,
    inStock: item.inStock,
    brand: item.brand,
  };

  let cartParams: CartParams = {
    product: product,
    selectedColor: item.selectedColor,
    selectedCapacity: item.selectedCapacity,
    selectedSize: item.selectedSize,
  };

  return cartParams;
}

export function getSubtotal(cart: Cart | null, currency: number) {
  return (
    cart?.items.reduce(
      (sum, item) => sum + item.quantity * item.prices[currency].amount,
      0
    ) ?? 0
  );
}

export function getQuantity(cart: Cart | null) {
  return cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
}

export function calculateTax(subtotal: number) {
  return (21 / 100) * subtotal;
}

export function removeTags(str: string) {
  if (str === null || str === "") return false;
  else str = str.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, "");
}

export function getDefaultAttribute(productData: Product) {
  let defaultSize = "";
  let defaultColor = "";
  let defaultCapacity = "";

  for (let x in productData.attributes) {
    let name = productData.attributes[x].name.toLowerCase();

    if (name === "size") {
      defaultSize = productData.attributes[x].items[1].value!;
    } else if (name === "color") {
      defaultColor = productData.attributes[x].items[1].value!;
    } else if (name === "capacity") {
      defaultCapacity = productData.attributes[x].items[1].value!;
    }
  }

  let defaultAttr: DefaultAttribute = {
    defaultColor: defaultColor,
    defaultCapacity: defaultCapacity,
    defaultSize: defaultSize,
  };

  return defaultAttr;
}

export function attributeExist(productData: Product) {
  const sizeAttr = productData.attributes.findIndex(
    (items) => items.name === "Size"
  );

  const colorAttr = productData.attributes.findIndex(
    (items) => items.name === "Color"
  );

  const capacityAttr = productData.attributes.findIndex(
    (items) => items.name === "Capacity"
  );

  let attr = {
    sizeAttr: sizeAttr,
    colorAttr: colorAttr,
    capacityAttr: capacityAttr,
  };

  return attr;
}
