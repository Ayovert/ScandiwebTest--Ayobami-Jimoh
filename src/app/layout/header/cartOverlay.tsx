import { Link } from "react-router-dom";
import { PureComponent, ReactNode } from "react";
import { Cart, CartParams } from "../../model/Cart";

import { ReactComponent as CartIcon } from "../../../images/cart.svg";
import { CartToCartParams, getSubtotal } from "../../util/util";
import ProductSize from "../../../features/product/productAttributes/productSize";
import ProductColor from "../../../features/product/productAttributes/productColor";
import ProductCapacity from "../../../features/product/productAttributes/productCapacity";

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
          <span
            className="cartButton"
            style={{
              transform: "scaleX(-1)",
            }}
          >
            {cartQuantity > 0 && (
              <span className="cartCount">{cartQuantity} </span>
            )}
            <CartIcon height={25} width={25} />
          </span>

          <div className="cartOverlayContent">
            <h3 style={{ padding: "0 5px" }}>My Cart</h3>

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
                      <p
                        style={{
                          margin: "0",
                        }}
                      >
                        {item.name}
                      </p>

                      {/*price */}

                      <span
                        style={{
                          marginTop: 10,
                          marginBottom: 20,
                          fontSize: "1.1rem",
                        }}
                      >
                        {item.prices[currency].currency.symbol}
                        <span
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: 500,
                            margin: "0 5px",
                          }}
                        >
                          {item.prices[currency].amount}
                        </span>
                        ({item.prices[currency].currency.label})
                      </span>

                      {/**price*/}
                      {/*Size */}
                      {(sizeAttr !== null || sizeAttr !== undefined) &&
                        sizeAttr > -1 && (
                          <ProductSize
                            item={item}
                            className="productSizeListX"
                          />
                        )}

                      {/* Size */}

                      {/**Color */}

                      {(colorAttr !== null || colorAttr !== undefined) &&
                        colorAttr > -1 && (
                          <ProductColor
                            item={item}
                            className="productColorListX"
                          />
                        )}

                      {/**Color */}

                      {/**Capacity */}
                      {(capacityAttr !== null || capacityAttr !== undefined) &&
                        capacityAttr > -1 && (
                          <ProductCapacity
                            item={item}
                            className="productCapacityListX"
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
                        <span
                          style={{
                            fontSize: "2rem",
                          }}
                        >
                          +
                        </span>
                      </div>

                      <span
                        style={{
                          padding: "8px 15px",
                          fontSize: 20,
                        }}
                      >
                        {item.quantity}
                      </span>

                      <div
                        className="cartControlItem"
                        onClick={() => removeFromCart(CartToCartParams(item))}
                      >
                        <span
                          style={{
                            fontSize: "2rem",
                          }}
                        >
                          -
                        </span>
                      </div>
                    </div>

                    <div
                      className="cartImage"
                      style={{ backgroundImage: `url(${item.gallery[0]})` }}
                    ></div>
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
                <span
                  style={{
                    fontSize: "1.1rem",
                    margin: "0 5px",
                  }}
                >
                  {subtotal.toFixed(2)}
                </span>

                <span>({label})</span>
              </span>
            </div>

            <div className="cartOverlayButton">
              <Link
                to="/cart"
                style={{
                  textDecoration: "none",
                  color: "black",
                  border: "1px solid black",
                }}
                className="viewCart"
              >
                View Cart
              </Link>

              <Link
                to=""
                style={{
                  textDecoration: "none",
                  backgroundColor: "#5ECE7B",
                  color: "white",
                }}
                className="viewCart"
              >
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
