const path = require("path")
const fs = require("fs")

exports.onPostBuild = ({ reporter, basePath, pathPrefix }) => {
  fs.copyFile("./src/data/clients.json", "./public/clients/json", (err) => {
    if (err) throw err
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.node$/,
          use: ["node-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        // Point to legacy build
        // For pdfjs-dist 2.8.335 and later
        "pdfjs-dist": path.resolve(
          "./node_modules/pdfjs-dist/legacy/build/pdf.js",
        ),
      },
    },
  })
}
