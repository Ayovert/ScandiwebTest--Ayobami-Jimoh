import { NavLink } from "react-router-dom";
import CartOverlay from "./cartOverlay";
import CurrencyList from "./currencylist";
import "./header.scss";
import { ReactComponent as CartIcon } from "../../../images/cart.svg";
import { ReactComponent as CloudIcon } from "../../../images/clouds3.svg";
import cartImg from "../../images/cart.svg";

const navLinks = [
  { title: "SHOP", path: "/shop" },
  { title: "TECH", path: "/tech" },
  { title: "CLOTHES", path: "/clothes" },
];

export default function Header() {
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
            <CurrencyList />
          </div>

          <div className="cartOverlay">
            <span
              className="cartButton"
              style={{
                transform: "scaleX(-1)",
              }}
            >
              <CartIcon height={25} width={25} />
            </span>
            <CartOverlay />
          </div>
        </div>
      </div>
    </header>
  );
}
