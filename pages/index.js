import Head from "next/head";
import Link from "next/link";
import groq from "groq";
import client from "../client";
import imageUrlBuilder from "@sanity/image-url";

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
			{albums.map(
				({ _id, title = "", slug = "", images }) =>
					slug && (
						<div key={_id}>
							<Link href="/[slug]" as={`/${slug.current}`}>
								<div>
									<img src={urlFor(images[0]).width(200).url()} alt={title} />
									<span>{title}</span>
								</div>
							</Link>
						</div>
					)
			)}
		</>
	);
};

index.getInitialProps = async () => ({
	albums: await client.fetch(groq`*[_type == "albums"]|order(_createdAt desc)`),
});

export default index;
