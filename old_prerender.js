const Prerenderer = require("@prerenderer/prerenderer");
const PuppeteerRenderer = require("@prerenderer/renderer-puppeteer");
const path = require("path");
const fs = require("fs");

// This file is imported in vue.config.js in the plugins array;
// The config below is a mix of chat gpt generated config and config in the project docs
// See here https://github.com/Tofandel/prerenderer?tab=readme-ov-file#example-prerenderer-usage
class PrerenderSPAPlugin {
  // need this apply function otherwise there is a webpack error
  apply(compiler) {
    compiler.hooks.afterEmit.tapPromise(
      "PrerenderSPAPlugin",
      (_compilation) => {
        const prerenderer = new Prerenderer({
          staticDir: path.join(__dirname, "dist"),
          renderer: new PuppeteerRenderer({
            headless: true,
          }),
          postProcess: (renderedRoute) => {
            renderedRoute.html = renderedRoute.html
              .replace(/http:/gi, "https:")
              .replace(
                /(https:\/\/)?(localhost|127\.0\.0\.1):\d*/gi,
                process.env.VUE_APP_DOMAIN || "",
              );
          },
        });

        return prerenderer
          .initialize()
          .then(() => {
            return prerenderer.renderRoutes([
              "/",
              "/contact",
              "/projects/calliope",
              "/projects/ats",
              "/projects/staff",
              "/projects/stockandco",
              "/projects/shipandco",
              "/projects/utils",
              "/projects/bentoandco",
            ]);
          })
          .then((renderedRoutes) => {
            renderedRoutes.forEach((renderedRoute) => {
              const outputPath = path.join(
                prerenderer.options.staticDir,
                renderedRoute.route,
                "index.html",
              );

              fs.promises
                .mkdir(path.dirname(outputPath), { recursive: true })
                .then(() =>
                  fs.promises.writeFile(outputPath, renderedRoute.html.trim()),
                );
            });
          })
          .catch((err) => {
            console.error("Error prerendering -->", err);

            throw err;
          })
          .finally(() => {
            prerenderer.destroy();
          });
      },
    );
  }
}

module.exports = PrerenderSPAPlugin;
