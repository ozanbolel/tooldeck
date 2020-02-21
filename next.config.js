const path = require("path");

module.exports = {
  webpack: (config) => {
    config.resolve.alias["core"] = path.join(__dirname, "core");
    config.resolve.alias["components"] = path.join(__dirname, "components");

    return config;
  }
};
