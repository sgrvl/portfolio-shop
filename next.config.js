module.exports = {
	// Target must be serverless
	target: "serverless",
	webpack: (cfg) => {
		cfg.module.rules.push({
			test: /\.md$/,
			loader: "frontmatter-markdown-loader",
			options: { mode: ["react-component"] },
		});
		return cfg;
	},
};
