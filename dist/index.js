/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./static/js/sdk.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./static/js/config.js":
/*!*****************************!*\
  !*** ./static/js/config.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var cachelist = {\r\n    onOff: true, //是否开启缓存\r\n    version: \"10\", //sdk版本，如果改变，对list里面的资源全部进行强制更新,无论list的资源是否更新\r\n    list: [{\r\n            version: \"10\", //资源版本，更改以后，更新该资源,必须是字符窜\r\n            url: \"./js/4.js\",\r\n            type: \"javascript\",\r\n            name: \"4js\"\r\n        }, {\r\n            version: \"1\",\r\n            url: \"./js/2.js\",\r\n            type: \"javascript\",\r\n            name: \"2js\"\r\n        },\r\n        {\r\n            version: \"1\",\r\n            url: \"./js/3.js\",\r\n            type: \"javascript\",\r\n            name: \"3js\"\r\n        }\r\n    ]\r\n\r\n}\r\nmodule.exports = cachelist;\n\n//# sourceURL=webpack:///./static/js/config.js?");

/***/ }),

/***/ "./static/js/sdk.js":
/*!**************************!*\
  !*** ./static/js/sdk.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var XHR = __webpack_require__(/*! ./xhr.js */ \"./static/js/xhr.js\");\r\nvar config = __webpack_require__(/*! ./config.js */ \"./static/js/config.js\");\r\nvar until = __webpack_require__(/*! ./until.js */ \"./static/js/until.js\");\r\nconsole.log(until)\r\n\r\nfunction SDK() {\r\n    this.config = config\r\n}\r\nSDK.prototype = {\r\n    needUpdateAll() {\r\n        return localStorage.getItem(\"version\") !== this.config.version\r\n    },\r\n    needUpdateItemList() {\r\n        return this.config.list.filter((item) => {\r\n            let name = item.name;\r\n            return until.strToObj(localStorage.getItem(item.name + \"cacheConfig\")).version !== item.version\r\n        })\r\n    },\r\n    saveCache() {\r\n        let promiselist = [];\r\n        let head = document.getElementsByTagName('head')[0];\r\n        let version = this.config.version\r\n        let list = this.config.list\r\n        let len = list.length;\r\n        if (this.config.onOff) {\r\n            if (this.needUpdateAll()) {\r\n                // 全量更新\r\n                for (let i = 0; i < len; i++) {\r\n                    if (list[i].type === \"javascript\") {\r\n                        let xhr = new XHR();\r\n                        promiselist.push(xhr.get(list[i].url));\r\n                        localStorage.removeItem(list[i].name);\r\n                        localStorage.removeItem(list[i].name + \"cacheConfig\");\r\n                    }\r\n                };\r\n                //可复用\r\n                Promise.all(promiselist).then((data) => {\r\n                    for (let i = 0; i < len; i++) {\r\n                        localStorage.setItem(list[i].name, data[i]);\r\n                        localStorage.setItem(list[i].name + \"cacheConfig\", until.objToStr(list[i]));\r\n                        until.addScript(data[i])\r\n                    }\r\n                    localStorage.setItem(\"version\", version)\r\n                }).catch((error) => {\r\n                    alert(\"Promise.all错误\")\r\n                })\r\n            } else {\r\n                //部分更新\r\n                let updateList = this.needUpdateItemList();\r\n                let updateListLen = updateList.length\r\n                console.log(updateList)\r\n                if (updateListLen === 0) {\r\n                    //可复用start\r\n                    for (let i = 0; i < len; i++) {\r\n                        if (list[i].type === \"javascript\") {\r\n                            let txt = localStorage.getItem(list[i].name);\r\n                            until.addScript(txt)\r\n                        }\r\n                    };\r\n                    //end\r\n                } else {\r\n                    for (let i = 0; i < updateListLen; i++) {\r\n                        localStorage.removeItem(updateList[i].name)\r\n                        localStorage.removeItem(updateList[i].name + \"cacheConfig\")\r\n                        if (updateList[i].type === \"javascript\") {\r\n                            let xhr = new XHR();\r\n                            promiselist.push(xhr.get(updateList[i].url));\r\n                        }\r\n                    };\r\n                    Promise.all(promiselist).then((data) => {\r\n                        for (let i = 0; i < updateListLen; i++) {\r\n                            localStorage.setItem(updateList[i].name, data[i]);\r\n                            localStorage.setItem(updateList[i].name + \"cacheConfig\", until.objToStr(updateList[i]));\r\n                        };\r\n                        for (let i = 0; i < len; i++) {\r\n                            if (list[i].type === \"javascript\") {\r\n                                let txt = localStorage.getItem(list[i].name);\r\n                                until.addScript(txt)\r\n                            }\r\n                        };\r\n\r\n                    }).catch((error) => {\r\n                        alert(\"Promise.all错误\")\r\n                    })\r\n\r\n\r\n\r\n                }\r\n\r\n\r\n            }\r\n        }\r\n    }\r\n}\r\nlet cache = new SDK();\r\ncache.saveCache()\n\n//# sourceURL=webpack:///./static/js/sdk.js?");

