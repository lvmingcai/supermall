<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "scroll",
        props:{
            probeType:{
              type: Number,
              default: 0
            },
            pullUpLoad:{
                type: Boolean,
                default: false
            }
        },
        data(){
          return{
              scroll: null
          }
        },
        mounted() {
            this.$nextTick(()=>{
                // 创建BScroll对象
                this.scroll=new BScroll(this.$refs.wrapper,{
                    click: true,
                    probeType: this.probeType,
                    pullUpLoad: true
                })
                // 监听滚动位置事件
                this.scroll.on('scroll',(position)=>{
                    this.$emit('controlScroll',position);
                })
                // 监听上拉事件
                this.scroll.on('pullingUp',()=>{
                    this.$emit('pullingUp');
                })
            })
        },
        methods:{
            scrollTo(x,y,time=300){
                this.scroll.scrollTo(x,y,time);
            },
            finishPullUp(){
                this.scroll.finishPullUp();
            }
        }
    }
</script>

<style scoped>

</style>
