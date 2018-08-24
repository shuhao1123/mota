<template>
    <div id="login_index">
        <form action="" method="">
            <input type="text" v-model="name" id="name" placeholder="请输入用户名"><br>
            <input type="text" v-model="pwd" id="password" placeholder="请输入密码"><br>
            <button @click="isLogin" id="login">登录</button>
        </form>
    </div>
</template>
<script>
// $.post(
//     "http://192.168.3.114:8000/users/loginAPI/",
//     { user_name: "yanshu001", user_pwd: "123456" },
//     function(item) {console.log(item)},
//     "jsonp"
// );
export default {
    data() {
        return {
            name: "",
            pwd: "",
            error: ""
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    mounted() {},
    methods: {
        // login() {
        //     var _this = this;
        //     $.ajax({
        //         url: "http://192.168.3.114:8000/users/loginAPI/",
        //         data: {
        //             user_name: $("#name").val(),
        //             user_pwd: $("#password").val()
        //         },
        //         type: "post",
        //         // dataType:'jsonp',
        //         success: function(item) {
        //             console.log(item);
        //             if (item.status == true) {
        //                 sessionStorage.setItem("user", "11");
        //                 window.location.href = "http://127.0.0.1:8080";
        //             } else {
        //                 _this.error = "请输入正确的用户名或密码";
        //             }
        //         },
        //         error(xhr) {
        //             console.log(xhr);
        //         }
        //     });
        // },
        isLogin: function() {
            // this.$http.get('http://localhost:8080/users?username='+this.name+'&password='+this.pwd).then((response) => {
            // 	//这里在isLogin方法中先判断一下后台返回的是否为空值，如果不是然后提交后台返回的值。
            // 	//注意这里是个难点，Vuex与Vue-Resource结合使用。
            // 	if(response.body != null & response.body.length > 0){
            // 		this.$store.commit('isLogin',response.body[0]);
            // 		this.name=''
            // 		this.pwd= ''
            // 		this.$router.push({ path: 'main' })
            // 	}else{
            // 		alert('请输入正确的用户名和密码！！！');
            // 		this.name=''
            // 		this.pwd= ''
            // 	}

            // }).then((error)=> this.error = error)

            // this.$store.commit("isLogin", { username: "zhaoshuhao" });
            if (this.name == "zhaoshuhao") {
                sessionStorage.setItem(
                    "isLogin",
                    JSON.stringify({ username: this.name })
                );
                if (status == "401") {
                    router.push("/login");
                }
                if (status == 401) {
                    //判断当前的路由是否是目标路由
                    if (router.currentRoute.name == "target") {
                        //跳转回login路由，并把目标路由的url路径保存在login的query中
                        router.replace({
                            name: "login",
                            query: { redirect: router.currentRoute.fullPath }
                        });
                    } else {
                        /* 普通401拦截直接返回到登录页面 */
                        router.push("/login");
                    }
                }
                if (this.$route.query.redirect == undefined) {
                    this.$router.push({ path: "/" });
                } else {
                    if (
                        JSON.parse(sessionStorage.getItem("isLogin"))
                            .username == "zhaoshuhao"
                    ) {
                        this.$router.push({ path: this.$route.query.redirect });
                    } else {
                        alert("请输入正确的用户名");
                    }
                }
            }
        }
    }
};
</script>
<style scoped>
#login_index {
    width: 500px;
    margin: 150px auto;
}
#name {
    width: 400px;
    height: 50px;
    border: 1px solid #009eff;
    text-indent: 5px;
    margin-top: 10px;
}
#password {
    width: 400px;
    height: 50px;
    border: 1px solid #009eff;
    text-indent: 5px;
    margin-top: 20px;
}
#login {
    width: 400px;
    height: 50px;
    background: #009eff;
    border: 1px solid #009eff;
    color: #fff;
    margin-top: 20px;
}
</style>


