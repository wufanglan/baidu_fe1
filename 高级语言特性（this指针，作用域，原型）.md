#高级语言特性
##this指针
* 有对象就指向调用对象
```
var Object = {value:100};
Object.getValue = function(){
alert(this.value);//此时的this就指向调用对象Object
}
```
* 没调用对象就指向全局对象
```
var foo = function(){
alert(this);//此时的this就指向全局对象window
}
```
* 用new构造就指向新对象
```
var object = function(){
this.value = 100;
}
var myObject = new Object();//运行到这里时this指向了myObject
```
* 通过apply或call或bind改变this所指  
apply()方法接受两个参数，一个是函数运行的作用域，另外一个是参数数组  
call()方法第一个参数同apply,之后的参数要一个个列举出来
```
var myObject = {value:100};
var foo = function(){
alert(this);
}
foo.call(myObject);//this指向myObject
foo.apply(myObject);//this指向myObject
```