// const assert = require('assert').strict
var chai = require('chai');//引入断言库
var assert = chai.assert;//使用expect语法
const getNum = require('../index')
var assert = chai.assert;

describe('测试getNum', () => {
  it('当参数为10，结果应该为20', () => {
    assert.strictEqual(getNum(10), 20)
  });
  it('当参数为10，结果应该为15', () => {
    assert.notStrictEqual(getNum(10), 20)
  });
});

// describe('something slow', function() {
//   this.slow(300000); // five minutes

//   it('should take long enough for me to go make a sandwich', function() {
//     // ...
//   });
// });
// var chai = require('chai');
// var chaiHttp = require('chai-http');
// var expect = chai.expect;
// chai.use(chaiHttp);

// //define address
// const ADDRESS = "http://localhost:3001";
// //open a http connection
// var requester = chai.request(ADDRESS);
// describe('列表服务APIS测试',function () {

//     it('GET /healthmap/chart1 应该返回包含legendData字段的数据',function (done) {
//         chai.request(ADDRESS).get('/healthmap/chart1')
//         .end((err,res)=>{
//             var data = JSON.parse(res.text);
//             expect(res).to.have.status(200);
//             expect(data.data).to.have.ownProperty('legendData');
//             done();
//         })
//     });

//     it('GET /operationdashboard/systemwarn 应该返回字符串',function (done) {
//         chai.request(ADDRESS).get('/operationboard/systemwarn')
//         .end((err,res)=>{
//             var data = JSON.parse(res.text);
//             expect(res).to.have.status(200);
//             expect(data.data).to.be.a('String');
//             done();
//         })
//     });
// })