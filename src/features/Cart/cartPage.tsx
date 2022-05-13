import { PureComponent, ReactNode } from "react";
import { Link } from "react-router-dom";

import { Cart, CartParams } from "../../app/model/Cart";
import "./cartPage.scss";
import {
  calculateTax,
  CartToCartParams,
  getQuantity,
  getSubtotal,
} from "../../app/util/util";
import ProductCapacity from "../product/productAttributes/productCapacity";
import ProductColor from "../product/productAttributes/productColor";
import ProductSize from "../product/productAttributes/productSize";

interface Props {
  cart: Cart | null;
  currency: number;
  addCart: (cartParams: CartParams) => void;
  removeFromCart: (cartParams: CartParams) => void;
}
class CartPage extends PureComponent<Props> {
  render(): ReactNode {
    const { cart, currency, addCart, removeFromCart } = this.props;
    const subtotal = getSubtotal(cart, currency);
    const tax = calculateTax(subtotal);
    const quantity = getQuantity(cart);

    return (
      <>
        <h1 style={{ padding: "0 40px" }}>My Cart</h1>
        <div className="cartPage">
          {cart !== null &&
            cart.items &&
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
                <div key={index}>
                  <div className="cartItems">
                    <div className="productAttributes">
                      <p
                        style={{
                          fontWeight: 600,
                        }}
                      >
                        {item.brand}
                      </p>
                      <p>{item.name}</p>

                      {/*price*/}
                      <span
                        style={{
                          marginTop: 10,
                          marginBottom: 20,
                        }}
                      >
                        {item.prices[currency].currency.symbol}
                        <span
                          style={{
                            fontSize: 24,
                            fontWeight: 500,
                          }}
                        >
                          {item.prices[currency].amount}
                        </span>
                        ({item.prices[currency].currency.label})
                      </span>

                      {/**price*/}

                      {/**Size */}
                      {sizeAttr > -1 && (
                        <ProductSize item={item} className="productSizeList" />
                      )}

                      {/**Size */}

                      {/**Color */}

                      {colorAttr > -1 && (
                        <ProductColor
                          item={item}
                          className="productColorList"
                        />
                      )}

                      {/**Color */}

                      {/**Capacity */}
                      {capacityAttr > -1 && (
                        <ProductCapacity
                          item={item}
                          className="productCapacityList"
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
                        <span>-</span>
                      </div>
                    </div>

                    <div
                      className="cartImage"
                      style={{ backgroundImage: `url(${item.gallery[0]})` }}
                    ></div>
                  </div>

                  <hr />
                </div>
              );
            })}

          <div className="cartSummary">
            <div className="cartSummaryTitle">
              <span>Tax (21%): </span>
              <span>Quantity: </span>
              <span>Total: </span>
            </div>
            <div className="cartSummaryData">
              <span>$ {tax.toFixed(2)}</span>
              <span>{quantity}</span>
              <span>$ {subtotal.toFixed(2)} </span>
            </div>
          </div>

          <div className="cartOverlayButton">
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
      </>
    );
  }
}

export default CartPage;
