/**
 * 通过 create 方法创建一个 可观察序列，
 * 然后将 观察者 暴露到全局变量中，通过使用 next 方法不断发射新的数据流从而使得留不断的推送
 * 订阅实例 subscription 可通过 unsubscribe 方法取消订阅
 * 取消订阅后，数据变化时不再推送，因此没有数据打印出来
 */

var observerTmp;
var source = Rx.Observable.create(function (observer) {
  observerTmp = observer;
  observer.next(42);

  return function () {
    return console.log('disposed');
  };
});

var subscription = source.subscribe(function (x) {
  return console.log('onNext: ' + x);
}, function (e) {
  return console.log('onError: ' + e);
}, function () {
  return console.log('onCompleted');
});

observerTmp.next(22);


/**
 * from
 */
function f() {
  return Rx.Observable.from(arguments);
}

f(1, 2, 3).subscribe(function (x) {
  return console.log('onNext: ' + x);
}, function (e) {
  return console.log('onError: ' + e);
}, function () {
  return console.log('onCompleted');
});

/**
 * observer
 * 观察者可通过 Rx.Observer.create 方法创建，该方法需要传入 onNext、onError、onCompleted函数
 */
var source = Rx.Observable.create(function () {});
var observer = Rx.Observer.create(function (x) {
  return console.log('onNext: ' + x);
}, function (e) {
  return console.log('onError: ' + e);
}, function () {
  return console.log('onCompleted');
});
var subscription = source.subscribe(observer);
observer.next(22);

/**
 * fromPromise
 */

//emit 1 from promise
var source = Rx.Observable.fromPromise(new Promise(function (resolve) {
  return resolve(1);
}));
//add 10 to the value
var example = source.map(function (val) {
  return val + 10;
});
//output: 11
var subscribe = example.subscribe(function (val) {
  return console.log(val);
});

/**
 * 观察者
 * 主要是消费数据，
 * 其发射的数据变更不会经过 各种操作 Operators 处理
 */

var source = Rx.Observable.create(function () {}).map(function (val) {
  return val + 10;
});
var observer = Rx.Observer.create(function (x) {
  return console.log('onNext: ' + x);
}, function (e) {
  return console.log('onError: ' + e);
}, function () {
  return console.log('onCompleted');
});
var subscription = source.subscribe(observer);
observer.next(22);

/**
 * 但，
 */
var observerTmp;
var source = Rx.Observable.create(function (observer) {
  observerTmp = observer;
  observer.next(42);

  return function () {
    return console.log('disposed');
  };
}).map(function (val) {
  return val + 10;
});

var subscription = source.subscribe(function (x) {
  return console.log('onNext: ' + x);
}, function (e) {
  return console.log('onError: ' + e);
}, function () {
  return console.log('onCompleted');
});

observerTmp.next(22);

/**
 * subject 与 可观察序列类似
 */
var subject = new Rx.Subject();

var subscription = subject.map(function (val) {
  return "hello " + val;
}).subscribe(function (x) {
  console.log(x);
}, function (err) {
  console.log('Error: ' + err);
}, function () {
  console.log('Completed');
});

subject.onNext("foo");
subject.onNext("bar");
subject.onCompleted();