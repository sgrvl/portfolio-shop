import React from "react";
import styles from "./Modal.module.sass";
import { motion } from "framer-motion";

const Modal = ({ image, setIsClicked }) => {
	return (
		<motion.div
			className={styles.modal}
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
		>
			<img
				src="/close.svg"
				alt="Close icon"
				className={styles.close}
				onClick={() => setIsClicked(null)}
			/>
			<img src={image.src} className={styles.main} />
		</motion.div>
	);
};

export default Modal;
