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
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */

          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true
      }
    }
  },
};
