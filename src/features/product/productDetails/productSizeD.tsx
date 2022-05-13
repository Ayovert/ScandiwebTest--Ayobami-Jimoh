import { ChangeEvent, Component } from "react";

import { Product } from "../../../app/model/Product";
import "./productSizeD.scss";

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
                  return (
                    <div
                      key={value}
                      className="productSize"
                      style={{
                        border: `${
                          size !== "" && value === size
                            ? "2px solid red"
                            : size === "" && value === defaultSize
                            ? "2px solid red"
                            : "1px solid black"
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
