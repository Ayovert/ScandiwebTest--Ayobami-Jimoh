import { QueryResult, useQuery } from "@apollo/client";
import { Query } from "@apollo/react-components";
import { Component, PureComponent, ReactNode } from "react";
import { RouteComponentProps, RouteProps, withRouter } from "react-router-dom";
import { GET_PRODUCT } from "../../app/api/queries";
import hoodie from "../../app/images/hoodie.jpeg";
import "./productDetails.scss";
import PropTypes from "prop-types";
import { Product } from "../../app/model/Product";
import { getCookie } from "../../app/util/util";

type ProductState = {
  id: string;
};

class ProductDetails extends Component<RouteComponentProps, ProductState> {
  state: ProductState = {
    id: "",
  };

  componentDidMount() {
    const id = this.props.match.params;
    this.setState(id);
  }

  removeTags(str: string) {
    if (str === null || str === "") return false;
    else str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  render() {
    console.log(this.state);
    console.log(this.props);

    const { id } = this.state;

    const currency = parseInt(getCookie("currency") ?? "0");

    console.log(currency);

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

              console.log(data);

              const productData = data.product as Product;

              

                const sizeAttr = productData.attributes.findIndex(
                  (items) => items.name === "Size"
                );
  
                const colorAttr = productData.attributes.findIndex(
                  (items) => items.name === "Color"
                );

                const capacityAttr = productData.attributes.findIndex(
                  (items) => items.name === "Capacity"
                );
              

              

              console.log(productData.prices[currency].currency.label);

              return (
                <>
                  <h1>Product Details</h1>

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
                      <h3>{productData.name}</h3>

                      

                      {(sizeAttr !== null || sizeAttr !== undefined) && sizeAttr > -1 && (
                        <div className="productSizeBox">
                          <h4
                            style={{
                              fontSize: 18,
                              margin: "0 auto",
                            }}
                          >
                            SIZE:
                          </h4>

                          <div className="productSizeList">
                            {productData.attributes
                              .filter((items) => items.name === "Size")
                              .map((items) =>
                                items.items.map(({ value }, index) => (
                                  <div key={index} className="productSize">
                                    <span>{value}</span>
                                  </div>
                                ))
                              )}
                          </div>
                        </div>
                      )}

                      {(colorAttr !== null || colorAttr !== undefined) && colorAttr > -1 && (
                        <div className="productSizeBox">
                        <h4
                          style={{
                            fontSize: 18,
                            margin: "0 auto",
                          }}
                        >
                          COLOR:
                        </h4>

                        <div className="productSizeList">
                        {productData.attributes
                              .filter((items) => items.name === "Color")
                              .map((items) =>
                                items.items.map(({ value }, index) => (
                                  <div key={index} className="productSize" style={{
                                    backgroundColor:`${value}`
                                  }}>
                                  </div>
                                ))
                              )}
                        </div>
                      </div>
                      )}


{(capacityAttr !== null || capacityAttr !== undefined) && capacityAttr > -1 && (
                        <div className="productSizeBox">
                        <h4
                          style={{
                            fontSize: 18,
                            margin: "0 auto",
                          }}
                        >
                          CAPACITY:
                        </h4>

                        <div className="productSizeList">
                        {productData.attributes
                              .filter((items) => items.name === "Capacity")
                              .map((items) =>
                                items.items.map(({ value }, index) => (
                                  <div key={index} className="productSize">
                                    <span style={{
                                      fontSize:18,
                                      padding:5
                                    }}>{value}</span>
                                  </div>
                                ))
                              )}
                        </div>
                      </div>
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
                          {productData.prices[currency].amount}
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
                        >
                          Add to Cart
                        </button>
                      </div>

                      <div className="productDescription">
                        {this.removeTags(productData.description)}
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
