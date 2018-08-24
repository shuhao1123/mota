<template>
    <div id="industry">
        <div id="search">
            <div id="search_left">
                <p>行业市场分析</p>
                <p>MOTA INDUSTRY ANALYSIS</p>
            </div>
            <div id="search_right">
                <input type="text" placeholder="请输入行业、分类关键词">
                <button @click="search()">搜索</button>
            </div>
        </div>
        <div id="menu">
            <div class="nav_main1">
                <label class="now">当前结果为：</label>
                <div class="nav_input1"><input type="text" value="" placeholder="全部" readonly>
                    <span class="triangle2"></span>
                </div>
                <div class="nav_content1">
                    <ul>
                    </ul>
                </div>
                <label>行业，</label>
            </div>

            <div class="nav_main2">

                <div class="nav_input2"><input type="text" value="" placeholder="全部" readonly>
                    <span class="triangle2"></span>
                </div>
                <div class="nav_content2">
                    <ul>
                    </ul>
                </div>
                <label>子行业，</label>
            </div>

            <div class="nav_main3">

                <div class="nav_input3"><input type="text" value="" placeholder="全部" readonly>
                    <span class="triangle2"></span>
                </div>
                <div class="nav_content3">
                    <ul>
                    </ul>
                </div>
                <label>子行业，</label>
            </div>

            <div class="nav_main4">

                <div class="nav_input4"><input type="text" value="" placeholder="全部" readonly>
                    <span class="triangle2"></span>
                </div>
                <div class="nav_content4">
                    <ul>
                    </ul>
                </div>
                <label>分类，</label>
            </div>
            <button class="submit" @click="get_value()">确定</button>
        </div>

        <div id="box">
            <div id="box_main">
                <div id="box_left">
                    <ul>
                        <li>
                            <label @click="industry_active(0)"><img src="./../../assets/jk_2.png">
                                <router-link to="/overall" :class="{industry_active:status==0}">整体市场行情</router-link>
                            </label>
                            <ul>
                                <li @click="industry_active(1)">
                                    <router-link to="/sub_industry" :class="{industry_active:status==1}">行业构成</router-link>
                                </li>
                                <li @click="industry_active(2)">
                                    <router-link to="/sub_industry_son" :class="{industry_active:status==2}">子行业成交量分布</router-link>
                                </li>
                                <!-- <li>行业热搜词</li> -->
                            </ul>
                        </li>
                        <li>
                            <label><img src="./../../assets/jk_2.png">卖家分析数据</label>
                            <ul>
                                <li @click="industry_active(4)">
                                    <router-link to="/StoreTop" :class="{industry_active:status==4}">热销店铺top100</router-link>
                                </li>
                                <li @click="industry_active(5)">
                                    <router-link to="/Seller_provinces" :class="{industry_active:status==5}">卖家省份分布</router-link>
                                </li>
                                <li @click="industry_active(6)">
                                    <router-link to="/Seller_credit" :class="{industry_active:status==6}">卖家信用分布</router-link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <label><img src="./../../assets/jk_2.png">宝贝分析数据</label>
                            <ul>
                                <li @click="industry_active(7)">
                                    <router-link to="/BabyTop" :class="{industry_active:status==7}">热销宝贝top100</router-link>
                                </li>
                            </ul>
                        </li>
                        <!-- <li>
                            <label><img src="./../../assets/jk_2.png">属性成交量分布</label>
                            <ul>
                                <li>品牌成交量分布</li>
                                <li>选购热点成交量分布</li>
                                <li>尺码成交量分布</li>
                                <li>袖长成交量分布</li>
                            </ul>
                        </li> -->
                    </ul>
                </div>

                <div id="box_right">
                    <router-view ref="child"></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import child from "@/components/industry/overall";
