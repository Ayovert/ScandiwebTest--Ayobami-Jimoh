import { Component } from "react";
import { CartItems } from "../../../app/model/Cart";
import "./productCapacity.scss";

interface Props {
  item: CartItems;

  className: string;
}

class ProductCapacity extends Component<Props> {
  render() {
    const { item, className } = this.props;
    return (
      <>
        <div className={`${className}`}>
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
                items.items.map(({ value }, index) => {

                  const selected = value === item.selectedCapacity;
                  return(
                  <div
                    key={index}
                    className="productCapacity"
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

export default ProductCapacity;
