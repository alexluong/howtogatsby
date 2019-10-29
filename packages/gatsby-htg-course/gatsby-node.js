const {
  createLessonNodeId,
  createCourseNodeId,
  createLessonNode,
  createCourseNode,
  getLessonsFromCourse,
} = require("./helpers");

const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info,
) => {
  const type = info.schema.getType(`Mdx`);
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  });
  return result;
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  // Lesson
  createTypes(`interface Lesson @nodeInterface {
    id: ID!
    title: String!
    description: String!
    body: String!
    html: String!
    slug: String!
  }`);

  createTypes(
    schema.buildObjectType({
      name: "MdxLesson",
      fields: {
        id: { type: "ID!" },
        title: { type: "String!" },
        slug: { type: "String!" },
        description: { type: "String!" },
        body: {
          type: "String!",
          resolve: mdxResolverPassthrough("body"),
        },
        html: {
          type: "String!",
          resolve: mdxResolverPassthrough("html"),
        },
      },
      interfaces: ["Node", "Lesson"],
    }),
  );

  // Course
  createTypes(`interface Course @nodeInterface {
    id: ID!
    title: String!
    description: String!
    body: String!
    html: String!
    slug: String!
    lessons: [Lesson]!
  }`);

  createTypes(
    schema.buildObjectType({
      name: "MdxCourse",
      fields: {
        id: { type: "ID!" },
        title: { type: "String!" },
        slug: { type: "String!" },
        description: { type: "String!" },
        body: {
          type: "String!",
          resolve: mdxResolverPassthrough("body"),
        },
        html: {
          type: "String!",
          resolve: mdxResolverPassthrough("html"),
        },
        lessonIds: { type: ["String!"] },
        lessons: {
          type: "[Lesson]!",
          resolve: (source, args, context, info) => {
            return source.lessonIds.map(id =>
              context.nodeModel.getNodeById({ id }),
            );
          },
        },
      },
      interfaces: ["Node", "Course"],
    }),
  );
};

exports.onCreateNode = async ({ node, actions, getNode, createNodeId }) => {
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type !== "Mdx") {
    return;
  }

  const fileNode = getNode(node.parent);

  // Lesson
  if (fileNode.sourceInstanceName === "lessons") {
    const slug = `${fileNode.relativeDirectory}/${fileNode.name}`;
    const fieldData = {
      slug,
      title: node.frontmatter.title,
      description: node.frontmatter.description,
    };

    const mdxLessonId = createLessonNodeId(createNodeId, slug);
    await createLessonNode({
      createNode,
      id: mdxLessonId,
      parentId: node.id,
      content: fieldData,
    });
    createParentChildLink({ parent: node, child: getNode(mdxLessonId) });
  }

  // Course
  if (fileNode.sourceInstanceName === "courses") {
    const slug = fileNode.relativeDirectory;
    const lessons = getLessonsFromCourse(createNodeId, slug, fileNode.dir);

    // console.log(lessons);
    const fieldData = {
      slug,
      title: node.frontmatter.title,
      description: node.frontmatter.description,
      lessonIds: lessons,
    };

    const mdxCourseId = createCourseNodeId(createNodeId, slug);
    await createCourseNode({
      createNode,
      id: mdxCourseId,
      parentId: node.id,
      content: fieldData,
    });
    createParentChildLink({ parent: node, child: getNode(mdxCourseId) });
  }
};
