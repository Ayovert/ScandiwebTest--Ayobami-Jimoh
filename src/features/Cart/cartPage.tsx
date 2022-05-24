import { PureComponent, ReactNode } from "react";
import { Link } from "react-router-dom";

import { Cart, CartParams } from "../../app/model/Cart";
import "./cartPage.scss";
import {
  calculateTax,
  getQuantity,
  getSubtotal,
  getCartAttr,
} from "../../app/util/util";


import CartControls from "./cartControls";
import CartImageSwitcher from "./cartImageSwitcher";
import ProductAttributeComponent from "../product/productDetails/productAttributeComponent";

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
        <h1>My Cart</h1>
        <div className="cartPage">
          {cart !== null &&
            cart.items &&
            cart.items.map((item, index) => {
            

              //    const { sizeAttr, capacityAttr, colorAttr } = attrExist;
              const cartAtr = getCartAttr(item);

              return (
                <div key={index}>
                  <div className="cartItems">
                    <div className="productAttributes">
                      <p className="productBrand">{item.brand}</p>
                      <p className="productName">{item.name}</p>

                      {/*price*/}
                      <span className="productPrice">
                        {item.prices[currency].currency.symbol}
                        <span>{item.prices[currency].amount}</span>(
                        {item.prices[currency].currency.label})
                      </span>

                      {/**price*/}

                      {/**Size */}

          

                      {item.attributes.map((value, index) => {
                        console.log(value);
                        return (
                          <ProductAttributeComponent
                            key={index}
                            //productData={productData}
                            attribute={cartAtr[index]!}
                            input={false}
                            // name={name}
                            attributeX={value}
                          />
                        );
                      })}
                    </div>

                    <CartControls
                      item={item}
                      addCart={addCart}
                      removeFromCart={removeFromCart}
                    />

                    <CartImageSwitcher
                      gallery={item.gallery}
                      index={index}
                      cartLength={cart.items.length}
                    />
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
              <span>
                {cart?.items[0].prices[currency].currency.symbol}{" "}
                {tax.toFixed(2)}
              </span>
              <span>{quantity}</span>
              <span>$ {subtotal.toFixed(2)} </span>
            </div>
          </div>

          <div className="cartOverlayButton">
            <Link to="" className="viewCart">
              Checkout
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default CartPage;