/***/ }),

/***/ "./static/js/until.js":
/*!****************************!*\
  !*** ./static/js/until.js ***!
  \****************************/
/*! exports provided: addScript, strToObj, objToStr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addScript\", function() { return addScript; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"strToObj\", function() { return strToObj; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"objToStr\", function() { return objToStr; });\nlet head = document.getElementsByTagName('head')[0];\r\nlet bo = document.body\r\nconst addScript = function(data) {\r\n    let script = document.createElement(\"script\")\r\n    script.setAttribute(\"type\", \"text/javascript\")\r\n    script.innerHTML = data;\r\n    head.appendChild(script)\r\n}\r\nconst strToObj = function(str) {\r\n    return JSON.parse(str)\r\n}\r\nconst objToStr = function(obj) {\r\n    return JSON.stringify(obj)\r\n}\n\n//# sourceURL=webpack:///./static/js/until.js?");

/***/ }),

/***/ "./static/js/xhr.js":
/*!**************************!*\
  !*** ./static/js/xhr.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval(" function XHR() {\r\n     this.init.apply(this, arguments)\r\n }\r\n XHR.prototype = {\r\n     init() {\r\n         this.xhr = this.createxhr();\r\n     },\r\n     createxhr() {\r\n         let xhr = null;\r\n         if (XMLHttpRequest) {\r\n             xhr = new XMLHttpRequest()\r\n         } else if (ActiveXobject) {\r\n             xhr = new ActiveXobject(\"Msml2.Xmlhttp\")\r\n         } else {\r\n             xhr = new ActiveXobject('Microsoft.Xmlhttp');\r\n         }\r\n         return xhr\r\n     },\r\n     urlParam(url, data) {\r\n\r\n         url += url.indexOf(\"?\") === -1 ? \"?\" : \"&\";\r\n         let keys = Object.keys(data);\r\n         for (let item of keys) {\r\n             url += encodeURIComponent(item) + \"=\" + encodeURIComponent(data[item]) + \"&\"\r\n         }\r\n         url = url.substr(0, url.length - 1)\r\n         return url\r\n     },\r\n     //  readystatechange(callback) {\r\n     //      this.xhr.onreadystatechange = function() {\r\n     //          if (this.readyState === 4) {\r\n     //              if (this.status === 200) {\r\n     //                  callback(this.responseText)\r\n     //              }\r\n     //          }\r\n     //      }\r\n     //  },\r\n     get(url, callback, data = {}) {\r\n         return new Promise((resolve, reject) => {\r\n             this.xhr.onreadystatechange = function() {\r\n                 try {\r\n                     if (this.readyState === 4) {\r\n                         if (this.status === 200) {\r\n                             resolve(this.responseText)\r\n                         }\r\n                     }\r\n                 } catch (error) {\r\n                     reject(\"请求出错了\")\r\n                 }\r\n             };\r\n             let _url = this.urlParam(url, data);\r\n             this.xhr.open(\"get\", _url, true)\r\n             this.xhr.send(null)\r\n         })\r\n\r\n     }\r\n\r\n }\r\n module.exports = XHR;\n\n//# sourceURL=webpack:///./static/js/xhr.js?");

/***/ })

/******/ });