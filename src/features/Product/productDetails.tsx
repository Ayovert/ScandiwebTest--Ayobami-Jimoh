import { QueryResult, useQuery } from "@apollo/client";
import { Query } from "@apollo/react-components";
import { Component, PureComponent, ReactNode } from "react";
import { RouteComponentProps, RouteProps, withRouter } from "react-router-dom";
import { GET_PRODUCT } from "../../app/api/queries";
import hoodie from "../../app/images/hoodie.jpeg";
import "./productDetails.scss";
import PropTypes from "prop-types";
import { Product } from "../../app/model/Product";

type ProductState = {
  id: string;
};

 class ProductDetails extends Component<RouteComponentProps, ProductState> {

  state: ProductState ={
    id : ""
  };

 componentDidMount() {
    const  id  = this.props.match.params;
    this.setState(id);
  }
  
  removeTags(str : string) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
          
    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, '');
}
  render() {


    console.log(this.state);
    console.log(this.props);

    const { id } = this.state;

    if(id !== "")
    {
      return(
        <>
        <Query query={GET_PRODUCT} variables={{id :id}}>
        
        {({ loading, error, data } : QueryResult) => {
              if (error){
                console.log(error);
                return <h1>Error...</h1>;
              } 
              if (loading || !data) return <h1>Loading...</h1>;

              console.log(data);

              const productData = data.product as Product;

              return(
                <>
                
                <h1>Product Details</h1>
  
                <div className="productDetails">
                  <div className="miniImages">
                    {productData.gallery.map((value, index) =>(
                      
                    
                        <img key={index}
                      alt="product-mini" 
                      src={value} height={87} 
                      width={87}
                      />
                      
                      
                    ))

                    }
                  </div>
                  <div className="mainImage">
                    <img alt="product-main" src={productData.gallery[0]} height={560} />
                  </div>
                  <div className="productAttributes">
                    <h3>{productData.name}</h3>
                
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
                      
                      {this.removeTags(productData.description)}
                    
                    </div>
                    
                  </div>
                </div>
                </>
              )
      
        }}
        </Query>
          
        </>
       )
    }

    return <>
    <h1>No Product Found</h1>
    </>
           
    
     
    
  }
}

export default withRouter(ProductDetails);
