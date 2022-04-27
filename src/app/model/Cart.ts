import {Attribute, Price, Product} from '../../app/model/Product'

export interface Cart{

    id:number;
    quantity:number;
    items: CartItems[];
}

export interface CartItems{
    id: string;
        name: string;
        prices: Price[];
        category: string;
        description: string;
        gallery: string[];
        attributes: Attribute[];
        inStock: boolean;
        brand: string;
        quantity: number;
        productId:string;
}