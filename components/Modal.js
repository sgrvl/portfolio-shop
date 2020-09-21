import React from "react";
import styles from "./Modal.module.sass";

const Modal = ({ image, setIsClicked }) => {
	return (
		<div className={styles.modal}>
			<img
				src="/close.svg"
				alt="Close icon"
				className={styles.close}
				onClick={() => setIsClicked(null)}
			/>
			<img src={image.src} className={styles.main} />
		</div>
	);
};

export default Modal;
