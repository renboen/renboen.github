function XHR() {
    this.init.apply(this, arguments)
}
XHR.prototype = {
    init() {
        this.xhr = this.createxhr();
    },
    createxhr() {
        let xhr = null;
        if (XMLHttpRequest) {
            xhr = new XMLHttpRequest()
        } else if (ActiveXobject) {
            xhr = new ActiveXobject("Msml2.Xmlhttp")
        } else {
            xhr = new ActiveXobject('Microsoft.Xmlhttp');
        }
        return xhr
    },
    urlParam(url, data) {

        url += url.indexOf("?") === -1 ? "?" : "&";
        let keys = Object.keys(data);
        for (let item of keys) {
            url += encodeURIComponent(item) + "=" + encodeURIComponent(data[item]) + "&"
        }
        url = url.substr(0, url.length - 1)
        return url
    },
    //  readystatechange(callback) {
    //      this.xhr.onreadystatechange = function() {
    //          if (this.readyState === 4) {
    //              if (this.status === 200) {
    //                  callback(this.responseText)
    //              }
    //          }
    //      }
    //  },
    get(url, callback, data = {}) {
        return new Promise((resolve, reject) => {
            this.xhr.onreadystatechange = function() {
                try {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            resolve(this.responseText)
                        }
                    }
                } catch (error) {
                    reject("请求出错了")
                }
            };
            let _url = this.urlParam(url, data);
            this.xhr.open("get", _url, true)
            this.xhr.send(null)
        })

    }

}
module.exports = XHR;