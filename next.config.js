const withSass = require("@zeit/next-sass");
const path = require("path");

module.exports = withSass({
  cssModules: true,
  webpack: (config) => {
    config.resolve.alias["core"] = path.join(__dirname, "core");
    config.resolve.alias["components"] = path.join(__dirname, "components");

    return config;
  }
});
