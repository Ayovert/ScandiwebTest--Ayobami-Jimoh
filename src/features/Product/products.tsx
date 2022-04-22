import './products.scss'

import hoodie from '../../app/images/hoodie.jpeg'
import { GET_CATEGORY } from '../../app/api/queries'
import {useQuery } from '@apollo/client'
import {  Product } from '../../app/model/Product'
import { Link } from 'react-router-dom'

interface Props{
    categoryName: string
}

export default function ProductListPage({categoryName}: Props){


const { loading, error, data } = useQuery(GET_CATEGORY, {
     variables: { input : {title : categoryName} },
          });
          console.log(data);
          console.log({error});
          

    

  if (loading) return <p>Loading...</p>;
  if (error) return <div>Error! {error.stack}</div>;

    return(
        <>
        <h1>{data?.category.name ?? categoryName}</h1>

        <div className="product">
            {data?.category.products.map((product : Product) =>(
                <div key={product.id} className="productCard">
                <img alt = "product" 
                src={product.gallery[0]}
                width="100%"
                height="100%"
               
                />
                <p
                style={{
                    fontWeight:400
                }}
                >{product.name}</p>

                <p
                style={{
                    fontWeight:800
                }}
                >
                    $ {product.prices[0].amount}
                    </p>

                <Link to={`/product/${product.id}`} className='navItem'  style={{textDecoration: 'none'}}>
                                            View Details
                                        </Link>
                
            </div>
            ))}

        </div>
        </>
        
    )
}