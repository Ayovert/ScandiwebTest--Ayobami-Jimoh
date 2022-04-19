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

type CategoryInput ={
  input?:{
    title: string
  }
}

export const GET_CATEGORY = gql`
query category($input: CategoryInput!) 
{
  category(input : $input){
    name
    products {
      id
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