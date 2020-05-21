const mongoose = require("mongoose");
const Fawn = require("fawn");



module.exports = (url,address) => {
    const self = module.exports;
    mongoose
        .connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => console.log(`${address}'s database is connected.`))
        .catch(err => {
            console.error(
                "Failed to connect to the database on startup - retrying in 5 sec"
            );
            setTimeout(self, 5000);
        });
        return Fawn.init(mongoose)
};