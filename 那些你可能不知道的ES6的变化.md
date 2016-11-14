#那些你可能不知道的ECMAScript 2016的变化  
[原文链接]( https://www.nczonline.net/blog/2016/10/the-ecmascript-2016-change-you-probably-dont-know/)  
发表于2016年8月18日，作者Nicholas C. Zakas  
相比于ECMAScript 6（也被称作 ECMAScript 2015），ECMAScript 2016 是javascript语言规范的一个小版本的更新。这是由于ECMAScript版本~~将要按年周期来发布的决定~~ 按年更新，~~就好像是当所有的特性都准备好了就可以像快照一样有效~~每一次的更新就像是所有新特性的就绪集合。像这样，大多数的~~资源~~文章仅仅列出了两条在ECMAScript 2016的重要改变：  
1. 新增求幂（**）运算符  
2. 新增`Array.prototype.includes()`方法  
这些特性对于javascript开发者来说有着最直接的影响，然而，依然还存在经常被忘记的其他重要的改变。那就是在我书上提到的[Understanding ECMAScript 6](https://www.amazon.com/Understanding-ECMAScript-Definitive-JavaScript-Developers/dp/1593277571/ref=as_li_ss_tl?ie=UTF8&linkCode=sl1&tag=nczonline-20&linkId=91b694f186236ecbdeead9bdc9c33e4e)，当然，我依旧也会对此产生一些疑惑所以我想挖掘的更深一点。  
首先，我将描述这些变化，之后我会阐述一部分在这些变化背后的原理。  
##变化  
~~ECMAScript 2016是在严格模式下不能被参数有默认值，重构，或者是有多余参数的body内部的函数所使用。~~ECMAScript规定，严格模式下不允许用于带有默认参数值的参数，解构参数或不定参数的函数体内部。这个规范定义了简单的只含有标识符的参数作为参数列表（ECMAScript 5 仅支持简单参数列表）。这个改变影响了所有的函数类型，包括函数声明，函数表达式，箭头函数和简单的对象字面量方法。下面是一些例子：
```
//this is okay
function doSomething(a,b){
"use strict";
//code
}

//syntax error in ECMAScript 2016
function() doSomething(a,b=a){
"use strict";
//code
}
//syntax error in ECMAScript 2016
const doSomething = function({a,b}){
"use strict";
//code
};
//syntax error in ECMAScript 2016
const doSomething = (...a) = > {
"use strict";
//code
};

const obj = {
//syntax error in ECMAScript 2016
doSomething({a,b}){
"use strict";
//code
}
};
```
为了让函数能在严格模式下能运行，你也可以在一个函数外面全局的使用`use strict`，尽管这个函数的参数含有非简单参数，例如：
```
//this is okay
"use strict";
function(a,b=a){
//code
}
```

在这种情况下，这个在函数外面的`use strict`~~指令~~是有效的语法。如果你正在使用ECMAScript 模块也不用担心，因为他可以在严格模式下运行所有代码。  
 ##为什么要这样改变呢
 对于在严格模式和非简单参数列表能正常工作这个改变是很重要的。当严格模式在ECMAScript 5 被创造的时候，~~重构~~解构参数和~~默认的参数~~带有默认值的参数并不存在，~~所以解析参数列表完全没有问题并且可以看见`use strict`指令。~~因此先解析参数列表然后再使用`use strict`就没有问题。在那种情况下，`use strict`不会影响解析参数列表的输出，它仅仅是用来验证参数标识符的（不允许重名 和检查是否是非法的标识符比如`eval`和`arguments`）。在ECMAScript有了这个~~重构~~解构参数和~~默认值参数值~~带有默认值的参数的定义以后,再也不会有这种情况,~~因为规范说明了参数列表应该要在函数体内被相同的模式被解析~~因为规范指出参数列表应该要被与函数体相同的模式下进行解析（也就是说 在函数体内的`use strcit`在函数体内必须要触发严格模式）  
 我们首先要意识到的是严格模式下需要~~javascript代码同时解析和执行的改变~~改变javascript代码的解析和执行。拿一个简单的例子来说，严格模式下不予许旧方式的八进制的数字~~字面量~~形式（如070）。如果代码在严格模式下被解析了，那么070将会抛出一个语法错误。有了这样的意识后，你对接下来代码会怎么做有什么想法呢？
 ```
 //syntax error in ECMAScript 2016
 function doSomething(value=070){
 "use strict"
 return value;
 }
 ```
 如果你有javascript解析器去解析这个代码的话，这个参数列表将会在函数体外面被执行。那也就是说070会被解析为有效的并且`use strict`会在函数体内出现告诉解析器应该要在严格模式下解析这个参数列表。在那种情况下，解析器必须在严格模式下回溯和重解析这个参数列表所以070会抛出一个语法错误。那样看起来并不像是一个很大的问题，但是这个有默认值的参数如果更复杂就不可小觑了。
 ```
 //syntax error in ECMAScript 2016
 function doSomething(value=function(){
 return doSomeCalculation() +070;
 }())) {
 "use strict";
 return value;
 }
 ```
 如上所示，如果含有一个函数式的默认参数值，你将会遇到更多的问题。~~你要解开的东西将会更多而且你又必须在严格模式下将默认参数值设为函数。~~你要清理更多的tokes，还必须将函数设置为默认在严格模式下运行。~~在严格模式下保证函数表达式式的默认参数值被正确的解析和执行将会很复杂。被析构了的参数也会产生类似的问题因为它们包含了默认参数值。~~要确保默认参数表达式被正确的解析并且在严格模式下运行，是极其复杂的。例如：
 ```
 //syntax error in ECMAScript 2016
 function doSomething({value=070}){
 "use strict";
 return value;
 }
 ```
 在这里，~~被析构了的~~解构参数`value`是一个在严格模式下不被允许的默认值，造成了跟默认参数值相同的问题。  
最后，在TC-39 decided[3]说到为了避免小事件的发生不允许函数体内有`use strict`~~在ECMAScript 5~~这在ECMAScript 是没有说明的。那意味着含有默认值参数，~~析构~~解构参数和~~多余~~不定参数的函数~~不予许在函数~~体内有`"use strict"` 。上面所说的也包括以下情况当`"use strict"`没有起作用的时候，例如下面的情况：
 ```
 function outer(){
   "use strict";
 //syntax error in ECMAScript in ECMAScript 2016
   function doSomething(value=070){
     "use strict";
     return value;
   }
 }
 ```
 这个例子在含有`"use strict"`的函数里嵌套了另外一个含有非简单参数列表的函数。这个`doSomething()`函数在严格模式下是自发的但是javascript引擎会在~~严格模式下~~`doSomething()`函数体中的`"use strict"`抛出一个异常。  
 ##解决方案
 这个改变看起来好像不会影响大多数的开发者，这也是你没有意识到这个变化的原因。随着ECMAScript模块化和类能在严格模式下自发的运行，这个`"use strcit"`指令开始慢慢变成一个历史产物不再在以上情景下被需要了。但是，在极少数的情况下，你需要在严格模式下运行一个含有非简单参数列表的函数，这时你可以使用IIFE去创建这个额函数：
 ```
 const doSomething(function(){
   "use strict";
   return function(value=42){
     return value;
     }
   }());
```
在上面这个代码中，在IIFE里创建了一个可以在严格模式下可以运行的函数。这个函数允许返回在一个可以在严格模式下运行的带有默认参数值的函数。因为它的外部的代码是在严格模式下运行的，所以即使在函数体 内部没有`"use strict"`他也可以正确的解析默认参数值。
##总结
这个在ECMAScript 2016的小小变化，不予许带有非简单参数列表的函数体内用`"use strict"`，~~强调了如此流行的编程语言是可以如此与众不用~~也表现出这样一门流行的编程语言的发展历程是多么坎坷。因此，~~TC-39决定介绍新的语法错误来移除这个在ECMAScript6(2015)之前更早遇到的模凌两可的语法~~TC-39决定引入一个新的语法错误来消除歧义，如果上述问题出现的早的话，这也可能已经是ECMAScript 6(2015)的一部分了。添加这个新的语法错误是~~最显然的向前的路~~是最明智的选择，因为它影响了非常少的代码（这个改变的规范是在javascript引擎实现非简单参数列表的同一阶段）并且因为ECMAScript模块化和类可以在严格模式下可以运行的关系也不会影响未来的代码。

 
 