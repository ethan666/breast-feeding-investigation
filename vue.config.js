const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    //修改文件引入自定义路径
    config.resolve.alias
      .set("@root", resolve("src"))
      .set("@api", resolve("src/api"))
      .set("style", resolve("src/assets/style"));
  }
};
