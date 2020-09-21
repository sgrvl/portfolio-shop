import React, { useState } from "react";
import styles from "./Modal.module.sass";
import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ image, setIsClicked }) => {
	const [isShopOpen, setIsShopOpen] = useState(false);
	return (
		<motion.div
			className={styles.modal}
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
		>
			<div className={styles.options}>
				<img
					src="/close.svg"
					alt="Close icon"
					onClick={() => setIsClicked(null)}
				/>
				<img
					src="/shopping-plus.svg"
					alt="Add to shopping cart"
					onClick={() => setIsShopOpen(true)}
				/>
			</div>
			<AnimatePresence>
				{isShopOpen && (
					<motion.div
						className={styles.pop}
						animate={{ x: 0 }}
						initial={{ x: 400 }}
						exit={{ x: 400 }}
					>
						<img
							src="/arrow-close.svg"
							alt="Close"
							className={styles.pop_arrow}
							onClick={() => setIsShopOpen(false)}
						/>
					</motion.div>
				)}
			</AnimatePresence>
			<img src={image.src} className={styles.main} />
		</motion.div>
	);
};

export default Modal;
