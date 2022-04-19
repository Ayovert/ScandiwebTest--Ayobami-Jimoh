import { PureComponent, ReactNode } from "react";
import hoodie from "../../app/images/hoodie.jpeg";
import "./product.scss";

export default class ProductDetails extends PureComponent {
  render(): ReactNode {
    return (
      <>
        <h1>Product Details</h1>

        <div className="productDetails">
          <div className="miniImages">
            <img alt="product-mini" src={hoodie} height={87} 
            width={87}
            />
            <img alt="product-mini" src={hoodie} height={87}
            width={87}
            />
            <img alt="product-mini" src={hoodie} height={87} 
            width={87}
            />
          </div>
          <div className="mainImage">
            <img alt="product-main" src={hoodie} height={560} />
          </div>
          <div className="productAttributes">
            <h3>Apollo Running Short</h3>

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
                <div className="productSize">
                  <span>XS</span>
                </div>
                <div className="productSize">
                  <span>S</span>
                </div>
              </div>
            </div>

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
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                $ 50.00
              </span>
            </div>

            <div className="AddCartButton">
            <button type="submit" style={{ backgroundColor: "#5ECE7B", color: "white" }}>
              Add to Cart
            </button>
            </div>

            <div className="productDesription">
              <p>
              Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.
              </p>
            </div>
            
          </div>
        </div>
      </>
    );
  }
}
