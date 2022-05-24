import { Component, Props } from "react";

export default class ProductAttributeComp extends Component {
  render() {
    return(
      <></>
    )
  }
}
/*import { ChangeEvent, Component } from "react";
import { Product } from "../../../app/model/Product";
import "./productAttribute.scss";
import { CartItems } from "../../../app/model/Cart";
import CustomRadioInput from "../../../app/layout/reUse/customRadioInput";

interface Props {
  productData?: Product;
  cartItems?: CartItems;
  handleAttributeChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  attribute: string;
  input: boolean;
  classname: string;
  alt?: string;
  name: string;
}

class ProductAttributeComp extends Component<Props> {
  render() {
    const {
      productData,
      cartItems,
      handleAttributeChange,
      classname,
      attribute,
      input,
      name,
      alt,
    } = this.props;

    const attributesData =
      productData && productData.attributes.length > 0
        ? productData.attributes
        : cartItems && cartItems.attributes.length > 0
        ? cartItems.attributes
        : [];

    return (
      <>
        <p className="attributeTitle">
          {alt === undefined ? name.toUpperCase() : name}:
        </p>
        <div className={`${classname}${alt ?? ""}List`}>
          {attributesData.length > 0 &&
            attributesData
              .filter((items) => items.name === name)
              .map((itemArray) =>
                itemArray.items.map(({ value }, index) => {
                  const selected = attribute !== "" && value === attribute;

                  const altBackground = selected ? "black" : "white";
                  const altColor = selected ? "white" : "black";

                  const backgroundColor =
                    itemArray.type === "swatch" ? value : altBackground;
                  return (
                    <div className={`${classname}Box`} key={value}>
                      <div
                        className={`${classname}`}
                        style={{
                          backgroundColor: `${backgroundColor}`,
                          color: `${altColor}`,
                        }}
                      >
                        {itemArray.type === "swatch" ? (
                          <span
                            className="check"
                            style={{
                              display: `${selected ? "block" : "none"}`,
                            }}
                          ></span>
                        ) : (
                          <span>{value}</span>
                        )}

                        {input && (
                          <CustomRadioInput
                            checked={selected}
                            onChange={(e) => {
                              handleAttributeChange!(e);
                            }}
                            value={value}
                            id={`${name.toLowerCase()}${index}`}
                            name={name.toLowerCase()}
                          />
                        )}
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

export default ProductAttributeComp;*/
