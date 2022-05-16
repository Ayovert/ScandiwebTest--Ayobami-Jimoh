import { ChangeEvent, Component } from "react";
import { Product } from "../../../app/model/Product";
import "./productAttribute.scss";
import { CartItems } from "../../../app/model/Cart";

interface Props {
  productData?: Product;
  cartItems?: CartItems;
  defaultAttribute: string;
  handleColorChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  attribute: string;
  input:boolean;
  classname: string;
  alt? :string;
  name:string;
}

class ProductAttributeComponent extends Component<Props> {
  render() {
    const { productData, defaultAttribute, cartItems, handleColorChange, classname, attribute, input, name, alt} = this.props;

    const attributesData = productData && productData.attributes.length > 0 ? productData.attributes : cartItems && cartItems.attributes.length > 0 ? cartItems.attributes : [];

    return (
      <>
        <p className="attributeTitle">
          {alt === undefined ? name.toUpperCase() : name}:
        </p>
        <div className={`${classname}${alt ?? ""}List`}>
          {attributesData.length> 0 && attributesData
            .filter((items) => items.name === name)
            .map((items) =>
              items.items.map(({ value }, index) => {
                const defSelected = attribute === "" && value === defaultAttribute;
                const selected = attribute !== "" && value === attribute;

                const altBackground = selected ? "black" : defSelected ? "black" : "white";
               const altColor =selected ? "white" :defSelected ? "white" : "black";

                const backgroundColor = name === "Color" ? value : altBackground;
                return (
                  <div className={`${classname}Box`} key={value}>
                    <div
                      className={`${classname}`}
                      style={{
                        backgroundColor: `${backgroundColor}`,
                        color: `${altColor}`
                      }}
                    >
                      {name === "Color" ? <span
                        className="check"
                       style={{
                          display: `${
                            selected ? "block" : defSelected ? "block" : "none"
                          }`,
                        }}
                      ></span>
                    : <span>{value}</span>
                    }



                     {input && <input
                        type="radio"
                        name={name.toLowerCase()}
                        checked={
                          (attribute !== "" && value === attribute) ||
                          (attribute === "" && value === defaultAttribute)
                        }
                        value={value}
                        id={`${name.toLowerCase()}${index}`}
                        onChange={(e) => {
                         handleColorChange && handleColorChange(e);
                        }}
                      />}
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

export default ProductAttributeComponent;
