import { ChangeEvent, Component } from "react";
import { Product } from "../../../app/model/Product";
import "./productColorD.scss";
import { ReactComponent as CheckIcon } from "../../../images/check1.svg";

interface Props {
  productData: Product;
  defaultColor: string;
  handleColorChange: (event: ChangeEvent<HTMLInputElement>) => void;
  color: string;
}

class ProductColorD extends Component<Props> {
  render() {
    const { productData, defaultColor, handleColorChange, color } = this.props;
    return (
      <>
        <h4
          style={{
            fontSize: 18,
            margin: "0 auto",
          }}
        >
          COLOR:
        </h4>
        <div className="productColorList">
          {productData.attributes
            .filter((items) => items.name === "Color")
            .map((items) =>
              items.items.map(({ value }, index) => {
                return (
                  <div className="productColorBox" key={value}>
                    <div
                      className="productColor"
                      style={{
                        backgroundColor: `${value}`,
                        opacity: `${
                          value === color
                            ? 0.8
                            : color === defaultColor
                            ? 0.8
                            : 1
                        }`,
                      }}
                    >
                      {" "}
                      <input
                        type="radio"
                        name="color"
                        checked={
                          (color !== "" && value === color) ||
                          (color === "" && value === defaultColor)
                        }
                        value={value}
                        id={`color${index}`}
                        onChange={(e) => {
                          handleColorChange(e);
                        }}
                      />
                      <CheckIcon
                        width={25}
                        height={25}
                        className="checkmark"
                        style={{
                          display: `${
                            color !== "" && value === color
                              ? "block"
                              : color === "" && value === defaultColor
                              ? "block"
                              : "none"
                          }`,
                        }}
                      />
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

export default ProductColorD;
