import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Cart, CartItems } from "../../app/model/Cart";


export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";



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

interface CartState{
    
    cart: Cart | null
}

interface CartParams{
    productId: string;
    quantity: number;
    cart: CartItems;
}


const initialState:CartState={
cart: null

}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        AddtoCart:(state, action) => {
            state.cart = action.payload
        },
        IncreaseCartQuantity:(state, action:PayloadAction<CartParams>)=>{
            const {productId, quantity, cart} = action.payload

            const itemIndex = state.cart?.items.findIndex( i => i.productId === productId);

            if(itemIndex === -1 || itemIndex ===undefined) {
                state.cart!.items.push(cart);
                return;
            
            };

            state.cart!.items[itemIndex].quantity += quantity;

    
        },
        removeFromCart:(state, action:PayloadAction<CartParams>)=>{
            const {productId, quantity} = action.payload

            const itemIndex = state.cart?.items.findIndex( i => i.productId === productId);

            if(itemIndex === -1 || itemIndex ===undefined) return;

            state.cart!.items[itemIndex].quantity -= quantity;
    
                if (state.cart!.items[itemIndex].quantity === 0){
                    state.cart!.items.splice(itemIndex, 1);
                }

            
        }

    }

})