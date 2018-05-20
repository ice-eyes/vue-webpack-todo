<template>
    <section class="real-app">
        <input
                type="text"
                class="add-input"
                autofocus="autofocus"
                placeholder="接下去要做什么？"
                @keyup.enter="addTodo"
        >

        <!--使用@符号表示监听某个事件，此处是监听del事件，这个事件是在子组件中触发，并且传递过来-->
        <item v-for="todo in computedTodos"
              :todo="todo"
              :key="todo.id"
              @del="deleteTodo"
        />

        <!--':filter'的写法是指向这个组件传值，传过去的变量名叫filter-->
        <tabs :filter="filter"
              :unFinishedTodoLength="unFinishedTodoLength"
              @toggleFilter="toggleFilter"
              @clearAllCompleted="clearAllCompleted"
        />
    </section>
</template>

<script>
    import item from './item.vue'
    import tabs from './tabs.vue'
    let id = 0

    export default {
        data() {
            return {
                todos:[],
                filter: 'all'
            }
        },
        //计算
        computed:{
            //计算未完成
            unFinishedTodoLength() {
                return this.todos.filter(todo => !todo.completed).length
            },
            //根据filter的值来计算应该显示的items
            computedTodos(){
                if (this.filter === 'all') {
                    return this.todos
                }
                const completed = this.filter === 'completed'
                return this.todos.filter(todo => todo.completed === completed)
            }
        },
        methods: {
            addTodo(e){
                //往数组的最前面添加元素
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed: false
                })
                //添加完之后清空当前元素的值
                e.target.value = ''
            },
            deleteTodo(id){
                //splice(index,length,item)，用于删除数组中的元素，从第三个参数开始，表示向其中添加这些元素
                //findIndex是es6中数组的新方法，用于查找元素在数组中的index，arrayObj.findIndex(fn)，fn的参数是每一项元素，返回值为true或false
                this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
            },
            clearAllCompleted(){
                this.todos = this.todos.filter(todo => !todo.completed);
            },
            //状态当前的状态
            toggleFilter(state){
                this.filter = state
            }
        },
        components: {
            item,
            tabs
        }
    }
</script>

<style lang="stylus" scoped>
    .real-app{
        margin 0 auto
        width 600px
        box-shadow 0 0 5px #666
    }
    .add-input {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 60px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }
</style>