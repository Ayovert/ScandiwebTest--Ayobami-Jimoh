import "./products.scss";

import { GET_CATEGORY } from "../../app/api/queries";
import { QueryResult } from "@apollo/client";
import { Product } from "../../app/model/Product";
import { Link, Route, RouteComponentProps, RouteProps, Switch, withRouter } from "react-router-dom";
import { ReactComponent as CartIcon } from "../../images/cart.svg";
import { Component } from "react";
import { Query } from "@apollo/react-components";
import { CartParams } from "../../app/model/Cart";
import { __String } from "typescript";
import path from "path";
import ProductDetails from "./productDetails";










interface Props extends RouteComponentProps {
  categoryName: string
  pageTitle: string
  addCart:(cartParams : CartParams)=>void
  currency:number
  handleCurrency: () => void;
}


class ProductListPage2 extends Component<Props>{

  /*const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { input: { title: this.props.categoryName } },
  });
  console.log(data);
  console.log({ error });*/

 

  render(){

    //const dispatch: AppDispatch = useDispatch();

    /*const currstr = getCookie("currency");

    const currency = currstr !=="" || currstr !==undefined ? 0: parseInt(currstr);*/
  

   const {categoryName, pageTitle, addCart, currency, handleCurrency, match}= this.props;
   console.log(this.props.match);

   const { path, url} = match;



    return(
      <>

<Query query={GET_CATEGORY} variables={{input:{title : categoryName}}}>
            {({ loading, error, data }: QueryResult) => {
              if (error) {
                console.log(error);
                return <h1>Error...</h1>;
              }
              if (loading || !data) return <h1>Loading...</h1>;



              return(
                <>
                <h1>{pageTitle}</h1>

                <div className="product">
                  {data?.category.products.map((product: Product) => (
                      
                    <div key={product.id} className="productCard">
                
                        <div className="productCardAction">
                        <Link
                      to={`product/${product.id}`}
                      style={{ 
                          color:'inherit',
                          textDecoration: "inherit" }}
                    >
                      <img
                        alt="product"
                        src={product.gallery[0]}
                        width="100%"
                        height="300px"
                        style={{
                          objectFit: "cover",
                          maxHeight: "300px",
                        }}
                      />
                
                      <div className="productCardOverlay"
                      style={{
                          display:"none",
                          width:"90%",
                        height:"300px",
                      
                          objectFit: "cover",
                          maxHeight: "300px",
                      
                          backgroundColor:"rgb(150 150 151 / 60%)",
                          position:"absolute",
                          top:20,
                          left:22,
                          right:0,
                          alignItems:"center",
                          justifyContent:"center",
                      }}
                       
                      >
                        <h6
                        style={{
                          color:"white",
                          padding:16,
                          textAlign:"center",
                          border:"2px solid white",
                          
                            backgroundColor: "rgb(132 131 135 / 86%)"
                        }}
                          
                      
                        >
                         Click image to view details
                        </h6>
                      </div>
                      </Link>
                        </div>
                        
                      <span className="cartButton" onClick={() => {
                        addCart({product: product});
                        }}>
                        <CartIcon
                          height={25}
                          width={25}
                          fill="white"
                          style={{
                            transform: "scaleX(-1)",
                          }}
                        />
                      </span>
                      <p
                        style={{
                          fontWeight: 400,
                        }}
                      >
                        {product.name}
                      </p>

                      <span>
                        <span style={{
                          fontSize:'1rem'
                        }}>{product.prices[currency].currency.symbol} </span>
                      
                      <span
                        style={{
                          fontWeight: 800,
                          margin:'0 5px 0 5px'
                        }}
                      >
                        
                       {product.prices[currency].amount}
                        
                      </span>
                      <span style={{
                          fontSize:'1rem'
                        }}>({product.prices[currency].currency.label} )</span> 
                      
                      </span>
                      
                
                    </div>
                    
                  ))}
                </div>

                </>
              );

    
}}</Query>
</>
    )
  }


  //  if (loading) return <p>Loading...</p>;
  //if (error) return <div>Error! {error.stack}</div>;

    
  }

export default withRouter(ProductListPage2)


