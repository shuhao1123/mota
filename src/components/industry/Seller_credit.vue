<template>
    <div>
        <img v-show="loading" src="./../../assets/jz.gif" id="loading">
        <p id="sub_p">卖家信用分布
            <span>{{data1}}</span>
        </p>
        <div id="credit" v-show="table_loading"></div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            loading: false,
            table_loading: true
        };
    },
    computed: {
        data1() {
            return func.requireDate(0);
        }
    },
    mounted() {
        if (sessionStorage.getItem("seller_credit") != null) {

 if (
                sessionStorage.getItem("cid_old") ==
                sessionStorage.getItem("ind_index66")
            ) {
                            this.data = JSON.parse(sessionStorage.getItem("seller_credit"));
            this.echart(this.data.credit_name, this.data.shop_num);
            } else {
                this.ajax_data(sessionStorage.getItem("linkpage_val"));
                sessionStorage.setItem(
                    "ind_index66",
                    sessionStorage.getItem("cid_old")
                );
                sessionStorage.setItem(
                    "ind_index6",
                    sessionStorage.getItem("cid_old_p")
                );
            }

        } else {
            this.ajax_data("T恤");
        }
    },
    methods: {
        ajax_data(name) {
            this.table_loading = false;
            $('#credit').css('width',$('#credit').width())
            this.loading = true;
            var _this = this;
            axios
                .get(api.seller_credit, { params: { c_name: name } })
                .then(function(data) {
                    _this.data = data.data.result.shop_nums;
                    sessionStorage.setItem(
                        "seller_credit",
                        JSON.stringify(data.data.result.shop_nums)
                    );
                    _this.echart(
                        data.data.result.shop_nums.credit_name,
                        data.data.result.shop_nums.shop_num
                    );
                    _this.table_loading = true;
                    _this.loading = false;
                });
        },
        echart(creadit, sold) {
            var myChart = echarts.init(document.getElementById("credit"));
            var option = {
                title: {
                    text: "卖家数"
                },
                color: ["#3398DB"],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "none" // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: "8%",
                    right: "8%",
                    bottom: "8%"
                    // containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        data: creadit.reverse()
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        boundaryGap: [0, 0.01]
                    }
                ],
                series: [
                    {
                        name: " 卖家数",
                        type: "bar",
                        barWidth: "60%",
                        data: sold.reverse()
                    }
                ]
            };
            myChart.setOption(option);
            window.onresize = myChart.resize;
        }
    }
};
</script>
<style scoped>
#credit {
    width: 100%;
    height: 500px;
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
#loading {
    position: absolute;
    left: 50%;
    margin-left: -24px;
    top: 200px;
}
</style>


