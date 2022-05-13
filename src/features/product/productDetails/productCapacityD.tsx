import { ChangeEvent, Component } from "react";
import { Product } from "../../../app/model/Product";
import "./productCapacityD.scss";

interface Props {
  productData: Product;
  defaultCapacity: string;
  handleCapacityChange: (event: ChangeEvent<HTMLInputElement>) => void;
  capacity: string;
}

class ProductCapacityD extends Component<Props> {
  render() {
    const { productData, defaultCapacity, handleCapacityChange, capacity } =
      this.props;
    return (
      <div className="productCapacityList">
        <h4
          style={{
            fontSize: 18,
            margin: "0 auto",
          }}
        >
          CAPACITY:
        </h4>

        <div className="productCapacityBox">
          {productData.attributes
            .filter((items) => items.name === "Capacity")
            .map((items) =>
              items.items.map(({ value }, index) => (
                <div
                  key={value}
                  className="productCapacity"
                  style={{
                    border: `${
                      capacity !== "" && value === capacity
                        ? "2px solid red"
                        : capacity === "" && value === defaultCapacity
                        ? "2px solid red"
                        : "1px solid black"
                    }`,
                  }}
                >
                  <input
                    type="radio"
                    name="capacity"
                    checked={
                      (capacity !== "" && value === capacity) ||
                      (capacity === "" && value === defaultCapacity)
                    }
                    value={value}
                    id={`capacity${index}`}
                    onChange={(e) => {
                      handleCapacityChange(e);
                    }}
                  />
                  <span>{value}</span>
                </div>
              ))
            )}
        </div>
      </div>
    );
  }
}

export default ProductCapacityD;
