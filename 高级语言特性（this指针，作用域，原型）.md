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

##作用域
* 没有块级作用域（在javascript6中新引入let关键字用于指定块级作用域）
```
if(true){
var color = "blue";
}
alert(color);//"blue"
```
* 有函数作用域
```
function Main(){
var color = "blue";
}
Main();
alert(color);//报错
```
* 作用域链  
如果出现函数嵌套函数，则会出现函数作用域链  
寻找一个变量会根据从作用域链从内到外的优先级寻找  
函数在被调用之前作用域链就已存在
```
var color = "red";
function roo(){
alert(color);
}
function boo(){
var color = "blue";
return roo;
}
var ret = boo();
ret();//输出red
在上述代码中，函数在执行之前就已经创建了两条作用域链
全局作用域->roo函数作用域
全局作用域->boo函数作用域

```
* 变量提升（变量、函数和类声明会被提升到作用域顶部）
  * 变量声明提升，但是赋值却不能提升
  ```
  console.log(value);//=>undefined
  var value = 3;
  根据提升机制，上述代码等价于下面的代码
  var value;
  console.log(value);//=>undefined
  value = 3;
  ```
  * 函数声明可以提升，函数表达式不能提升
  ```
  foo1(1,2);//3,调用被提升的函数
  foo2(1,2);//变量被提升了，但是值undefined,所以抛出错误
  //函数声明
  function foo1(a,b){
  return a+b;
  }
  //函数表达式
  var foo2 = function(a,b){
  return a-b;
  }
    ```
