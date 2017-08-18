//简单工厂模式 由一个工厂对象决定创建某一类产品对象类的实例
// 主要用于创建同一类对象

function Java(content){
    this.content = content;
    (function(content){
        var div = document.createElement('div');
        div.innerHTML = content;
        div.style.border = '1px solid red';
        document.getElementById('container').appendChild(div);
    })(content);
}
function UI(content){
    this.content = content;
    (function(content){
        var div = document.createElement('div');
        div.innerHTML = content;
        div.style.border = '1px solid red';
        document.getElementById('container').appendChild(div);
    })(content);
}
function JavaScript(content){
    this.content = content;
    (function(content){
        var div = document.createElement('div');
        div.innerHTML = content;
        div.style.border = '1px solid red';
        document.getElementById('container').appendChild(div);
    })(content);
}

var Factory = function(type,content){
        switch (type){
            case 'Java':
                return  Java(content);
                break;
            case 'JavaScript':
                return  JavaScript(content);
                break;
            case 'UI':
                return  UI(content);
                break;
        }
}

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
