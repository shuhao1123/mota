<template>
    <div>
        <p id="sub_p">卖家省份分布(仅支持T恤)
            <span>{{data1}}</span>
        </p>
        <div id="seller"></div>
        <table width="100%" cellspacing="0" cellpadding="0">
            <thead>
                <tr>
                    <th width="25%">省份</th>
                    <th width="25%">成交量</th>
                    <th width="25%">销售额</th>
                    <th width="25%">单品数</th>
                </tr>
            </thead>
            <tbody align="center">
                <tr v-for="(item,index) in list" :key=index>
                    <td>{{item.loc}}</td>
                    <td>{{item.trading_num}}</td>
                    <td>{{item.trading_volume}}</td>
                    <td>{{item.shop_num}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            list: []
        };
    },
    computed: {
        data1() {
            return func.requireDate(0);
        },
        list1() {
            var arr = [];
            this.list.forEach(function(item) {
                arr.push(item.trading_volume);
            });
            return arr.reverse();
        },
        list2() {
            var arr2 = [];
            this.list.forEach(function(item) {
                arr2.push(item.loc);
            });
            return arr2.reverse();
        }
    },
    mounted() {
        if (sessionStorage.getItem("seller_provinces") != null) {
            if (
                sessionStorage.getItem("cid_old") ==
                sessionStorage.getItem("ind_index55")
            ) {
                this.list = JSON.parse(
                    sessionStorage.getItem("seller_provinces")
                );
                if (this.list.length > 5) {
                    $("#seller").css("height", this.list.length * 40 + "px");
                } else {
                    $("#seller").css("height", "200px");
                }
                this.echart(this.list2, this.list1);
            } else {
                this.get_data(sessionStorage.getItem("cid_old"));
                sessionStorage.setItem(
                    "ind_index55",
                    sessionStorage.getItem("cid_old")
                );
                sessionStorage.setItem(
                    "ind_index5",
                    sessionStorage.getItem("cid_old_p")
                );
            }
        } else {
            this.get_data(50000671);
        }
    },
    methods: {
        get_data(cid) {
            var _this = this;
            axios.get(api.seller_provinces, { params: { cid: cid } }).then(
                function(data) {
                    _this.list = data.data.result.province_list;
                    sessionStorage.setItem(
                        "seller_provinces",
                        JSON.stringify(data.data.result.province_list)
                    );

                    if (
                        data.data.result.province_list.length > 5 &&
                        data.data.result.province_list != null
                    ) {
                        $("#seller").css(
                            "height",
                            data.data.result.province_list.length * 40 + "px"
                        );
                    } else {
                        $("#seller").css("height", "200px");
                    }

                    _this.echart(_this.list2, _this.list1);
                },
                function(error) {
                    console.log(error);
                }
            );
        },
        echart(list1, list2) {
            var myChart = echarts.init(document.getElementById("seller"));
            myChart.resize();
            var option = {
                color: ["#7cb5ec"],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                legend: {},
                grid: {
                    top: "2%",
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
                    data: list1
                },
                // 成交量
                series: [
                    {
                        type: "bar",
                        data: list2
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
#seller {
    width: 100%;
    height: 500px;
}
table {
    width: 100%;
    line-height: 30px;
    border: 1px solid #eee;
    border-bottom: none;
}
table td {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
}
table thead tr th {
    line-height: 50px;
    border-bottom: 1px solid #eee;
}
</style>


