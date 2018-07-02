var XHR = require("./xhr.js");
var config = require("./config.js");
var until = require("./until.js");
var vs = require("vconsole");
// console.log(until)

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
            if (!localStorage.getItem(item.name + "cacheConfig")) {
                return true
            } else {
                return until.strToObj(localStorage.getItem(item.name + "cacheConfig")).version !== item.version
            }
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
                    let xhr = new XHR();
                    promiselist.push(xhr.get(list[i].url));
                    localStorage.removeItem(list[i].name);
                    localStorage.removeItem(list[i].name + "cacheConfig");
                };
                try {
                    //可复用
                    Promise.all(promiselist).then((data) => {
                        //内联添加
                        for (let i = 0; i < len; i++) {
                            localStorage.setItem(list[i].name, data[i]);
                            localStorage.setItem(list[i].name + "cacheConfig", until.objToStr(list[i]));
                            if (list[i].type === "javascript") {
                                until.addScript(data[i])
                            } else if (list[i].type === "css") {
                                // console.log("css''''")
                                // console.log(data[i])
                                until.addLink(data[i])
                            }
                        }
                        localStorage.setItem("version", version)
                    })
                } catch (error) {
                    //更新出现位置错误的时候清除所有缓存，发起http请求
                    promiselist = []
                    localStorage.removeItem("version");
                    for (let i = 0; i < len; i++) {
                        localStorage.removeItem(list[i].name);
                        localStorage.removeItem(list[i].name + "cacheConfig");
                        if (list[i].type === "javascript") {
                            until.addScriptOutline(list[i].url)
                        } else if (list[i].type === "css") {
                            until.addLinkOutline(list[i].url);
                        }
                    };
                    console.log(error)
                    alert("Promise.all错误")
                }

            } else {
                //部分更新
                let updateList = this.needUpdateItemList();
                let updateListLen = updateList.length
                    // console.log(updateList)

                try {
                    if (updateListLen === 0) {
                        //可复用start
                        for (let i = 0; i < len; i++) {
                            let txt = localStorage.getItem(list[i].name);
                            if (list[i].type === "javascript") {
                                until.addScript(txt)
                            } else if (list[i].type === "css") {
                                until.addLink(txt)
                            }
                        };
                        //end
                    } else {

                        for (let i = 0; i < updateListLen; i++) {
                            let xhr = new XHR();
                            localStorage.removeItem(updateList[i].name)
                            localStorage.removeItem(updateList[i].name + "cacheConfig")
                            promiselist.push(xhr.get(updateList[i].url));
                        };
                        Promise.all(promiselist).then((data) => {
                            for (let i = 0; i < updateListLen; i++) {
                                //为了保证依赖关系所以先把更新资源替换以后再从缓存读取；如果没有依赖关系可以直接插入
                                localStorage.setItem(updateList[i].name, data[i]);
                                localStorage.setItem(updateList[i].name + "cacheConfig", until.objToStr(updateList[i]));
                            };
                            for (let i = 0; i < len; i++) {
                                let txt = localStorage.getItem(list[i].name);
                                if (list[i].type === "javascript") {
                                    until.addScript(txt)
                                } else if (list[i].type === "css") {
                                    until.addLink(txt)
                                }
                            };
                        })
                    }
                } catch (error) {
                    localStorage.removeItem("version");
                    promiselist = []
                    for (let i = 0; i < len; i++) {
                        localStorage.removeItem(list[i].name);
                        localStorage.removeItem(list[i].name + "cacheConfig");
                        if (list[i].type === "javascript") {
                            until.addScriptOutline(list[i].url)
                        } else if (list[i].type === "css") {
                            until.addLinkOutline(list[i].url)
                        }
                    };
                    alert("Promise.{{{all错误}}}")
                }

            }
        }
    }
}
window.onload = function() {
    let cache = new SDK();
    cache.saveCache()
}