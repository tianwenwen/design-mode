
//创建者模式

var Human = function(params){
    this.name = params && params.name;
    this.skill = params && params.skill || '保密';
    this.hobby = params && params.hobby || '保密';
};
Human.prototype = {
    getSkill:function(){
        return this.skill;
    },
    getHobby:function(){
        return this.hobby;
    }
};

var Work = function(work){
    var that = this;
    (function(work,that){
        switch (work){
            case 'code':
                that.work = '工程师';
                that.workDescript = '每天沉醉于改buG';
                break;
            case 'UI':
                that.work = '设计师';
                that.workDescript = '设计更似一种艺术';
                break;
            case 'teach':
                that.work = '教师';
                that.workDescript = '分享也是一种快乐';
                break;
            default:
                that.work = work;
                that.workDescript = '暂无';
        }
    })(work,that)
};

Work.prototype.changeWork = function(work){
    this.work = work;
}
Work.prototype.workDescript = function(workDescript){
    this.workDescript = workDescript;
};

var Person = function(params,work){
    var _person = new Human(params);
    _person.work = new Work(work);
    return _person;
}
var lelei = new Person({
    name:'vivian',
    hobby:'卡数'
},'code');
console.log(lelei)
