const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const hpp = require("hpp");
const path = require("path");
const cors = require('cors');

App.use(express.json());
App.use(express.static('public'));
App.use(bodyParser.json({ limit: '100mb' }));
App.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
App.use(helmet());
App.use(hpp());
App.use(cors());


const createCountryData = async () => {
    try {
        const data = [
            {
                name: "Indian Rupee",
                value: "INR"
            },
            {
                name: "Australian Dollar",
                value: "AUD"
            },
            {
                name: "Canadian Dollar",
                value: "CAD"
            },
            {
                name: "Japanese Yen",
                value: "JPY"
            },
        ];

        const currency = await domain.Currency.findOne();

        if (!currency) {
            for (const c of data) {
                await domain.Currency.create(c);
            }
        }
    } catch (err) {
        console.log("Error creating Admin", err);
    }
};

module.exports = () => {
    console.log("process.env.PORT", process.env.PORT);
    App.listen(process.env.PORT, () => {
        Logger.info(`Express server starting at port ${process.env.PORT}, in ${process.env.NODE_ENV} environment`);
        createCountryData();
    });
};
