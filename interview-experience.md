
* 自我介绍
* 谈下做过的项目，在哪些环节参与了前段开发，形式是什么？期间用到了什么东西
* 接口怎么定义
* css里怎么实现隐藏，两者的区别
  1. display:none;不占空间
  2. visibility:visible;占空间
  3. opacity:0;占空间
  4. position:absolute;top和left设置为负值
  5. clip-path裁剪？
* position有哪些值，都是什么含义
  1. static:默认值，没有定位，出现在正常流
  2. absolute:绝对定位，相对于static定位以外的第一个父元素进行定位
  3. relative：相对定位，相对于其正常位置进行定位
  4. fixed:绝对定位的元素，相对于浏览器窗口进行定位
  5. inherit:从父元素继承position属性的值
* 如何在界面取到一个元素，用原生和jQuery方法取到的对象有何不同
* 有一个form表单,大概需要设置哪些属性才能正确使用；如何提交表单，提交时候数据是怎么发送的，ajax是怎么拿到数据然后如何提交的
  1. action:表单提交时的跳转路径
  2. method:post/get  
  3. enctype:表单的封装方式，在进行文件上传是要设为`enctype="multipart/form-data"`
  post:所有参数会被隐藏，参数大小没有限制，推荐该方式
  get:提交参数显示在地址栏上，有参数限制
  4. 扩展知识：post常用来请求数据修改，get用来请求数据获取
  5. 提交数据：get在地址后面跟表单的数据如`url?param1=value1&param2=value2`post在请求内容里跟表单数据
  6. 拿到数据：通过获取表单对象，然后用form.data把其中的数据作为ajax方法的参数
  
* 跨域访问怎么实现
  1. CORS跨源资源共享--原理：允许一个域上的网络向另外一个域提交跨域ajax请求，只需要由服务器发送一个响应标头即可`Access-Control-Allow-Origin:`
  2. JSONP--原理：通过script标签引入一个js文件，这个js文件载入成功后会执行在url参数上指定的函数，并且会把我们需要的json数据作为参数传入
* js的继承，大概写一下
  1. 原型链（本质上是重写原型对象，缺点是包含引用类型值的原型）
  2. 借用构造函数（使用apply,call方法在新创建的对象上执行构造函数，优点是可以向超类型构造函数传递参数，缺点是没有做到函数复用）
  3. 组合继承（用原型链实现对原型属性和方法的继承，通过借用构造函数来实现对实例属性的继承）
  4. 原型式继承（Object.create()方法接收两个参数，第一个是用作新对象原型的对象和一个（可选的）作为新对象定义的额外属性的对象，注意的是包含引用类型值的属性始终都会共享相应的值，就跟方式1一样）
  5. 寄生式继承（此种方式跟方式2相似，都不能做到函数复用）
  6. 寄生式组合继承（本质上就是使用寄生式继承来继承超类型的原型，再将结果指定给子类型的原型）
* 有一个数组，如何打乱这个数组的元素的顺序，获得新的随机序列  
  解题思路：`var array = [12,5,23,1,10];array = array.sort(function(){
  return Math.random()-0.5;});`
* 假如有1000个元素，要给每个都加一个监听，该如何实现比较高效且内存不会太浪费
  1. 使用事件委托（利用了事件冒泡原理）
  2. 具体的实现方案：给元素`<body>`绑定一个click事件，为这些元素的设置一个相同的属性值（用户自定义也可），设置不同的id值，将他们的事件都委托给body,当事件触发时通过检测是属性id来判断是哪个元素。例如用jQuery实现：  
  `$('body').on('click','[data-elems=""]',function(){  
  var $this = $(this);
  var id = $this.attr('id');
  });`


* 自我介绍
* css样式，比如边框，上边框红色，内边距等 
* DOM结构
* 隐藏元素
* jQuery(document).ready()和window.onload()有什么区别
  1. 执行的时间  
  window.onload必须等到页面内包括图片所有元素加载完毕后才能执行
  $(document).ready()是DOM结构绘制完毕后就执行，不必等到加载完毕
  2. 编写个数
  window.onload不能同时编写多个，只能执行一个
  $(document).ready()可以同时编写多个，并且都可以得到执行
  3. 简写方法
  window.onload没有简写方法
  $(document).ready(){}可以简写为$(function(){});
* 如果有一排元素，A,B,C…他们是用ul和li来实现的，我现在想在每个元素上加一个单击监听，点击时可以alert其内容，用jQuery怎么写？
* var x = function() {…} function x() {…} 两者之间的不同点
  1. 前者是函数表达式，后者是函数声明
  2. 前者不可以在函数表达式定义之前被调用，后者可以
  3. 前者函数表达式中函数变量x的声明可以提升，但是给变量赋值却不能提升；而后者的方式则可以整个函数声明提升到外部函数作用域的顶部
*  null==undefined , null===undefined…二等和三等的区别
   1. undefined-》声明的变量未被初始化`var value;alert(value==undefined);//output "true"`
   2. null-》尚未存在的对象`alert(null==document.getElementById('notExistElement'));//output "true"`
   3. `alert(null==undefined);//output"true"因为undefined是从null派生出来的`
   4. `alert(typeof undefined);output "undefined"`  
   `alert(typeof null);output"object"
   alert(null===undefined)//output"false";`两者之间的类型不一样
   5. 相等（二等）与全等（三等）知识扩展：相等操作符会先转换类型再比较，而全等则不转换数据类型直接比较
* obj.hasOwnProperty()这个方法描述一下它是做什么的
* 我有一个金钱的数字，想转化成带逗号的字符串，这个金额可能是负的，可能带小数，写一个方法。
* 假如我有一个数组，里面都是字符串，但是可能重复，如何去重，比如[“AA”, “BB”, “BB”]
  思路：
  1. 创建一个新的数组存放结果
  2. 创建一个空对象
  3. for循环时，每次取出一个元素与对象进行对比，若不重复则存在数组中，同时将这个元素作为对象的一个属性，并赋值为1，存入到第2步建立的对象中
  4. 代码实现：`Array.prototype.unique = function(){
  var res = [];
  var json = {};
  for(var i = 0;i<this.length;i++){
    if(!json[this[i]]){
      res.push(this[i]);
      json[this[i]] = 1;
      }
    }
    return res;
  }
  var arr = [1,2,2,4,6,4];
  alert(arr.unique());`
* 做web时用到的优化都有哪些
* CDN
