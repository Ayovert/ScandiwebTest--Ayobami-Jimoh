import { Link } from "react-router-dom";
import { PureComponent, ReactNode } from "react";
import { Cart, CartItems, CartParams } from "../../model/Cart";
import { Product } from "../../model/Product";
import { ReactComponent as CheckIcon } from "../../../images/check1.svg";

interface Props{
  cart: Cart | null;
  currency: number;
  addCart:(cartParams : CartParams)=>void;
  removeFromCart:(cartParams : CartParams)=>void;
}

class CartOverlay extends PureComponent<Props> {

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
    const { cart, addCart, removeFromCart, currency } = this.props;
    const subtotal = cart?.items.reduce((sum, item) => sum + (item.quantity * item.prices[currency].amount), 0) ?? 0;
    const symbol = cart?.items[0].prices[currency].currency.symbol;

    const label = cart?.items[0].prices[currency].currency.label;

   
    return (
      <div className="cartOverlayContent">
        <h3 style={{ padding: "0 5px" }}>My Cart</h3>

        {/**cart items */}
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



            return(
            <div key ={index} className="cartItems">
              <div className="productAttributes">
                <p
                  style={{
                    margin: "0",
                  }}
                >
                  {item.name}
                </p>

                {/*price */}
    

                <span style={{
                  marginTop:10,
                  marginBottom:20,
                  fontSize:'1.1rem'
                }}>
                {item.prices[currency].currency.symbol}
                <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 500,
                    margin:'0 5px'
                  }}>{item.prices[currency].amount}</span> 
                  
                  ({item.prices[currency].currency.label})
                </span>


                {/**price*/}
                {/*Size */}
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
                                    <div key={index} className="productSize"
                                    style={{
                                      border: `${value === item.selectedSize ? "2px solid red" :'1px solid black'}`
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

                {/* Size */}

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
                                    
                                    <div className="productColorBox" 
                                    key={index}>
                                  
                                    <div
                                      className="productColor"
                                      style={{
                                        backgroundColor: `${value}`,
                                        opacity:`${value === item.selectedColor ? 0.8 :1}`

                                      }}
                                    >  

                                    <CheckIcon
                                    width={25}
                                    height={25}
                                    className="checkmark"
                                    style={{
                                      display: `${value === item.selectedColor ? "block" :'none'}`
                                    }}
                                    /></div>
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
                                    <div key={index} className="productCapacity"
                                    style={{
                                      border: `${value === item.selectedCapacity ? "2px solid red" :'1px solid black'}`
                                    }}
                                    >
                                      <span>
                                        {value}
                                      </span>
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
                  <span style={{
                    fontSize:'2rem'
                  }} >+</span>
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
                  <span style={{
                    fontSize:'2rem'
                  }}>-</span>
                </div>
              </div>

              <div
                className="cartImage"
                style={{ backgroundImage: `url(${item.gallery[0]})` }}
              ></div>
            </div>
          )
  })}

        {/**cart items */}


        <div className="cartSummary">
          <span className="cartSummaryTitle">Total</span>
          <span className="cartSummaryData">
           <span>{symbol} </span> 
            <span style={{
              fontSize:'1.1rem',
              margin: '0 5px',
            }}>{subtotal.toFixed(2)}</span> 
            
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
    );
  }
}

export default CartOverlay;
