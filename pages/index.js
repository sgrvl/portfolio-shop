import Head from "next/head";
import Link from "next/link";
import groq from "groq";
import client from "../client";
import imageUrlBuilder from "@sanity/image-url";
import LazyLoad from "react-lazyload";
import styles from "./index.module.sass";
import { motion } from "framer-motion";

function urlFor(source) {
	return imageUrlBuilder(client).image(source);
}

const index = ({ albums }) => {
	return (
		<>
			<Head>
				<title>Alexis Albert</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className={styles.grid}>
				{albums.map(
					({ _id, title = "", slug = "", images }) =>
						slug && (
							<LazyLoad key={_id}>
								<Link href="/[slug]" as={`/${slug.current}`}>
									<a className={styles.item}>
										<motion.img
											animate={{ opacity: 1 }}
											initial={{ opacity: 0 }}
											transition={{ duration: 0.6 }}
											src={urlFor(images[0])
												.minHeight(350)
												.width(425)
												.fit("crop")
												.format("webp")
												.url()}
											alt={title}
										/>
										<div>{title}</div>
									</a>
								</Link>
							</LazyLoad>
						)
				)}
			</div>
		</>
	);
};

index.getInitialProps = async () => ({
	albums: await client.fetch(groq`*[_type == "albums"]|order(_createdAt desc)`),
});

export default index;
