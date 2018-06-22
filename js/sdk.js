var XHR = require("./xhr.js");
var config = require("./config.js");
var until = require("./until.js");
var vs = require("vconsole");
console.log(until)

function SDK() {
    this.config = config
}
SDK.prototype = {
    needUpdateAll() {
        return localStorage.getItem("version") !== this.config.version
    },
    needUpdateItemList() {
        return this.config.list.filter((item) => {
            let name = item.name;
            return until.strToObj(localStorage.getItem(item.name + "cacheConfig")).version !== item.version
        })
    },
    saveCache() {
        let promiselist = [];
        let head = document.getElementsByTagName('head')[0];
        let version = this.config.version
        let list = this.config.list
        let len = list.length;
        if (this.config.onOff) {
            if (this.needUpdateAll()) {
                // 全量更新
                for (let i = 0; i < len; i++) {
                    if (list[i].type === "javascript") {
                        let xhr = new XHR();
                        promiselist.push(xhr.get(list[i].url));
                        localStorage.removeItem(list[i].name);
                        localStorage.removeItem(list[i].name + "cacheConfig");
                    }
                };
                //可复用
                Promise.all(promiselist).then((data) => {
                    for (let i = 0; i < len; i++) {
                        localStorage.setItem(list[i].name, data[i]);
                        localStorage.setItem(list[i].name + "cacheConfig", until.objToStr(list[i]));
                        until.addScript(data[i])
                    }
                    localStorage.setItem("version", version)
                }).catch((error) => {
                    alert("Promise.all错误")
                })
            } else {
                //部分更新
                let updateList = this.needUpdateItemList();
                let updateListLen = updateList.length
                console.log(updateList)
                if (updateListLen === 0) {
                    //可复用start
                    for (let i = 0; i < len; i++) {
                        if (list[i].type === "javascript") {
                            let txt = localStorage.getItem(list[i].name);
                            until.addScript(txt)
                        }
                    };
                    //end
                } else {
                    for (let i = 0; i < updateListLen; i++) {
                        localStorage.removeItem(updateList[i].name)
                        localStorage.removeItem(updateList[i].name + "cacheConfig")
                        if (updateList[i].type === "javascript") {
                            let xhr = new XHR();
                            promiselist.push(xhr.get(updateList[i].url));
                        }
                    };
                    Promise.all(promiselist).then((data) => {
                        for (let i = 0; i < updateListLen; i++) {
                            localStorage.setItem(updateList[i].name, data[i]);
                            localStorage.setItem(updateList[i].name + "cacheConfig", until.objToStr(updateList[i]));
                        };
                        for (let i = 0; i < len; i++) {
                            if (list[i].type === "javascript") {
                                let txt = localStorage.getItem(list[i].name);
                                until.addScript(txt)
                            }
                        };

                    }).catch((error) => {
                        alert("Promise.all错误")
                    })



                }


            }
        }
    }
}
let cache = new SDK();
cache.saveCache()
window.onload = function() {
    new vs()
}