<template>
    <!--vue里面一定要定义一个包裹的根节点，不能有两个并列的根节点-->
    <div id="app">
        <div id="cover"></div>
        <!--Header必须大写，如果小写就与原生的header相冲突-->
        <Header></Header>
        <Todo></Todo>
        <Footer></Footer>
    </div>
</template>
<script>
    import Header from './todo/header.vue'
    import Footer from './todo/footer.jsx'
    import Todo from './todo/todo.vue'

    export default {
        components: {
            Header,
            Footer,
            Todo
        }
    }
</script>
<!--lang的值指定其下的css代码使用哪种css预处理器，scoped限定使用范围-->
<style lang="stylus" scoped>
    #app {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }

    #cover {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #555
        opacity 0.5
        z-index -1
    }
</style>