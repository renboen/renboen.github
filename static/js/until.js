let head = document.getElementsByTagName('head')[0];
let bo = document.body
export const addScript = function(data) {
    let script = document.createElement("script")
    script.setAttribute("type", "text/javascript")
    script.innerHTML = data;
    head.appendChild(script)
}
export const strToObj = function(str) {
    return JSON.parse(str)
}
export const objToStr = function(obj) {
    return JSON.stringify(obj)
}