import axios from "axios";
export default {
    components: {
        // child
    },
    data() {
        return {
            input1: 0,
            input2: 0,
            input3: 0,
            input4: 0,
            status: 0
        };
    },
    mounted() {
        this.status = sessionStorage.getItem("industry_active");
        // console.log($route.name);
        $("#search input").keypress(function(event) {
            if (event.which === 13) {
                //点击回车要执行的事件
                $("#search button").click();
            }
        });

        this.input1 = sessionStorage.getItem("input1");
        this.input2 = sessionStorage.getItem("input2");
        this.input3 = sessionStorage.getItem("input3");
        this.input4 = sessionStorage.getItem("input4");
        let _this = this;
        var item = sessionStorage.getItem("res");
        if (item == null) {
            axios.get(api.industry).then(
                function(res) {
                    sessionStorage.setItem("res", JSON.stringify(res));
                    _this.linkpage(res);
                    $(".nav_input1")
                        .click()
                        .next()
                        .find("ul li")
                        .eq(0)
                        .click();
                    $(".nav_input2")
                        .click()
                        .next()
                        .find("ul li")
                        .eq(8)
                        .click();
                },
                function(error) {
                    console.log(error);
                }
            );
        } else {
            // console.log(JSON.parse(item).data.result)
            _this.linkpage(JSON.parse(item));
            if (this.input4 > 0) {
                $(".nav_input1 input")
                    .click()
                    .parent()
                    .next()
                    .find("li[cid=" + this.input1 + "]")
                    .click();
                $(".nav_input2 input")
                    .click()
                    .parent()
                    .next()
                    .find("li[cid=" + this.input2 + "]")
                    .click();
                $(".nav_input3 input")
                    .click()
                    .parent()
                    .next()
                    .find("li[cid=" + this.input3 + "]")
                    .click();
                $(".nav_input4 input")
                    .click()
                    .parent()
                    .next()
                    .find("li[cid=" + this.input4 + "]")
                    .click();
            } else if (this.input3 > 0) {
                $(".nav_input1 input")
                    .click()
                    .parent()
                    .next()
                    .find("li[cid=" + this.input1 + "]")
                    .click();
                $(".nav_input2 input")
                    .click()
                    .parent()
                    .next()
                    .find("li[cid=" + this.input2 + "]")
                    .click();
                $(".nav_input3 input")
                    .click()
                    .parent()
                    .next()
                    .find("li[cid=" + this.input3 + "]")
                    .click();
            } else if (this.input2 > 0) {
                $(".nav_input1 input")
                    .click()
                    .parent()
                    .next()
                    .find("li[cid=" + this.input1 + "]")
                    .click();
                $(".nav_input2 input")
                    .click()
                    .parent()
                    .next()
                    .find("li[cid=" + this.input2 + "]")
                    .click();
            } else if (this.input1 > 0) {
                $(".nav_input1 input")
                    .click()
                    .parent()
                    .next()
                    .find("li[cid=" + this.input1 + "]")
                    .click();
            }
        }
    },
    methods: {
        industry_active(index) {
            sessionStorage.setItem("industry_active", index);
            this.status = index;
        },
        linkpage(res) {
            var index_1 = 0,
                index_2 = 0,
                index_3 = 0;
            // console.log(res.data.result);
            if (res.data.status == true) {
                var obj = "";
                for (var i = 0; i < res.data.result.length; i++) {
                    if (res.data.result[i].name.length < 12) {
                        obj +=
                            '<li is_parent="' +
                            res.data.result[i].is_parent +
                            '" cid="' +
                            res.data.result[i].cid +
                            '">' +
                            res.data.result[i].name +
                            "</li>";
                    } else {
                        obj +=
                            '<li is_parent="' +
                            res.data.result[i].is_parent +
                            '" cid="' +
                            res.data.result[i].cid +
                            '">' +
                            res.data.result[i].name.slice(0, 10) +
                            "...</li>";
                    }
                }
                $(".nav_content1 ul").html(obj);

                //一级菜单点击
                $(".nav_input1").click(function() {
                    $(".nav_content1").toggle();
                    $(".nav_content2").hide();
                    $(".nav_content3").hide();
                    $(".nav_content4").hide();

                    $(".nav_content1 li").click(function() {
                        sessionStorage.setItem("input1", $(this).attr("cid"));
                        sessionStorage.removeItem("input2");
                        sessionStorage.removeItem("input3");
                        sessionStorage.removeItem("input4");
                        sessionStorage.setItem("cid_old", $(this).attr("cid"));
                        sessionStorage.setItem("cid_old_p", 0);

                        $(".nav_input1 input").val($(this).html());
                        sessionStorage.setItem(
                            "linkpage_val",
                            $(".nav_input1 input").val()
                        );
                        $(".nav_input2 input").attr(
                            "placeholder",
                            "--请选择--"
                        );
                        $(".nav_input1 input").attr("cid", $(this).attr("cid"));
                        $(".nav_input3 input").attr("placeholder", "全部");
                        $(".nav_input4 input").attr("placeholder", "全部");
                        $(".nav_input2 input").val("");
                        $(".nav_input3 input").val("");
                        $(".nav_input4 input").val("");
                        $(".nav_content1").hide();
                        $(".nav_content2").hide();
                        $(".nav_content3").hide();
                        $(".nav_content4").hide();
                        $(".nav_content3 ul").html("");
                        $(".nav_content4 ul").html("");

                        var obj2 = "";
                        index_1 = $(this).index();
                        for (
                            var i = 0;
                            i < res.data.result[index_1].child_list.length;
                            i++
                        ) {
                            if (
                                res.data.result[index_1].child_list[i].name
                                    .length < 12
                            ) {
                                obj2 +=
                                    '<li is_parent="' +
                                    res.data.result[index_1].child_list[i]
                                        .is_parent +
                                    '" cid="' +
                                    res.data.result[index_1].child_list[i].cid +
                                    '">' +
                                    res.data.result[index_1].child_list[i]
                                        .name +
                                    "</li>";
                            } else {
                                obj2 +=
                                    '<li is_parent="' +
                                    res.data.result[index_1].child_list[i]
                                        .is_parent +
                                    '" cid="' +
                                    res.data.result[index_1].child_list[i].cid +
                                    '">' +
                                    res.data.result[index_1].child_list[
                                        i
                                    ].name.slice(0, 10) +
                                    "...</li>";
                            }
                        }
                        $(".nav_content2 ul").html(obj2);
                    });
                });

                //二级菜单点击
                $(".nav_input2").click(function() {
                    if ($(".nav_content2 ul").html() != "") {
                        $(".nav_content1").hide();
                        $(".nav_content2").toggle();
                        $(".nav_content3").hide();
                        $(".nav_content4").hide();
                    }
                    $(".nav_content2 ul li").click(function() {
                        sessionStorage.setItem("input2", $(this).attr("cid"));
                        sessionStorage.removeItem("input3");
                        sessionStorage.removeItem("input4");
                        sessionStorage.setItem("cid_old", $(this).attr("cid"));
                        sessionStorage.setItem(
                            "cid_old_p",
                            $(".nav_input1 input").attr("cid")
                        );
                        $(".nav_input2 input").val($(this).html());
                        sessionStorage.setItem(
                            "linkpage_val",
                            $(".nav_input2 input").val()
                        );
                        $(".nav_input3 input").val("");
                        $(".nav_input4 input").val("");
                        $(".nav_content2").hide();
                        $(".nav_content3").hide();
                        $(".nav_content4").hide();
                        $(".nav_content4 ul").html("");
                        var obj3 = "";
                        index_2 = $(this).index();

                        $(".nav_input2 input").attr("cid", $(this).attr("cid"));
                        if ($(this).attr("is_parent") == 1) {
                            $(".nav_input3 input").attr(
                                "placeholder",
                                "--请选择--"
                            );
                            $(".nav_input4 input").attr("placeholder", "全部");
                            if (
                                res.data.result[index_1].child_list[index_2]
                                    .is_parent == 1
                            ) {
                                for (
                                    var i = 0;
                                    i <
                                    res.data.result[index_1].child_list[index_2]
                                        .child_list.length;
                                    i++
                                ) {
                                    if (
                                        res.data.result[index_1].child_list[
                                            index_2
                                        ].child_list[i].name.length < 12
                                    ) {
                                        obj3 +=
                                            '<li is_parent="' +
                                            res.data.result[index_1].child_list[
                                                index_2
                                            ].child_list[i].is_parent +
                                            '" cid="' +
                                            res.data.result[index_1].child_list[
                                                index_2
                                            ].child_list[i].cid +
                                            '">' +
                                            res.data.result[index_1].child_list[
                                                index_2
                                            ].child_list[i].name +
                                            "</li>";
                                    } else {
                                        obj3 +=
                                            '<li is_parent="' +
                                            res.data.result[index_1].child_list[
                                                index_2
                                            ].child_list[i].is_parent +
                                            '" cid="' +
                                            res.data.result[index_1].child_list[
                                                index_2
                                            ].child_list[i].cid +
                                            '">' +
                                            res.data.result[index_1].child_list[
                                                index_2
                                            ].child_list[i].name.slice(0, 10) +
                                            "...</li>";
                                    }
                                }
                                $(".nav_content3 ul").html(obj3);
                            }
                        } else {
                            $(".nav_input3 input").attr(
                                "placeholder",
                                "该类目下无分类"
                            );
                            $(".nav_input4 input").attr("placeholder", "全部");
                            $(".nav_content3 ul").html("");
                        }
                    });
                });

                //三级菜单点击
                $(".nav_input3").click(function() {
                    if ($(".nav_content3 ul").html() != "") {
                        $(".nav_content3").toggle();
                        $(".nav_content1").hide();
                        $(".nav_content2").hide();
                        $(".nav_content4").hide();
                    }
                    $(".nav_content3 ul li").click(function() {
                        sessionStorage.setItem("input3", $(this).attr("cid"));
                        sessionStorage.removeItem("input4");
                        sessionStorage.setItem("cid_old", $(this).attr("cid"));
                        sessionStorage.setItem(
                            "cid_old_p",
                            $(".nav_input2 input").attr("cid")
                        );
                        $(".nav_input3 input").attr("cid", $(this).attr("cid"));
                        $(".nav_input3 input").val($(this).html());
                        sessionStorage.setItem(
                            "linkpage_val",
                            $(".nav_input3 input").val()
                        );
                        $(".nav_input4 input").val("");
                        $(".nav_content3").hide();
                        $(".nav_content4").hide();
                        index_3 = $(this).index();
                        var obj4 = "";
                        if ($(this).attr("is_parent") == 1) {
                            $(".nav_input4 input").attr(
                                "placeholder",
                                "--请选择--"
                            );
                            if (
                                res.data.result[index_1].child_list[index_2]
                                    .child_list[index_3].is_parent == 1
                            ) {
                                for (
                                    var i = 0;
                                    i <
                                    res.data.result[index_1].child_list[index_2]
                                        .child_list[index_3].child_list.length;
                                    i++
                                ) {
                                    if (
                                        res.data.result[index_1].child_list[
                                            index_2
                                        ].child_list[index_3].child_list[i].name
                                            .length < 12
                                    ) {
                                        obj4 +=
                                            '<li is_parent="' +
                                            res.data.result[index_1].child_list[
                                                index_2
                                            ].child_list[index_3].child_list[i]
                                                .is_parent +
                                            '" cid="' +
                                            res.data.result[index_1].child_list[
                                                index_2
                                            ].child_list[index_3].child_list[i]
                                                .cid +
                                            '">' +
                                            res.data.result[index_1].child_list[
                                                index_2
                                            ].child_list[index_3].child_list[i]
                                                .name +
                                            "</li>";
                                    } else {
                                        obj4 +=
                                            '<li is_parent="' +
                                            res.data.result[index_1].child_list[
                                                index_2
                                            ].child_list[index_3].child_list[i]
                                                .is_parent +
                                            '" cid="' +
                                            res.data.result[index_1].child_list[
                                                index_2
                                            ].child_list[index_3].child_list[i]
                                                .cid +
                                            '">' +
                                            res.data.result[index_1].child_list[
                                                index_2
                                            ].child_list[index_3].child_list[
                                                i
                                            ].name.slice(0, 10) +
                                            "...</li>";
                                    }
                                }
                                $(".nav_content4 ul").html(obj4);
                            }
                        } else {
                            $(".nav_input4 input").attr(
                                "placeholder",
                                "该类目下无分类"
                            );
                        }
                    });
                });
                $(".nav_input4").click(function() {
                    if ($(".nav_content4 ul").html() != "") {
                        $(".nav_content4").toggle();
                        $(".nav_content1").hide();
                        $(".nav_content2").hide();
                        $(".nav_content3").hide();
                    }
                    $(".nav_content4 ul li").click(function() {
                        sessionStorage.setItem("input4", $(this).attr("cid"));
                        sessionStorage.setItem("cid_old", $(this).attr("cid"));
                        sessionStorage.setItem(
                            "cid_old_p",
                            $(".nav_input3 input").attr("cid")
                        );
                        $(".nav_input4 input").val($(this).html());
                        sessionStorage.setItem(
                            "linkpage_val",
                            $(".nav_input4 input").val()
                        );
                        $(".nav_content4").hide();
                    });
                });

                $(".nav_input1").on("click", function(e) {
                    // $(".nav_content1").show();

                    $(document).one("click", function() {
                        $(".nav_content1").hide();
                    });

                    e.stopPropagation();
                });
                $(".nav_content1").on("click", function(e) {
                    e.stopPropagation();
                });
                $(".nav_input2").on("click", function(e) {
                    // $(".nav_content2").show();

                    $(document).one("click", function() {
                        $(".nav_content2").hide();
                    });

                    e.stopPropagation();
                });
                $(".nav_content2").on("click", function(e) {
                    e.stopPropagation();
                });
                $(".nav_input3").on("click", function(e) {
                    // $(".nav_content2").show();

                    $(document).one("click", function() {
                        $(".nav_content3").hide();
                    });

                    e.stopPropagation();
                });
                $(".nav_content3").on("click", function(e) {
                    e.stopPropagation();
                });

                $(".nav_input4").on("click", function(e) {
                    // $(".nav_content2").show();

                    $(document).one("click", function() {
                        $(".nav_content4").hide();
                    });

                    e.stopPropagation();
                });
                $(".nav_content4").on("click", function(e) {
                    e.stopPropagation();
                });
            }
        },
        get_value() {
            if ($(".nav_input4 input").val().length > 0) {
                sessionStorage.setItem(
                    "cid",
                    $(".nav_input3 input").attr("cid")
                );
                sessionStorage.setItem(
                    "cid2",
                    $(".nav_input4 input").attr("cid")
                );
                sessionStorage.setItem(
                    "linkpage",
                    $(".nav_input4 input").val()
                );
            } else {
                if ($(".nav_input3 input").val().length > 0) {
                    sessionStorage.setItem(
                        "cid",
                        $(".nav_input2 input").attr("cid")
                    );
                    sessionStorage.setItem(
                        "cid2",
                        $(".nav_input3 input").attr("cid")
                    );
                    sessionStorage.setItem(
                        "linkpage",
                        $(".nav_input3 input").val()
                    );
                } else {
                    if ($(".nav_input2 input").val().length > 0) {
                        sessionStorage.setItem(
                            "cid",
                            $(".nav_input1 input").attr("cid")
                        );
                        sessionStorage.setItem(
                            "cid2",
                            $(".nav_input2 input").attr("cid")
                        );
                        sessionStorage.setItem(
                            "linkpage",
                            $(".nav_input2 input").val()
                        );
                    } else {
                        if ($(".nav_input1 input").val().length > 0) {
                            sessionStorage.setItem("cid", 0);
                            sessionStorage.setItem(
                                "cid2",
                                $(".nav_input1 input").attr("cid")
                            );
                            sessionStorage.setItem(
                                "linkpage",
                                $(".nav_input1 input").val()
                            );
                        } else {
                        }
                    }
                }
            }
            if (this.$route.path == "/overall") {
                this.$refs.child.overall(sessionStorage.getItem("cid"));
                sessionStorage.setItem(
                    "ind_index1",
                    sessionStorage.getItem("cid")
                );
                sessionStorage.setItem(
                    "ind_index11",
                    sessionStorage.getItem("cid2")
                );
            } else if (this.$route.path == "/sub_industry") {
                this.$refs.child.d3_api(sessionStorage.getItem("linkpage"));
                sessionStorage.setItem(
                    "ind_index2",
                    sessionStorage.getItem("cid")
                );
                sessionStorage.setItem(
                    "ind_index22",
                    sessionStorage.getItem("cid2")
                );
            } else if (this.$route.path == "/sub_industry_son") {
                this.$refs.child.sub_ajax(sessionStorage.getItem("cid"));
                sessionStorage.setItem(
                    "ind_index3",
                    sessionStorage.getItem("cid")
                );
                sessionStorage.setItem(
                    "ind_index33",
                    sessionStorage.getItem("cid2")
                );
            } else if (this.$route.path == "/StoreTop") {
                this.$refs.child.http(1, sessionStorage.getItem("linkpage"));
                this.$refs.child.status2();
                sessionStorage.setItem(
                    "ind_index4",
                    sessionStorage.getItem("cid")
                );
                sessionStorage.setItem(
                    "ind_index44",
                    sessionStorage.getItem("cid2")
                );
            } else if (this.$route.path == "/Seller_provinces") {
                this.$refs.child.get_data(sessionStorage.getItem("cid2"));
                sessionStorage.setItem(
                    "ind_index5",
                    sessionStorage.getItem("cid")
                );
                sessionStorage.setItem(
                    "ind_index55",
                    sessionStorage.getItem("cid2")
                );
            } else if (this.$route.path == "/Seller_credit") {
                this.$refs.child.ajax_data(sessionStorage.getItem("linkpage"));
                sessionStorage.setItem(
                    "ind_index6",
                    sessionStorage.getItem("cid")
                );
                sessionStorage.setItem(
                    "ind_index66",
                    sessionStorage.getItem("cid2")
                );
            } else if (this.$route.path == "/BabyTop") {
                this.$refs.child.http2(1, sessionStorage.getItem("linkpage"));
                this.$refs.child.status1();
                sessionStorage.setItem(
                    "ind_index7",
                    sessionStorage.getItem("cid")
                );
                sessionStorage.setItem(
                    "ind_index77",
                    sessionStorage.getItem("cid2")
                );
            }
        },
        search() {
            if ($("#search input").val() != "") {
                this.$refs.child.d3_api($("#search input").val());
            }
        }
        //过this.$refs.ref.method调用
    }
};
</script>
<style scoped>
.industry_active {
    color: #009eff;
}
ul li {
    float: none;
}
#industry {
    width: 100%;
    padding: 30px 0;
}
#search {
    width: 1000px;
    height: 80px;
    margin: auto;
    padding: 30px 0;
}
#search_left {
    width: 200px;
    float: left;
    text-align: center;
}
#search_left p:nth-child(1) {
    font-size: 28px;
}
#search_left p:nth-child(2) {
    font-size: 10px;
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
#menu {
    width: 80%;
    height: 35px;
    background: #e8eae7;
    border-top: 2px solid #009eff;
    padding-top: 5px;
    font-size: 14px;
    margin: auto;
    min-width: 1200px;
}

