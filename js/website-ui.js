/**
 * Create by benjamin at 2014/7/4
 * main script
 */
angular.module("ui.website",[
    'ui.website.player',
    'ui.website.dialog',
    'ui.website.chart',
    'ui.website.fileupload',
    'ui.website.select',
    'ui.website.loading'
])
/**
 * @Author benjamin zhaoyuxiang
 * @Desc echarts main script
 * @Date 2016-04-15
 */
angular.module("ui.website.chart",[])
    .factory('EChartsService', function () {
        return {
            getEChartsInstance: function (id) {
                var $ele = angular.element('#' + id);
                var $divs = $ele.find('div');
                if ($divs.length > 0){
                    for (var i = 0; i < $divs.length; i++){
                        var child = $divs[i];
                        if (child.hasAttribute('_echarts_instance_')){
                            return echarts.getInstanceByDom(child);
                        }
                    }
                }
            }
        }
    })
    .service('ChartService', [function(){
        /**
         * highcharts 类型
         * @type
         * @deprecated 不在支持highcharts类型
         */
        var defaultHighchartOptionsMap = {
            // 平滑曲线图
            pline: {
                chart: {
                    type: 'spline',
                    margin:[30,20,65,20]
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    gridLineWidth: 0,
                    //categories: arr_time_key,
                    categories: [],
                    lineColor: '#bababa',
                    type: 'datetime',
                    tickmarkPlacement:'on',
                    labels: {
                        style: { fontSize: '14px'},
                        y:20
                    }
                },
                yAxis: {
                    title: {
                        text: '',
                        style: {
                            color: '#bababa',//颜色
                            fontSize:'14px'  //字体
                        }
                    },
                    lineColor: '#bababa',
                    labels: {
                        enabled:false,
                        style: { fontSize: '14px' }
                    },
                    plotLines: [{
                        value: 0,
                        width: 0,
                        color: '#808080'
                    }],
                    tickPixelInterval: 30,
                    lineWidth: 0,
                    tickWidth: 0,
                    gridLineColor: '#efefef'
                },
                tooltip: {
                    //crosshairs: true,
                    shared: true,
                    valueSuffix: '',
                    borderWidth:1,
                    borderColor: '#8b8b8b',
                    useHTML:true,
                    crosshairs: {
                        width: 1,
                        color: 'gray',
                        dashStyle: 'shortdot'
                    },
                    formatter: function(){
                        return '';
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: false
                        },
                        enableMouseTracking: true,
                        lineColor:"#47a6ff"
                    },
                    series: {
                        marker: {
                            symbol: 'circle'
                        }
                    }
                },
                legend :  {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom',
                    borderWidth: 0
                },
                credits : {
                    enabled:false//不显示highCharts版权信息
                },
                series: [{
                    name:'',
                    data: []
                }]
            }
        };

        var defaultEChartOptionsMap = {
            line: {
                title: {
                    text: ''
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:[]
                },
                toolbox: {
                    show: false
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : []
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [

                ]
            },
            bar: {
                "title":{
                    "x":"center"
                },
                "tooltip":{
                    "borderWidth":1,
                    "borderColor":"#8b8b8b",
                    "backgroundColor":"#ffffff",
                    "textStyle":{
                        "color":"#333333"
                    },
                    "trigger":"item",
                    "formatter":"{b} : {c}%"
                },
                "calculable":false,
                "grid":{
                    "borderWidth":0,
                    "x":'3%',
                    "y":20,
                    "y2":50,
                    "width":"94%"
                },
                "xAxis":[
                    {
                        "show":true,
                        "type":"category",
                        "data":[],
                        "splitLine":{
                            "show":true,
                            "lineStyle":{
                                "color":"white",
                                "width":10
                            }
                        },
                        "axisLabel":{
                            "show":true,
                            "interval":"0",
                            "margin":15,
                            "textStyle": {color: "#000"}
                        },
                        "axisLine":{
                            "show":true,
                            "lineStyle":{
                                "color":"#d2d2d2",
                                "width":1
                            }
                        },
                        "axisTick":{
                            "onGap":null,
                            "lineStyle":{
                                "color":"#d2d2d2"
                            }
                        }
                    }
                ],
                "yAxis":[
                    {
                        "type":"value",
                        "show":false
                    }
                ],
                "series":[

                ]
            },
            /**
             * 饼图
             */
            'pie': {
                legend: {
                    orient: 'horizontal',
                    y: 'bottom',
                    data: [],
                    itemHeight: 7,
                    itemGap:26,
                    icon:'circle'
                },
                tooltip : {
                    trigger: 'item',
                    borderWidth:1,
                    borderColor: '#8b8b8b',
                    backgroundColor:"#ffffff",
                    textStyle:{
                        color:'#333333'
                    },
                    formatter: function (params) {
                        var res = params.name + ': '+Number(params.percent).toFixed(1) + '%'
                        return res;
                    }
                },
                //重点参数，去除圆饼图的上下空白圈
                calculable : false,
                series : [
                    {
                        name: '',
                        type: 'pie',
                        //center: ['50%', '45%'],
                        //radius: ['50', '80'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    position: 'center',
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            }
                        }
                        ,
                        data: []
                    }]
            }
        };

        return {
            getInstance: function(dom, chart, chartType){
                if(!chart){
                    if(chartType == 'echarts'){
                        return echarts.init(dom);
                    } else if(chartType == 'highcharts'){
                        return $(dom).highcharts();
                    }
                } else if(defaultEChartOptionsMap.hasOwnProperty(chart)){
                    return echarts.init(dom);
                }else if(defaultHighchartOptionsMap.hasOwnProperty(chart)){
                    return highcharts.init(dom);
                }
            },
            getOption: function(chart, originalData, style, formatter, config){
                if(!chart){
                    return originalData;
                }
                var option = angular.copy(defaultEChartOptionsMap[chart]);

                if(formatter()){
                    option.tooltip.formatter = formatter();
                }

                var y = originalData.data;
                var x = originalData.category;
                if(config.limit > 0 && x.length > config.limit){
                    x = x.slice(0, config.limit);
                    //y = y.slice(0, config.limit);
                }
                var series = [];
                if(chart == 'bar'){
                    for(var j = 0; j < y.length; j++){
                        var yAxisDatas = [];
                        var perData = y[j];
                        var formatData = [];
                        var seriesItem = {
                            name: '',
                            type: chart,
                            barWidth: 30,
                            data:[]
                        }
                        if(config.limit > 0 && x.length > config.limit){
                            perData = perData.slice(0, config.limit);
                            //y = y.slice(0, config.limit);
                        }
                        for(var i = 0; i < perData.length; i++){
                            var item = {
                                name: x[i],
                                data: perData[i]
                            }
                            formatData.push(item);
                        }
                        // array 浅copy一份
                        var sortForColor = config && config.sortForColor;
                        var color = style && style.color && style.color.length >= y.length && style.color[0].length >= perData.length;
                        if(sortForColor && color){
                            var formatDataCopy = formatData.concat();
                            formatDataCopy.sort(function(a, b){
                                return Number(b.data) - Number(a.data);
                            });
                            for(var i = 0; i < formatDataCopy.length; i++){
                                formatDataCopy[i].color = style.color[j][i];
                            }
                            //formatData = formatDataCopy;
                        }

                        for(var i = 0 ; i < formatData.length; i++){
                            var yAxisDataItem = {
                                "value": formatData[i].data,
                                "name": formatData[i].name,
                                "itemStyle":{
                                    "normal":{
                                        //"color":formatData[i].color,
                                        "label":{
                                            "show":true,
                                            "position":"top",
                                            "formatter":"{c}%",
                                            "textStyle":{
                                                "color":"#37a3fd"
                                            }
                                        },
                                        "labelLine":{
                                            "show":false
                                        }
                                    },
                                    //    ,
                                    "emphasis":{
                                        "label":{
                                            "show":true,
                                            "position":"top",
                                            "formatter":"{c}%",
                                            "textStyle":{
                                                "color":"#37a3fd"
                                            }
                                        }
                                    }
                                }
                            };
                            if(formatData[i].color){
                                yAxisDataItem.itemStyle.normal.color = formatData[i].color;
                            }
                            yAxisDatas.push(yAxisDataItem);
                        }
                        seriesItem.data = yAxisDatas;
                        series.push(seriesItem);
                    }

                    option.series = series;
                    option.xAxis[0].data = originalData.category;
                    if(style.orientation === 'vertical'){
                        var temp = option.yAxis;
                        option.yAxis = xAxis;
                        option.xAxis = temp;
                    }
                    return option;
                }else if(chart == 'line'){
                    for(var j = 0; j < y.length; j++){
                        var yAxisDatas = [];
                        var perData = y[j];
                        var formatData = [];
                        var seriesItem = {
                            name: '',
                            type: chart,
                            data:[]
                        }

                        for(var i = 0; i < perData.length; i++){
                            var item = {
                                name: x[i],
                                data: perData[i]
                            }
                            formatData.push(item);
                        }

                        for(var i = 0 ; i < formatData.length; i++){
                            var yAxisDataItem = {
                                "value": formatData[i].data,
                                "name": formatData[i].name
                                //"itemStyle":{
                                //    "normal":{
                                //        "label":{
                                //            "show":true,
                                //            "position":"top",
                                //            "formatter":"{c}%",
                                //            "textStyle":{
                                //                "color":"#37a3fd"
                                //            }
                                //        },
                                //        "labelLine":{
                                //            "show":false
                                //        }
                                //    },
                                //    //    ,
                                //    "emphasis":{
                                //        "label":{
                                //            "show":true,
                                //            "position":"top",
                                //            "formatter":"{c}%",
                                //            "textStyle":{
                                //                "color":"#37a3fd"
                                //            }
                                //        }
                                //    }
                                //}
                            };
                            yAxisDatas.push(yAxisDataItem);
                        }
                        if(style && style.color && style.color.length >= y.length){
                            var itemStyle = {
                                "normal":{
                                    color: style.color[j],
                                }
                            };
                            seriesItem.lineStyle = itemStyle;
                        }
                        seriesItem.data = yAxisDatas;
                        series.push(seriesItem);
                    }

                    option.series = series;
                    option.xAxis[0].data = originalData.category;
                    return option;
                }else if (chart == 'pie'){

                    for(var j =0 ; j< y.length; j++){
                        var yAxisDatas = [];
                        var yDataItem = y[j];
                        if(!yDataItem || yDataItem.length != x.length){
                            throw new Error('Data error, check your data please');
                        }
                        for(var i = 0 ; i < x.length; i++){
                            var yAxisDataItem = {
                                name: x[i],
                                value: y[j][i],
                                itemStyle: {
                                    normal: {
                                        //color: style.color[i % style.color.length]
                                    },
                                    emphasis: {
                                        label: {
                                            show:false
                                        }
                                    }
                                }
                            };
                            if(style.color && style.color.length >= y.length && style.color[0].length >= x.length){
                                yAxisDataItem.itemStyle.normal.color = style.color[j][i];
                            }
                            yAxisDatas.push(yAxisDataItem);
                        }
                        option.series[j].data = yAxisDatas;
                        option.legend.data = originalData.category;
                        if(style && style.center && style.center.length >= y.length){
                            option.series[j].center = style.center[j];
                        }
                        if(style && style.radius && style.radius.length >= y.length){
                            option.series[j].radius = style.radius[j];
                        }
                        return option;
                    }
                }
            }
        }
    }])
    .directive('chart', ['ChartService', '$timeout', function(ChartService, $timeout){
        var defaultConfig = {
            // 是否显示loading画面
            showLoading: true,
            // 是否按照颜色值排序
            sortForColor: false,
            // 是否限制显示
            limit: -1,
            // 没有数据时的提示
            noDataTemplateUrl: 'templates/echarts/no-data.html'
        };
        // 默认的样式
        var defaultStyle = {

            bar: {
                //color: ["#03a7e5","#03a7e5","#1db5ee","#1db5ee","#42ccff","#42ccff","#7ddcff","#7ddcff","#a6e7ff","#a6e7ff","#a6e7ff"],
                orientation: 'horizontal'
            },
            pie: {
                //color: ["#42ccff", "#fbd444"]
            }
        }
        return {
            restrict: 'A',
            scope: {
                // 何种类型的图表 bar line pie or 自定义option
                chart: '@',
                // echarts HightCharts
                //chartType: '@',
                config: '@',
                // 数据 格式: {category:[], data:[[],[],[]]}
                chartData: '=data',
                eventType: '@',
                eventHandler: '&',
                chartStyle: '@',
                tooltipFormatter: '&',
                // 更新数据时, legend没有更新,setOption(o, true);
                // @ http://echarts.baidu.com/api.html#echartsInstance.setOption
                updateNotMerge: '@',
                promise: '='
            },
            templateUrl: 'website-ui/chart/no-data.html',
            replace: false,
            compile: function(templateEle, templateAttrs){
                return function(scope, ele, attrs, ctrls){
                    //console.log(scope)
                    var computedStyle = window.getComputedStyle(ele[0]);
                    var height = computedStyle.getPropertyValue('height')
                    //没有设置height高度
                    if(height == '0px'){
                        ele.css({
                            height: '200px'
                        });
                    }
                    var config_ = {};
                    var style_ = {};
                    try{
                        if(scope.config){
                            config_ = JSON.parse(scope.config);
                        }
                        if(scope.chartStyle){
                            style_ = JSON.parse(scope.chartStyle);
                        }

                    } catch (e){

                    }
                    var config = angular.extend({}, defaultConfig, config_);
                    var style = defaultStyle[scope.chart];
                    var style_extend = angular.extend({}, style, style_);
                    var chartType = 'echarts';
                    //if(attrs.hasOwnProperty('echarts')){
                    //    chartType = 'echarts';
                    //}

                    function echartsInit(){
                        var chart_dom = ele.find('div').find('div')[0];
                        //alert(chart_dom.id);
                        var chartInstance = echarts.getInstanceByDom(chart_dom);
                        if (chartInstance){
                            chartInstance.dispose();
                        }
                        chartInstance = ChartService.getInstance(chart_dom, scope.chart, chartType);
                        if(scope.eventType && scope.eventHandler){
                            chartInstance.on(scope.eventType, function(param){
                                scope.eventHandler()(param);
                                //alert('a');
                            });
                            console.log('绑定事件成功');
                        }

                        window.onresize = function (evt) {
                            chartInstance.resize();
                        }
                        // if(config.showLoading){
                        //     chartInstance.showLoading();
                        // }
                        return chartInstance;
                    }

                    scope.$watch('promise.$$state.status', function (newValue, oldValue) {
                        if (newValue !== undefined){
                            if (newValue === 0){
                                /**
                                 * 重新加载
                                 * @type {boolean}
                                 */
                                scope.noData = false;
                                scope.$$loadingStatus = true;
                                chartInstance.showLoading();
                            } else if(newValue == 1){
                                /**
                                 * 如果promise重新加载了 但数据没有变化 则导致loading动画无法消失
                                 */
                                $timeout(function () {
                                    if (scope.$$loadingStatus){
                                        chartInstance.hideLoading();
                                    }
                                },0);
                            }
                        }
                    });

                    var chartInstance = echartsInit();

                    function paint(newValue) {
                        if(newValue !== undefined){
                            console.log(JSON.stringify(newValue));
                            try{
                                if(newValue.status === 'error'){
                                    chartInstance.hideLoading();
                                    scope.$$loadingStatus = false;
                                    chartInstance.clear();
                                    scope.noData = true;
                                    return;
                                }
                                var option = ChartService.getOption(scope.chart, newValue, style_extend, scope.tooltipFormatter, config);
                                chartInstance.hideLoading();
                                scope.$$loadingStatus = false;
                                var updateNotMerge = false;
                                if(scope.updateNotMerge === 'true'){
                                    updateNotMerge = true;
                                }
                                chartInstance.setOption(option, updateNotMerge);
                                scope.noData = false;
                                //scope.noData = true;
                            }catch (e){
                                console.error(e.message);
                                scope.noData = true;
                                chartInstance = echartsInit();
                                chartInstance.hideLoading();
                                scope.$$loadingStatus = false;
                            }
                        }
                    }

                    /**
                     * 数据变化的三种情况:
                     * 1. 引用变化 直接赋予了一个新值
                     * 2. 值变化 改变了原数据
                     * 3. 即引用变化, 又值变化 所以两种情况必须都要监听
                     */
                    scope.$watch('chartData', function(newValue, oldValue){
                        if (newValue !== undefined){
                            // console.log("值比较");
                            // var oldValueStr;
                            // if (oldValue != undefined){
                            //     oldValueStr = JSON.stringify(oldValue);
                            // }
                            // console.log("旧值:" + oldValueStr + ",新值" + JSON.stringify(newValue));
                            /**
                             * 如果直接执行paint方法 echarts会报错
                             * 所以将两个方法加入队列
                             */
                            $timeout(function () {
                               paint(newValue);
                            }, 0)
                        }

                    }, true);

                    /**
                     * 数据变化的三种情况:
                     * 1. 引用变化 直接赋予了一个新值
                     * 2. 值变化 改变了原数据
                     * 3. 即引用变化, 又值变化 所以两种情况必须都要监听
                     */
                    /**
                     * 解决 如果图表重新加载 还是加载不到数据 则无法触发上边的$watch函数 原因(值比较 一直是false 则无法触发)
                     */
                    scope.$watch('chartData', function(newValue, oldValue){
                        if (newValue !== undefined){
                            // console.log("引用比较")
                            // var oldValueStr;
                            // if (oldValue != undefined){
                            //     oldValueStr = JSON.stringify(oldValue);
                            // }
                            // console.log("旧值:" + oldValueStr + ",新值" + JSON.stringify(newValue));
                            /**
                             * 如果直接执行paint方法 echarts会报错
                             * 所以将两个方法加入队列
                             */
                            $timeout(function () {
                                paint(newValue);
                            }, 0)
                        }
                    });
                }
            }
        }
}]).run(['$templateCache', function($templateCache){
    var template = [];
    template.push('<div style="position: relative;height: 100%;">');
    template.push('<div style="height: 100%; width: 100%;"></div>');
    template.push('<div id="nodata_container" ng-if="noData" style="height: 100%; width: 100%; position: absolute; left: 0;top: 0;display: flex;align-items: center;justify-content: center">');
    template.push('<div><img src="data:image/png;base64,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" height="77" width="101"/> <p style="margin-top: 10px;text-align:center"></p></div>');
    template.push('</div>');
    $templateCache.put('website-ui/chart/no-data.html', template.join(''));
}]);

