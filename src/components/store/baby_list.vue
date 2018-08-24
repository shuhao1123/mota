<template>
    <div id="baby_list">
        <div id="top">
            <p>
                <span>店铺名称：</span>
                <select>
                    <option>优衣库</option>
                    <option value="">安小落文艺森女清新女</option>
                </select>
            </p>
        </div>
        <p id="sub_p">店铺宝贝列表
            <span>{{data1}}</span>
        </p>
        <table cellspacing="0" cellpadding="0" width="100%">
            <thead>
                <tr align="center">
                    <td width="5%">序号</td>
                    <td width="25%" align="left">宝贝名称</td>
                    <td width="10%">原价/折扣价</td>
                    <td width="10%">收藏量</td>
                    <td width="10%">评价数</td>
                    <td width="10%">估算日销售额</td>
                    <td width="10%">日销量</td>
                    <td width="10%">操作</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in list" :key="index" align="center">
                    <td>{{index+1+(current-1)*20}}</td>
                    <td id="baby_box" align="left">
                        <div><img :src="item.bao_images" width="80px">
                            <span>{{item.bao_title}}</span>
                        </div>
                        <p v-html="level(item.level1,item.level2,item.level3,item.name)"></p>
                    </td>
                    <td>
                        <p>￥{{item.extra_prices}}</p>
                        <p>￥{{item.price_price}}</p>
                    </td>
                    <td>{{item.favcount}}</td>
                    <td>{{item.comment_count}}</td>
                    <td>￥{{item.daily_sales}}</td>
                    <td v-html="sale(item.daily_sale)"></td>
                    <td>查看详情</td>
                </tr>
            </tbody>
        </table>
        <v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination>
    </div>
</template>
<script>
import axios from "axios";
import pagination from "@/components/store/page";
export default {
    components: {
        "v-pagination": pagination
    },
    data() {
        return {
            list: [],
            total: 100, // 记录总条数
            display: 20, // 每页显示条数
            current: 1, // 当前的页数};
            page_status: true
        };
    },
    computed: {
        data1() {
            return func.requireDate(0);
        }
    },
    mounted() {
        this.pagechange(1);
    },
    methods: {
        pagechange: function(currentPage) {
            this.current = currentPage;
            var _this = this;
            axios
                .get(api.baby_list, {
                    params: { shop_id: 67052189, page: currentPage }
                })
                .then(function(data) {
                    _this.list = data.data.result.goods_list;
                    if (_this.page_status) {
                        _this.page_status = false;
                        _this.total =
                            data.data.result.goods_list.length *
                            data.data.result.max_page;
                    }
                    console.log(_this.list);
                });
            // ajax请求, 向后台发送 currentPage, 来获取对应的数据
        },
        level(a, b, c, d) {
            console.log(a);
            if (c != "") {
                return "类目：" + a + ">>" + b + ">>" + c + ">>" + d;
            } else if (c == "" && b != "") {
                return "类目：" + a + ">>" + b + ">>" + d;
            } else if (c == "" && b == "" && a != "") {
                return "类目：" + a + ">>" + d;
            } else {
                return "类目：" + d;
            }
        },
        sale(sale) {
            if (sale == null) {
                return 0;
            } else {
                return sale;
            }
        }
    }
};
</script>
<style scoped>
#baby_list {
    width: 100%;
}
#top {
    width: 100%;
    height: 45px;
    background: #2a3b55;
    color: #fff;
    line-height: 45px;
    text-indent: 15px;
}
#top select {
    width: 160px;
    height: 25px;
}
#sub_p {
    font-size: 16px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    text-indent: 5px;
    margin-bottom: 30px;
    margin-top: 10px;
}
#sub_p span {
    color: red;
    margin-left: 10px;
    font-size: 16px;
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
table thead tr td {
    line-height: 50px;
}
#img_list span {
    margin-left: 5px;
}
table a {
    color: #aaa;
    margin-left: 5px;
}
#baby_box div {
    width: 100%;
    height: 90px;
}
#baby_box img {
    width: 90px;
    float: left;
    margin-right: 10px;
}
#baby_box span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
</style>


