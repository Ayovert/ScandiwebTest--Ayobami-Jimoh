import { Link } from "react-router-dom";
import { PureComponent, ReactNode } from "react";
import { Cart, CartParams } from "../../model/Cart";

import { ReactComponent as CartIcon } from "../../../images/cart.svg";
import { CartToCartParams, getSubtotal } from "../../util/util";
import ProductAttributeComponent from "../../../features/product/productDetails/productAttributeComp";

interface Props {
  cart: Cart | null;
  currency: number;
  addCart: (cartParams: CartParams) => void;
  removeFromCart: (cartParams: CartParams) => void;
  cartQuantity: number;
}

class CartOverlay extends PureComponent<Props> {
  render(): ReactNode {
    const { cart, addCart, removeFromCart, currency, cartQuantity } =
      this.props;

    const subtotal = getSubtotal(cart, currency);

    let symbol = "";
    let label = "";

    if (cart !== null && cart?.items.length > 0) {
      symbol = cart?.items[0].prices[currency].currency.symbol;

      label = cart?.items[0].prices[currency].currency.label;
    }

    return (
      <>
        <div className="cartOverlay">
          <span className="cartButton">
            {cartQuantity > 0 && (
              <span className="cartCount">
                <span>{cartQuantity}</span>{" "}
              </span>
            )}
            <CartIcon height={25} width={25} />
          </span>

          <div className="cartOverlayContent">
            <p className="cartTitle">
              <span>My Bag .</span> {cartQuantity} items
            </p>

            {/**cart items */}
            {cart !== null && cart.items.length > 0 ? (
              cart.items.map((item, index) => {
                const sizeAttr = item.attributes.findIndex(
                  (items) => items.name === "Size"
                );

                const colorAttr = item.attributes.findIndex(
                  (items) => items.name === "Color"
                );

                const capacityAttr = item.attributes.findIndex(
                  (items) => items.name === "Capacity"
                );

                return (
                  <div key={index} className="cartItems">
                    <div className="productAttributes">
                      <p className="productBrand">{item.brand}</p>
                      <p className="productName">{item.name}</p>

                      {/*price */}

                      <span className="productPrice">
                        {item.prices[currency].currency.symbol}
                        <span>{item.prices[currency].amount}</span>
                        {/* ({item.prices[currency].currency.label})*/}
                      </span>

                      {/**price*/}
                      {/*Size */}
                      {(sizeAttr !== null || sizeAttr !== undefined) &&
                        sizeAttr > -1 && (
                          <ProductAttributeComponent
                            cartItems={item}
                            attribute={item.selectedSize!}
                            defaultAttribute={""}
                            classname="productSize"
                            alt="X"
                            input={false}
                            name="Size"
                          />
                        )}

                      {/* Size */}

                      {/**Color */}

                      {(colorAttr !== null || colorAttr !== undefined) &&
                        colorAttr > -1 && (
                          <ProductAttributeComponent
                            cartItems={item}
                            attribute={item.selectedColor!}
                            defaultAttribute={""}
                            classname="productColor"
                            alt="X"
                            input={false}
                            name="Color"
                          />
                        )}

                      {/**Color */}

                      {/**Capacity */}
                      {(capacityAttr !== null || capacityAttr !== undefined) &&
                        capacityAttr > -1 && (
                          <ProductAttributeComponent
                            cartItems={item}
                            attribute={item.selectedCapacity!}
                            defaultAttribute={""}
                            classname="productCapacity"
                            alt="X"
                            input={false}
                            name="Capacity"
                          />
                        )}

                      {/**Capacity */}
                    </div>

                    <div className="cartControls">
                      <div
                        className="cartControlItem"
                        onClick={() => {
                          addCart(CartToCartParams(item));
                        }}
                      >
                        <span>+</span>
                      </div>

                      <span className="cartCount">{item.quantity}</span>

                      <div
                        className="cartControlItem"
                        onClick={() => removeFromCart(CartToCartParams(item))}
                      >
                        <span>-</span>
                      </div>
                    </div>

                    <div className="cartImageDiv">
                      <div
                        className="cartImage"
                        style={{ backgroundImage: `url(${item.gallery[0]})` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>Cart Empty</h1>
            )}

            {/**cart items */}

            <div className="cartSummary">
              <span className="cartSummaryTitle">Total</span>
              <span className="cartSummaryData">
                <span>{symbol} </span>
                <span className="cartSubtotal">{subtotal.toFixed(2)}</span>

                <span>({label})</span>
              </span>
            </div>

            <div className="cartOverlayButton">
              <Link to="/cart" className="viewCart">
                View Cart
              </Link>

              <Link to="" className="checkoutCart">
                Checkout
              </Link>
            </div>
          </div>
        </div>
        <div className="backdrop"></div>
      </>
    );
  }
}

export default CartOverlay;
