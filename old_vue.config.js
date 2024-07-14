const PrerenderSPAPlugin = require("./old_prerender");
import pluginChecker from "vite-plugin-checker";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import vue from "@vitejs/plugin-vue";

module.exports = {
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new TsconfigPathsPlugin(),
      vue(),
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
