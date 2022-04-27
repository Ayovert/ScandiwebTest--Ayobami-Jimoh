import { PureComponent, ReactNode } from "react";
import { Link } from "react-router-dom";

import hoodie from '../../../src/images/hoodie.jpeg'
import './cartPage.scss'

 class CartPage extends PureComponent {
    render(): ReactNode {
        return (
            
              <div className="cartPage">
                <h3 style={{ padding: '0 40px' }}>My Cart</h3>
                <div className="cartItems">
                    <div className="productAttributes">
                        <p>
                            Apollo Running Short
                        </p>
        
                        <p>
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
        
                    <div className="cartImage" >
                      <img 
                      src={hoodie}
                      alt="product"
                      height={185}
                      />
                    </div>
                </div>
                <div className="cartSummary">
                  <span style={{paddingLeft:10}}>Total</span>
                  <span style={{paddingRight:10}}>$ 100.00</span>
                </div>
        
                <div className="cartOverlayButton">
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
  
}

export default CartPage;