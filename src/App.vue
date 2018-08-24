<template>
    <div id="app">
        <index_nav></index_nav>
    </div>
</template>

<script>
import index_nav from "./components/nav";
export default {
    components: {
        index_nav
    },
};
</script>

<style>
#app {
    font-family: "" 微软雅黑 "", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