angular.module('ui.website.dialog', [
  'ui.website.dialog.service',
  'ui.website.dialog.directives'
])
angular.module('ui.website.dialog.directives', [])
    .directive('walert',['$timeout', function($timeout){
        return {
            restrict:'EA',
            transclude: true,
//        replace:true,
            templateUrl:'template/alert.html',
            compile: function(ele, attrs, transclude){
                function hide(){
                    ele.children().removeClass('in');
                    //为什么需要timeout 如果直接hide则没有动画效果 保持跟动画的效果一样多的延时
                    //TODO 需要改进
                    $timeout(function(){
                        ele.hide();
                    },150)
                };
                ele.show();
                return {
                    pre: angular.noop ,
                    post: function(scope, ele, attrs, ctrls){
                        ele.find('div.modal-footer').find('button').unbind('click').bind('click', function(evt){
                            hide();
                        });
                        ele.find('button.close').unbind('click').bind('click', function(evt){
                            hide();
                        });
                        //需要改动。
//              ele.children().addClass('in');
                        // 为什么需要timeout 理由同上
                        //TODO 需要改进
                        $timeout(function(){
                            ele.children().addClass('in');
                        },0);

                    }
                }
            }
        }
    }])
    .directive('wconfirm',['$timeout', function($timeout){
        return {
            restrict:'EA',
            transclude: true,
//        replace:true,
            templateUrl:'template/confirm.html',
            compile: function(ele, attrs, transclude){
                function hide(){
                    ele.children().removeClass('in');
                    //为什么需要timeout 如果直接hide则没有动画效果 保持跟动画的效果一样多的延时
                    //TODO 需要改进
                    $timeout(function(){
                        ele.hide();
                    },150)
                };
                ele.show();
                return {
                    pre: angular.noop ,
                    post: function(scope, ele, attrs, ctrls){
                        var children = ele.find('div.modal-footer').find('button');
                        angular.element(children[0])
                            .unbind('click')
                            .bind('click', function(evt){
//                    alert('我是success回调啊');
                                scope.ok();
                                hide();
                            });
                        angular.element(children[1])
                            .unbind('click')
                            .bind('click', function(evt){
                                hide();
                            });
                        ele.find('button.close').unbind('click').bind('click', function(evt){
                            hide();
                        });
                        //需要改动。
//              ele.children().addClass('in');
                        // 为什么需要timeout 理由同上
                        //TODO 需要改进
                        $timeout(function(){
                            ele.children().addClass('in');
                        },0);

                    }
                }
            }
        }
    }])
    .directive('wprompt',['$timeout', function($timeout){
        return {
            restrict:'EA',
            transclude: true,
//        replace:true,
            templateUrl:'template/confirm.html',
            compile: function(ele, attrs, transclude){
                function link(scope, ele, attrs, ctrls){
//        var self_ = this;
                    var children = ele.find('div.modal-footer').find('button');
                    angular.element(children[0])
                        .unbind('click')
                        .bind('click', function(evt){
                            if(!scope.option.ajax){
                                var result = scope.option.callback(ele.find('input').val());
                                if((typeof result === 'boolean' && result) || result === 1){
                                    hide();
                                }else{
                                    ele.find('input').parent().addClass('has-error').addClass('has-feedback');
                                }
                            }else{
                                scope.option.callback(ele.find('input').val(), function(data){
                                    if(scope.option.success){
                                        scope.option.success(data);
                                    }
                                    hide();
                                }, function(status){
                                    if(scope.option.error){
                                        scope.option.error(status);
                                    }
                                });
                            }
//                  hide();
                        });
                    angular.element(children[1])
                        .unbind('click')
                        .bind('click', function(evt){
                            hide();
                        });
                    ele.find('button.close').unbind('click').bind('click', function(evt){
                        hide();
                    });
                    $timeout(function(){
                        ele.children().addClass('in');
                    },0);
                }
                function hide(){
                    ele.children().removeClass('in');
                    //为什么需要timeout 如果直接hide则没有动画效果 保持跟动画的效果一样多的延时
                    //TODO 需要改进
                    $timeout(function(){
                        ele.hide();
                    },150);
                };
                ele.show();
                return link;
            }
        }
    }])
    .directive('wsDialog', ['$timeout', '$http', function($timeout, $http){
        return {
            restrict:'EA',
            scope: false,
            transclude: true,
            templateUrl:'template/dialog.html',
            compile: function(ele, attrs, transclude, ctrls){
                ele.show();
                ele[0].style.display = 'block';
                ele.children().addClass('in');
                ele.find('.modal-header .closeimg').on('click', function(){
                    ele[0].style.display = 'none';
                    ele.children().removeClass('in');
                    ele.remove();
                })
            }
        }
    }])
    .run(['$templateCache', function($templateCache){
        $templateCache.put('template/alert.html',
            '<div class="modal fade" style="display:block;">'+
            '<div class="modal-dialog modal-sm">'+
            '<div class="modal-content">'+
            '<div class="modal-header">'+
            '<div class="row">'+
            '<div class="col-md-9 col-lg-9">{{title}}</div>'+
            '<div class="col-md-3 col-lg-3">'+
            '<button type="button" class="close">'+
            '<span>×</span>'+
            '</button>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="modal-body text-center">'+
            '<p>'+
            '<div ng-transclude></div>'+
            '</p>'+
            '</div>'+
            '<div class="modal-footer">'+
            '<button type="button" class="btn btn-primary">确定</button>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="modal-backdrop fade"></div>'
        );
        $templateCache.put('template/confirm.html',
            '<div class="modal fade" style="display:block;">'+
            '<div class="modal-dialog modal-sm">'+
            '<div class="modal-content">'+
            '<div class="modal-header">'+
            '<div class="row">'+
            '<div class="col-md-9 col-lg-9">{{title}}</div>'+
            '<div class="col-md-3 col-lg-3">'+
            '<button type="button" class="close">'+
            '<span>×</span>'+
            '</button>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="modal-body text-center">'+
            '<p>'+
            '<div ng-transclude></div>'+
            '</p>'+
            '</div>'+
            '<div class="modal-footer">'+
            ' <button type="button" class="btn btn-primary">是</button>'+
            ' <button type="button" class="btn btn-danger" >否</button>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="modal-backdrop fade"></div>');

        $templateCache.put('template/dialog.html',
            '<div class="modal fade" style="display:block;">'+
            '<div class="modal-dialog" style="width:100%; padding:0 50px">'+
            '<div class="modal-content">'+
            '<div class="modal-header" style="position: relative;">'+
            '<h4>{{title}}</h4>'+
            '<span class="glyphicon glyphicon-remove closeimg"></span>'+
            '</div>'+
            '<div class="modal-body text-center">'+
            '<div ng-transclude></div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="modal-backdrop fade"></div>'
        );
//      $templateCache.put('template/prompt.html',
//              '<div class="modal fade" style="display:block;">'+
//              '<div class="modal-dialog modal-sm">'+
//              '<div class="modal-content">'+
//              '<div class="modal-header">'+
//              '<div class="row">'+
//              '<div class="col-md-9 col-lg-9">{{title}}</div>'+
//              '<div class="col-md-3 col-lg-3">'+
//              '<button type="button" class="close">'+
//              '<span>×</span>'+
//              '</button>'+
//              '</div>'+
//              '</div>'+
//              '</div>'+
//              '<div class="modal-body text-center">'+
//              '<p>'+
//              '<div ng-transclude></div>'+
//              '</p>'+
//              '</div>'+
//              '<div class="modal-footer">'+
//              ' <button type="button" class="btn btn-orz">是</button>'+
//              ' <button type="button" class="btn btn-default btn-large" >否</button>'+
//              '</div>'+
//              '</div>'+
//              '</div>'+
//              '</div>'+
//              '<div class="modal-backdrop fade"></div>');
    }]);
