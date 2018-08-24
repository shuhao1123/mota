<template>
    <div class="nav">
        <div class="nav_div">
            <span @click="status1(10)">
                <router-link to="/"><img src="./../assets/logo.jpg"></router-link>
            </span>
            <ul>
                <li @click="status1(0)">
                    <router-link to="/industry" :class="{active:isSelect==0}">行业数据</router-link>
                </li>
                <li @click="status1(1)">
                    <router-link to="/industry" :class="{active:isSelect==1}">品牌数据</router-link>
                </li>
                <li @click="status1(2)">
                    <router-link to="/store" :class="{active:isSelect==2}">店铺监控</router-link>
                </li>
                <li @click="status1(3)">
                    <router-link to="/industry" :class="{active:isSelect==3}">宝贝监控</router-link>
                </li>
                <li @click="status1(4)">
                    <router-link to="/industry" :class="{active:isSelect==4}">自助取数</router-link>
                </li>
                <li @click="status1(5)">
                    <router-link to="/industry" :class="{active:isSelect==5}">数据定制</router-link>
                </li>
            </ul>
            <span id="login">{{username}}
                <router-link to="/login">登录</router-link>
            </span>
        </div>
        <router-view></router-view>
        <div id="bot">
            <div id="bot_top">
                <table width="100%">
                    <tr>
                        <td>首页</td>
                        <td>关于我们</td>
                        <td>联系我们</td>
                        <td>法律声明</td>
                        <td>帮助中心</td>
                    </tr>
                </table>
            </div>
            <p class="bot_top1">魔塔指数 ©2018 mota1688.com 版权所有 ：沪ICP备18011260</p>
        </div>
        <div class="bott"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isSelect: 0 //判斷nav选中状态
        };
    },
    computed: {
        username() {
            if (sessionStorage.getItem("isLogin")) {
                return JSON.parse(sessionStorage.getItem("isLogin")).username;
            }
        }
    },
    mounted() {
        if (sessionStorage.getItem("isselect")) {
            this.isSelect = sessionStorage.getItem("isselect");
        }
    },
    methods: {
        status1(id) {
            sessionStorage.setItem("isselect", id);
            this.isSelect = id;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
    color: #fff;
    text-decoration: none;
}
.nav {
    width: 100%;
    height: 75px;
    background: #2a3b55;
    min-width: 1200px;
}
.nav_div {
    width: 80%;
    margin: auto;
    height: 76px;
    color: #fff;
}
@media screen and (max-width: 1200px) {
    .nav_div {
        width: 100%;
    }
}
.nav_div img {
    float: left;
}
.nav_div ul li {
    line-height: 75px;
    padding: 0 15px;
    cursor: pointer;
}
.nav_div ul li a {
    font-size: 16px;
}
.nav_div ul li:hover a {
    color: #ec8933;
}
.active {
    color: #ec8933;
}
#login {
    float: right;
    line-height: 75px;
    margin-right: 15px;
    cursor: pointer;
}

#bot {
    width: 100%;
    background: #fff;
    padding: 30px 0 0 0;
    clear: both;
}

#bot_top {
    width: 540px;
    margin: auto;
    padding: 15px 0;
}

#bot_top td {
    color: #767676;
    border-left: 1px solid #989898;
    text-align: center;
    line-height: 15px;
    cursor: pointer;
}

#bot_top td:nth-child(1) {
    border-left: none;
}

.bot_top1 {
    text-align: center;
    font-size: 12px;
    color: #989898;
    line-height: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}


.bott {
    width: 100%;
    height: 50px;
    background: #f5f5f5;
    clear: both;
}
</style>
