import { Cart } from "../../app/model/Cart";

 const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

interface CartState{
    cart: Cart | null
}


const initialState:CartState={
cart: null

}

export function AddtoCart(cartItem: CartState){
    return{
        type: ADD_TO_CART,
        payload: cartItem
    }
}

export function RemoveFromCart(cartItem: CartState){
    return{
        type: REMOVE_FROM_CART,
        payload: cartItem
    }
}





