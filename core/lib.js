const ejs = require('ejs');
const formidable = require('formidable')

module.exports = class {
    constructor() {

    }
    html(filePath, data = {}, res) {
        ejs.renderFile(filePath, data, {}, (err, str) => {
            if (err) {
                console.log(err);
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(str);
                res.end();
            }
        });
    }
    formData(req) {
        return new Promise((resolve, reject) => {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                if (err) reject(err);
                resolve({ fields, files });
            });
        });
    }
    postData(req) {
        return new Promise((resolve, reject) => {
            try {
                (JSON.stringify(req)).on('data', function (chunk) {
                    // data += chunk.toString();   console.log(data);
                    //   console.log( chunk.toString());

                    resolve(JSON.parse(chunk.toString()));

                });
            } catch (e) {
                //reject(e) 
                this.formData(req).then((obj) => { resolve(obj.fields) }).catch((e) => { reject(e) });
            }
        });
    }
}