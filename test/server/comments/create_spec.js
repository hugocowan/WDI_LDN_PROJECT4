/* global api, describe, it, expect, beforeEach */
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const Computer = require('../../../models/computer');
const Part = require('../../../models/part');
const User = require('../../../models/user');
const Comment = require('../../../models/comment');


const userData = {
  username: 'test',
  email: 'test@test',
  password: 'test',
  passwordConfirmation: 'test'
};

const computerData = {
  type: 'Computer',
  name: 'My First Computer',
  image: 'https://i.pinimg.com/736x/41/2d/11/412d11b67072b252c757d8d1d3598d15--desktop-computers-gaming.jpg',
  description: 'My very first computer!'
};

let partData = [{
  type: 'Case',
  name: 'Fractal Design Node 304',
  image: 'https://www.scan.co.uk/images/products/super/2084488-l-a.jpg',
  size: 0
}, {
  type: 'CPU',
  name: '6700k',
  image: 'http://www.kitguru.net/wp-content/uploads/2015/06/intel_core_pentium_devil_s_canyon_lga1150_haswell.jpg',
  vendor: 'Intel',
  chipset: 6
}, {
  type: 'GPU',
  name: 'GTX 780',
  image: 'http://www.nvidia.co.uk/gtx-700-graphics-cards/static/img/gallery/780/gtx-780-10.jpg',
  vendor: 'Nvidia'
}, {
  type: 'Motherboard',
  name: 'Maximus VIII Impact',
  image: 'https://images10.newegg.com/ProductImage/13-132-638-02.jpg',
  size: 0,
  vendor: 'Intel',
  chipset: 6
}, {
  type: 'PSU',
  name: 'EVGA 850W G2',
  image: 'https://images.evga.com/products/gallery/png/220-G2-0850-XR_LG_1.png',
  size: 2,
  power: 850
}, {
  type: 'RAM',
  name: 'Trident Z 3200MHz',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71vKio5VaYL._SL1500_.jpg',
  ramType: 'DDR4',
  capacity: 8
}, {
  type: 'Storage',
  name: '840 EVO',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71y1FKz0I9L._SY355_.jpg',
  capacity: 500,
  storageType: 'SSD'
}];

const commentData = {
  content: 'This is a very interesting thing and I like it.',
  rating: 4
};

let token;
let computerId;
let partId;

describe('POST /computers/:id/comments', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Computer.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        partData = partData.map(part => {
          part.createdBy = user;
          return part;
        });
        computerData.createdBy = user._id;
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h'});
        // console.log('partData: ', partData, 'computerData', computerData);
      })
      .then(() =>  Part.create(partData))
      .then((parts) => {
        partId = parts[0]._id;
        Computer.create({
          ...computerData,
          case: parts.find(part => part.type === 'Case')._id,
          cpu: parts.find(part => part.type === 'CPU')._id,
          gpu: parts.find(part => part.type === 'GPU')._id,
          motherboard: parts.find(part => part.type === 'Motherboard')._id,
          psu: parts.find(part => part.type === 'PSU')._id,
          ram: parts.find(part => part.type === 'RAM')._id,
          storage: parts.find(part => part.type === 'Storage')._id
        })
          .then(computer => {
            computerId = computer._id;
            done();
          });

      });
  });
  it('posting computer comment should return a 401 response without a token', done => {
    api
      .post(`/api/computers/${computerId}/comments`)
      .send(commentData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('posting computer comment should return a 201 response with a token', done => {
    api
      .post(`/api/computers/${computerId}/comments`)
      .set('Authorization', `Bearer ${token}` )
      .send(commentData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });
  it('posting computer comment should return a valid computer object', done => {
    api
      .post(`/api/computers/${computerId}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentData)
      .end((err, res) => {
        expect(res.body._id).to.be.a('string');
        Object.keys(commentData).forEach(field => {
          // console.log('res.body', res.body.comments[0][field], 'commentData', commentData[field]);
          if(['content', 'rating'].includes(field)) {
            expect(res.body.comments[0][field]).to.deep.eq(commentData[field]);
          } else if(['createdBy'].includes(field)){
            expect(commentData[field].equals(res.body.comments[0][field]._id)).to.be.ok;
          } else {
            expect(commentData[field].equals(res.body.comments[0][field])).to.be.ok;
          }
        });
        done();
      });
  });
  it('posting part comment should return a 401 response without a token', done => {
    api
      .post(`/api/parts/${partId}/comments`)
      .send(commentData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('posting part comment should return a 201 response with a token', done => {
    api
      .post(`/api/parts/${partId}/comments`)
      .set('Authorization', `Bearer ${token}` )
      .send(commentData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });
  it('posting part comment should return a valid part object', done => {
    api
      .post(`/api/parts/${partId}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentData)
      .end((err, res) => {
        expect(res.body._id).to.be.a('string');
        Object.keys(commentData).forEach(field => {
          // console.log('res.body', res.body.comments[0][field], 'commentData', commentData[field]);
          if(['content', 'rating'].includes(field)) {
            expect(res.body.comments[0][field]).to.deep.eq(commentData[field]);
          } else if(['createdBy'].includes(field)){
            expect(commentData[field].equals(res.body.comments[0][field]._id)).to.be.ok;
          } else {
            expect(commentData[field].equals(res.body.comments[0][field])).to.be.ok;
          }
        });
        done();
      });
  });
});
