import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
	cart: { cartItems: [] }
};

function reducer(state, action) {
	switch (action.type) {
		case 'CART_ADD_ITEM': {
			const newItem = action.payload;
			const exitItem = state.cart.cartItems.find((item) => item.slug === newItem.slug);

			const cartItems = exitItem
				? state.cart.cartItems.map((item) => (item.name === exitItem.name ? newItem : item))
				: [ ...state.cart.cartItems, newItem ];
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		default:
			return state;
	}
}

export function StoreProvider({ children }) {
	const [ state, dispatch ] = useReducer(reducer, initialState);
	const value = { state, dispatch };

	return <Store.Provider value={value}>{children}</Store.Provider>;
}
