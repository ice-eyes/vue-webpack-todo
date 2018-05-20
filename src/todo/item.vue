<template>
    <!--':class'是动态的写法，其中的内容可以写js代码，以实现动态的效果-->
    <div :class="['todo-item', todo.completed ? 'completed' : '']">
        <!--'v-model'意思是绑定数据模型-->
        <input type="checkbox" class="toggle"
                v-model="todo.completed"
        >
        <label>{{todo.content}}</label>
        <button class="delete" @click="deleteTo"></button>
    </div>
</template>

<script>
    export default {
        //props 代表接收外部传递的参数
        props: {
            todo: {
                type:Object,
                required: true
            }
        },
        methods: {
            deleteTo(){
                //父子组件交互的过程，这里是触发父组件中的del方法，传递的参数是todo.id
                this.$emit('del',this.todo.id)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .todo-item{
        position relative
        background-color #fff
        font-size 24px
        border-bottom 1px solid rgba(0,0,0,0.06)
        &:hover{
            .delete:after{
                content: 'x'
            }
        }
        label{
            white-space: pre-line;
            word-break: break-all;
            padding: 15px 60px 15px 15px;
            margin-left: 45px;
            display: block;
            line-height: 1.2;
            transition: color 0.4s;
        }
        &.completed{
            label{
                color: #d9d9d9;
                text-decoration line-through
            }
        }
    }
    .toggle{
        text-align: center;
        width: 40px;
        height: 40px;
        line-height: 40px
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none;
        appearance: none;
        outline none
        padding-left 5px
        cursor pointer
        &:after{
            content: url('../assets/images/round.svg')
        }
        &:checked:after{
            content: url('../assets/images/done.svg')
        }
    }
    .delete{
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
        background-color transparent
        appearance none
        border-width 0
        cursor pointer
        outline none
    }
</style>