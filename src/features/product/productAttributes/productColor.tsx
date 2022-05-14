import { Component, ReactNode } from "react";
import { CartItems } from "../../../app/model/Cart";
import { ReactComponent as CheckIcon } from "../../../images/check1.svg";
import "./productColor.scss";

interface Props {
  item: CartItems;
  className: string;
}

class ProductColor extends Component<Props> {
  render(): ReactNode {
    const { item, className } = this.props;
    return (
      <>
        <h4
          style={{
            fontSize: 18,
            margin: 2,
          }}
        >
          COLOR:
        </h4>
        <div className={`${className}`}>
          {item.attributes
            .filter((items) => items.name === "Color")
            .map((items) =>
              items.items.map(({ value }, index) => {
                const selected = value === item.selectedColor;
                return(
                <div className="productColorBox" key={index}>
                  <div
                    className="productColor"
                    style={{
                      backgroundColor: `${value}`
                    }}
                  >
                    <span className="checkmark"
                    style={{
                      display: `${
                        selected ? "block" : "none"
                      }`,
                    }}
                    ></span>
                  </div>
                </div>
              );
  })
            )}
        </div>
      </>
    );
  }
}

export default ProductColor;
