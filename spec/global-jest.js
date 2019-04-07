import express from 'express';

module.exports = async function () {
    var app = express();
    app.get("/", (req, res) => {
        console.log("req.path ", req.path);
        res.status(200);
    })
    return app.listen(80, "localhost", () => {
        console.log("Open at port 80");
    })
}