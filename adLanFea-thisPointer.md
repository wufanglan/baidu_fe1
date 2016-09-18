#面向对象基础概念
* 命名空间（包含方法、属性、对象的对象）
  * `var MYAPP = MYAPP || {};`//全局命名空间
  * `MYAPP.event = {};`//子命名空间，在大括号里面可以定义属性和方法
* 标准内置对象
  * Math、Object、Array、String
  * 可以直接使用这些内置对象的方法如Math.random()获得随机数
* 自定义对象
  * 类（跟定义函数一样），对象（类的实例），构造器，属性，方法
  * 继承
    * 原型链
      * （将超类型的实例赋值给子类型类的原型对象）
      * SubType.prototype = new SuperType();   
    * 借用构造函数
      * （在子类型构造函数内部调用超类构造函数，通过call或者apply方法在新创建的对象上执行构造函数）
      * function SubType(){  
      SuperType.call(this);  
      }
    * 组合继承
      * 构造函数继承属性，原型链继承方法
      * function SubType(name,age){  
      SuperType.call(this,name);  
      this.age = age;  
      }
      * SubType.prototype = new SuperType();   
      SubType.prototype.constructor = SubType;  
      SubType.prototype.sayAge = function(){}
    * 原型式继承
      * 借用原型可以基于已有的对象创建新对象
      * function object(o){  
      function F(){  
      F.prototype = o;  
      return new F();  
      }
    * 寄生式继承
      * 创建一个仅用于封装继承过程的函数，该函数内部以某种方式来增强对象，最后返回该对象
      * function createAnother(o){  
      var clone = object(o);  
      clone.sayhi = function(){}  
      return clone;  
      }  
    * 寄生组合式继承
      * 通过借用函数来继承属性，原型链的混成形式来继承方法
      * function inheritProperty(SubType,SuperType){  
      var prototype = object(SuperType.prototype);//创建对象  
      prototype.constructor = SubType;//增强对象  
      SubType.prototype = prototype;//指定对象  
      }
  * 封装
  * 抽象
  * 多态
  
