const Jimp = require('jimp')
const path = require('path')

//should be async or sync?
module.exports = async (
    filename,
    size,
    filepath,
    destination,
    foldername
) => {
    Jimp.read(filepath)
        .then(image => {
            image
                .resize(size, Jimp.AUTO)
                .write(path.resolve(destination, `${foldername}`, filename))
        })
        .catch(err => {
            console.log("Error at reducing size / converting picture : ")
            console.log(err)
        });
    return `${foldername}/${filename}`;
};