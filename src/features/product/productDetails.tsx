import { QueryResult } from "@apollo/client";
import { Query } from "@apollo/react-components";
import { ChangeEvent, Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { GET_PRODUCT } from "../../app/api/queries";
import "./productDetails.scss";
import { Product } from "../../app/model/Product";
import { ReactComponent as CheckIcon } from "../../images/check1.svg";
import { CartParams } from "../../app/model/Cart";

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
    /*const currstr = getCookie("currency");
    const currency = currstr ==="" || currstr ===undefined ? 0: parseInt(currstr);*/

    this.setState({ currency: this.props.currency });
  }

  removeTags(str: string) {
    if (str === null || str === "") return false;
    else str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  handleColorChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;


    if (Object.keys(this.state).includes(name)) {
      this.setState({ [name]: value } as unknown as Pick<
        ProductState,
        keyof ProductState
      >);
    }
 
  }




 

  render() {
    console.log(this.props.location);
    console.log(this.props.match);

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


              const sizeAttr = productData.attributes.findIndex(
                (items) => items.name === "Size"
              );

              let defaultSize = "";
              let defaultColor = "";
              let defaultCapacity = "";

              for (let x  in productData.attributes){
                let name = productData.attributes[x].name.toLowerCase();

                if(name === "size"){
                  defaultSize = productData.attributes[x].items[1].value!;
                }

                else if(name === "color"){
                  defaultColor = productData.attributes[x].items[1].value!;
                }
                else if(name === "capacity"){
                  defaultCapacity = productData.attributes[x].items[1].value!;
                }

              }


              const colorAttr = productData.attributes.findIndex(
                (items) => items.name === "Color"
              );

              const capacityAttr = productData.attributes.findIndex(
                (items) => items.name === "Capacity"
              );



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
                      <h3>{productData.name}</h3>

                      {(sizeAttr !== null || sizeAttr !== undefined) &&
                        sizeAttr > -1 && (
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
                                      return(
                                      <div
                                        key={value}
                                        className="productSize"
                                        style={{
                                          border: `${
                                            size !== "" &&
                                            value   === size 
                                            ? "2px solid red": size === "" && value === defaultSize
                                              ? "2px solid red"
                                              : "1px solid black"
                                          }`,
                                        }}
                                      >
                                        <input
                                          type="radio"
                                          name="size"
                                          checked={ (size !== "" &&
                                          value   === size)   || (size === "" && value === defaultSize)}
                                          value={value}
                                          id={`size${index}`}
                                          onChange={(e) => {
                                            this.handleColorChange(e);
                                          }}
                                        />

                                        <span>{value}</span>
                                      </div>
                                      )
                                    })
                                  )}
                              </div>
                            </div>
                          </>
                        )}

                      {(colorAttr !== null || colorAttr !== undefined) &&
                        colorAttr > -1 && (
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
                                   
                                    

                                    return(
                                    
                                      <div className="productColorBox" 
                                      key={value}>
                                        <div
                                          className="productColor"
                                          style={{
                                            backgroundColor: `${value}`,
                                            opacity: `${
                                              value === color ? 0.8 : color === defaultColor? 0.8 : 1
                                            }`,
                                          }}
                                        >
                                          {" "}
                                          <input
                                            type="radio"
                                            name="color"
                                            checked={ (color !== "" &&
                                          value   === color)   || (color === "" && value === defaultColor)}
                                            value={value}
                                            id={`color${index}`}
                                            onChange={(e) => {
                                              this.handleColorChange(e);
                                            }}
                                          />
                                          <CheckIcon
                                            width={25}
                                            height={25}
                                            className="checkmark"
                                            style={{
                                              display: `${
                                                color !== "" &&
                                                value   === color 
                                                ? "block": color === "" && value === defaultColor
                                                  ? "block"
                                                  : "none"
                                              }`,
                                            }}
                                          />
                                        </div>
                                      </div>
                                    
                                    )
                                  })
                                )}
                            </div>
                          </>
                        )}

                      {(capacityAttr !== null || capacityAttr !== undefined) &&
                        capacityAttr > -1 && (
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
                                  items.items.map(({ value }, index) => (
                                    <div
                                      key={value}
                                      className="productCapacity"
                                      style={{
                                        border: `${
                                          capacity !== "" &&
                                          value   === capacity 
                                          ? "2px solid red": capacity === "" && value === defaultCapacity
                                            ? "2px solid red"
                                            : "1px solid black"
                                        }`,
                                      }}
                                    >
                                      <input
                                        type="radio"
                                        name="capacity"
                                        checked={ (capacity !== "" &&
                                          value   === capacity)   || (capacity === "" && value === defaultCapacity)}
                                        value={value}
                                        id={`capacity${index}`}
                                        onChange={(e) => {
                                          this.handleColorChange(e);
                                        }}
                                      />
                                      <span>{value}</span>
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
                              selectedColor: color === "" ? defaultColor : color,
                              selectedCapacity: capacity === "" ? defaultCapacity : capacity,
                              selectedSize: size === "" ? defaultSize : size,
                            });

                            console.log(size);
                            console.log(defaultSize);
                          }}
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
