module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "lessons",
        path: "content/courses",
      },
    },
  ],
};
