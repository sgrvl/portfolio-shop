import Head from "next/head";
import client from "../client";
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import LazyLoad from "react-lazyload";
import styles from "./[slug].module.sass";

function urlFor(source) {
	return imageUrlBuilder(client).image(source);
}

const Album = ({ title = "Missing title", images }) => {
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
								<LazyLoad>
									<li>
										<img
											src={urlFor(i).format("webp").url()}
											key={`image ${index}`}
										/>
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
