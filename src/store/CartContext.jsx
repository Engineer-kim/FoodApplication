import { act, createContext, useReducer  } from "react";


const CartContext = createContext({
    items: [],
    addItem: (items) => {

    },
    removeItem: (id) => {

    }
});

function CartReducer(state, action){
    if(action.type === 'ADD_ITEM'){
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id)
        const updatedItems = [...state.items]
        if(existingCartItemIndex > -1){
            const existingItem = state.item[existingCartItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems [existingCartItemIndex] = updatedItem
        }else{
            updateItems.push({...action.item , quantity: 1})
        }
    }
    if(action.type === 'REMOVE_ITEM'){

    }

    return state
}


export function CartContextProvider({children}){
    useReducer(CartReducer ,  {items: []})


    return <CartContext.Provider>
        {children}
    </CartContext.Provider>
}

export default CartContext