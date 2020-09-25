import React, { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.sass";
import Cart from "./Cart";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	/* const Large = window.localStorage.getItem(0);
	const Medium = window.localStorage.getItem(2);
	const Small = window.localStorage.getItem(1); */

	return (
		<>
			<header className={styles.header}>
				<Link href="/">
					<img
						className={styles.logo}
						src="/bertis_logo.png"
						alt="Bertis logo"
					/>
				</Link>

				<div className={styles.header_right}>
					<a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
						<img src="/facebook.svg" alt="Facebook logo" />
					</a>
					<a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
						<img src="/instagram.svg" alt="Instagram logo" />
					</a>
					<a onClick={() => setIsOpen(true)}>
						<img src="/shopping-cart.svg" alt="Shopping cart (empty)" />
					</a>
				</div>
			</header>
			<AnimatePresence>
				{isOpen && <Cart setIsOpen={setIsOpen} />}
			</AnimatePresence>
		</>
	);
};

export default Header;
