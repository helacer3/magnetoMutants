"use strict"

var assert  = require('assert');
var request = require('supertest');
var request = request("http://localhost:3000");

describe('apiTest', function() {

    // valida código Respuesta - Request Es Mutante
    describe('POST', function(){
         it('Si es mutante debe retornar código 200', function(done){
            let reqMutant = { "dna" : ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] } 
            request.post('/api/mutant')
                .send(reqMutant)
                .expect(201)
                .end((err, res) => {
                    done();
                });
         });
    });
	
	// valida código Respuesta - Request No Es Mutante
    describe('POST', function(){
        it('Si es mutante debe retornar código 403', function(done){
            let reqMutant = { "dna" : ["ATGCCA","CTGTGC","TTATGT","AGAAGG","CACCTA","TCACTG"] } 
            request.post('/api/mutant')
                .send(reqMutant)
                .expect(201)
                .end((err, res) => {
                    done();
                });
         });
    });

    // valida código Respuesta - Request Formato Incorrecto
    describe('POST', function(){
        it('Si es request erróneo código 403', function(done){
            let reqMutant = { "dna" : ["ATGCG","CAGTGC","TTATGT","GAAGG","CCCCTA","TCACTG"] } 
            request.post('/api/mutant')
                .send(reqMutant)
                .expect(201)
                .end((err, res) => {
                    done();
                });
         });
    });

    // valida estructura respuesta Post
    describe('POST', function(){
        it('Valido formato respuesta Post', function(done){
            let reqMutant = { "dna" : ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] } 
            request.post('/api/mutant')
                .send(reqMutant)
                .end((err, res) => {
                    done();
                })
                .then(function(res) {
                    res.should.have.property("error")
                    res.should.have.property('status')
                    res.should.have.property('body')
                    res.should.have.property('body.isMutant')
                    res.should.have.property('body.result');
                });
        });
    });

    // valida Formato Respuesta GET
    describe('GET', function(){
        it('Valida Formato Respuesta', function(done){
            request.get('/api/stats')
                .expect('Content-Type', /json/)
                .expect(200, done)
                .end((err, res) => {
                    done();
                });
         });
    });

    // valida estructura respuesta Get
    describe('GET', function(){
        it('Valido formato respuesta Get', function(done){
            request.post('/api/stats')
                .end((err, res) => {
                    done();
                })
                .then(function(res) {
                    res.should.have.property("error")
                    res.should.have.property('status')
                    res.should.have.property('body')
                    res.should.have.property('body.count_mutant_dna')
                    res.should.have.property('body.count_human_dna')
                    res.should.have.property('body.ratio');
                });
        });
    });
});
