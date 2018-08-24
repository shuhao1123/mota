<template>
    <div id="store_index">
        <div id="search">
            <div id="search_left">
                <p>搜索已监控店铺</p>
                <p>SEARCH HAS MONITORED THE STORE</p>
            </div>
            <div id="search_right">
                <input type="text" placeholder="请输入店铺名称、掌柜旺旺ID">
                <button @click="search()">搜索</button>
            </div>
        </div>
        <div id="store">
            <div class="store_left">
                <ul>
                    <li>
                        <label><img src="./../../assets/jk_2.png">
                            <router-link to="/overall">监控中心</router-link>
                        </label>
                        <ul>
                            <li>
                                <router-link to="">店铺监控管理</router-link>
                            </li>
                            <li>宝贝监控管理</li>
                        </ul>
                    </li>
                    <li>
                        <label><img src="./../../assets/jk_2.png">店铺概况</label>
                        <ul>
                            <li>基本信息</li>
                            <li>类目分析</li>
                            <li>数据透视</li>
                        </ul> 
                    </li>
                    <li>
                        <label><img src="./../../assets/jk_2.png">宝贝概况</label>
                        <ul>
                            <router-link to="/baby_list">宝贝列表</router-link>
                            <li>主推宝贝</li>
                            <li><router-link to="/babyhot">热销宝贝排行</router-link></li>
                            <li>飙升宝贝排行</li>
                        </ul>
                    </li>
                    <li>
                        <label><img src="./../../assets/jk_2.png">销售分析</label>
                    </li>
                    <li>
                        <label><img src="./../../assets/jk_2.png">店铺对比</label>
                    </li>
                    <li>
                        <label><img src="./../../assets/jk_2.png">宝贝对比</label>
                    </li>
                    <li>
                        <label><img src="./../../assets/jk_2.png">活动分析</label>
                        <ul>
                            <li>活动概况</li>
                            <li>店内促销</li>
                            <li>站内活动</li>
                        </ul>
                    </li>
                    <li>
                        <label><img src="./../../assets/jk_2.png">宝贝修改监控</label>
                        <ul>
                            <li>宝贝改名跟踪</li>
                            <li>宝贝调价跟踪</li>
                            <li>宝贝改主图跟踪</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="store_right">
                <div id="sr_box">
                    <router-view ref="child"></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style scoped>
ul li {
    float: none;
}
#search {
    width: 1050px;
    height: 80px;
    margin: auto;
    padding: 30px 0;
}
#search_left {
    width: 250px;
    float: left;
    text-align: center;
}
#search_left p:nth-child(1) {
    font-size: 28px;
}
#search_left p:nth-child(2) {
    font-size: 8px;
    color: #ccc;
    margin-top: 5px;
}
#search_right {
    float: left;
}
#search_right input {
    width: 650px;
    height: 40px;
    border: 2px solid #2a3b55;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    text-indent: 10px;
    float: left;
    margin-top: 5px;
    font-size: 14px;
}
#search_right button {
    width: 100px;
    height: 44px;
    background: #2a3b55;
    border: none;
    color: #fff;
    position: relative;
    left: 0;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    margin-top: 5px;
    font-size: 20px;
}
#store_index {
    width: 80%;
    margin: auto;
    min-width: 1200px;
    height: auto;
    padding: 30px 0;
}
#store {
    width: 100%;
    height: auto;
    float: left;
    padding: 30px 0;
    display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
    display: -moz-box; /* Firefox 17- */
    display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
    display: -moz-flex; /* Firefox 18+ */
    display: -ms-flexbox; /* IE 10 */
    display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
}
.store_left {
    width: 180px;
    height: auto;
    background: #fafafc;
    border: 1px solid #eee;
    padding: 10px 10px;
    line-height: 30px;
    float: left;
}
.store_left label {
    font-weight: bold;
    cursor: pointer;
}
.store_left ul li {
    cursor: pointer;
}
.store_left ul li ul {
    margin-left: 20px;
}
.store_left label img {
    width: 18px;
    position: relative;
    top: 3px;
    left: -5px;
}
.store_right {
    width: 100%;
    float: left;
    padding: 0 0 0 20px;
    position: relative;
}
#sr_box {
    width: 100%;
}
</style>


