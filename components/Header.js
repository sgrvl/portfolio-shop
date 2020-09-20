import React from "react";
import Link from "next/link";
import styles from "./Header.module.sass";

const Header = () => {
	return (
		<header className={styles.header}>
			<Link href="/">
				<img className={styles.logo} src="/bertis_logo.png" alt="Bertis logo" />
			</Link>

			<div className={styles.header_right}>
				<a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
					<img src="/facebook.svg" alt="Facebook logo" />
				</a>
				<a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
					<img src="/instagram.svg" alt="Instagram logo" />
				</a>
				<a>
					<img src="/shopping-cart.svg" alt="Shopping cart (empty)" />
				</a>
			</div>
		</header>
	);
};

export default Header;
