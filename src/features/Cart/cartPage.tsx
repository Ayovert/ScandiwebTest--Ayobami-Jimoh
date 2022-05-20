import { PureComponent, ReactNode } from "react";
import { Link } from "react-router-dom";

import { Cart, CartParams } from "../../app/model/Cart";
import "./cartPage.scss";
import {
  attributeExist,
  calculateTax,
  CartToCartParams,
  getQuantity,
  getSubtotal,
  SlideShow,
} from "../../app/util/util";
import ProductAttributeComponent from "../product/productDetails/productAttributeComp";
import { ReactComponent as ArrowIcon } from "../../images/arrowRbg.svg";

interface Props {
  cart: Cart | null;
  currency: number;
  addCart: (cartParams: CartParams) => void;
  removeFromCart: (cartParams: CartParams) => void;
}

type CartState = {
  slideArr: number[];
};
class CartPage extends PureComponent<Props, CartState> {
  state: CartState = {
    slideArr: new Array(this.props.cart?.items.length).fill(0),
  };

  setImage(
    galleryLength: number,
    slideNum: number,
    index: number,
    slide: number[]
  ) {
    const newSlide = SlideShow(galleryLength, slideNum, index, slide);

    this.setState({ slideArr: newSlide });
  }

  render(): ReactNode {
    const { slideArr } = this.state;
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
              const attrExist = attributeExist(item);

              const { sizeAttr, capacityAttr, colorAttr } = attrExist;

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
                      {sizeAttr > -1 && (
                        <ProductAttributeComponent
                          cartItems={item}
                          attribute={item.selectedSize!}
                          defaultAttribute={""}
                          classname="productSize"
                          input={false}
                          name="Size"
                        />
                      )}

                      {/**Size */}

                      {/**Color */}

                      {colorAttr > -1 && (
                        <ProductAttributeComponent
                          cartItems={item}
                          attribute={item.selectedColor!}
                          defaultAttribute={""}
                          classname="productColor"
                          input={false}
                          name="Color"
                        />
                      )}

                      {/**Color */}

                      {/**Capacity */}
                      {capacityAttr > -1 && (
                        <ProductAttributeComponent
                          cartItems={item}
                          attribute={item.selectedCapacity!}
                          defaultAttribute={""}
                          classname="productCapacity"
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
                        style={{
                          backgroundImage: `url(${
                            item.gallery[slideArr[index]]
                          })`,
                        }}
                      >
                        <div className="cartImageArrows">
                          <ArrowIcon
                            className="prev arrowIcon"
                            onClick={() => {
                              this.setImage(
                                item.gallery.length,
                                -1,
                                index,
                                slideArr
                              );
                            }}
                          />
                          <ArrowIcon
                            className="arrowIcon"
                            onClick={() => {
                              this.setImage(
                                item.gallery.length,
                                1,
                                index,
                                slideArr
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
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
