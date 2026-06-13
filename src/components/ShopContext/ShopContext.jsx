import { createContext, useEffect, useState } from "react";
import shopData from "../ShopContent/ShopData";

export const CartContext = createContext(null);

const getDefaultCart = () => {
	let cart = {};
	for (let i = 1; i < shopData.length + 1; i++) {
		cart[i] = 0;
	}
	return cart;
};

const getStoredCart = () => {
	const storedCart = localStorage.getItem("cart");
	return storedCart ? JSON.parse(storedCart) : getDefaultCart();
};

const getDefaultStats = () => ({
	members: 0,
	equipment: 0,
	trainers: 0,
	awards: 0,
});

const getStoredStats = () => {
	return getDefaultStats();
};

const ShopContext = (props) => {
	const [items, setItems] = useState(getStoredCart());
	const [stats, setStats] = useState(getStoredStats());

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(items));
	}, [items]);

	const addToCart = (itemId) => {
		setItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
	};

	const removeFromCart = (itemId) => {
		setItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
	};

	const totalAmount = () => {
		let total = 0;
		for (const itemId in items) {
			if (items[itemId] > 0) {
				const totalInfo = shopData.find(
					(product) => product.id === Number(itemId)
				);
				total += items[itemId] * totalInfo.price;
			}
		}
		return total;
	};

	const totalCartItems = () => {
		let totalItem = 0;
		for (const itemId in items) {
			if (items[itemId] > 0) {
				totalItem += items[itemId];
			}
		}
		return totalItem;
	};

	const singleProductAmount = (itemId) => {
		const priceInfo = shopData.find((product) => product.id === Number(itemId));
		return priceInfo ? items[itemId] * priceInfo.price : 0;
	};

	const resetCart = () => {
		setItems(getDefaultCart());
	};

	const incrementStats = () => {
		setStats((prev) => ({
			members: prev.members + 1,
			equipment: prev.equipment + 1,
			trainers: prev.trainers + 1,
			awards: prev.awards + 1,
		}));
	};

	const contextValue = {
		items,
		addToCart,
		removeFromCart,
		totalAmount,
		totalCartItems,
		singleProductAmount,
		resetCart,
		stats,
		incrementStats,
	};

	return (
		<CartContext.Provider value={contextValue}>
			{props.children}
		</CartContext.Provider>
	);
};

export default ShopContext;
