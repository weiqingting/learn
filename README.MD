![Image text](https://api.travis-ci.org/weiqingting/learn.svg?branch=master)

# 1. 断言

> “什么是断言？”

当我们写了一个add方法，写完之后，为了验证正确性，我们一般会在控制台中执行 `add(1,2)`,看结果是否返回`3`;但是这种方式，只能执行单条数据，而且保质期很短，下次执行时不得不再重写写一篇。为了解决这个问题，有些人喜欢demo页面，在页面中写,比如 `console.log('1+2=3',(add(1,2)==3)?'测试通过':'测试不通过')`，通过页面的运行查看结果是否正确。并且demo页面也会随着代码一起保存，防止下次代码再次修改运行测试。其实这些代码 就是`断言`

 **断言是单元测试中用来保证最小单元是否正常的检测方法，用于判断逻辑执行是否达到开发者预期的表达式**

_PS：断言在运行的过程中，若断言不为真，程序会中止运行_

> “有哪些断言库？”

- [chai](http://chaijs.com/) - 目前比较流行的断言库，支持 TDD（assert），BDD（expect、should）两种风格
- [shouldjs]() - 基于assert模块进行封装扩展
- [expectjs]() - 
- [assert]() - node自带模块

* * *

# Assert

`assert` 模块提供了断言测试的函数，用于测试不变式。提供了`严格模式`和`宽松模式`

## assert.AssertionError 类

继承`Error`,表面断言失败。assert模块抛出的所有错误都将是`AssertionError` 类的实例。

## 模式切换
  `assert` 模块提供了2种模式，严格模式和遗留模式，主要区别在于对比中，是否使用非严格比较（`==`,在比较中是否进行类型转化）

> 遗留方法，在不同模式中，结果不一样
- assert.deepEqual()
- assert.equal()
- assert.notDeepEqual()
- assert.notEqual()

> 如何切换模式

  1. 通过引入声明 
      ```ts
      // 默认使用遗留
      const assert=require('assert')
      
      assert.equal(1, 1);//通过
      assert.deepEqual([1], [1]);//通过
      assert.equal(1, '1');//通过
      assert.deepEqual([1], ['1']);//通过
      ```

      ```ts
      // 默认使用严格模式
      const assert=require('assert').strict
      
      assert.equal(1, 1);//通过
      assert.deepEqual([1], [1]);//通过
      assert.equal(1, '1');//失败
      assert.deepEqual([1], ['1']);//失败
      ```
  2. 通过使用方法区分,不使用遗留方法,去使用严格方法
      ```ts
      const assert=require('assert')
      assert.equal(1, '1');//通过
      assert.strictEqual(1,'1')//失败
      ```
> **注**：在此就不详细介绍遗留模式，有兴趣可以查看[官网](http://nodejs.cn/api/assert.html#assert_assert_deepstrictequal_actual_expected_message)

## 严格模式推荐方法

> assert(value,[,message])
  - value `< any >` 检查是否真的输入
  - message `< string | Error >`
  
> assert.ok

  构造函数 `assert` 的别名，判断结果是否为真
  ```ts
  function assert(){
    //todo
  }
  assert.ok = assert
  ```
> assert.strictEqual(actual,expected,[,message])

判断实际值和期望值是否相等
- actual `< any >` 实际输入
- expected `< any >` 期待输入
- message `< string >|< Error >`

> assert.deepStrictEqual(actual, expected[, message])

判断实际值和期望值是否深度相等
- actual `< any >` 实际输入
- expected `< any >` 期待输入
- message `< string >|< Error >`

> assert.doesNotReject(asyncFn[, error][, message])
- asyncFn `< Function|Promise >` 执行函数,返回promise对象
- error `< RegExp|Function >`
- message `< string >`

  判断 `asyncFn` 执行接口返回 `Promise.resolve`

> assert.fail([message])

  直接抛出错误

> assert.ifError(value)

  判断`value` 为`undefine/null`

> assert.rejects(block, error)
  
  判断`block`的执行结果是否为`reject`,如果是则通过，否则输出`error`

> assert.throws(block, error)

  与 `assert.rejects` 类似，判断`block`函数会抛出错误

> assert.notStrictEqual(actual, expected[, message])

> assert.notDeepStrictEqual(actual, expected[, message])


# 2. 测试框架

> “测试框架是什么？”

框架的实现原理其实就是检测内部运行的代码是否有抛出异常。而断言库如果没有得到预期的输入时，就会抛出异常，给框架检测到。
测试框架本身不参与测试，主要用于管理测试用例和生成测试报告，提升测试用例的开发速度，提高测试用例的可维护性和可维护性

**测试风格**：**`TDD`**(测试驱动开发) 和 **`BDD`**(行为驱动开发)

> “常用的测试框架有哪些？”
- **[jasmine]()** -`自带断言（assert），mock 功能`
- **[mocha]()** -`框架不带断言和mock功能，需要结合其他工具`

# Mocha

mocha 是一款强大的测试框架，能够运行在nodejs和浏览器中,能够高效的管理测试用例，支持多种测试报告格式

支持多种断言,shouldjs/chai/expectjs

使用
===

## **describe(string,callback)**

主要用于对测试用例的分组，层级描述。`TDD`使用`suite` 


## **it(string [,callback])**

测试用例，callback 包含一个或者多个断言；当callback不存在时，表示这个测试用例需要写，但目前还未写入，状态使用`pending`表示


> 异步处理
  - done
  ```ts
  it('should save without error', (done)=> {
    var user = new User('Luna');
    user.save((err)=> {
      if (err) done(err);
      else done();
    });
    //user.save(done);
  });

  ```
  - promise
  ```ts
  it('respond with matching records', ()=> {
    return db.find({type: 'User'}).should.eventually.have.length(3);
  });
  ```
  - async/await
  ```ts
  it('responds with matching records', async function() {
    const users = await db.find({type: 'User'});
    users.should.have.length(3);
  });
  ```
> this.timeout(number)

  正常情况下，在测试用例的回调函数中，`this`指向`Mocha Context`,可以通过`this.timeout` 设置超时

  mocha 给所有涉及及异步的测试用例添加了超时限制，如果一个用例的执行时间超过了预期时间，将会记录下一个超时错误，然后执行下一个测试用例

  ```ts
  describe('a suite of tests',function(){
    this.timeout(500)
    it('should take less then 500ms',function(done){
      setTimeout(done,300)
    })
    it('should take less then 500ms as well',function(done){
      setTimeout(done,200)
    })
  })
  ```
  注：如果代码采用箭头函数，会导致`this`指向发生变化，出现错误



## **Hook**

用于协助`describe`中测试用例的准备·安装·卸载和回收等工作,`Hook`一般用于`describe`内，但也可以`describe`外，作为顶级`Hook`

- **before/after([ string ,]callback)** - 分别在进入或者退出`describe`时触发执行
- **beforeEach/afterEach([ string ,]callback)** - 分别在`describe`中每个测试用例执行前和执行后触发执行



```ts
describe('hooks', function() {
  before(function() {
    console.log('before')
  });

  after(function() {
    console.log('after')
  });

  beforeEach(function() {
    console.log('beforeEach')
  });

  afterEach(function() {
    console.log('afterEach')
  });
  it('Test1',()=>{
    console.log('test1')
  })
  it('Test2',()=>{
    console.log('test2')
  })
  // test cases
});

/**
 * before
 * 
 * beforeEach
 * test1
 * afterEach
 * 
 * beforeEach
 * test2
 * afterEach
 * 
 * after
 * /

```


## **Only**

屏蔽其他测试单元/测试用例，只执行标识为Only的测试单元/用例。一般用于 当你的单元测试越写越多时，只想测试新写的单元测试是否正确，这个属性就可以帮你在执行时，帮你过滤掉其他测试，加快执行速度

```ts
describe.only('something', function() {
  // 只会跑包在里面的测试
})
```
或者
```ts
it.only('do do', () => {
  // 只会跑这一个测试
})
```

## **skip**

表示执行时，跳过标识的测试单元/测试用例，可以作用于`describe`和`it`
```ts
it.skip('should return -1 unless present', function() {
  // 代码不存被执行
});

it('should return the index when present', function() {
  // 代码会执行
});
```

可以`this.skip()`在测试用例执行的时候，根据运行时过滤当前测试案例
```ts

describe('outer', function() {
  before(function() {
    this.skip();
  });

  after(function() {
    // will be executed
  });

  describe('inner', function() {
    before(function() {
      // will be skipped
    });

    after(function() {
      // will be skipped
    });
  });
});
```

配置
===

支持在项目根目录配置指定文件，用于描述如何执行`mocha`,通过`--config< path >` 来指定自定义的配置文件。也可以通过`--no-config` 让mocha在执行的时候,不要从项目中读取配置文件

> 安装优先级排序

- **command line**
- **Javascript** - .mocharc.js
- **JSON** - .mocharc.json
- **YAML** - .mocharc.yaml
- **package.json** - mocha 节点
- **mocha.opt** 逐渐废弃，不推荐使用

> 可以通过`extends`集成其他模块配置文件

```js
module.exports = {
  diff: true,//支持 实际值和期待值 有什么具体区别
  extension: ["js"],//查找文件后缀
  // opts: './test/mocha.opts',
  // package: './package.json',
  reporter: "spec",//设置测试报告的格式
  slow: 75,//生成多长时间后执行生产测试报告
  timeout: 2000,//设置生成测试报告的超时时间
  ui: "bdd",//设置测试风格 BDD 
  recursive: [ // 配置查找文件规则
    "./test/**/*.spec.js"
  ],
  require: ["@babel/polyfill", "@babel/register"] //执行时，需要加载的模块

};
```



* * *






# 3 mock库

# 4 测试集成工具

# Karma


Karma是由Google团队开发的一套前端`测试运行框架`，他不同于`测试框架`（例如jasmine,mocha等）,运行在这些测试框架之上。主要功能是 `Karma` 启动一个`web服务器`，生产包含`js源代码`和`js测试脚本`的`页面`；运行浏览器加载页面，并显示`测试结果`。Karma功能强大，包含以下特点
1. 支持真实浏览器, 无浏览器PhantomJS
2. 热更新，文件变化后自动测试
3. 测试框架无关性 支持（Jasmine, Mocha, QUnit）
4. 易测试/持续集成

安装
===

```ts
npm install -g karma
or 
npm install -D karma
```
配置
===

创建karma.conf.js
```ts
karma init
or
karma init karma.conf.js
```
## 配置项

- autoWatch 自动监控更新

