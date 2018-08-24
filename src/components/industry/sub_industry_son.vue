<template>
    <div>
        <p id="sub_p">子行业成交量分布
            <span>{{data1}}</span>
        </p>
        <div id="dc"></div>
    </div>
</template>
<script>
// import func from "./../../../static/new_date";
export default {
    data() {
        return {
            data: {},
            arr: []
        };
    },
    mounted() {
        if (sessionStorage.getItem("cid") != null) {
            this.sub_sale(sessionStorage.getItem("cid"));

            if (
                sessionStorage.getItem("cid_old") ==
                sessionStorage.getItem("ind_index33")
            ) {
                this.sub_sale(sessionStorage.getItem("cid"));
            } else {
                this.sub_ajax(sessionStorage.getItem("cid_old_p"));
                sessionStorage.setItem(
                    "ind_index33",
                    sessionStorage.getItem("cid_old")
                );
                sessionStorage.setItem(
                    "ind_index3",
                    sessionStorage.getItem("cid_old_p")
                );
            }
        } else {
            this.sub_sale(26);
        }
    },
    computed: {
        data1() {
            return func.requireDate(0);
        }
    },
    methods: {
        sub_sale(cid) {
            var _this = this;
            if (sessionStorage.getItem("sub_list") != null) {
                this.data = JSON.parse(sessionStorage.getItem("sub_list"));
                if (this.data.result.c_name.length > 5) {
                    $("#dc").css(
                        "height",
                        this.data.result.c_name.length * 40 + "px"
                    );
                    _this.set_myChart(this.data.result);
                } else {
                    $("#dc").css("height", "200px");
                    _this.set_myChart(this.data.result);
                }
            } else {
                _this.sub_ajax(cid);
            }
        },
        sub_ajax(cid) {
            var _this = this;
            $.ajax({
                type: "get",
                data: {
                    c_id: cid,
                    apiName: "leveCategorySold"
                },
                url: api.sub_industry_son,
                dataType: "json",
                success: function(data) {
                    //排序
                    for (var i = 0; i < data.result.num.length; i++) {
                        for (
                            var j = 0;
                            j < data.result.num.length - i - 1;
                            j++
                        ) {
                            if (data.result.num[j] < data.result.num[j + 1]) {
                                var temp = data.result.num[j];
                                var temp1 = data.result.c_name[j];
                                data.result.num[j] = data.result.num[j + 1];
                                data.result.num[j + 1] = temp;

                                data.result.c_name[j] =
                                    data.result.c_name[j + 1];
                                data.result.c_name[j + 1] = temp1;
                            }
                        }
                    }
                    sessionStorage.setItem("sub_list", JSON.stringify(data));
                    if (data.result.c_name.length > 5) {
                        $("#dc").css(
                            "height",
                            data.result.c_name.length * 40 + "px"
                        );
                    } else {
                        $("#dc").css("height", "200px");
                    }
                    _this.set_myChart(data.result);
                }
            });
        },

        set_myChart(data) {
            var myChart = echarts.init(document.getElementById("dc"));
            myChart.resize();
            var option = {
                color: ["#7cb5ec"],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                legend: {
                    data: ["销量"]
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: {
                    type: "value",
                    boundaryGap: [0, 0.01]
                },
                // 行业
                yAxis: {
                    type: "category",

                    axisLabel: {
                        interval: 0
                    },
                    data: data.c_name.reverse()
                },
                // 成交量
                series: [
                    {
                        name: "销量",
                        type: "bar",
                        data: data.num.reverse()
                    }
                ]
            };
            myChart.setOption(option);
            window.onresize = myChart.resize;
        }
    }
};
</script>
<style>
#dc {
    width: 100%;
}
#sub_p {
    font-size: 16px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    text-indent: 5px;
    margin-bottom: 30px;
}
#sub_p span {
    color: red;
    margin-left: 10px;
    font-size: 16px;
}
</style>


