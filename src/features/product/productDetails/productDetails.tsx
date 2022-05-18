import { QueryResult } from "@apollo/client";
import { Query } from "@apollo/react-components";
import { ChangeEvent, Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { GET_PRODUCT } from "../../../app/api/queries";
import "./productDetails.scss";
import { Product } from "../../../app/model/Product";

import { Cart, CartParams } from "../../../app/model/Cart";
import ProductAttributeComponent from "./productAttributeComp";
import {
  attributeExist,
  CartToCartParams,
  getDefaultAttribute,
  productExistInCart,
} from "../../../app/util/util";
import parse from "html-react-parser";

type ProductState = {
  id: string;
  currency: number;
  color: string;
  size: string;
  capacity: string;
  imageIndex: number;
};

interface Props extends RouteComponentProps {
  currency: number;
  handleCurrency: () => void;
  addCart: (cartParams: CartParams) => void;
  removeFromCart: (cartParams: CartParams) => void;
  cart: Cart | null;
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
    imageIndex: 0,
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
    const { id, color, size, capacity, imageIndex } = this.state;

    const { addCart, currency, cart, removeFromCart } = this.props;

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

              const theColor = color === "" ? defaultColor : color;
              const theCapacity = capacity === "" ? defaultCapacity : capacity;
              const theSize = size === "" ? defaultSize : size;

              const productInCart = productExistInCart(
                cart,
                productData.id,
                theCapacity,
                theColor,
                theSize
              );

              return (
                <>
                  <div className="productDetails">
                    <div className="miniImages">
                      {productData.gallery.map((value, index) => (
                        <img
                          className="miniImagesItem"
                          key={index}
                          alt="product-mini"
                          src={value}
                          onClick={() => {
                            this.setState({ imageIndex: index });
                          }}
                          style={{
                            border: `${
                              imageIndex === index
                                ? "3px solid #5ece7b"
                                : "none"
                            }`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="mainImage">
                      <img
                        alt="product-main"
                        src={productData.gallery[imageIndex]}
                      />
                    </div>
                    <div className="productAttributes">
                      <h1>{productData.brand}</h1>
                      <p className="productName">{productData.name}</p>

                      {sizeAttr > -1 && (
                        <ProductAttributeComponent
                          productData={productData}
                          attribute={size}
                          handleAttributeChange={this.handleAttributeChange}
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
                          handleAttributeChange={this.handleAttributeChange}
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
                          handleAttributeChange={this.handleAttributeChange}
                          defaultAttribute={defaultAttr.defaultCapacity}
                          classname="productCapacity"
                          input={true}
                          name="Capacity"
                        />
                      )}

                      <div className="productPriceBox">
                        <h4 className="cartQTitle">PRICE:</h4>

                        <span>
                          {productData.prices[currency].currency.symbol}

                          {productData.prices[0].amount}
                        </span>
                      </div>

                      {productData.inStock ? (
                        productInCart < 0 ? (
                          <div className="AddCartButton">
                            <button
                              type="submit"
                              onClick={() => {
                                addCart({
                                  product: productData,
                                  selectedColor: theColor,
                                  selectedCapacity: theCapacity,
                                  selectedSize: theSize,
                                });
                              }}
                            >
                              Add to Cart
                            </button>
                          </div>
                        ) : (
                          <div className="cartQ">
                            <h4 className="cartQTitle">QUANTITY </h4>

                            <div className="cartControls">
                              <div
                                className="cartControlItem"
                                onClick={() => {
                                  addCart(
                                    CartToCartParams(cart!.items[productInCart])
                                  );
                                }}
                              >
                                <span>+</span>
                              </div>

                              <span className="cartCount">
                                {cart!.items[productInCart].quantity}
                              </span>

                              <div
                                className="cartControlItem"
                                onClick={() =>
                                  removeFromCart(
                                    CartToCartParams(cart!.items[productInCart])
                                  )
                                }
                              >
                                <span>-</span>
                              </div>
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="cartQ">
                          <h4 className="cartQTitle">QUANTITY </h4>

                          <p className="outOfStock">OUT OF STOCK </p>
                        </div>
                      )}

                      <div className="productDescription">
                        {parse(productData.description)}
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
