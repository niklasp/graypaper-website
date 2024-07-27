import slugify from "slugify"
import { lectures } from "./src/data/lectures"
import path from "path"
import { GatsbyNode } from "gatsby"

const fs = require("fs")

export const onPostBuild = () => {
  fs.copyFile("./src/data/clients.json", "./public/clients.json", (err) => {
    if (err) throw err
  })
}

export const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.node$/,
          use: ["node-loader"],
        },
      ],
    },
  })
}

export const createPages = async ({ actions }) => {
  console.info("Creating pages")
  lectures.forEach((lecture) => {
    actions.createPage({
      path: `/lectures/${slugify(lecture.section)}`,
      component: path.resolve(`./src/components/LectureView.tsx`),
      context: { lectureSection: lecture.section },
    })
  })
  console.info(`${lectures.length} Pages created for lectures`)
}
