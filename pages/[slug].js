import Head from "next/head";
import client from "../client";
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import LazyLoad from "react-lazyload";
import styles from "./[slug].module.sass";
import { useState } from "react";
import Modal from "../components/Modal";
import { AnimatePresence, motion } from "framer-motion";

function urlFor(source) {
	return imageUrlBuilder(client).image(source);
}

const Album = ({ title = "Missing title", images }) => {
	const [isClicked, setIsClicked] = useState(null);

	return (
		<>
			<Head>
				<title>Alexis Albert | {title}</title>
			</Head>
			<div>
				<h1>{title}</h1>
				<AnimatePresence>
					{isClicked && <Modal image={isClicked} setIsClicked={setIsClicked} />}
				</AnimatePresence>

				<ul className={styles.ul}>
					{images && (
						<>
							{images.map((i, index) => (
								<LazyLoad key={`image ${index}`}>
									<motion.li
										animate={{ opacity: 1 }}
										initial={{ opacity: 0 }}
										transition={{ duration: 0.6 }}
										onClick={(e) =>
											e.target.id == "photo"
												? setIsClicked(e.target)
												: setIsClicked(null)
										}
									>
										<div className={styles.options}>
											<div className={styles.cart}>
												<img src="/share-icon.svg" alt="Share this image" />
											</div>
											<div className={styles.cart}>
												<img
													src="/shopping-plus.svg"
													alt="Add to shopping cart"
												/>
											</div>
										</div>
										<img src={urlFor(i).format("webp").url()} id="photo" />
									</motion.li>
								</LazyLoad>
							))}
						</>
					)}
				</ul>
			</div>
		</>
	);
};

const query = groq`*[_type == "albums" && slug.current == $slug][0]{
	title,
	images
}`;

Album.getInitialProps = async (context) => {
	const { slug = "" } = context.query;
	return await client.fetch(query, { slug });
};

export default Album;
