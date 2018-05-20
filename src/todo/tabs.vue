<template>
    <div class="helper">
        <span class="left">{{unFinishedTodoLength}} item left</span>
        <span class="tabs">
            <span v-for="state in states"
                  :key="state" :class="[state, filter === state ? 'actived' : '']"
                  @click="toggleFilter(state)">
                {{state}}
            </span>
        </span>
        <span class="clear" @click="clearAllCompleted">
            Clear completed
        </span>
    </div>
</template>

<script>
    export default {
        //props 代表接收外部传递的参数
        props: {
            filter: {
                type: String,
                required: true
            },
            unFinishedTodoLength: {
                type: Number,
                required: true
            }
        },
        data() {
            return{
                states: ['all', 'active', 'completed']
            }
        },
        methods: {
            //清除所有已完成的元素，触发一个事件，由父元素进行监听
            clearAllCompleted(){
                this.$emit('clearAllCompleted')
            },
            toggleFilter(state){
                this.$emit('toggleFilter', state)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .helper {
        font-weight 100
        display flex
        justify-content space-between
        padding 5px 0
        line-height 30px
        background-color #ffffff
        font-size 14px
        font-smoothing: antialiased;
    }

    .left, .clear, .tabs {
        padding 0 10px
        box-sizing border-box
    }

    .left, .clear {
        width 150px
    }

    .left {
        text-align left
    }

    .clear {
        text-align: right
        cursor pointer
    }

    .tabs {
        width 200px
        display flex
        justify-content space-around
        * {
            display inline-block
            padding 0 10px
            cursor pointer
            border 1px solid rgba(175, 47, 47, 0)
            &.actived {
                border-color rgba(175, 47, 47, 0.4)
                border-radius 5px
            }
        }
    }
</style>