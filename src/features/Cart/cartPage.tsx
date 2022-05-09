import { PureComponent, ReactNode } from "react";
import { Link } from "react-router-dom";

import { Cart, CartItems, CartParams } from "../../app/model/Cart";
import "./cartPage.scss";
import { ReactComponent as CheckIcon } from "../../images/check1.svg";
import { Product } from "../../app/model/Product";

interface Props {
  cart: Cart | null;
  currency: number;
  addCart:(cartParams : CartParams)=>void;
  removeFromCart:(cartParams : CartParams)=>void;
}
class CartPage extends PureComponent<Props> {

  cartToProduct=(cart:CartItems)=> {

    let product : Product = {
      id : cart.productId,
      
        name: cart.name,
        prices: cart.prices,
        category: cart.category,
        description: cart.description,
        gallery: cart.gallery,
        attributes: cart.attributes,
        inStock: cart.inStock,
        brand: cart.brand

    };

    return product
  }
  render(): ReactNode {
    const { cart, currency, addCart, removeFromCart } = this.props;
    console.log(cart);
    const subtotal = cart?.items.reduce((sum, item) => sum + (item.quantity * item.prices[currency].amount), 0) ?? 0;
    const tax = (21/100) * subtotal; 
    const quantity = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

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
                <p style={{
                  fontWeight: 600
                }}>{item.brand}</p>
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
                  {(sizeAttr !== null || sizeAttr !== undefined) &&
                    sizeAttr > -1 && (
                      <>
                        <h4
                          style={{
                            fontSize: 18,
                            margin: 2,
                          }}
                        >
                          SIZE:
                        </h4>
                        <div className="productSizeList">
                          <div className="productSizeBox">
                            {item.attributes
                              .filter((items) => items.name === "Size")
                              .map((items) =>
                                items.items.map(({ value }, index) => (
                                  <div
                                    key={index}
                                    className="productSize"
                                    style={{
                                      border: `${
                                        value === item.selectedSize
                                          ? "2px solid red"
                                          : "1px solid black"
                                      }`,
                                    }}
                                  >
                                    <span>{value}</span>
                                  </div>
                                ))
                              )}
                          </div>
                        </div>
                      </>
                    )}

                  {/**Size */}

                  {/**Color */}

                  {(colorAttr !== null || colorAttr !== undefined) &&
                    colorAttr > -1 && (
                      <>
                        <h4
                          style={{
                            fontSize: 18,
                            margin: 2,
                          }}
                        >
                          COLOR:
                        </h4>
                        <div className="productColorList">
                          {item.attributes
                            .filter((items) => items.name === "Color")
                            .map((items) =>
                              items.items.map(({ value }, index) => (
                                <div className="productColorBox" key={index}>
                                  <div
                                    className="productColor"
                                    style={{
                                      backgroundColor: `${value}`,
                                      opacity: `${
                                        value === item.selectedColor ? 0.8 : 1
                                      }`,
                                    }}
                                  >
                                    <CheckIcon
                                      width={25}
                                      height={25}
                                      className="checkmark"
                                      style={{
                                        display: `${
                                          value === item.selectedColor
                                            ? "block"
                                            : "none"
                                        }`,
                                      }}
                                    />
                                  </div>
                                </div>
                              ))
                            )}
                        </div>
                      </>
                    )}

                  {/**Color */}

                  {/**Capacity */}
                  {(capacityAttr !== null || capacityAttr !== undefined) &&
                    capacityAttr > -1 && (
                      <div className="productCapacityList">
                        <h4
                          style={{
                            fontSize: 18,
                            margin: 2,
                          }}
                        >
                          CAPACITY:
                        </h4>

                        <div className="productCapacityBox">
                          {item.attributes
                            .filter((items) => items.name === "Capacity")
                            .map((items) =>
                              items.items.map(({ value }, index) => (
                                <div
                                  key={index}
                                  className="productCapacity"
                                  style={{
                                    border: `${
                                      value === item.selectedCapacity
                                        ? "2px solid red"
                                        : "1px solid black"
                                    }`,
                                  }}
                                >
                                  <span>{value}</span>
                                </div>
                              ))
                            )}
                        </div>
                      </div>
                    )}

                  {/**Capacity */}
                </div>

                <div className="cartControls">
                  <div className="cartControlItem" 
                  onClick={() => {addCart({product: this.cartToProduct(item), selectedColor: item.selectedColor , selectedCapacity : item.selectedCapacity , selectedSize: item.selectedSize});
                  console.log(item.selectedColor=== "");
                  console.log(item.selectedSize);
                
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

                  <div className="cartControlItem"
                  onClick={() => removeFromCart({product: this.cartToProduct(item), selectedColor: item.selectedColor , selectedCapacity : item.selectedCapacity , selectedSize: item.selectedSize})}
                  >
                    <span>-</span>
                  </div>
                </div>

                <div
                className="cartImage"
                style={{ backgroundImage: `url(${item.gallery[0]})` }}
              ></div>
              </div>

              <hr/>
              </div>

            );
          })}

        <div className="cartSummary">
          <div className="cartSummaryTitle">
          <span>Tax (21%): </span>
          <span >Quantity: </span>
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
