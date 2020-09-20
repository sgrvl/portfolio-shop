import Head from "next/head";
import client from "../client";
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";

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
				{images && (
					<div>
						{images.map((i, index) => (
							<img src={urlFor(i).width(500).url()} key={`image ${index}`} />
						))}
					</div>
				)}
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