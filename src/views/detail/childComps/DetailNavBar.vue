<template>
    <div>
        <nav-bar class="nav-bar">
            <div slot="left" @click="backFn">
                <img src="~assets/images/fanhui.png" alt="" class="back-icon">
            </div>
            <div slot="center" class="nav-center-content">
                <div v-for="(item,index) in titles"
                     class="nav-center-item">
                    <div :class="{active:index===currentIndex}" @click="itemClick(index)">
                        {{item}}
                    </div>
                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    export default {
        name: "DetailNavBar",
        components:{
            NavBar
        },
        data(){
            return{
                titles:['商品','参数','评论','推荐'],
                currentIndex: 0
            }
        },
        methods:{
            itemClick(index){
                this.currentIndex=index;
                this.$emit('titleClick',index)
            },
            backFn(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    .nav-center-content{
        display: flex;
    }
    .nav-center-item{
        flex: 1
    }
    .active{
        color: var(--color-tint);
    }
    .back-icon{
        width: 28px;
        height: 28px;
        vertical-align: middle;
    }
</style>
