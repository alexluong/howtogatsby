const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise(async resolve => {
    const result = await getData(graphql);
    const {
      data: { allCourse, allLesson },
    } = result;

    // Create course pages
    allCourse.nodes.forEach(node => {
      createPage({
        path: `${node.slug}`,
        context: { slug: node.slug },
        component: path.resolve(
          `${__dirname}/src/templates/CourseTemplate.tsx`,
        ),
      });
    });

    // Create lesson pages
    allLesson.nodes.forEach(node => {
      createPage({
        path: `${node.slug}`,
        context: { slug: node.slug },
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
      allCourse {
        nodes {
          slug
        }
      }
      allLesson {
        nodes {
          slug
        }
      }
    }
  `);
}
