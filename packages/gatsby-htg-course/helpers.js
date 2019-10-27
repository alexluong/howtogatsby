const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function createLessonNodeId(createNodeId, slug) {
  return createNodeId(`${slug} >>> MdxLesson`);
}

function createCourseNodeId(createNodeId, slug) {
  return createNodeId(`${slug} >>> MdxCourse`);
}

exports.createLessonNodeId = createLessonNodeId;
exports.createCourseNodeId = createCourseNodeId;

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

// Return list of lessons ids to link Course and Lessons
exports.getLessonsFromCourse = (createNodeId, dir, dirPath) => {
  const lessons = fs
    .readdirSync(path.resolve(dirPath))
    .filter(file => file.includes(".mdx") && file !== "index.mdx")
    .map(file =>
      createLessonNodeId(createNodeId, `${dir}/${file.replace(".mdx", "")}`),
    );

  return lessons;
};
