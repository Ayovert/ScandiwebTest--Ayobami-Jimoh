import { NavLink } from "react-router-dom";
import CartOverlay from "./cartOverlay";
import CurrencyList from "./currencylist";
import "./header.scss";
import { ReactComponent as CartIcon } from "../../../images/cart.svg";
import { ReactComponent as CloudIcon } from "../../../images/clouds3.svg";
import { Cart, CartParams } from "../../model/Cart";
import { PureComponent, ReactNode } from "react";
import { Product } from "../../model/Product";
import { current } from "@reduxjs/toolkit";

const navLinks = [
  { title: "SHOP", path: "/shop" },
  { title: "TECH", path: "/tech" },
  { title: "CLOTHES", path: "/clothes" },
];

interface Props{
  cart : Cart | null;
  handleCurrency:()=>void;
  addCart:(cartParams:CartParams)=>void;
  removeFromCart:(cartParams : CartParams)=>void;
  currency:number;
}
class HeaderComponent extends PureComponent<Props> {

  

 

  render(): ReactNode {
    const {cart, handleCurrency, addCart, removeFromCart, currency} = this.props;

    const cartQuantity = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

    return (
      <header className="navHeader">
        <div className="subHeader">
          <nav>
            <ul className="navList">
              {navLinks.map(({ title, path }) => {
                return (
                  <li key={path}>
                    <NavLink to={path} className="navItem">
                      {title}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
  
          <div className="homeHeader">
            <NavLink
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              <CloudIcon className="cloudLogo" width={45} height={45} />
            </NavLink>
          </div>
  
          <div className="rightNav">
            <div className="currencyDiv">
              <button type="button" className="currencyButton">
                <span>$</span>
                <span
                  className="currencyArrow"
                  style={{
                    display: "inline-block",
                    transform: "rotateX(180deg)",
                    WebkitTransform: "rotateX(180deg)",
                    fontSize: 20,
                    position: "relative",
                    bottom: "10%",
                    margin: 5,
                  }}
                >
                  ^
                </span>
              </button>
              <CurrencyList  handleCurrency={handleCurrency} currencyActive={currency}/>
            </div>
  
            <div className="cartOverlay">

              <span
                className="cartButton"
                style={{
                  transform: "scaleX(-1)",
                }}
              >
               {cartQuantity > 0 && <span
                className="cartCount">{cartQuantity} </span>}
                <CartIcon height={25} width={25} />
              </span>
              <CartOverlay cart={cart}  addCart={addCart} removeFromCart={removeFromCart} currency={currency}/>
            </div>
          </div>
        </div>
      </header>
    );
  }
  
}
 export default HeaderComponent;