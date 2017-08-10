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



