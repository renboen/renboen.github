<h1>sdk目录简介</h1>
依赖localstorage封装的缓存sdk，可以实现，js，css,的缓存，减少http请求；
由于localstorage的存储大小岁浏览器不同而有所变化；详细运行test.js;故如果想大量存储数据，可以结合localforage.jsj.引入以后直接使用即可；由于localforage采用了优雅降级的方式，优先使用index.db websql， localstorage；所以可以依据设备和浏览器情况进行存储大小的扩展；
