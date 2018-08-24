<template>
    <div id="sub_index">
        <img v-show="loading" src="./../../assets/jz.gif" id="loading">
        <div id="sub" style="width:100%" v-show="table_loading"></div>
        <ul v-show="table_loading">
            <li v-for="(item,index) in treeData" :key="index" :class="{active:status==index}" @click="db_tree(index)">{{item.name}}</li>
        </ul>
        {{count}}
    </div>
</template>
<script>
// import * as d3 from 'd3'
import d3 from "./../../../static/d3_tree";
import axios from "axios";
export default {
    data() {
        return {
            status: 0,
            treeData: [],
            loading: false,
            table_loading: true
        };
    },
    computed: {
        count() {
            return this.$store.state.count;
        }
    },
    mounted() {
        this.treeData = JSON.parse(sessionStorage.getItem("tree"));
        var _this = this;
        if (JSON.parse(sessionStorage.getItem("tree")) != null) {
            if (
                sessionStorage.getItem("cid_old") ==
                sessionStorage.getItem("ind_index77")
            ) {
                this.d3(
                    _this.treeData[_this.status],
                    _this.treeData[_this.status].final_count * 30
                );
            } else {
                _this.d3_api(sessionStorage.getItem("linkpage_val"));
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
            _this.d3_api("T恤");
        }
    },
    methods: {
        d3_api(kw) {
            this.table_loading = false;
            this.loading = true;
            var _this = this;
            axios
                .get(api.sub_industry, { params: { kw: kw } })
                .then(function(res) {
                    _this.treeData = JSON.parse(res.data.result);
                    sessionStorage.setItem("tree", res.data.result);
                    _this.d3(
                        JSON.parse(res.data.result)[0],
                        JSON.parse(res.data.result)[0].final_count * 30
                    );
                    _this.table_loading = true;
                    _this.loading = false;
                });
        },
        db_tree(index) {
            this.status = index;
            this.d3(
                this.treeData[index],
                this.treeData[index].final_count * 30
            );
        },
        d3(data, hei) {
            $("#sub").html("");
            // ************** Generate the tree diagram  *****************
            //定义树图的全局属性（宽高）
            var margin = {
                    top: 20,
                    right: 100,
                    bottom: 20,
                    left: 220
                },
                width = 1000 - margin.right - margin.left,
                height = hei - margin.top - margin.bottom;

            var i = 0,
                duration = 750, //过渡延迟时间
                root;

            var tree = d3.layout
                .tree() //创建一个树布局
                .size([height, width]);

            var diagonal = d3.svg.diagonal().projection(function(d) {
                return [d.y, d.x];
            }); //创建新的斜线生成器

            //声明与定义画布属性
            var svg = d3
                .select("#sub")
                .append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr(
                    "transform",
                    "translate(" + margin.left + "," + margin.top + ")"
                );

            root = data; //treeData为上边定义的节点属性
            root.x0 = height / 2;
            root.y0 = 0;

            update(root);

            d3.select(self.frameElement).style("height", "500px");

            function update(source) {
                // Compute the new tree layout.计算新树图的布局
                var nodes = tree.nodes(root).reverse(),
                    links = tree.links(nodes);

                // Normalize for fixed-depth.设置y坐标点，每层占180px
                nodes.forEach(function(d) {
                    d.y = d.depth * 180;
                });

                // Update the nodes…每个node对应一个group
                var node = svg.selectAll("g.node").data(nodes, function(d) {
                    return d.id || (d.id = ++i);
                }); //data()：绑定一个数组到选择集上，数组的各项值分别与选择集的各元素绑定

                // Enter any new nodes at the parent's previous position.新增节点数据集，设置位置
                var nodeEnter = node
                    .enter()
                    .append("g") //在 svg 中添加一个g，g是 svg 中的一个属性，是 group 的意思，它表示一组什么东西，如一组 lines ， rects ，circles 其实坐标轴就是由这些东西构成的。
                    .attr("class", "node") //attr设置html属性，style设置css属性
                    .attr("transform", function(d) {
                        return "translate(" + source.y0 + "," + source.x0 + ")";
                    })
                    .on("click", click);

                //添加连接点---此处设置的是圆圈过渡时候的效果（颜色）
                // nodeEnter.append("circle")
                //   .attr("r", 1e-6);//d 代表数据，也就是与某元素绑定的数据。

                nodeEnter
                    .append("path")
                    .style("stroke-width", "2px")
                    .style("stroke", "#4682b4")
                    .style("fill", "white")
                    .attr(
                        "d",
                        d3.svg
                            .symbol()
                            .size(function(d) {
                                if (d.value <= 9) {
                                    return "400";
                                } else if (d.value >= 9) {
                                    return "400";
                                }
                            })
                            .type(function(d) {
                                if (d.value <= 9) {
                                    return "circle";
                                } else if (d.value >= 9) {
                                    return "circle";
                                }
                            })
                    )
                    .attr("class", function(d) {
                        if (d.value <= 9) {
                            return "bling";
                        } else {
                            return "fill_normal";
                        }
                    });

                //添加标签
                nodeEnter
                    .append("text")
                    .attr("x", function(d) {
                        return d.children || d._children ? -13 : 13;
                    })
                    .attr("dy", ".35em")
                    .attr("text-anchor", function(d) {
                        return d.children || d._children ? "end" : "start";
                    })
                    .text(function(d) {
                        return d.name;
                    })
                    .style("fill-opacity", 1e-6)
                    .attr("class", function(d) {
                        if (d.value <= 9) {
                            return "bling1";
                        } else {
                            return "fill_normal1";
                        }
                    });

                // Transition nodes to their new position.将节点过渡到一个新的位置-----主要是针对节点过渡过程中的过渡效果
                //node就是保留的数据集，为原来数据的图形添加过渡动画。首先是整个组的位置
                var nodeUpdate = node
                    .transition() //开始一个动画过渡
                    .duration(duration) //过渡延迟时间,此处主要设置的是圆圈节点随斜线的过渡延迟
                    .attr("r", 10)
                    .attr("transform", function(d) {
                        return "translate(" + d.y + "," + d.x + ")";
                    });
                //更新连接点的填充色
                // nodeUpdate.select("circle")
                // .attr("r", 10)
                // .attr('class',function(d){
                //   if(d.value <= 9){
                //     return 'bling';
                //   }else{
                //     return 'fill_normal';
                //   }
                // });
                nodeUpdate
                    .select("path")
                    .style("stroke-width", "2px")
                    .style("stroke", "#4682b4")
                    .style("fill", "white")
                    .attr(
                        "d",
                        d3.svg
                            .symbol()
                            .size(function(d) {
                                if (d.value <= 9) {
                                    return "200";
                                } else if (d.value >= 9) {
                                    return "200";
                                }
                            })
                            .type(function(d) {
                                if (d.value <= 9) {
                                    return "circle";
                                } else if (d.value >= 9) {
                                    return "circle";
                                }
                            })
                    );

                nodeUpdate.select("text").style("fill-opacity", 1);

                // Transition exiting nodes to the parent's new position.过渡现有的节点到父母的新位置。
                //最后处理消失的数据，添加消失动画
                var nodeExit = node
                    .exit()
                    .transition()
                    .duration(duration)
                    .attr("transform", function(d) {
                        return "translate(" + source.y + "," + source.x + ")";
                    })
                    .remove();

                nodeExit.select("circle").attr("r", 1e-6);

                nodeExit.select("text").style("fill-opacity", 1e-6);

                // Update the links…线操作相关
                //再处理连线集合
                var link = svg.selectAll("path.link").data(links, function(d) {
                    return d.target.id;
                });

                // Enter any new links at the parent's previous position.
                //添加新的连线
                link
                    .enter()
                    .insert("path", "g")
                    .attr("class", "link")
                    .attr("d", function(d) {
                        var o = {
                            x: source.x0,
                            y: source.y0
                        };
                        return diagonal({
                            source: o,
                            target: o
                        }); //diagonal - 生成一个二维贝塞尔连接器, 用于节点连接图.
                    })
                    .style("stroke", function(d) {
                        //d包含当前的属性console.log(d)
                        return "#ccc";
                    });

                // Transition links to their new position.将斜线过渡到新的位置
                //保留的连线添加过渡动画
                link
                    .transition()
                    .duration(duration)
                    .attr("d", diagonal);

                // Transition exiting nodes to the parent's new position.过渡现有的斜线到父母的新位置。
                //消失的连线添加过渡动画
                link
                    .exit()
                    .transition()
                    .duration(duration)
                    .attr("d", function(d) {
                        var o = {
                            x: source.x,
                            y: source.y
                        };
                        return diagonal({
                            source: o,
                            target: o
                        });
                    })
                    .remove();

                // Stash the old positions for transition.将旧的斜线过渡效果隐藏
                nodes.forEach(function(d) {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });
            }

            //定义一个将某节点折叠的函数
            // Toggle children on click.切换子节点事件
            function click(d) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
                update(d);
            }
        }
    }
};
</script>
<style scoped>
.active {
    position: relative;
    border-left: 5px solid #009eff;
    color: #009eff;
    font-weight: bold;
    left: -5px;
}
#loading {
    position: absolute;
    left: 50%;
    margin-left: -24px;
    top: 200px;
}
</style>

<style>
#sub_index {
    position: relative;
}
#sub_index ul {
    position: absolute;
    top: 0;
    right: 50px;
}
#sub_index ul li {
    float: none;
    line-height: 30px;
    cursor: pointer;
    padding-left: 15px;
}
.node {
    cursor: pointer;
}

.node circle {
    stroke: "#f0f";
    stroke-width: 4px;
}

.node text {
    font: 12px sans-serif;
}

.link {
    fill: none;
    stroke: red;
    stroke-width: 2px;
}

.fill_normal {
    fill: green;
}

.fill_normal1 {
    font: 10px;
}

.triangle-up {
    fill: none;
    stroke: red;
    stroke-width: 2px;
}

.bling {
    animation: alarm 20s ease-in infinite;
    fill: yellow;
    font-weight: bold;
}

.node .bling1 {
    fill: red;
    font: 14px sans-serif;
    font-weight: bold;
}

@keyframes alarm {
    0% {
        fill: #ff3333;
    }
    50% {
        fill: #ff3333;
    }
    100% {
        fill: #ff3333;
    }
}
</style>


