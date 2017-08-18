//
// 抽象工厂模式
// 通过对工厂抽象使其业务用于对产品的了类簇的创建，而不是某一类产品的实例


var VehicleFactory = function(subType,superType){
    if(typeof VehicleFactory[superType] === 'function'){
        function F(){}
        F.prototype = new VehicleFactory[superType]();
        subType.constructor  = subType;
        subType.prototype = new F();
    }else{
        throw new Error('为创建改抽象类');
    }
};

VehicleFactory.Car = function(){
    this.type = 'car';
};
VehicleFactory.Car.prototype = {
    getPrice:function(){
        return new Error('抽象方法不能调用');
    },
    getSpeed:function(){
        return new Error('抽象方法不能调用');
    }
};
VehicleFactory.Bus = function(){
    this.type = 'bus';
};
VehicleFactory.Bus.prototype ={
    getPrice:function(){
        return new Error('抽象方法不能调用');
    },
    getPassengerNum:function(){
        return new Error('抽象方法不能调用');
    }
};
VehicleFactory.Truck = function(){
    this.type = 'truck';
};
VehicleFactory.Truck.prototype = {
    getPrice:function(){
        return new Error('抽象方法不能调用');
    },
    getTrainload:function(){
        return new Error('抽象方法不能调用');
    }
};

var BMW = function(price,speed){
    this.price = price;
    this.speed = speed;
}
VehicleFactory(BMW,'Car');
BMW.prototype.getPrice = function(){
    return this.price;
};
BMW.prototype.getSpeed = function(){
    return this.speed;
};

var Lamborghini = function(price,speed){
    this.price = price;
    this.speed = speed;
}
VehicleFactory(Lamborghini,'Car');
Lamborghini.prototype.getPrice = function(){
    return this.price;
};
Lamborghini.prototype.getSpeed = function(){
    return this.speed;
}

var YUTONG = function(price,speed){
    this.price = price;
    this.speed = speed;
}
VehicleFactory(YUTONG,'Bus');
YUTONG.prototype.getPrice = function(){
    return this.price;
};
YUTONG.prototype.getSpeed = function(){
    return this.speed;
}

var BenzTruck = function(price,speed){
    this.price = price;
    this.speed = speed;
}
VehicleFactory(BenzTruck,'Truck');
BenzTruck.prototype.getPrice = function(){
    return this.price;
};
BenzTruck.prototype.getSpeed = function(){
    return this.speed;
};


var truck = new BenzTruck(1000000, 1000);
console.log(truck.getPrice());