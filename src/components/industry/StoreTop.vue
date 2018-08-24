<template>
    <div id="s_top">
        <img v-show="loading" src="./../../assets/jz.gif" id="loading">
        <div id="sub_p">热销店铺排行
            <span>{{data1}}</span>
        </div>
        <table width="100%" cellspacing="0" cellpadding="0">
            <thead>
                <tr>
                    <td width="5%" align="center">排名</td>
                    <td width="13%" align="center">店铺LOGO</td>
                    <td width="25%">店铺名称/掌柜/信用</td>
                    <td width="10%">营销推广</td>
                    <td width="10%">销量</td>
                    <td width="24%">热销宝贝</td>
                    <td width="13%">店铺详情</td>
                </tr>
            </thead>
            <tbody v-show="table_loading">
                <tr v-for="(item,index) in list" :key=index>
                    <td align="center">{{index+1+((status-1)*20)}}</td>
                    <td align="center"><img :src=item.picUrl style='width: 80px; height: 80px;' /></td>
                    <td>
                        <p>店铺：{{item.title}}</p>
                        <p>掌柜：{{item.nick}}</p>
                        <p v-html="get_icon(item.shopIcon.iconClass)"></p>
                    </td>
                    <td><img src="./../../assets/taojinbi.png" v-show="item.isTaojinbi"></td>
                    <td>{{item.totalsold}}</td>
                    <td id="img_list">
                        <span v-for="(item2,index1) in item.auctionsInshop" :key="index1" v-if="index1<4">
                            <img :src="item2.picUrl" style='width: 55px; height: 55px;'></span>
                    </td>
                    <td>
                        <a :href="item.shopUrl" target="_blank">查看淘宝地址>></a>
                    </td>
                </tr>
            </tbody>
        </table>
        <div id="t_page" v-show="table_loading">
            <ul>
                <li v-for="(item,index) in t_page" :key="index" @click="http(index+1,'T恤')" :class="{active:index+1==status}">{{item}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            list: [],
            t_page: [1, 2, 3, 4, 5],
            status: 1,
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
        if (sessionStorage.getItem("store_top") != null) {

            if (
                sessionStorage.getItem("cid_old") ==
                sessionStorage.getItem("ind_index44")
            ) {
            this.status = Number(sessionStorage.getItem("store_page"));
            this.list = JSON.parse(sessionStorage.getItem("store_top"));

            } else {
                this.http(1, sessionStorage.getItem("linkpage_val"));
                sessionStorage.setItem('ind_index44',sessionStorage.getItem("cid_old"));
                sessionStorage.setItem('ind_index4',sessionStorage.getItem("cid_old_p"))

            }
        } else {
            this.http(1, "T恤");
        }
    },
    methods: {
        http(page, c_name) {
            this.table_loading = false;
            this.loading = true;
            if (sessionStorage.getItem("linkpage_val") != null) {
                c_name = sessionStorage.getItem("linkpage_val");
            }
            sessionStorage.setItem("store_page", page);
            this.status = page;
            var _this = this;
            $("#loading").show();
            axios
                .get(api.store_top, { params: { page: page, c_name: c_name } })
                .then(function(data) {
                    sessionStorage.setItem(
                        "store_top",
                        JSON.stringify(data.data.result.goods_list)
                    );
                    _this.list = data.data.result.goods_list;
                    _this.table_loading = true;
                    _this.loading = false;
                });
        },
        get_icon(url) {
            var img_url = url.substr(-2, 2);
            var img = "";
            if (isNaN(img_url)) {
                img = '<img src="./../../../static/level_icon_tmall.png">';
                return img;
            } else {
                var num = parseInt(img_url);
                var cont = 0;
                if (num < 6) {
                    cont = num;
                    img = "./../../../static/level_icon1.png";
                } else if (num < 11) {
                    cont = num - 5;
                    img = "./../../../static/level_icon2.png";
                } else if (num < 16) {
                    cont = num - 10;
                    img = "./../../../static/level_icon3.png";
                } else {
                    cont = num - 15;
                    img = "./../../../static/level_icon4.png";
                }
                var html = "";
                for (var i = 0; i < cont; i++) {
                    html += '<img src="' + img + '">';
                }
                return html;
            }
        },
        status2() {
            this.status = 1;
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
#s_top {
    width: 100%;
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
#t_page {
    width: 100%;
    line-height: 80px;
}
#t_page ul {
    width: 200px;
    margin: 30px auto;
}
#t_page ul li {
    cursor: pointer;
    border: solid thin #dddddd;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin-left: 8px;
}
.active {
    background: dodgerblue;
    color: #fff;
}
#loading {
    position: absolute;
    left: 50%;
    margin-left: -24px;
    top: 200px;
}
</style>

