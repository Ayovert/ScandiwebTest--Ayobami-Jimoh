import "./products.scss";

import hoodie from "../../app/images/hoodie.jpeg";
import { GET_CATEGORY } from "../../app/api/queries";
import { useQuery } from "@apollo/client";
import { Product } from "../../app/model/Product";
import { Link } from "react-router-dom";
import { ReactComponent as CartIcon } from "../../images/cart.svg";

interface Props {
  categoryName: string;
  pageTitle: string;
}

export default function ProductListPage({ categoryName, pageTitle }: Props) {
  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { input: { title: categoryName } },
  });
  console.log(data);
  console.log({ error });

  if (loading) return <p>Loading...</p>;
  if (error) return <div>Error! {error.stack}</div>;

  return (
    <>
      <h1>{pageTitle}</h1>

      <div className="product">
        {data?.category.products.map((product: Product) => (
            
          <div key={product.id} className="productCard">

              <div className="productCardAction">
              <Link
            to={`/product/${product.id}`}
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
              
            <span className="cartButton">
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

            <p
              style={{
                fontWeight: 800,
              }}
            >
              $ {product.prices[0].amount}
            </p>

          </div>
          
        ))}
      </div>
    </>
  );
}
