const express = require("express");
const router = express.Router();
const packageJson = require("../package.json");

router.get("/", (req, res) => {
  res.json({
    name: packageJson.name,
    version: packageJson.version,
    dependencies: packageJson.dependencies,
    devDependencies: packageJson.devDependencies,
  });
});

module.exports = router;
