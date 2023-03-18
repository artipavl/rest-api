const Jimp = require("jimp");
const { HttpError } = require("../helpers");

const jimpAvatar = async (avatar) => {
  return await Jimp.read(avatar)
    .then((lenna) => {
      return lenna
        .resize(250, 250) // resize
        .write(avatar); // save
    })
    .catch((err) => {
      throw HttpError(500, `${err.message}`);
    });
};

module.exports = jimpAvatar;
