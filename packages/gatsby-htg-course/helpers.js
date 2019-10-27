const crypto = require("crypto");

exports.createLessonNodeId = (createNodeId, slug) => {
  return createNodeId(`${slug} >>> MdxLesson`);
};

exports.createCourseNodeId = (createNodeId, slug) => {
  return createNodeId(`${slug} >>> MdxCourse`);
};

exports.createLessonNode = ({ createNode, id, parentId, content }) => {
  const nodeContent = JSON.stringify(content);
  return createNode({
    ...content,
    id,
    parent: parentId,
    children: [],
    internal: {
      type: "MdxLesson",
      content: nodeContent,
      contentDigest: crypto
        .createHash("md5")
        .update(nodeContent)
        .digest("hex"),
      description: "Mdx implementation of the Lesson interface",
    },
  });
};

exports.createCourseNode = ({ createNode, id, parentId, content }) => {
  console.log({ createNode, id, parentId, content });
  const nodeContent = JSON.stringify(content);
  return createNode({
    ...content,
    id,
    parent: parentId,
    children: [],
    internal: {
      type: "MdxCourse",
      content: nodeContent,
      contentDigest: crypto
        .createHash("md5")
        .update(nodeContent)
        .digest("hex"),
      description: "Mdx implementation of the Course interface",
    },
  });
};
