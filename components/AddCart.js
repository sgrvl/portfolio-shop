import React, { useEffect } from "react";
import styles from "./AddCart.module.sass";

const AddCart = () => {
	const Large = JSON.parse(window.localStorage.getItem(0));
	const Medium = JSON.parse(window.localStorage.getItem(2));
	const Small = JSON.parse(window.localStorage.getItem(1));

	return (
		<div className={styles.wrap}>
			<h4>Available Sizes</h4>
			<form action="" onSubmit={(e) => e.preventDefault()}>
				<label htmlFor="Small">
					<input type="radio" name="size" id="Small" />
					<div>{Small.dimensions} </div>
					<div>{Small.price}</div>
				</label>
				<label htmlFor="Medium">
					<input type="radio" name="size" id="Medium" />
					<div>{Medium.dimensions} </div>
					<div>{Medium.price}</div>
				</label>
				<label htmlFor="Large">
					<input type="radio" name="size" id="Large" />
					<div>{Large.dimensions}</div>
					<div>{Large.price}</div>
				</label>
				<input type="submit" value="Add to cart" />
			</form>
		</div>
	);
};

export default AddCart;
