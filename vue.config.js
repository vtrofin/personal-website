const path = require("path");
// https://github.com/chrisvfritz/prerender-spa-plugin/issues/414#issuecomment-778660698
// https://juejin.cn/post/7099701995086446600
// const PrerenderSPAPlugin = require('prerender-spa-plugin');
const PrerenderSPAPlugin = require("@dreysolano/prerender-spa-plugin");

module.exports = {
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__dirname, "dist"),
        // Required - Routes to render.
        routes: ["/"], // '/about', '/some/deep/nested/route'
        postProcess(renderedRoute) {
          if (renderedRoute.route.endsWith(".html")) {
            renderedRoute.outputPath = path.join(
              __dirname,
              "dist",
              renderedRoute.route,
            );
          }
          return renderedRoute;
        },
      }),
    ],
    // resolve: {
    //   alias: {
    //     src: path.resolve(__dirname, 'src')
    //   }
    // }
  },
};
