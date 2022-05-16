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
import ProductAttributeComponent from "../product/productDetails/productAttributeComp";
import { ReactComponent as ArrowIcon } from "../../images/arrowRbg.svg";

interface Props {
  cart: Cart | null;
  currency: number;
  addCart: (cartParams: CartParams) => void;
  removeFromCart: (cartParams: CartParams) => void;
}

interface SlideState {
  galleryIndex: number;
  slideIndex: number;
}

type CartState = {
  slideNumber?: SlideState[];
  slideNumberX: number[];
};
class CartPage extends PureComponent<Props, CartState> {
  state: CartState = {
    slideNumber: [{ galleryIndex: 0, slideIndex: 0 }],
    slideNumberX: new Array(this.props.cart?.items.length).fill(0),
  };

  /* componentDidMount(){
    this.setState
  }*/

  SlideShow(galleryLength: number, slideNum: number, index: number) {
    console.log("changeSlide");
    const { slideNumberX } = this.state;

    if (slideNumberX[index] !== undefined) {
      let a = this.state.slideNumberX.slice(); //creates the clone of the state

      let currentSLide = a[index];

      const slideIndex = currentSLide + slideNum;

      let indexSet = a[index];

      console.log(indexSet);

      if (slideIndex > galleryLength - 1) {
        indexSet = 0;
      } else if (slideIndex < 0) {
        indexSet = galleryLength - 1;
      } else {
        indexSet = slideIndex;
      }

      a[index] = indexSet;

      this.setState({ slideNumberX: a }, () => {
        console.log(slideNumberX);
      });
    } else {
      console.log("error on changing slide");
    }
  }

  render(): ReactNode {
    const { slideNumberX } = this.state;
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
                            item.gallery[slideNumberX[index]]
                          })`,
                        }}
                      >
                        <div
                          className="cartImageArrows"
                          style={{
                            display: "flex",
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                          }}
                        >
                          <ArrowIcon
                            height={30}
                            style={{
                              msTransform: "rotate(180deg)" /* IE 9 */,
                              transform: "rotate(180deg)",
                              margin: "0 5px",
                              backgroundColor: "white",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              this.SlideShow(item.gallery.length, -1, index);
                            }}
                          />
                          <ArrowIcon
                            height={30}
                            style={{
                              margin: "0 5px",
                              backgroundColor: "white",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              this.SlideShow(item.gallery.length, 1, index);
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
