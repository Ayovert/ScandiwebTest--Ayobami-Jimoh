import { QueryResult } from "@apollo/client";
import { Query } from "@apollo/react-components";
import { ChangeEvent, Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { GET_PRODUCT } from "../../../app/api/queries";
import "./productDetails.scss";
import { Product } from "../../../app/model/Product";

import { CartParams } from "../../../app/model/Cart";
import ProductAttributeComponent from "./productAttributeComp";
import {
  attributeExist,
  getDefaultAttribute,
  removeTags,
} from "../../../app/util/util";

type ProductState = {
  id: string;
  currency: number;
  color: string;
  size: string;
  capacity: string;
};

interface Props extends RouteComponentProps {
  currency: number;
  handleCurrency: () => void;
  addCart: (cartParams: CartParams) => void;
}

class ProductDetails extends Component<Props, ProductState> {
  constructor(props: any) {
    super(props);

    //verImportant

    this.handleAttributeChange = this.handleAttributeChange.bind(this);
  }
  state: ProductState = {
    id: "",
    currency: 0,
    color: "",
    size: "",
    capacity: "",
  };

  componentDidMount() {
    const id = this.props.match.params;

    this.setState(id);

    this.props.handleCurrency();

    this.setState({ currency: this.props.currency });
  }

  handleAttributeChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    if (Object.keys(this.state).includes(name)) {
      this.setState({ [name]: value } as unknown as Pick<
        ProductState,
        keyof ProductState
      >);
    }
  }

  render() {
    const { id, color, size, capacity } = this.state;

    const { addCart, currency } = this.props;

    if (id !== "") {
      return (
        <>
          <Query query={GET_PRODUCT} variables={{ id: id }}>
            {({ loading, error, data }: QueryResult) => {
              if (error) {
                console.log(error);
                return <h1>Error...</h1>;
              }
              if (loading || !data) return <h1>Loading...</h1>;

              const productData = data.product as Product;

              const defaultAttr = getDefaultAttribute(productData);
              const { defaultCapacity, defaultColor, defaultSize } =
                defaultAttr;

              const attrExist = attributeExist(productData);

              const { sizeAttr, capacityAttr, colorAttr } = attrExist;

              return (
                <>
                  <div className="productDetails">
                    <div className="miniImages">
                      {productData.gallery.map((value, index) => (
                        <img
                          key={index}
                          alt="product-mini"
                          src={value}
                          height={87}
                          width={87}
                        />
                      ))}
                    </div>
                    <div className="mainImage">
                      <img
                        alt="product-main"
                        src={productData.gallery[0]}
                        height={560}
                      />
                    </div>
                    <div className="productAttributes">
                      <h1>{productData.brand}</h1>
                      <p style={{
                        fontSize:'1.5rem'
                      }}>{productData.name}</p>

                      {sizeAttr > -1 && (
                        <ProductAttributeComponent
                          productData={productData}
                          attribute={size}
                          handleColorChange={this.handleAttributeChange}
                          defaultAttribute={defaultAttr.defaultSize}
                          classname="productSize"
                          input={true}
                          name="Size"
                        />
                      )}

                      {colorAttr > -1 && (
                        <ProductAttributeComponent
                          productData={productData}
                          defaultAttribute={defaultAttr.defaultColor}
                          handleColorChange={this.handleAttributeChange}
                          attribute={color}
                          classname="productColor"
                          input={true}
                          name="Color"
                        />
                      )}

                      {capacityAttr > -1 && (
                        <ProductAttributeComponent
                          productData={productData}
                          attribute={capacity}
                          handleColorChange={this.handleAttributeChange}
                          defaultAttribute={defaultAttr.defaultCapacity}
                          classname="productCapacity"
                          input={true}
                          name="Capacity"

                        />
                      )}

                      <div className="productPriceBox">
                        <h4
                          style={{
                            fontSize: 18,
                            marginBottom: 10,
                          }}
                        >
                          PRICE:
                        </h4>

                        <span
                          style={{
                            marginRight: 10,
                            fontSize: 22,
                            fontWeight: "bold",
                          }}
                        >
                          {productData.prices[currency].currency.symbol}
                        </span>

                        <span
                          style={{
                            fontSize: 24,
                            fontWeight: "bold",
                          }}
                        >
                          {productData.prices[0].amount}
                        </span>

                        <span
                          style={{
                            marginLeft: 10,
                          }}
                        >
                          ({productData.prices[currency].currency.label})
                        </span>
                      </div>

                      <div className="AddCartButton">
                        <button
                          type="submit"
                          style={{ backgroundColor: "#5ECE7B", color: "white" }}
                          onClick={() => {
                            addCart({
                              product: productData,
                              selectedColor:
                                color === "" ? defaultColor : color,
                              selectedCapacity:
                                capacity === "" ? defaultCapacity : capacity,
                              selectedSize: size === "" ? defaultSize : size,
                            });
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>

                      <div className="productDescription">
                        {removeTags(productData.description)}
                      </div>
                    </div>
                  </div>
                </>
              );
            }}
          </Query>
        </>
      );
    }

    return (
      <>
        <h1>No Product Found</h1>
      </>
    );
  }
}

export default withRouter(ProductDetails);
