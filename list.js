var AUTHORITY = {
	//通过ajax请求后端数据的入口
	interfaceRun:function(address,param,callback,type){

	},
	//读取所有权限人员列表并且展示在一张表中
	showAll:function(){
		//将从后台请求到的数据通过插入节点的方式，展示在html

	},

	//实现搜索框中搜索功能并且展示出来
	searchPeople:function(keyword){
		//通过将keyword以ajax的方式传到后端，请求得到的数据展示在html

	},

	//添加新人员的权限
	addAuthority:function(name,apartment){

	},
	//删除人员的权限
	deleteAuthoity:function(id){
		//通过获取该目标元素的id传递给后端，请求删除

	},
	//初始化
	init:function(){
		this.showAll();
	}

};
Authority.init();