angular.module('ui.website.dialog.service', [])
    .factory('DialogService', ['$document','$compile','$rootScope', '$http', function($document, $compile, $rootScope, $http){
      return {
        alert: function(title, content){
          var walert = $document.find('walert');
          if(walert.length == 0){
            walert = angular.element('<walert title="'+title+'">'+content+'</walert>');
            $document.find('body').append(walert);

          }else{
            walert.html(content);
          }
          var scope = $rootScope.$new(false);
          if(!title){
            title = "警告";
          }
          scope.title = title;
          $compile(walert)(scope);
        },
        confirm: function(title, content, success){
          var wconfirm = $document.find('wconfirm');
          if(wconfirm.length == 0){
            wconfirm = angular.element('<wconfirm title="'+title+'" >'+content+'</wconfirm>');
            $document.find('body').append(wconfirm);

          }else{
            wconfirm.html(content);
            wconfirm.data('success', success);
          }
          var scope = $rootScope.$new(false);
          if(!title){
            title = "请确认";
          }
          scope.title = title;
          scope.ok = success;
          $compile(wconfirm)(scope);
        },
        prompt: function(option){
          var wprompt = $document.find('wprompt');
          if(!option){
            option = {};
            option.textType = "text";
          }

          if(!option.title){
            option.title = "请输入";
          }
          if(wprompt.length == 0){
            wprompt = angular.element('<wprompt title="'+option.title+'"><input type="'+option.textType+'" class="form-control" style="width: 70%; margin-left: 15%"/></wprompt>');
            $document.find('body').append(wprompt);
          }else{
            wprompt.html('<input type="'+option.textType+'" class="form-control" style="width: 70%; margin-left: 15%"/>');
          }
          var scope = $rootScope.$new(false);
//          if(!option.title){
//            option.title = "请输入";
//          }
//          scope.title = option.title;
//          scope.callback = option.callback;
          scope.option = option;
          scope.title = option.title;
          $compile(wprompt)(scope);
        },
        dialog: function(title, templateUrl, scope){
          // var scope = $rootScope.$new(false);
          var dialog;
          var dialog_id = uuid();
          var html = $http.get(templateUrl).success(function(res){
            dialog = angular.element('<ws-dialog >'+res + '</ws-dialog>');
            dialog.attr('id', dialog_id);
            $document.find('body').append(dialog);
            scope.title = title;
            $compile(dialog)(scope);
          })
          return dialog_id;
        },
        close: function(id){
          var dialog = angular.element('#' + id);
          dialog.remove();
        }
      }
    }])
