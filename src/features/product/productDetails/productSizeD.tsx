import { ChangeEvent, Component } from "react";

import { Product } from "../../../app/model/Product";
import "./productCapacityD.scss";

interface Props {
  productData: Product;
  defaultSize: string;
  handleSizeChange: (event: ChangeEvent<HTMLInputElement>) => void;
  size: string;
}

class ProductSizeD extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      size: this.props.size,
    };
  }

  state: any = {
    size: "",
  };

  render() {
    const { productData, defaultSize, handleSizeChange, size } = this.props;
    return (
      <>
        <h4
          style={{
            fontSize: 18,
            margin: "0 auto",
          }}
        >
          SIZE:
        </h4>
        <div className="productSizeList">
          <div className="productSizeBox">
            {productData.attributes
              .filter((items) => items.name === "Size")
              .map((items) =>
                items.items.map(({ value }, index) => {
                  const defSelected =  (size === "" && value === defaultSize);
                  const selected = size !== "" && value === size;
                  return (
                    <div
                      key={value}
                      className="productSize"
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
                        name="size"
                        checked={
                          (size !== "" && value === size) ||
                          (size === "" && value === defaultSize)
                        }
                        value={value}
                        id={`size${index}`}
                        onChange={(e) => {
                          handleSizeChange(e);
                        }}
                      />

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
export default ProductSizeD;
