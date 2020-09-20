import Head from "next/head";
import Link from "next/link";
import groq from "groq";
import client from "../client";
import imageUrlBuilder from "@sanity/image-url";
import LazyLoad from "react-lazyload";
import styles from "./index.module.sass";

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
							<LazyLoad>
								<Link href="/[slug]" as={`/${slug.current}`} key={_id}>
									<a className={styles.item}>
										<img
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
