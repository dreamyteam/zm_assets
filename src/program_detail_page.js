 // 基于准备好的dom，初始化echarts实例
        var chartComprehensiveValue = echarts.init(document.getElementById('chart_comprehensive_value'));
        var chartPotentialModel = echarts.init(document.getElementById('chart_potential_model'));
        var chartHeatTrend = echarts.init(document.getElementById('chart_heat_trend'));
        var chartTransmissionIndex = echarts.init(document.getElementById('chart_transmission_index'));
        var charMediaPlatform = echarts.init(document.getElementById('chart_media_platform'));
        var chartSocialPlatform = echarts.init(document.getElementById('chart_social_platform'));
        var chartUserVitalty = echarts.init(document.getElementById('chart_user_vitalty'));
        var chartSexDistribution = echarts.init(document.getElementById('chart_sex_distribution'));
        var chartAgeDistribution = echarts.init(document.getElementById('chart_age_distribution'));  
        var chartReviews = echarts.init(document.getElementById('chart_reviews'));

        // 指定图表的配置项和数据
        optionComprehensiveValue = {
            tooltip : {
                trigger: 'item',
                position: 'top',
                formatter:'{c}',
                backgroundColor:'#00A69D',
                padding:[0,12],
            },
            grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    axisLine: {
                         lineStyle:{
                            color: '#EFEFEF',
                        }
                    },
                    axisLabel:{
                        show:false,
                    },
                    splitLine:{
                        interval:1, //间隔x坐标轴线
                        lineStyle:{
                            color: '#EFEFEF',
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine: {
                         lineStyle:{
                            color: '#EFEFEF',
                        }
                    },
                    splitLine:{
                        lineStyle:{
                            color: '#EFEFEF',
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                }
            ],
            series : [
                {
                    name:'综合指数',
                    type:'line',
                    symbolSize: 10,
                    lineStyle:{
                        normal:{
                          color: '#00A69D' ,
                          width: 2,
                        },
                    },
                    areaStyle: {
                        normal: {
                          color: '#00A69D',
                          opacity: 0.2
                        }
                    },
                    data:[120, 132, 101, 134, 90, 230, 210, 0 ,2 ,230]
                }
            ],
            color:['#00A69D']
        };

        optionPotentialModel = {
                tooltip: {
                    show: false,
                    showContent:false,
                },
                radar: {
                    nameGap:10,
                    name:{
                        textStyle:{
                            color:'#000',
                            fontFamily:'Pingfang SC',
                            fontSize:14,
                        },
                    },
                    indicator: [
                       { name: '热度', max: 60000},
                       { name: '开发空间', max: 60000},
                       { name: '传播', max: 60000},
                       { name: '口碑', max: 60000},
                       { name: '消费能力', max: 60000},
                    ],
                    splitArea:{
                          areaStyle:{
                            color:['rgba(250,250,250,0)'],
                        }
                    },
                    splitLine:{
                        lineStyle:{
                            color: '#d8d8d8',
                        }
                    }
                },
                series: [{
                    name: '潜力模型',
                    type: 'radar',
                    symbol:'circle',
                    symbolSize:8,
                    lineStyle:{
                        normal:{
                            width:3
                        }
                    },
                    areaStyle: {
                        normal: {
                          color: '#00A69D',
                          opacity: 0.2
                        }
                    },
                    data : [
                        {
                            value : [4300, 10000, 28000, 35000, 50000, 19000],
                            name : '潜力模型'
                        }
                    ]
                }],
                color:['#00A69D']
        }

        optionHeatTrend= {
            title: {
                text:'一周热度趋势',
                textStyle:{
                    color:'#4a4a4a',
                    fontFamily:'pingfang SC',
                    fontSize:16
                }
            },
            tooltip : {
                trigger: 'item',
                position: 'top',
                formatter:'{c}',
                backgroundColor:'#00A69D',
                padding:[0,12],
            },
            legend: {
                data:[{
                    name:'斗破苍穹',
                    icon:'rect',
                    textStyle:{
                        color:'#4a4a4a',
                        fontSize:14
                    }    
                }]
            },
            grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    axisLine: {
                         lineStyle:{
                            color: '#EFEFEF',
                        }
                    },
                    axisLabel:{
                        show:false,
                    },
                    splitLine:{
                        interval:1, //间隔x坐标轴线
                        lineStyle:{
                            color: '#EFEFEF',
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine: {
                         lineStyle:{
                            color: '#EFEFEF',
                        }
                    },
                    splitLine:{
                        lineStyle:{
                            color: '#EFEFEF',
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                }
            ],
            series : [
                {
                    name:'斗破苍穹',
                    type:'line',
                    symbolSize: 10,
                    lineStyle:{
                        normal:{
                          color: '#00A69D' ,
                          width: 2,
                        },
                    },
                    areaStyle: {
                        normal: {
                          color: '#00A69D',
                          opacity: 0.2
                        }
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    },
                    data:[120, 132, 101, 134, 90, 230, 210, 0 ,2 ,230]
                }
            ],
            color:['#00A69D']
        }

        optionTransmissionIndex ={
            tooltip : {
                trigger: 'item',
                position: 'top',
                formatter:'{c}',
                backgroundColor:'#00A69D',
                padding:[0,12],
            },
            grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    axisLine: {
                         lineStyle:{
                            color: '#EFEFEF',
                        }
                    },
                    axisLabel:{
                        show:false,
                    },
                    splitLine:{
                        interval:1, //间隔x坐标轴线
                        lineStyle:{
                            color: '#EFEFEF',
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine: {
                         lineStyle:{
                            color: '#EFEFEF',
                        }
                    },
                    splitLine:{
                        lineStyle:{
                            color: '#EFEFEF',
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                }
            ],
            series : [
                {
                    name:'传播指数',
                    type:'line',
                    symbolSize: 10,
                    lineStyle:{
                        normal:{
                          color: '#00A69D' ,
                          width: 2,
                        },
                    },
                    areaStyle: {
                        normal: {
                          color: '#00A69D',
                          opacity: 0.2
                        }
                    },
                    data:[120, 132, 101, 134, 90, 230, 210, 0 ,2 ,230]
                }
            ],
            color:['#00A69D']
        }

        optionMediaPlatform = {
            title: {
                text:'在新闻媒体平台的传播构成',
                subtext:'平台的传播推动能力较大',
                left:'center',
                textStyle:{
                    color:'#4a4a4a',
                    fontFamily:'pingfang SC',
                    fontSize:16
                },
                subtextStyle:{
                    color:'#9b9b9b',
                    fontFamily:'pingfang SC',
                    fontSize:14
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{c}"
            },
            series: [
                {
                    name:'平台传播能力推动',
                    type:'pie',
                    startAngle:140,
                    radius: ['40%', '65%'],
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: true,
                            textStyle:{
                                color:'#4a4a4a',
                                fontFamily:'pingfang SC',
                                fontSize:16,
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:12, name:'凤凰'},
                        {value:32, name:'网易'},
                        {value:28, name:'虎嗅'},
                        {value:18, name:'腾讯'},
                        {value:9, name:'起点'}
                    ]
                }
            ],
            color:['#00A69D','#84D2CD','#EEEEEE','#84D2CD','#EEEEEE']
        }

        optionSocialPlatform = {
            title: {
                text:'社交媒体平台传播构成',
                left:'center',
                textStyle:{
                    color:'#4a4a4a',
                    fontFamily:'pingfang SC',
                    fontSize:16
                },
            },
            legend: {
                left:'center',
                top: 30,
                data:[
                    {name:'微博',icon:'rect'},
                    {name:'微信',icon:'rect'}
                ]
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b}:{c}"
            },
            series: [
                {
                    name:'社交媒体平台',
                    type:'pie',
                    startAngle:240,
                    minAngle:50,
                    roseType: 'radius',
                    radius: ['30%', '65%'],
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: true,
                            formatter:'{c}',
                            position:'inside',
                            textStyle:{
                                color:'#4a4a4a',
                                fontFamily:'pingfang SC',
                                fontSize:16,
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {
                            value:234354,
                            name:'微信',
                            label:{
                                normal:{
                                    show:true,
                                    formatter:'{c}',
                                    position:'inside',
                                    textStyle:{
                                        color:'#fff',
                                        fontFamily:'pingfang SC',
                                        fontSize:16,
                                    }
                                }
                            }    
                        },
                        {
                            value:33354, 
                            name:'微博',
                            label:{
                                normal:{
                                    show:true,
                                    formatter:'{c}',
                                    position:'inside',
                                    textStyle:{
                                        color:'#19a69d',
                                        fontFamily:'pingfang SC',
                                        fontSize:16,
                                    }
                                }
                            }    
                        },
                    ]
                }
            ],
            color:['#84D2CD','#EEEEEE','#84D2CD','#EEEEEE','#84D2CD']
        }

        optionUserVitalty = {
            title: {
                text:'用户活跃度趋势',
                textStyle:{
                    color:'#4a4a4a',
                    fontFamily:'pingfang SC',
                    fontSize:16
                }
            },
            tooltip : {
                trigger: 'item',
                position: 'top',
                formatter:'{c}',
                backgroundColor:'#00A69D',
                padding:[0,12],
            },
            legend: {
                data:[{
                    name:'斗破苍穹',
                    icon:'rect',
                    textStyle:{
                        color:'#4a4a4a',
                        fontSize:14
                    }    
                }]
            },
            grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    axisLine: {
                         lineStyle:{
                            color: '#EFEFEF',
                        }
                    },
                    axisLabel:{
                        show:false,
                    },
                    splitLine:{
                        interval:1, //间隔x坐标轴线
                        lineStyle:{
                            color: '#EFEFEF',
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine: {
                         lineStyle:{
                            color: '#EFEFEF',
                        }
                    },
                    splitLine:{
                        lineStyle:{
                            color: '#EFEFEF',
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                }
            ],
            series : [
                {
                    name:'斗破苍穹',
                    type:'line',
                    symbolSize: 10,
                    lineStyle:{
                        normal:{
                          color: '#00A69D' ,
                          width: 2,
                        },
                    },
                    areaStyle: {
                        normal: {
                          color: '#00A69D',
                          opacity: 0.2
                        }
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    },
                    data:[120, 132, 101, 134, 90, 230, 210, 0 ,2 ,230]
                }
            ],
            color:['#00A69D']
        }

        optionSexDistribution = {
            title: {
                text:'受众性别分布',
                subtext:'受众比较均衡，更多偏向于男性年轻人',
                left:'center',
                textStyle:{
                    color:'#4a4a4a',
                    fontFamily:'pingfang SC',
                    fontSize:16
                },
                subtextStyle:{
                    color:'#9b9b9b',
                    fontFamily:'pingfang SC',
                    fontSize:14                    
                }
            },
            legend: {
                left:'center',
                top: 30,
                data:[
                    {name:'微博',icon:'rect'},
                    {name:'微信',icon:'rect'}
                ]
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b}:{c}"
            },
            series: [
                {
                    name:'社交媒体平台',
                    type:'pie',
                    startAngle:240,
                    minAngle:50,
                    // roseType: 'radius',
                    radius: ['30%', '65%'],
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: true,
                            formatter:'{c}',
                            position:'inside',
                            textStyle:{
                                color:'#4a4a4a',
                                fontFamily:'pingfang SC',
                                fontSize:16,
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {
                            value:234354,
                            name:'男性',
                            label:{
                                normal:{
                                    show:true,
                                    formatter:'{b}',
                                    position:'inside',
                                    textStyle:{
                                        color:'#fff',
                                        fontFamily:'pingfang SC',
                                        fontSize:16,
                                    }
                                }
                            }    
                        },
                        {
                            value:33354, 
                            name:'女性',
                            label:{
                                normal:{
                                    show:true,
                                    formatter:'{b}',
                                    position:'inside',
                                    textStyle:{
                                        color:'#19a69d',
                                        fontFamily:'pingfang SC',
                                        fontSize:16,
                                    }
                                }
                            }    
                        },
                    ]
                }
            ],
            color:['#84D2CD','#EEEEEE','#84D2CD','#EEEEEE','#84D2CD']              
        }

        optionAgeDistribution = {
                title: {
                    text:'受众年龄分布',
                    subtext:'受众比较均衡，更多偏向于男性年轻人',
                    left:'center',
                    textStyle:{
                        color:'#4a4a4a',
                        fontFamily:'pingfang SC',
                        fontSize:16
                    },
                    subtextStyle:{
                        color:'#9b9b9b',
                        fontFamily:'pingfang SC',
                        fontSize:14                    
                    }
                },
                tooltip : {
                    trigger:'axis',
                    axisPointer:{
                        type:'shadow'
                    }
                },
                legend: {
                    top:50,
                    data: ['标准分布', '斗破苍穹']
                },
                grid: {
                    top:70,
                    show: false,
                },
                yAxis:  {
                    type: 'value',
                    axisLabel: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                        onZero: true,
                    },
                },
                xAxis: {
                    axisLine:{
                        show:true,
                        lineStyle:{
                            color:'#d8d8d8',
                            width:1,
                        }
                    },
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    type: 'category',
                    data: ['12以下','13-18','19-26','27-34','35-48','49以上']
                },
                series: [
                    {
                        name: '标准分布',
                        type: 'bar',
                        data: [51, 266, 143, 95, 130,28]
                    },
                    {
                        name: '斗破苍穹',
                        type: 'bar',
                        barGap: '-50%',
                        z: 3,
                        data: [40, 100, 130, 112, 40,52]
                    }
                ],
                color:['#EEEEEE','#84D2CD']    
        }

        optionReviews = {
                grid: {
                    left:65,
                    top:27,
                    right:'10%',
                    bottom:0,
                    show: false,
                },
                yAxis:  {
                    type: 'category',
                    data: ['豆瓣评分','起点评分','纵横评分','17k评分'],
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                        onZero: true,
                    },
                    axisLabel: {
                        textStyle:{
                            color:'#979797',
                            fontFamily:'pingfang SC',
                            fontSize:14
                        }
                    }
                },
                xAxis: {
                    type: 'value',
                    axisLine:{
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    }
                },
                series: [
                    {
                        name: '斗破苍穹',
                        type: 'bar',
                        data: [8.8, 9.2, 8.5, 9.6],
                        barWidth: 16,
                        label:{
                            normal:{
                                show:true,
                                position:'right',
                                textStyle:{
                                    color:'#979797',
                                    fontFamily:'pingfang SC',
                                    fontSize:14
                                }
                            }
                        }
                    }
                ],
                color:['#84D2CD']                
        }

        // 使用刚指定的配置项和数据显示图表。
        chartComprehensiveValue.setOption(optionComprehensiveValue);
        chartPotentialModel.setOption(optionPotentialModel);
        chartHeatTrend.setOption(optionHeatTrend);
        chartTransmissionIndex.setOption(optionTransmissionIndex);
        charMediaPlatform.setOption(optionMediaPlatform);
        chartSocialPlatform.setOption(optionSocialPlatform);
        chartUserVitalty.setOption(optionUserVitalty);
        chartSexDistribution.setOption(optionSexDistribution);
        chartAgeDistribution.setOption(optionAgeDistribution);
        chartReviews.setOption(optionReviews);


