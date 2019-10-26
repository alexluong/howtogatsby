const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise(async resolve => {
    const result = await getData(graphql);
    const {
      data: { allMdx },
    } = result;

    allMdx.nodes.forEach(node => {
      createPage({
        path: `${node.frontmatter.slug}`,
        context: { slug: node.frontmatter.slug },
        component: path.resolve(
          `${__dirname}/src/templates/LessonTemplate.tsx`,
        ),
      });
    });

    resolve();
  });
};

async function getData(graphql) {
  return graphql(`
    {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);
}
