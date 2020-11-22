<template>
    <swiper class="banner">
        <swiper-item v-for="item in banners">
            <a :href="item.link">
                <img :src="item.image" alt="">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
    import {Swiper,SwiperItem} from 'components/common/swiper'
    export default {
        name: "DetailSwiper",
        components:{
            Swiper,
            SwiperItem
        },
        props:{
            banners:{
                type: Array,
                default(){
                    return []
                }
            }
        },
    }
</script>

<style scoped>
    .banner{
        height: 240px;
        overflow: hidden;
    }
</style>
