import { NavLink } from "react-router-dom";
import CartOverlay from "./cartOverlay";
import CurrencyList from "./currencylist";
import "./header.scss";

import { ReactComponent as CloudIcon } from "../../../images/clouds3.svg";
import { Cart, CartParams } from "../../model/Cart";
import { PureComponent, ReactNode } from "react";
import { Category} from "../../model/Product";


interface Props {
  cart: Cart | null;
  handleCurrency: () => void;
  addCart: (cartParams: CartParams) => void;
  removeFromCart: (cartParams: CartParams) => void;
  currency: number;
  categories: Category[];
}
class HeaderComponent extends PureComponent<Props> {
  render(): ReactNode {
    const {
      cart,
      handleCurrency,
      addCart,
      removeFromCart,
      currency,
      categories,
    } = this.props;

    const cartQuantity =
      cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

    return (
      <header className="navHeader" id="section-1">
        <div className="subHeader">
          <nav>
            <ul className="navList">
              {categories.map((values, index) => {
                return (
                  <li key={index}>
                    <NavLink to={`/${values.name}`} className="navItem">
                      {values.name.toUpperCase()}
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
            <CurrencyList
              handleCurrency={handleCurrency}
              currencyActive={currency}
            />

          
              <CartOverlay
                cart={cart}
                addCart={addCart}
                removeFromCart={removeFromCart}
                currency={currency}
                cartQuantity={cartQuantity}
              />



            
          </div>
        </div>
       
      </header>
    );
  }
}
export default HeaderComponent;
