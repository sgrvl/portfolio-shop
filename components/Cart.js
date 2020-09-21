import React from "react";
import styles from "./Cart.module.sass";
import { motion } from "framer-motion";

const Cart = ({ setIsOpen }) => {
	return (
		<motion.div
			className={styles.cart}
			animate={{ x: 0 }}
			initial={{ x: 400 }}
			exit={{ x: 400 }}
		>
			<img
				src="/arrow-close.svg"
				alt="Close"
				className={styles.arrow}
				onClick={() => setIsOpen(false)}
			/>
		</motion.div>
	);
};

export default Cart;
