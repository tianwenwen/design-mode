//工厂模式，通过对产品的抽象使其创建业务
//主要用于创建多类产品的实例

var Factory = function(type,content){

    if(this instanceof Factory){
        var s = new this[type](content);
        return s;
    }else{
        return new Factory(type,content);
    }

};

Factory.prototype = {
    Java:function(content){
        this.content = content;
        (function(content){
            var div = document.createElement('div');
            div.innerHTML = content;
            div.style.border = '1px solid red';
            document.getElementById('container').appendChild(div);
        })(content);
    },
    JavaScript:function(content){
        this.content = content;
        (function(content){
            var div = document.createElement('div');
            div.innerHTML = content;
            div.style.border = '1px solid red';
            document.getElementById('container').appendChild(div);
        })(content);
    },
    UI:function(content){
        this.content = content;
        (function(content){
            var div = document.createElement('div');
            div.innerHTML = content;
            div.style.border = '1px solid red';
            document.getElementById('container').appendChild(div);
        })(content);
    }
};

var data = [
    {
        type:'JavaScript',
        content:'JavaScript.....'
    },
    {
        type:'JavaScript',
        content:'other.....'
    },
    {
        type:'Java',
        content:'Java.....'
    },
    {
        type:'UI',
        content:'UI.....'
    }
];
for(var i = 0;i < data.length ; i++){
    new Factory(data[i].type,data[i].content)
}