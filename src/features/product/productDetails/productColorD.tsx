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
                const defSelected = color === "" && value === defaultColor;
                const selected = color !== "" && value === color;
                return (
                  <div className="productColorBox" key={value}>
                    <div
                      className="productColor"
                      style={{
                        backgroundColor: `${value}`
                      }}
                    >
                      <span
                        className="check"
                        style={{
                          display: `${
                            selected ? "block" : defSelected ? "block" : "none"
                          }`,
                        }}
                      ></span>{" "}
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
