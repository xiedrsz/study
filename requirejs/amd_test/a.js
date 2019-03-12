define("a", ["./js/scroller"], function (scroller) {
    "use strict";
    console.log(scroller);


    var list = [{
        date: "2016",
        amount: '32.00',
        detail: [{
            img: './assets/img/food.png',
            type: '餐饮食品',
            mess: '午餐16元',
            money: '-16.00'
        }, {
            img: './assets/img/food.png',
            type: '餐饮食品',
            mess: '午餐16元',
            money: '-16.00'
        }]
    }, {
        date: "2015",
        amount: '32.00',
        detail: [{
            img: './assets/img/food.png',
            type: '餐饮食品',
            mess: '午餐16元',
            money: '-16.00'
        }, {
            img: './assets/img/food.png',
            type: '餐饮食品',
            mess: '午餐16元',
            money: '-16.00'
        }]
    }];

    var jj = list.filter(function (item) {
        return item.date == "2015";
    });
    
    jj[0].amount = "99.00";

    console.log(jj);
    console.log(list);


});