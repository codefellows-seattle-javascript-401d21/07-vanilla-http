'use strict';

const urlParser = require('url');
const queryString = require('querystring');

exports.parse = req => {
    return new Promise((resolve, reject) => {
        req.url = urlParser.parse(req.url);
        req.url.query = queryString.parse(req.url.query);
        if (req.method !== 'POST' && req.method !== 'PUT') return resolve(req);

        let msg = '';

        req.on('data', data => {
            msg += data.toString();
        });

        req.on('end', () => {
            try {
                req.body = JSON.parse(msg);
                return resolve(req);
            } catch (err) {
                return reject(err);
            }
        });

        req.on('error', err => {
            return reject(err);
        });
    });
};