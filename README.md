<h1>简介</h1>
依赖localstorage封装的缓存sdk，可以实现，js，css,的缓存，减少http请求；
由于localstorage的存储大小岁浏览器不同而有所变化；详细运行test.js;故如果想大量存储数据，可以结合localforage.jsj.引入以后直接使用即可；由于localforage采用了优雅降级的方式，优先使用index.db websql， localstorage；所以可以依据设备和浏览器情况进行存储大小的扩展；
<h1>具体使用</h1>
代码写的比较垃圾，仔细看能看懂的；重点关注sdk.js;由于开发的时候使用了简单的webpack；需要你使用webpack将文件打包起来；然后使用；根据个人项目的自动构建工具的情况。将以来的模块一次引入，然后打包即可；
<h1>项目目录简介</h1>
<br>config.js为配置项，暴露了全量更新，局部更新的控制，以及是否开启缓存的开关；详细开注释；。
<br>xhr.js 为封装的ajax
<br>until.js为工具函数
<br>sdk.js为主要逻辑
<br>sdk.png为思维导图