angular.module('ui.website.fileupload', [])
.directive('fileUpload', ['$http', function ($http) {
    return {
        restrict: 'EA',
        scope: {
            url: '@',
            success: '&',
            multiple: '@',
            failure: '&'
        },
        templateUrl: 'template/fileupload.html',
        link: function(scope, ele, attrs, ctrls){
            var files = ele.find('input')[0].files;
            $http({
                method:'POST',
                url: scope.url,
                headers: {
                    'Content-Type': undefined
                },
                data: files,
                transformRequest: function (data, headersGetter) {
                    var formData = new FormData();
                    angular.forEach(data, function (value, key) {
                        formData.append(key, value);
                    });
                    return formData;
                }
            }).then(function(res){
                if(res.status == 200){
                    var data = res.data.data;
                    // var images = [];
                    // angular.forEach(data, function(value, index, context){
                    //     images.push(value.url);
                    // });
                    // $scope.ad.images = images;
                    // $scope.ad.category_id = $scope.childMenu;
                    // return $http.put('/ad/admin/ad/add1', $scope.ad);
                    scope.success(res.data.data);
                } else {
                    swal('文件上传失败,错误码为:', res.error.error_code + ', 错误原因:'+res.error.errorMsg);
                    scope.failure(error);
                }
            })
        }
    }
}]).run(['$templateCache', function ($templateCache) {
    var html = [];
    html.push('<div>');
    html.push('<input class="form-control" style="width: 250px" type="file"/>')
    // html.push('')
    html.push('</div>');
    $templateCache.put('template/fileupload.html', html.join(''));
}]);
angular.module('ui.website.loading', [])
    .factory('LoadingService', ['$rootScope', '$document', '$compile', '$timeout', function($rootScope, $document, $compile, $timeout){
        return {
            show: function (elementId, imageSrc) {
                var ele = $document.find('#' + elementId);
                this.showUseElement(ele);
            },
            showUseElement: function (ele, imageSrc) {
                if (ele.length > 0){
                    var loadingEle = ele.find('ws-loading');
                    if (loadingEle.length == 0){
                        var id = uuid();
                        var loadingDirective = angular.element('<ws-loading loading-img="'+imageSrc+'"></ws-loading>');
                        loadingDirective.attr('id', id);
                        ele.prepend(loadingDirective);
                        var scope = $rootScope.$new(true);
                        loadingEle = $compile(loadingDirective)(scope);
                    }

                    this.initSize(loadingEle);
                    $(ele.children()[1]).hide();

                    $timeout(function () {
                        loadingEle.show();
                        loadingEle.find('div').show();
                    }, 0)
                    return loadingEle.attr('id');
                } else {
                    console.error("LoadingService : no element found!!!")
                }
            },
            hide: function (elementId) {
                var ele = $document.find('#' + elementId);
                this.hideUseElement(ele);
            },
            hideUseElement: function (ele) {
                var loadingEle = ele.find('ws-loading');
                loadingEle.hide();
                $(ele.children()[1]).show();
            },
            initSize: function (ele) {
                var parent = ele.parent();
                var width = parent.width();
                var minHeight = 100;
                var height = parent.height() >= minHeight ? parent.height(): minHeight;
                var children = ele.children();
                $(children[0]).css({
                    height: height + 'px',
                    width: width + 'px'
                });
                ele.css({
                    height: height + 'px',
                    width: width + 'px'
                });
            }
        }
    }])
    .directive('wsLoading', ['$timeout', '$rootScope', 'LoadingService', function($timeout, $rootScope, LoadingService){
        function link(scope, ele, attr, ctrl) {

            scope.status = 'loading';

            scope.$watch('promise.$$state.status', function (newValue, oldValue) {
                if (newValue !== undefined){
                    if (newValue === 0){
                        LoadingService.showUseElement(ele.parent(), scope.loadingImg);
                    } else {
                        LoadingService.hideUseElement(ele.parent(), scope.loadingImg);
                    }
                }
            });

            // $rootScope.$on('$wsLoading:loadSuccess', function (evt, id) {
            //     scope.status = 'success';
            //     if(ele.attr('id') == id){
            //         ele.remove();
            //     }
            // });
            //
            // $rootScope.$on('$wsLoading:loadError', function (evt, id) {
            //     scope.status = 'error';
            //     if(ele.attr('id') == id){
            //         ele.remove();
            //     }
            // });
            //
            // $rootScope.$on('$wsLoading:loadNoData', function (evt, id) {
            //     scope.status = 'noData';
            //     if(ele.attr('id') == id){
            //         ele.remove();
            //     }
            // });
        }

        return {
            restrict:'EA',
            transclude: true,
            templateUrl:'template/ws-loading.html',
            scope:{
                loadingImg: '@',
                noDataImg: '@',
                loadErrorImg: '@',
                promise: '='
            },
            compile: function (ele, attrs, transclude) {
                $timeout(function () {
                    LoadingService.initSize(ele);
                    ele.css({
                        position: 'absolute',
                        'zIndex': 101,
                        background: '#fff'
                    });
                }, 0);
                return link;
            }
        }
    }])
    .run(['$templateCache', function($templateCache){
        var html = [];
        html.push('<div style="position: relative; display: none"><div style="display:inline-block;position:absolute; top:50%; left:50%; transform: translate(-50%, -50%);" >');
        html.push('<img ng-if="status == \'loading\'" ng-src="{{$parent.loadingImg}}"/>')
        html.push('<img ng-if="status == \'success\'" ng-src="{{$parent.successImg}}"/>')
        html.push('<img ng-if="status == \'error\'" ng-src="{{$parent.errorImg}}"/>')
        html.push('<img ng-if="status == \'noData\'" ng-src="{{$parent.noDataImg}}"/>')
        html.push('</div>')
        html.push('</div>');
        $templateCache.put('template/ws-loading.html', html.join(''));
    }]);
