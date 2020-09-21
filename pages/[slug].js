import Head from "next/head";
import client from "../client";
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import LazyLoad from "react-lazyload";
import styles from "./[slug].module.sass";
import { useState } from "react";

function urlFor(source) {
	return imageUrlBuilder(client).image(source);
}

const Album = ({ title = "Missing title", images }) => {
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<>
			<Head>
				<title>Alexis Albert | {title}</title>
			</Head>
			<div>
				<h1>{title}</h1>
				<ul className={styles.ul}>
					{images && (
						<>
							{images.map((i, index) => (
								<LazyLoad key={`image ${index}`}>
									<li
										className={isLoaded ? styles.loaded : styles.not_loaded}
										onLoad={() => setIsLoaded(true)}
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

										<img src={urlFor(i).format("webp").url()} />
									</li>
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
