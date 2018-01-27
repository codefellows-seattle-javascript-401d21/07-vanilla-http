'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('Server Module', () => {
    beforeAll(() => server.start(3000));
    afterAll(() => server.stop());

    describe('Valid GET Request to the /', () => {
        it('should respond with a status 200', () => {
            return superagent.get(':3000/')
                .then(res => expect(res.status).toBe(200))
                .catch();
        });

        it('should respond with "Hello from my server!"', () => {
            return superagent.get(':3000/')
                .then(res => expect(res.text).toBe('Hello from my server!'))
                .catch();
        });
    });

    describe('Valid GET Request to the /cowsay', () => {
        it('should respond with a status 200', () => {
            return superagent.get(':3000/cowsay?text="hello"')
                .then(res => expect(res.status).toBe(200))
                .catch();
        });

        it('should respond with the querystring', () => {
            return superagent.get(':3000/cowsay?text="hello"')
                .then(res => expect(res.text).toMatch(/hello/))
                .catch();
        });
    });

    describe('Invalid GET Request to the /cowsay', () => {
        it('should respond with a status 200', () => {
            return superagent.get(':3000/cowsay')
                .then()
                .catch(err => expect(err.status).toBe(400));
        });

        it('should respond with "bad request"', () => {
            return superagent.get(':3000/cowsay')
                .then()
                .catch(err => expect(err.response.text).toMatch(/bad request/));
        });
    });

    describe('Valid POST request to /cowsay', () => {
        it('should respond with a status 200', () => {
            return superagent.post(':3000/cowsay')
                .send({text: 'hello'})
                .then(res => expect(res.status).toBe(200))
                .catch();
        });

        it('should respond with the body text', () => {
            return superagent.post(':3000/cowsay')
                .send({ text: 'hello' })
                .then(res => expect(res.text).toMatch(/hello/))
                .catch();
        });
    });

    describe('Invalid POST request to /cowsay', () => {
        it('should respond with a status 400', () => {
            return superagent.post(':3000/cowsay')
                .then()
                .catch(err => expect(err.status).toBe(400));
        });

        it('should respond with "bad request"', () => {
            return superagent.post(':3000/cowsay')
                .then()
                .catch(err => expect(err.response.text).toMatch(/bad request/));
        });
    });

    describe('Invalid filepath', () => {
        it('should respond with a status 404', () => {
            return superagent.get(':3000/cats')
                .then()
                .catch(err => expect(err.status).toBe(404));
        });

        it('should respond with "Not Found"', () => {
            return superagent.get(':3000/cats')
                .then()
                .catch(err => expect(err.response.text).toBe('Not Found'));
        });
    });
});