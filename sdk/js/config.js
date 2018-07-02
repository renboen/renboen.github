var cachelist = {
    onOff: true, //是否开启缓存
    version: "2", //sdk版本，如果改变，对list里面的资源全部进行强制更新,无论list的资源是否更新
    list: [{
            version: "12", //资源版本，更改以后，更新该资源,必须是字符窜
            url: "./js/4.js",
            type: "javascript",
            name: "4js"
        }, {
            version: "3",
            url: "./js/2.js",
            type: "javascript",
            name: "2js"
        },
        {
            version: "1w2",
            url: "./js/3.js",
            type: "javascript",
            name: "3js"
        }, {
            version: "2",
            url: "./js/5.css",
            type: "css",
            name: "5css"
        }
    ]

}
module.exports = cachelist;