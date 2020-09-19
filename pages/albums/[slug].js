import client from "../../client";
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";

function urlFor(source) {
	return imageUrlBuilder(client).image(source);
}

const Album = (props) => {
	const { title = "Missing title", images } = props;

	return (
		<article>
			<h1>{title}</h1>
			{images && (
				<div>
					{images.map((i, index) => (
						<img src={urlFor(i).width(500).url()} key={`image ${index}`} />
					))}
				</div>
			)}
		</article>
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
