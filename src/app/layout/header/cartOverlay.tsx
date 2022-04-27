import { Link } from "react-router-dom";
import cartImg from "../../images/cart.svg";
import hoodie from '../../../images/hoodie.jpeg'
export default function CartOverlay() {
  return (
      

      <div className="cartOverlayContent">
        <h3 style={{ padding: '0 5px' }}>My Cart</h3>
        <div className="cartItems">
            <div className="productAttributes">
                <p style={{
                  margin: '0 auto'
                }}>
                    Apollo Running Short
                </p>

                <p style={{
                  fontWeight:500
                }}>
                    $50.00
                </p>
                <div className="productSize">
      <span>S</span>
                </div>

                
            </div>

            <div className="cartControls" >
            <div className="cartControlItem">
      <span>+</span>
                </div>

<span style={{
    padding: '8px 15px',
    fontSize: 20}}>1</span>

<div className="cartControlItem">
      <span>-</span>
      </div>
            </div>

            <div className="cartImage" style={{backgroundImage: `url(${hoodie})`}}>
            </div>
        </div>
        <div className="cartSummary">
          <span style={{paddingLeft:10}}>Total</span>
          <span style={{paddingRight:10}}>$ 100.00</span>
        </div>

        <div className="cartOverlayButton">
            <Link to='cart'
            style={{
              textDecoration:'none',
              color:'black',
              border: '1px solid black'
            }}
            className="viewCart"
            >
            View Cart
            </Link>
         
          <Link to=''
            style={{
              textDecoration:'none',
              backgroundColor: '#5ECE7B', 
              color:'white'
            }}
            className="viewCart"
            >
            Checkout
            </Link>
          
        </div>
      </div>
  );
}
