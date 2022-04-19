import './category.scss'

import hoodie from '../../app/images/hoodie.jpeg'
import { GET_CATEGORY } from '../../app/api/queries'
import {useQuery } from '@apollo/client'
import {  Product } from '../../app/model/Product'
import { Link } from 'react-router-dom'

interface Props{
    categoryName: string
}

export default function CategoryPage({categoryName}: Props){


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
                <img alt = "product" src={product.gallery[0]}/>
                <p>Product : {product.name}</p>

                <p>Price: {product.prices[0].amount}</p>

                <Link to='/product/1' className='navItem'  style={{textDecoration: 'none'}}>
                                            View Details
                                        </Link>
                
            </div>
            ))}
            <div className="productCard">
                <img alt = "product" src={hoodie}/>
                <p>Product</p>

                <p>Price</p>
                
            </div>
            <div className="productCard">
                <img alt = "product" src={hoodie}/>
                <p>Product</p>

                <p>Price</p>
                
            </div>
            <div className="productCard">
                <img alt = "product" src={hoodie}/>
                <p>Product</p>

                <p>Price</p>
                
            </div>
            <div className="productCard">
                <img alt = "product" src={hoodie}/>
                <p>Product</p>

                <p>Price</p>
                
            </div>
            <div className="productCard">
                <img alt = "product" src={hoodie}/>
                <p>Product</p>

                <p>Price</p>
                
            </div>
            <div className="productCard">
                <img alt = "product" src={hoodie}/>
                <p>Product</p>

                <p>Price</p>
                
            </div>

        </div>
        </>
        
    )
}