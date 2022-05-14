import { Component } from "react";
import { CartItems } from "../../../app/model/Cart";
import "./productSize.scss";

interface Props {
  item: CartItems;
  className: string;
}

class ProductSize extends Component<Props> {
  render() {
    const { item, className } = this.props;
    return (
      <>
        <h4
          style={{
            fontSize: 18,
            margin: 2,
          }}
        >
          SIZE:
        </h4>
        <div className={`${className}`}>
          <div className="productSizeBox">
            {item.attributes
              .filter((items) => items.name === "Size")
              .map((items) =>
                items.items.map(({ value }, index) => {
               
                  const selected = value === item.selectedSize;
                  return(
                  <div
                    key={index}
                    className="productSize"
                    style={{
                      backgroundColor: `${
                        selected
                          ? "black"
                         
                          : "white"
                      }`,
                      color: `${
                        selected
                          ? "white"
                     
                          : "black"
                      }`,
                    }}
                  >
                    <span>{value}</span>
                  </div>
                );
  })
              )}
          </div>
        </div>
      </>
    );
  }
}
export default ProductSize;
