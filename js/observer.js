/**
 * 观察者模式也被称之为消息机制或者发布-订阅者模式
 * 为了解决主体对象与观察者之间的功能的解耦
 * */

var Observer = (function(){
    var _messages = {}; //静态私有变量，防止消息队列外漏而被篡改
    return {
        //注册信息接口
        regist:function(type,fn){
            if( typeof _messages[type] == 'undefined'){
                _messages[type] = [fn];
            }else{
                _messages[type].push(fn);
            }
            return this;
        },
        //发布消息接口
        fire:function(type,args){
            if(!_messages[type]){
                return
            }
            var events ={
                type:type,
                args :args || {}
            }
            for(var i = 0 ; i < _messages[type].length; i++){
                _messages[type][i].call(this,events);
            }
        },
        //移除信息接口
        remove:function(type, fn){
            if(!_messages[type]){
                return;
            }
           for(var i = 0; i< _messages[type].length; i++){
                if(_messages[type][i] === fn ){
                    _messages[type][i].splice(i,1);
                    break;
                }
           }

        }
    }

})();

Observer.regist('test',function(e){
    console.log(e.type,e.args.msg);
});
Observer.fire('test',{
    msg:'params'
});

//test
function $(id) {
    return document.getElementById(id);
}
//engineer  A
(function(){
    //追加一条消息
    function addMessage(e){
        var text = e.args.text,
            ul= $('msg'),
            li = document.createElement('li');
        li.innerHTML = text;
        li.onclick = function(){
            ul.removeChild(li);
            Observer.fire('removeCommentMessage',{
                num :-1
            });
        }
        ul.appendChild(li);
    }
    Observer.regist('addCommentMessage',addMessage);
})();

//engineer B
(function(){
    //用户更改消息数目
    function changeMsgNum(e){
        var num = e.args.num;
        $('msg_num').innerHTML = parseInt(($('msg_num').innerHTML)) + num;
    }
    Observer.regist('addCommentMessage',changeMsgNum)
        .regist('removeCommentMessage',changeMsgNum);
})();

//engineer C
(function(){
    //用户提交按钮
    $('user_submit').onclick = function(){
        var text = $('user_input');
        if(text.value ==''){
            return;
        }
        Observer.fire('addCommentMessage',{
            text:text.value,
            num:1
        });
        text.value = '';
    }

})();


//类和对象解耦，学生回答问题
var Student = function(result){
    var that = this;
    that.result = result;
    this.say = function(){
        console.log(that.result);
    }
}
Student.prototype.answer = function(question){
    Observer.regist(question,this.say);
};
Student.prototype.sleep = function(question){
    console.log(this.result +''+question +'已被注销');
    Observer.remove(question,this.say)
};

var Teacher = function(){
}
Teacher.prototype.ask = function(question){
    console.log('问题是：'+ question);
    Observer.fire(question);
}

var stu1 = new Student('stu1 answer:'),
    stu2 = new Student('stu2 answer:'),
    stu3 = new Student('stu3 answer:');

stu1.answer('1+1=?');
stu1.answer('2+2=?');
stu2.sleep('1+1=?');
stu2.sleep('2+2=?');
stu3.answer('1+1=?');
stu3.answer('2+2=?');

var tea1 = new Teacher();
tea1.ask('1+1=?');
tea1.ask('2+2=?');