/**
 * obj.time = '0.00'
 *  obj.currentPlayDuration = 0;
 *  author:Benjamin
 */
angular.module("ui.website.player",[])
    .controller("MusicPlayerCtrl",['$scope',function($scope){
      $scope.mode = 'order';
      var currentIndex = $scope.currentIndex = 0;
      $scope.volume = 100;
      $scope.autoplay = true;
      $scope.isPlaying = true;
      $scope.list = (function(){return $scope.list;})();
      if(!angular.isArray($scope.list)||$scope.list.length == 0){
        var obj = {};
        obj.url = "";
        obj.title = "";
        obj.artist = '';
        obj.special = '';
        $scope.currentMusic = obj;
      }else{
        $scope.currentMusic = $scope.list[currentIndex];
      }
    }])
    .directive('musicplayer',['$document','MusicPlayerService',function($document,MusicPlayerService){
      var imageRotateInterval;
      var initalRotate = 0;
      function imageRotation(ele){
        //图片转动角度
        imageRotateInterval = setInterval(function(){
          initalRotate += 2;
          if(initalRotate >= 360)
            initalRotate = 0;
          ele.style.cssText = '-webkit-transform:rotate('+initalRotate+'deg);' +
              '-moz-transform:rotate('+initalRotate+'deg);' +
              '-o-transform:rotate('+initalRotate+'deg);' +
              'transform:rotate('+initalRotate+'deg)';
        },50);
      }
      var link = function(scope,ele,attrs,controller){
        var audio = new Audio(scope.currentMusic.url);
        ele.append(audio);
//            audio.src = scope.currentMusic.url;
        //播放进度条
        var duration_progress = $document[0].getElementById('duration');
        //音量
        var volume_progress = $document[0].getElementById('volume');
        //下一首
        var nextSongBtn = $document[0].getElementById('nextSong');
        //播放,暂停
        var playBtn = $document[0].getElementsByName('play');
        //光盘,转动div
        var music_img = $document[0].getElementById('music_img');
        //
        var length = duration_progress.offsetWidth;
        /**
         * 音量进度条绑定事件
         */
        angular.element(volume_progress).on('click',function(evt){
          console.log(evt.offsetX);
          audio.volume = evt.offsetX/this.offsetWidth;
          scope.$apply(function(){
            scope.volume = Math.round(this.volume * 100);
          }.bind(audio));
        });
        /**
         * 下一首
         */
        angular.element(nextSongBtn).on('click',function(evt){
          scope.$apply(function(){
            scope.currentMusic = MusicPlayerService.getNext(scope);
          });
//          scope.currentIndex ++;
        });
        scope.$watch('currentMusic',function(newVaule,oldValue){
          audio.src = newVaule.url;
        });
        /**
         * 播放暂停
         */
        angular.forEach(playBtn,function(ele,i){
          angular.element(ele).on('click',function(evt){
            var isPlaying = true;
            if(audio.paused){
              audio.play();
              imageRotation(music_img);
              isPlaying = true;
            }else{
              audio.pause();
              if(imageRotateInterval){
                clearInterval(imageRotateInterval);
                imageRotateInterval = null;
              }
              isPlaying = false;
            }
            scope.$apply(function(){
              scope.isPlaying = isPlaying;
            })
          });
        });

        /**
         * 音乐加载完毕
         * @param e
         */
        var canPlayThroughHandler = function(e){
          var self_ = this;
          scope.loaded = true;
          var time = this.duration;
          var minute = Math.floor(time/60);
          var second = Math.ceil(time - minute * 60);
          var format_time = minute +':' + second;
          if(typeof scope.volume === 'number'){
            this.volume = scope.volume/100;
          }
          scope.$apply(function(){
            if(typeof scope.volume !== 'number'){
              scope.volume = Math.round(Math.random()*100);
            }
//            scope.currentMusic.time = format_time;
          }.bind(this));
          /**
           * 播放进度条绑定事件
           */
          angular.element(duration_progress).on('click',function(evt){
            console.log(evt.offsetX);
            var x = Math.ceil(evt.offsetX/length*100);
            var duration = time*(evt.offsetX/length);
            self_.currentTime = duration;
            scope.$apply(function(){
              scope.currentMusic.currentPlayDuration = x;
            });
          });

          var timeUpdateHandler = function(e){
            var currentTime = this.currentTime;
            var minute = Math.floor(currentTime/60);
            var second = Math.ceil(currentTime - minute * 60);
            if(second == 60){
              minute ++;
              second = 0;
            }
            var format_time = minute +':' + (second < 10 ? '0' + second : second);
            var time = this.duration;
            var format_currentTime = Math.ceil(currentTime/time*100);
            //如果不加 setTimeout 会报一个error($apply already in progress error)
            setTimeout(function(){
              scope.$apply(function(){
                scope.currentMusic.currentPlayDuration = format_currentTime;
                scope.currentMusic.time = format_time;
              });
            },0);
          };
          /**
           *
           */
          audio.addEventListener('timeupdate',timeUpdateHandler,true);
          var isPlaying = true;
          if(scope.autoplay){
            audio.play();
            isPlaying = true;
            if(!imageRotateInterval){
              imageRotation(music_img);
            }
          }else{
            isPlaying = false
          }
          scope.$apply(function(){
            scope.isPlaying = isPlaying;
          });
          audio.addEventListener('ended',function(){
            scope.$apply(function(){
              scope.currentMusic = MusicPlayerService.getNext(scope);
            });
//            scope.currentIndex ++;
          },true);
        };
        audio.addEventListener('canplaythrough',canPlayThroughHandler,true);
      };

      return {
        'restrict':'E',
        'scope':{
          'list':'='
        },
        controller:'MusicPlayerCtrl',
        compile:function(tElement,tAttrs,translude){
          return link;
        },
        templateUrl: 'template/musicplayer.html',
        replace:true
      }
    }])
    .factory('MusicPlayerService',function(){
        return {
          getNext : function(scope){
            var list = scope.list;
            var mode = scope.mode;
            if(!angular.isArray(list)||list.length == 0){
              return null;
            }
            if(list.length == 1)
              return list[0];
            var length = list.length;
            switch (mode.toLowerCase().trim()){
              case 'random':
                scope.currentIndex = Math.ceil(Math.random()*length) - 1;
                break;
              case 'order':
                scope.currentIndex ++;
                if(scope.currentIndex >=length){
                  scope.currentIndex = 0;
                }
                break;
            }
            return list[scope.currentIndex];
          }
        }
    }).run(['$templateCache',function($templateCache){
      $templateCache.put('template/musicplayer.html','<div>'+
          '<div class="player-panel">'+
          '<div class="row">'+
            '<div class="col-md-4">'+
              '<div class="music-img" id = "music_img"></div>'+
              '<div ng-class="isPlaying ? \'pause-ab ctrl\' : \'play-ab ctrl\'" name="play"></div></div>'+

            '<div class="col-md-8">'+
              '<div class="">标题:{{currentMusic.title}}</div>'+
              '<div><div class=" ">歌手:{{currentMusic.artist}}</div>'+
                '<div class=" ">专辑:{{currentMusic.special}}</div></div>'+
              '<div><div class="progress duration" id="duration">'+
                  '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: {{currentMusic.currentPlayDuration}}%"></div></div>'+
                '<div style="float: left;margin-left:5px;">{{currentMusic.time}}</div>'+
                '<ul style="clear:both;">'+
                  '<li ng-class="isPlaying ? \'pause ctrl\' : \'play ctrl\'" name="play"></li>'+
                  '<li class="ctrl next" id="nextSong"></li>'+
                  '<li class="ctrl ctrl-sm volume"></li>'+
                  '<li>'+
                    '<div class="progress volume-bar" id="volume">'+
                      '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: {{volume}}%">'+
                      '</div>'+
                    '</div>'+
                  '</li>'+
                  '<li style="margin-top: 6px;margin-left: 5px;">{{volume}}%</li>'+
                '</ul>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '</div>'+
      '</div>');
    }]);
