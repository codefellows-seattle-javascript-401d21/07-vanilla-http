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
                .catch(err => console.error(err));
        });

        it('should respond with "Hello from my server!"', () => {
            return superagent.get(':3000/')
                .then(res => expect(res.text).toBe('Hello from my server!'))
                .catch(err => console.error(err));
        });
    });

    describe('Valid GET Request to the /cowsay', () => {
        it('should respond with a status 200', () => {
            return superagent.get(':3000/cowsay?text="hello"')
                .then(res => expect(res.status).toBe(200))
                .catch(err => expect(err.status).toBe(400));
        });

        it('should respond with the querystring', () => {
            return superagent.get(':3000/cowsay?text="hello"')
                .then(res => expect(res.text).toMatch(/hello/))
                .catch(err => expect(err.status).toBe(400));
        });
    });

    describe('Invalid GET Request to the /cowsay', () => {
        it('should respond with a status 200', () => {
            return superagent.get(':3000/cowsay?')
                .then(res => expect(res.status).toBe(200))
                .catch(err => expect(err.status).toBe(400));
        });

        it('should respond with "bad request"', () => {
            return superagent.get(':3000/cowsay')
                .then(res => expect(res.text).toMatch(/bad request/));
                .catch(err => expect(err.text).toMatch(/bad request/));
        });

        // it('should respond with the querystring', () => {
        //     return superagent.get(':3000/cowsay?text="hello"')
        //         .then(res => expect(res.text).toMatch(/hello/))
        //         .catch(err => console.error(err));
        // });
    });

});