import axios from "axios";
import React, { createContext } from "react";
;


export const cartContext = createContext();

export default function CartContextProvider(props) {

    
    
        let headers = {
            token: localStorage.getItem('userToken')
        }
        
    function addToCart(productId) {
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart",
        {
            productId
        },
        {
            headers
        }).then((response) => response )
        .catch ((error) => error)
    }

    function getLoggedUserCart() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/cart",
        {
            headers
        }).then((response) => response )
        .catch ((error) => error)
    }

    function deleteCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            headers
        }).then((response) => response )
        .catch ((error) => error)
    }

    function updateCartProductQuantity(productId , count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            count
        },
        {
            headers
        }).then((response) => response )
        .catch ((error) => error)
    }
    
    function clearUserCart () {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
            headers
        }).then((response) => response )
        .catch ((error) => error)
    }


    return (
        <cartContext.Provider value={{addToCart, getLoggedUserCart, deleteCartItem, updateCartProductQuantity, clearUserCart,headers}}>
            {props.children}
        </cartContext.Provider>
    );
} 