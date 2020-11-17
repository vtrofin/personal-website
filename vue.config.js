const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__dirname, 'dist'),
        // Required - Routes to render.
        routes: ['/'], // '/about', '/some/deep/nested/route'
        postProcess(renderedRoute) {
          if (renderedRoute.route.endsWith('.html')) {
            renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route);
          }
          return renderedRoute;
        }
      })
    ]
  }
};
