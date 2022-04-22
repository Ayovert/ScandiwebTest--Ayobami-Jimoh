import { gql } from "@apollo/client";
import { type } from "os";

export const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;


export const GET_CATEGORY = gql`
query category($input: CategoryInput!) 
{
  category(input : $input){
    name
    products {
      id
      name
      prices {
        amount
        currency {
          symbol
        }
      }
      category
      description
      gallery
      attributes {
        name
        type

        items {
          displayValue
          value
        }
      }
      inStock
      brand
    }
  }
   
  }
`;

export const GET_PRODUCT = gql`
query product($id: String!){
  product(id: $id){
     id
    name
      prices {
        amount
        currency {
          symbol
        }
      }
      category
      description
      gallery
      attributes {
        name
        type

        items {
          displayValue
          value
        }
      }
      inStock
      brand
  }
}
`;