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
                    <td width="13%" align="center">宝贝图</td>
                    <td width="25%">宝贝名称/掌柜/信用</td>
                    <td width="11%">标价</td>
                    <td width="11%">收货人数</td>
                    <td width="11%">邮费</td>
                    <td width="11%">地域</td>
                    <td width="12%">操作</td>
                </tr>
            </thead>
            <tbody v-show="table_loading">
                <tr v-for="(item,index) in list" :key=index>
                    <td align="center">{{index+1+((status-1)*44)}}</td>
                    <td align="center"><img :src=item.pic_url style='width: 80px; height: 80px;' /></td>
                    <td style="padding-right:1%" id="baby_td">
                        <p>{{item.raw_title}}</p>
                        <p>掌柜：{{item.nick}}</p>
                        <p v-html="get_icon(item.shopcard.levelClasses,item.shopcard.isTmall)"></p>
                    </td>
                    <td>{{item.view_price}}</td>
                    <td v-html="int(item.view_sales)"></td>
                    <td>
                        {{item.view_fee}}
                    </td>
                    <td>{{item.item_loc}}</td>
                    <td>
                        <a :href="item.detail_url" target="_blank">查看淘宝地址>></a>
                    </td>
                </tr>
            </tbody>
        </table>
        <div id="t_page" v-show="table_loading">
            <ul>
                <li v-for="(item,index) in t_page" :key="index" @click="http2(index+1,'T恤')" :class="{active:index+1==status}">{{item}}</li>
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
            t_page: [1, 2, 3],
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
        if (sessionStorage.getItem("store_baby") != null) {
            if (
                sessionStorage.getItem("cid_old") ==
                sessionStorage.getItem("ind_index77")
            ) {
                this.status = Number(sessionStorage.getItem("baby_page"));
                this.list = JSON.parse(sessionStorage.getItem("store_baby"));
            } else {
                this.http2(1, sessionStorage.getItem("linkpage_val"));
                sessionStorage.setItem(
                    "ind_index77",
                    sessionStorage.getItem("cid_old")
                );
                sessionStorage.setItem(
                    "ind_index7",
                    sessionStorage.getItem("cid_old_p")
                );
            }
        } else {
            this.http2(1, "T恤");
        }
    },
    methods: {
        http2(page, c_name) {
            this.table_loading = false;
            this.loading = true;
            if (sessionStorage.getItem("linkpage_val") != null) {
                c_name = sessionStorage.getItem("linkpage_val");
            }
            sessionStorage.setItem("baby_page", page);
            this.status = page;
            var _this = this;
            axios
                .get(api.store_baby, { params: { page: page, c_name: c_name } })
                .then(function(data) {
                    sessionStorage.setItem(
                        "store_baby",
                        JSON.stringify(data.data.result.goods_list)
                    );
                    _this.list = data.data.result.goods_list;
                    _this.table_loading = true;
                    _this.loading = false;
                });
        },
        get_icon(level, istmall) {
            var img = "";
            if (istmall) {
                img = '<img src="./../../../static/level_icon_tmall.png">';
                return img;
            } else {
                var icon = level[0].levelClass
                    .split("-")
                    .reverse()
                    .slice(0, 1);
                if (icon == "xin") {
                    img = "./../../../static/level_icon1.png";
                } else if (icon == "zuan") {
                    img = "./../../../static/level_icon2.png";
                } else if (icon == "guan") {
                    img = "./../../../static/level_icon3.png";
                } else {
                    img = "./../../../static/level_icon4.png";
                }
                var html = "";
                for (var i = 0; i < level.length; i++) {
                    html += '<img src="' + img + '">';
                }
                return html;
            }
        },
        int(string) {
            return parseInt(string);
        },
        status1() {
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
    width: 120px;
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
#baby_td p:nth-child(1) {
    line-height: 24px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
#loading {
    position: absolute;
    left: 50%;
    margin-left: -24px;
    top: 200px;
}
</style>

