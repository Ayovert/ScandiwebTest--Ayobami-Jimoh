import { Component, ReactNode } from "react";
import { CartItems, CartParams } from "../../app/model/Cart";
import { CartToCartParams } from "../../app/util/util";

interface Props {
  item: CartItems;
  addCart: (cartParams: CartParams) => void;
  removeFromCart: (cartParams: CartParams) => void;
}

class CartControls extends Component<Props> {
  render(): ReactNode {
    const { item, addCart, removeFromCart } = this.props;
    return (
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
    );
  }
}

export default CartControls;