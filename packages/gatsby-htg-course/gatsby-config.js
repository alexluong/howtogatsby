module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "lessons",
        path: "content/courses",
        ignore: ["**/index.mdx"],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "courses",
        path: "content/courses",
      },
    },
  ],
};