.now {
    float: left;
}
#menu label {
    line-height: 30px;
    margin-left: 10px;
}

/*下拉箭头 */

.triangle2 {
    position: absolute;
    right: 5px;
    top: 12px;
    width: 0px;
    height: 10px;
    border: 6px solid;
    border-color: #aaa transparent transparent transparent;
}

#box {
    width: 80%;
    margin: auto;
    min-width: 1200px;
    height: auto;
}
#box_main {
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
#box_left {
    width: 180px;
    height: auto;
    background: #fafafc;
    border: 1px solid #eee;
    padding: 10px 10px;
    line-height: 30px;
    float: left;
}
#box_left label {
    font-weight: bold;
    cursor: pointer;
}
#box_left ul li {
    cursor: pointer;
}
#box_left ul li ul {
    margin-left: 20px;
}
#box_left label img {
    width: 18px;
    position: relative;
    top: 3px;
    left: -5px;
}
#box_right {
    width: 100%;
    float: left;
    padding: 0 0 0 20px;
    position: relative;
}
.submit {
    margin-left: 50px;
    background: #009eff;
    color: #fff;
    border: 1px solid #009eff;
    padding: 2px 5px;
    border-radius: 2px;
}
</style>
<style>
.nav_main1 {
    width: 330px;
    height: 30px;
    position: relative;
    display: inline-block;
}

