const ImageKit = require("imagekit");

// Image kit init
const imagekit = new ImageKit({
  publicKey: "public_RpS59elnScLcv0XnQ3zeh/Tw+Mw=",
  privateKey: "private_5scBlbnQzusWOb/Ae3XIdphBWfg=",
  urlEndpoint: "https://ik.imagekit.io/Quls/",
});

// Image upload function to imagekit
exports.imageUpload = async (file) => {
  const uploadedFile = await imagekit.upload({
    file: file.data,
    fileName: file.name,
  });
  return uploadedFile?.url;
};
