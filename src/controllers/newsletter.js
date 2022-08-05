const knex = require('../database/connection');
const nodemailer = require('../nodemailer');

const registerEmail = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'All fields are mandatory.' });
    };

    try {
        const checkEmail = await knex('emails').where({ email }).first();

        if (checkEmail) {
            return res.status(400).json({ message: 'This email is already registered.' });
        };

        const registeredEmail = await knex('emails').insert({ email, name });

        if (!registeredEmail) {
            return res.status(400).json({ message: 'Unable to register email.' });
        };

        return res.status(200).json({ message: 'Email registered successfully.' });
    } catch (error) {
        return res.status(400).json({ message: `Internal error: ${erro.message}` });
    };
};

const sendNewsletter = async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: 'Filling in this field is mandatory.' });
    };

    try {
        const users = await knex('emails');

        for (const user of users) {
            const sendData = {
                from: 'Market Cubos Academy <do-not-answer@bsmtp.mailtrap.io>',
                to: user.email,
                subject: 'Our Newsletter',
                template: 'newsletter',
                context: {
                    name: user.name,
                    text
                }
            };

            nodemailer.sendMail(sendData);
        };

        return res.status(200).json({ message: 'Newsletter sent successfully.' });
    } catch (error) {
        return res.status(400).json({ message: `Internal error: ${erro.message}` });
    };
};

module.exports = {
    registerEmail,
    sendNewsletter
};