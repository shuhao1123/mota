<template>
    <div id="overall">
        <p id="over_p">整体市场行情</p>
        <table width="100%" id="over_tab1">
            <tr>
                <td width="25%">
                    <p>店铺数(万)</p>
                    <p> {{store_num}}</p>
                </td>
                <td width="25%">
                    <p>单品数(万)</p>
                    <p>{{goods_num}}</p>
                </td>
                <td width="25%">
                    <p>销售金额(万)</p>
                    <p>{{money_num}}</p>
                </td>
                <td width="25%">
                    <p>销量(万)</p>
                    <p>{{sale_num}}</p>
                </td>
            </tr>
        </table>
        <div id="over_div">同级或子行业下所有分类排行</div>
        <table width="100%" id="over_tab2">
            <thead>
                <tr>
                    <td width="15%">排名</td>
                    <td width="25%">热门分类</td>
                    <td width="20%">销量</td>
                    <td width="20%">店铺数</td>
                    <td width="20%">单品数</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in list" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{item.category_name}}</td>
                    <td>{{item.trading_num}}</td>
                    <td>{{item.shop_num}}</td>
                    <td>{{item.goods_num}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
// const API_PROXY = "https://bird.ioliu.cn/v1/?url=";
import axios from "axios";
export default {
    data() {
        return {
            list: {}
        };
    },
    computed: {
        goods_num() {
            var num = 0;
            for (var i = 0; i < this.list.length; i++) {
                num += this.list[i].goods_num;
            }
            return (num / 10000).toFixed(2);
        },
        store_num() {
            var num = 0;
            for (var i = 0; i < this.list.length; i++) {
                num += this.list[i].shop_num;
            }
            return (num / 10000).toFixed(2);
        },
        money_num() {
            var num = 0;
            for (var i = 0; i < this.list.length; i++) {
                num += this.list[i].trading_volume;
            }
            return (num / 10000).toFixed(2);
        },
        sale_num() {
            var num = 0;
            for (var i = 0; i < this.list.length; i++) {
                num += this.list[i].trading_num;
            }
            return (num / 10000).toFixed(2);
        }
    },
    mounted() {
        // console.log(sessionStorage.getItem("res_data").length);
        if (sessionStorage.getItem("res_data") == null) {
            if ($(".nav_input4 input").val().length > 0) {
                this.overall($(".nav_input3 input").attr("cid"));
            } else {
                if ($(".nav_input3 input").val().length > 0) {
                    this.overall($(".nav_input2 input").attr("cid"));
                } else {
                    if ($(".nav_input2 input").val().length > 0) {
                        this.overall($(".nav_input1 input").attr("cid"));
                    } else {
                        if ($(".nav_input1 input").val().length > 0) {
                            this.overall(0);
                        } else {
                            this.overall(16);
                        }
                    }
                }
            }
        } else {
            if (
                sessionStorage.getItem("cid_old") ==
                sessionStorage.getItem("ind_index11")
            ) {
                this.list = JSON.parse(sessionStorage.getItem("res_data"));
            } else {
                this.overall(sessionStorage.getItem("cid_old_p"));
            }
        }
    },
    methods: {
        overall(cid, name) {
            var _this = this;
            axios
                .get(
                    // API_PROXY +
                    api.overall,
                    { params: { c_id: cid } }
                )
                .then(
                    function(res) {
                        // console.log(res.data.result);
                        var res_data = JSON.stringify(res.data.result);
                        sessionStorage.setItem("res_data", res_data);

                        _this.list = res.data.result;
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        }
    }
};
</script>
<style scoped>
#overall {
    width: 100%;
}
#over_p {
    font-size: 16px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    text-indent: 5px;
}
#over_tab1 {
    padding: 20px 0;
    text-align: center;
    color: #386fff;
    border: 1px solid #eee;
    margin: 10px 0;
}
#over_tab1 tr td p {
    font-size: 16px;
}
#over_tab1 tr td p:nth-child(2) {
    margin-top: 10px;
    line-height: 30px;
    font-size: 24px;
    font-weight: 500;
}
#over_div {
    line-height: 40px;
}
#over_tab2 {
    line-height: 40px;
    border: 1px solid #eee;
    border-collapse: collapse;
}
#over_tab2 tr td {
    border: 1px solid #eee;
    text-indent: 25px;
}
#over_tab2 tr td:nth-child(1) {
    text-align: center;
    text-indent: 0;
}
</style>


