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
              items.items.map(({ value }, index) => {
                const defSelected =  (capacity === "" && value === defaultCapacity);
                  const selected = capacity !== "" && value === capacity;
                return(
                <div
                  key={value}
                  className="productCapacity"
                  style={{
                    backgroundColor: `${
                      selected
                        ? "black"
                        : defSelected ? "black"
                        : "white"
                    }`,
                    color: `${
                      selected
                        ? "white"
                        :defSelected ? "white"
                        : "black"
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
                );
  })
            )}
        </div>
      </div>
    );
  }
}

export default ProductCapacityD;
