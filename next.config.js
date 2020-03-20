const path = require("path");

module.exports = {
  webpack: (config) => {
    config.resolve.alias["core"] = path.join(__dirname, "core");
    config.resolve.alias["components"] = path.join(__dirname, "components");
    config.resolve.alias["layouts"] = path.join(__dirname, "layouts");

    return config;
  }
};
