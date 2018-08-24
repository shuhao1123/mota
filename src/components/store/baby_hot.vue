<template>
    <div>
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
            total: 150, // 记录总条数
            display: 10, // 每页显示条数
            current: 1 // 当前的页数};
        };
    },
    computed: {},
    mounted() {
        this.http_babyhot();
    },
    methods: {
        http_babyhot() {
            axios
                .get(api.baby_hot, { params: { shop_id: 57303596 } })
                .then(function(data) {
                    console.log(data);
                });
        },
        pagechange: function(currentPage) {
            console.log(currentPage);
            // ajax请求, 向后台发送 currentPage, 来获取对应的数据
        }
    }
};
</script>
<style>
</style>


