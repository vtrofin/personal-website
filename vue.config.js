const PrerenderSPAPlugin = require("./prerender");

module.exports = {
  configureWebpack: {
    devtool: "source-map",
    plugins: [new PrerenderSPAPlugin()],
    // resolve: {
    //   alias: {
    //     src: path.resolve(__dirname, 'src')
    //   }
    // }
  },
};
