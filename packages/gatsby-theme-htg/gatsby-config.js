module.exports = {
  plugins: [
    "gatsby-plugin-typescript",

    // MDX
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx"],
      },
    },

    // Data Sources
    "gatsby-htg-course",
  ],
};