angular.module('ui.website.select', [
    'ui.bootstrap',
    'ui.website.select.directives'
])
angular.module('ui.website.select.directives', ['ui.bootstrap.position'])
    .directive('wsSelect',['$compile', '$document', '$uibPosition', '$timeout', function($compile, $document, $uibPosition, $timeout){
        return {
            restrict:'EA',
            replace:true,
            templateUrl:'template/wsSelect.html',
            require: ['ngModel'],
            transclude: true,
            // templateUrl: 'uib/template/typeahead/typeahead-popup.html',
            scope:{
                options: '=?',
                'onSelected': '&',
                config: '@'
            },
            compile: function(ele, attrs, transclude){
                return {
                    pre: angular.noop ,
                    post: function(scope, ele, attrs, ctrls){
                        var ngModelCtrl = ctrls[0];

                        scope.config = scope.config || {};
                        scope.config.displayFieldName = scope.config.displayFieldName || 'key';
                        scope.config.valueFieldName = scope.config.valueFieldName || 'value';

                        var id = uuid();
                        var unparseEle = angular.element('<div ws-select-container></div>');
                        unparseEle.attr({
                            id: id
                        });
                        var selectContainer = $compile(unparseEle)(scope);
                        $timeout(function(){
                            scope.containerStyle = {
                                width: ele.width() + 'px'
                            }
                        }, 0)

                        ele.append(selectContainer);
                        // var position = $uibPosition.position(ele);
                        // console.log(position);
                        $(ele).bind('click', function(evt){
                            evt.stopPropagation();
                            var li = selectContainer.find('li');
                            if(li){
                                var value = ngModelCtrl.$modelValue;
                                li.removeClass('active');
                                angular.forEach(li, function(obj, i){
                                    if($(obj).attr('value') === value){
                                        $(obj).addClass('active');
                                        scope.currentSelected = ngModelCtrl.$modelValue;
                                    }
                                })
                            }
                            selectContainer.show();
                        });
                        $document.bind('click', function (evt) {
                            selectContainer.hide();
                        });

                        function render() {
                            console.log('ngModel value changed!!!');
                            var value = ngModelCtrl.$modelValue;
                            scope.currentSelected = ngModelCtrl.$modelValue;
                            angular.forEach(scope.options, function(obj){
                                if(obj[scope.config.valueFieldName] === value){
                                    ele.find('div').html(obj[scope.config.displayFieldName]);
                                }
                            })
                            var li = selectContainer.find('li');
                            if(li){
                                li.removeClass('active');
                                angular.forEach(li, function(obj, i){
                                    if($(obj).attr('value') === value){
                                        $(obj).addClass('active');
                                    }
                                })
                            }
                        };

                        ngModelCtrl.$render = render;
                        scope.$watch('options', function(newValue){
                            if(newValue && newValue.length > 0){
                                var value = ngModelCtrl.$modelValue;
                                if(value){
                                    angular.forEach(newValue, function(obj){
                                        if(obj[scope.config.valueFieldName] === value){
                                            ele.find('div').html(obj[scope.config.displayFieldName]);
                                        }
                                    })
                                }
                                $timeout(function(){

                                    var li = selectContainer.find('li');

                                    li.bind('click', onOptionSelected);

                                    function onOptionSelected(evt){
                                        var self_ = this;
                                        scope.$evalAsync(function () {
                                            onOptionSelectedInner(self_, evt);
                                        })
                                    }

                                    var onOptionSelectedInner = function(self_, evt){
                                        evt.stopPropagation();
                                        li.removeClass('active');
                                        $(self_).addClass('active');
                                        selectContainer.hide();
                                        selectContainer.css(
                                            'display', 'none'
                                        );
                                        var display = $(self_).find('a').find('span').html();
                                        ele.find('div').html(display);
                                        var optionValue = $(self_).attr('value');
                                        ngModelCtrl.$setViewValue(optionValue);
                                        scope.currentSelected = optionValue;
                                        scope.onSelected(value, evt);
                                        console.log('changed: ', display, optionValue);
                                    }


                                    scope.clickCallback = function(value, evt){
                                        //TODO 代码要重写
                                        var target = evt.target;
                                        if(target.tagName.toLowerCase() == 'a'){
                                            target = $(target).parent();
                                        }
                                        var li = target, self_ = target;
                                        evt.stopPropagation();
                                        li.removeClass('active');
                                        $(self_).addClass('active');
                                        selectContainer.hide();
                                        selectContainer.css(
                                            'display', 'none'
                                        );
                                        var display = $(self_).find('a').find('span').html();
                                        ele.find('div').html(display);
                                        var optionValue = $(self_).attr('value');
                                        ngModelCtrl.$setViewValue(optionValue);
                                        scope.currentSelected = optionValue;
                                        scope.onSelected(value, evt);
                                        console.log('changed: ', display, optionValue);

                                    }
                                    li.bind('mouseenter', function(evt){
                                        var self_ = this;
                                        li.removeClass('active');
                                        $(self_).addClass('active');
                                    })
                                }, 0)
                            }
                        }, true);

                        if(attrs.options === undefined){
                            var options = ele.find('option');
                            if(options.length == 0){
                                throw new Error('options参数没有设置,并且没有找到option元素!!!')
                            }
                            console.log("use option html, options size:" + options.length);
                            var optionsArr = [];
                            angular.forEach(options, function(optionEle, i){
                                var optionItem = {};
                                optionItem[scope.config.valueFieldName] = $(optionEle).attr("value");
                                optionItem[scope.config.displayFieldName] = $(optionEle).html();
                                optionsArr.push(optionItem);
                            })
                            scope.options = optionsArr;
                        }
                    }
                }
            }
        }
    }])
    .directive('wsSelectContainer', [function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/wsSelectContainer.html',
        }
    }])
    .run(['$templateCache', function ($templateCache) {
        var html = [];
        html.push('<div style="position: relative;">' +
            // '<input type="text" style="border-radius: 4px" class="form-control" >' +
            '<div style="border-radius: 4px" class="form-control" ></div>' +
            '<i class="fa fa-sort" style="position: absolute;right: 5px;top: 0px;height: 100%;padding-top: 10px; transform: scaleX(0.8)"></i>' +
            '<div role="options" style="display: none" ng-transclude></div>'+
            '</div>');
        $templateCache.put('template/wsSelect.html', html.join(''));

        // ng-click=\"clickCallback(option.value, $event)\"
        $templateCache.put("template/wsSelectContainer.html",
            "<ul class=\"dropdown-menu\" ng-style='containerStyle' style='max-width: 800px;max-height: 400px;overflow-y: scroll;box-shadow: 0 6px 12px rgba(0,0,0,.175);border: 1px solid #ccc;'>\n" +
            "    <li class=\"ws-select-option\" value='{{option[config.valueFieldName]}}' ng-repeat=\"option in options track by $index\"  role=\"option\" >\n" +
            "        <a style='padding-left: 5px'><i style='margin-right: 5px;visibility: {{option[config.valueFieldName] == currentSelected ? \"visible\" : \"hidden\"}}' class='fa fa-check'></i><span>{{option[config.displayFieldName]}}</span></a>" +
            "    </li>\n" +
            "</ul>\n" +
            "");
    }])
function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}