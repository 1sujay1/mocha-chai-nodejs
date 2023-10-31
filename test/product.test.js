// process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const expect = chai.expect;
const chaiHttp = require('chai-http')
const server = require('./../server')
chai.use(chaiHttp)
// const Product = require('../models/product')

// before((done) => {
//     Product.deleteMany({}, function (err) { })
//     done()
// })
// after((done) => {
//     Product.deleteMany({}, function (err) { })
//     done()
// })
describe('/First Set Collections', () => {
    it('test default api welcome route...', (done) => {


        chai.request(server)
            .get('/api/welcome')
            .end((err, res) => {
                res.should.have.status(200)
                // expect(res).to.have.status(200)
                res.body.should.be.a('object')
                expect(res.body).to.have.ownProperty('message')
                res.body.message.should.have.a('string')
                expect(res.body.message).to.be.equal('Welcome to my World')
                // console.log(res.body.message)
                done()
            })

    })


    it('should verify that we have 0 products in DB', (done) => {
        chai.request(server)
            .get('/api/products')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(0)
                done()
            })
    })

    it('should POST valid product data',(done)=>{

        let product={
            name:'Test Prod 1',
            description:'Test Prod Description',
            price:100,
            inStock:true
        }

        chai.request(server)
        .post('/api/products')
        .send(product)
        .end((err,res)=>{
            res.should.have.status(201)

            done()
        })
    })

    it('should verify that we have 1 products in DB', (done) => {
        chai.request(server)
            .get('/api/products')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                console.log(res.body)
                res.body.length.should.be.eql(1)
                done()
            })
    })

    it('should test two values...', () => {
        //actual test content in here
        let expectedVal = 10;
        let actualVal = 10;
        expect(actualVal).to.be.equal(expectedVal)
    })
})