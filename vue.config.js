const PrerenderSPAPlugin = require("./prerender");
import pluginChecker from "vite-plugin-checker";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

module.exports = {
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new TsconfigPathsPlugin(),
      pluginChecker({
        vueTsc: true,
        // typescript: true
      }),
      new PrerenderSPAPlugin(),
    ],
    // resolve: {
    //   alias: {
    //     src: path.resolve(__dirname, 'src')
    //   }
    // }
  },
};
