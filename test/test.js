var assert = require('assert');
var Cat = require('../server/models/cat');
var app = require('../server/app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

describe('Cat', function(){
  
  beforeEach((done)=>{
    var newCat = new Cat({
      name:"Kitty"
    });

    newCat.save((errr)=>{
      done();
    })
  })
  afterEach((done)=>{
    Cat.collection.drop();
    done();
  })

  it('Should says Hello world!', (done)=>{
    chai.request(app)
    .get('/')
    .end((err,res)=>{
      res.should.have.status(200);
      done();
    })
  })
  it('Should list ALL cats on /cats GET', (done)=>{
    chai.request(app)
    .get('/cats')
    .end((err, res)=>{
      res.should.be.json;
      res.should.have.status(200);
      res.body[0].should.have.property('name');
      done();
    })
  })
  it('Should list ALL cats BY LIKE name "k" on /cats?name=',(done)=>{
    chai.request(app)
    .get('/cats?name=k')
    .end((err, res)=>{
      res.should.be.json;
      res.should.have.status(200);
      res.body[0].should.have.property('name');
      done();
    })
  })
  it('Should list ALL cats BY LIKE name "o" on /cats?name=',(done)=>{
    chai.request(app)
    .get('/cats?name=o')
    .end((err, res)=>{
      res.should.be.json;
      res.should.have.status(200);
      done();
    })
  })
  it('Should list a SINGLE cat on /cat/<ID>', (done)=>{

    var newCat = new Cat({
      name: 'Silvestre'
    })

    newCat.save((err,cat)=>{
      chai.request(app)
      .get('/cat/'+cat.id)
      .end((err,res)=>{
        res.should.be.json;
        res.should.have.status(200);
        res.body.should.have.property('name');
        res.body.name.should.equal('Silvestre');
        done();
      })
    })
  })
  it('Should add a SINGLE cat on /cats PUT', (done)=>{
    var newCat = new Cat({
      name: "Tom"
    })

    chai.request(app)
    .post('/cats')
    .send(newCat)
    .end((err,res)=>{
      res.should.be.json;
      res.should.have.status(200);
      res.body.should.have.property('name');
      res.body.name.should.equals('Tom');
      done();
    })
  })
  it('Should delete a SINGLE cat on /cat/<ID>', (done)=>{
    var newCat = new Cat({
      name: "Félix"
    })

    newCat.save((err, cat)=>{
      chai.request(app)
      .delete('/cat/'+cat.id)
      .end((err, res)=>{
        res.should.be.json;
        res.should.have.status(200);
        res.body.should.have.property('name');
        res.body.name.should.equals('Félix');
        done();
      })
    })
  })
})