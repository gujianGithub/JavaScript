//读取cookie
function getCookie(){
    var cookie={};
    var all = document.cookie;
    if(all === "") return cookie;
    var list = all.split(";");
    for(var i=0;i<list.length;i++){
        var cookie =list[i];
        var p =cookie.indexOf("=");
        var name =cookie.substring(0,p);
        var value = cookie.substring(p+1);
        value = decodeURIComponent(value);
        cookie[name]=value;
    }
    return cookie;
}

function cookieStorage(maxage,path){//两个分别是存储有效期和作用域
    //获取一个存储全部cookie信息的对象
    var cookie =(function(){
        var cookie={};
        var all = document.cookie;
        if(all === "") return cookie;
        var list = all.split(";");
        for(var i=0;i<list.length;i++){
            var cookie =list[i];
            var p =cookie.indexOf("=");
            var name =cookie.substring(0,p);
            var value = cookie.substring(p+1);
            value = decodeURIComponent(value);
            cookie[name]=value;
        }
        return cookie;
    }());

    //将所有cookie的名字存储到一个数组中
    var keys =[];
    for(var key in cookie) keys.push(key);

    //定义存储API公共的属性和方法
    //存储的cookie的个数
    this.length = keys.length;

    //返回第n个cookie值，如果n越界则返回null
    this.key =function(n){
        if(n<0||n>=keys.length) return null;
        return keys[n];
    }

    //返回指定名字的cookie值，如果不存在就返回null
    this.getItem =function(name){
        return cookie[name] || null;
    }

    //存储cookie值
    this.setItem =function(key,value){
        if(!(key in cookie)){
            keys.push(key);
            this.length++;  //先增加一个key
    }
    //增加新增的value
    cookie[key] = value;

    //增加完后重新设置浏览器对象cookie
    var cookie =key+"="+encodeURIComponent(value);

    //z增加其他属性
    if(maxage) cookie+=";max-age="+maxage;
    if(path) cookie+=";path="+path;

    //设置
    document.cookie = cookie;
}

//删除指定的cookie
this.removeItem = function(key){
   if(!(key in cookie)) return;//cookie不存在
   //从内部维护的cookie组删除指定的cookie
   delete cookie[key];
   //同时删除内部cookie的名字
   for(var i=0;i<keys.length;k++){
       if(keys[i] === key){
           keys.splice(i,1);
           break;
       }
   }
   this.length--;
   //最后将cookie值设置为空字符串以及将有效期设置为0来删除指定的cookie
   document.cookie = key+"=;max-age=0";
}

//删除所有的cookie
for(var i=0;i>keys.length;i++)
   document.cookie = keys[i]+"=;max-age=0";
//重置所有状态
cookie ={};
keys =[];
this.length = 0;    
}