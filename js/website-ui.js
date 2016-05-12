/**
 * Create by benjamin at 2014/7/4
 * main script
 */
angular.module("ui.website",[
    'ui.website.player',
    'ui.website.dialog',
    'ui.website.chart'
])
/**
 * Create by benjamin at 2014/7/4
 * echarts main script
 */
angular.module("ui.website.chart",[])
    .service('ChartService', [function(){
        /**
         * highcharts 类型
         * @type
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
                            "margin":15
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
                    data: []
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
                        center: ['50%', '45%'],
                        radius: ['50', '80'],
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
                        return highcharts.init(dom);
                    }
                } else if(defaultEChartOptionsMap.hasOwnProperty(chart)){
                    return echarts.init(dom);
                }else if(defaultHighchartOptionsMap.hasOwnProperty(chart)){
                    return highcharts.init(dom);
                }
            },
            getOption: function(chart, originalData, style){
                if(!chart){
                    return originalData;
                }
                var option = defaultEChartOptionsMap[chart];
                var y = originalData.data;
                var x = originalData.category;
                var yAxisDatas = [];
                var series = [];
                if(chart == 'bar'){

                    for(var j = 0; j < y.length; j++){
                        var perData = y[j];
                        var formatData = [];
                        var seriesItem = {
                            name: '',
                            type: 'bar',
                            barWidth: 30,
                            data:[]
                        }
                        for(var i = 0; i < perData.length; i++){
                            var item = {
                                name: x[i],
                                data: perData[i]
                            }
                            formatData.push(item);
                        }
                        // array 浅copy一份
                        var formatDataCopy = formatData.concat();
                        formatDataCopy.sort(function(a, b){
                            return Number(b.data) - Number(a.data);
                        });
                        for(var i = 0; i < formatDataCopy.length; i++){
                            formatDataCopy[i].color = style.color[i % style.color.length];
                        }
                        for(var i = 0 ; i < formatData.length; i++){
                            var yAxisDataItem = {
                                "value": formatData[i].data,
                                "name": formatData[i].name,
                                "itemStyle":{
                                    "normal":{
                                        "color":formatData[i].color,
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
                            yAxisDatas.push(yAxisDataItem);
                        }
                        seriesItem.data = yAxisDatas;
                        series.push(seriesItem);
                    }

                    option.series = series;
                    option.xAxis[0].data = originalData.category;
                    return option;
                }else if (chart == 'pie'){
                    for(var j =0 ; j< y.length; j++){
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
                                        color: style.color[i % style.color.length]
                                    },
                                    emphasis: {
                                        label: {
                                            show:false
                                        }
                                    }
                                }
                            }
                            yAxisDatas.push(yAxisDataItem);
                        }
                        option.series[j].data = yAxisDatas;
                        option.legend.data = originalData.category;
                        return option;
                    }
                }
            }
        }
    }])
    .directive('chart', ['ChartService', function(ChartService){
        var defaultConfig = {
            // 是否显示loading画面
            showLoading: true,
            // 是否排序
            order: true,
            // 是否限制显示
            limit: 10,
            // 没有数据时的提示
            noDataTemplateUrl: 'templates/echarts/no-data.html'
        };
        // 默认的样式
        var defaultStyle = {

            bar: {
                color: ["#03a7e5","#03a7e5","#1db5ee","#1db5ee","#42ccff","#42ccff","#7ddcff","#7ddcff","#a6e7ff","#a6e7ff","#a6e7ff"],
                orientation: 'horizontal'
            },
            pie: {
                color: ["#42ccff", "#fbd444"]
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
                data: '=',
                chartStyle: '@'
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
                    var chartType;
                    if(attrs.hasOwnProperty('echarts')){
                        chartType = 'echarts';
                    } else if(attrs.hasOwnProperty('highcharts')){
                        chartType = 'highcharts';
                    }
                    var chart_dom = ele.find('div').find('div')[0];
                    //alert(chart_dom.id);
                    var chartInstance = ChartService.getInstance(chart_dom, scope.chart, chartType);
                    if(config.showLoading){
                        chartInstance.showLoading();
                    }
                    scope.$watch('data', function(newValue, oldValue){
                        if(newValue){
                            try{
                                var option = ChartService.getOption(scope.chart, newValue, style_extend);
                                chartInstance.hideLoading();
                                chartInstance.setOption(option);
                                scope.noData = false;
                                //scope.noData = true;
                            }catch (e){
                                console.error(e.message);
                                chartInstance.hideLoading();
                                scope.noData = true;
                            }
                        }
                    });
                }
            }
        }
}]).run(['$templateCache', function($templateCache){
    var template = [];
    template.push('<div style="position: relative;height: 100%;">');
    template.push('<div style="height: 100%; width: 100%;">');
    template.push('</div>');
    template.push('<div ng-if="noData" style="height: 100%; width: 100%; position: absolute; left: 0;top: 0;;">暂无数据</div></div>');
    $templateCache.put('website-ui/chart/no-data.html', template.join(''));
}])
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
    }]).run(['$templateCache', function($templateCache){
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
                '<button type="button" class="btn btn-orz">确定</button>'+
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
              ' <button type="button" class="btn btn-orz">是</button>'+
              ' <button type="button" class="btn btn-default btn-large" >否</button>'+
              '</div>'+
              '</div>'+
              '</div>'+
              '</div>'+
              '<div class="modal-backdrop fade"></div>');
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
    .factory('DialogService', ['$document','$compile','$rootScope', function($document, $compile, $rootScope){
      return {
        alert: function(content, title){
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
        confirm: function(content, success, title){
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
        }
      }
    }])
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