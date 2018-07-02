let head = document.getElementsByTagName('head')[0];
//外链script
export const addScriptOutline = function(url) {
    let script = document.createElement("script")
    script.setAttribute("type", "text/javascript")
    script.setAttribute("src", url)
        // if (head.length) {
    head.appendChild(script)
        // } else {
        //     document.documentElement.appendChild(script);
        // }
}
export const addScript = function(data) {
    let script = document.createElement("script")
    script.setAttribute("type", "text/javascript")
    script.innerHTML = data;
    // if (head.length) {
    head.appendChild(script)
        // } else {
        //     document.documentElement.appendChild(script)
        // }
}
export const addLinkOutline = function(url) {
    let link = document.createElement("link")
    link.setAttribute("type", "text/css")
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute("href", url)
        // if (head.length) {
    head.appendChild(link)
        // } else {
        //     document.documentElement.appendChild(link)
        // }
}
export const addLink = function(cssString) {
    let link = document.createElement("style")
    link.innerHTML = cssString;
    console.log(head)
    let sli = document.getElementsByTagName("style")[0]
        // if (head.length) {
    head.insertBefore(link, sli)
        // } else {
        //     document.documentElement.appendChild(link)
        // }
}
export const strToObj = function(str) {
    return JSON.parse(str)
}
export const objToStr = function(obj) {
    return JSON.stringify(obj)
}