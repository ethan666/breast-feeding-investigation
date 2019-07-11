const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // chainWebpack: config => {
  //   config.resolve.alias
  //     .set("@$", resolve("src"))
  //     .set("api", resolve("src/api"));
  // }

  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {
        api: "@/api",
        components: "@/components",
        views: "@/views"
      }
    }
  }
};
