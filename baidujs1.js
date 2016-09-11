/**
 * 任务目的
 
 在上一任务基础上继续JavaScript的体验
 深入学习JavaScript的事件机制及DOM操作
 学习事件代理机制
 学习简单的表单验证功能
 学习外部加载JavaScript文件
 任务描述
 
 参考以下示例代码，用户输入城市名称和空气质量指数后，点击“确认添加”按钮后，就会将用户的输入在进行验证后，添加到下面的表格中，新增一行进行显示
 用户输入的城市名必须为中英文字符，空气质量指数必须为整数
 用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理（trim）
 用户输入不合规格时，需要给出提示（允许用alert，也可以自行定义提示方式）
 用户可以点击表格列中的“删除”按钮，删掉那一行的数据
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = $("#aqi-city-input").val();
    var value = $("aqi-value-input").val();
    aqiData[city] = value;
    
    
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var list = '';
    var tbody = '<tbody>';
    var thead = '<thead><tr><td>城市</td><td>空气质量</td><td>操作</td></tr></thead>';
    for (var city in aqiData) {
        tbody += '<tr><td>' + city + '</td><td>' +
            aqiData[city] + '</td><td><a href="javascript:void(0);" data-city="' + city + '" data-element="del">删除</a></td></tr>';
    }
    tbody += '</tbody>';
    list += thead + tbody;
    $("#aqi-table").html(list);
    
    
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    
    // do sth.
    delete aqiData[city];//删除对象属性
    
    
    renderAqiList();
}

function init() {
    var btn = document.getElementsByClassName("btn");
    
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    $('body').on('click', '#add-btn', function() {
        addBtnHandle();
        
        
    });
    
    
    
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    $('body').on('click', 'a[data-element=del]', function() {
        var $this = $(this);
        var city = $this.attr("data-city");
        delBtnHandle(city);
    });
}

init();