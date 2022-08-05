const nodemailer = require('nodemailer');
const handlebars = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "006f6fcd58f254",
        pass: "d4d5f29ee1ee20"
    }
});

transport.use('compile', handlebars({
    viewEngine: {
        extname: '.handlebars',
        defaultLayout: false
    },
    viewPath: './src/views/'
}));

module.exports = transport;