const Promise = require("bluebird");
const fse = require("fs-extra");

Promise.resolve().then(async () => {
    await main();
});

const main = async () => {
    await generateSite();
};

const generateSite = async () => {
    await copyAssets();
};

const copyAssets = async () => {
    await fse.emptyDir("public");
    await fse.copy("src", "public");
};