.nav_main2 {
    width: 250px;
    height: 30px;
    position: relative;
    left: 20px;
    display: inline-block;
}

.nav_main3 {
    width: 250px;
    height: 30px;
    position: relative;
    left: 40px;
    display: inline-block;
}

.nav_main4 {
    width: 230px;
    height: 30px;
    position: relative;
    left: 60px;
    display: inline-block;
}

.nav_input1,
.nav_input2,
.nav_input3,
.nav_input4 {
    position: relative;
    width: 160px;
    height: 28px;
    border: 1px solid #ddd;
    float: left;
    /* overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap; */
}

.nav_input1 input,
.nav_input2 input,
.nav_input3 input,
.nav_input4 input {
    width: 160px;
    height: 28px;
    text-indent: 5px;
    border: none;
    cursor: pointer;
}

.nav_content1,
.nav_content2,
.nav_content3,
.nav_content4 {
    width: 160px;
    border: 1px solid #ddd;
    border-top: none;
    height: auto;
    max-height: 270px;
    position: absolute;
    display: none;
    overflow-y: scroll;
    text-indent: 5px;
    line-height: 30px;
    padding: 5px 0;
    left: 0;
    top: 30px;
    background: #fff;
    z-index: 100;
}
.nav_content1 {
    left: 94px;
}
.nav_content1 ul li,
.nav_content2 ul li,
.nav_content3 ul li,
.nav_content4 ul li {
    cursor: pointer;
    font-size: 12px;
    float: none;
    /* overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap; */
}

.nav_content1 ul li:hover,
.nav_content2 ul li:hover,
.nav_content3 ul li:hover,
.nav_content4 ul li:hover {
    background: #eee;
}
</style>
