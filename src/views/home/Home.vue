<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物车</div>
        </nav-bar>
        <scroll class="content"
                ref="scroll"
                :probe-type="3"
                @controlScroll="controlScroll"
                :pull-up-load="true" @pullingUp="loadMore">
            <home-swiper :banners="banners"/>
            <recommend-view :recommends="recommends"/>
            <feature-view/>
            <tab-control class="tab-control" :titles="['新款','流行','精选']" @tabClick="tabClick"></tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <back-top @click.native="backTopClick" v-show="isShow"></back-top>
    </div>
</template>

<script>
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import FeatureView from './childComps/FeatureView'

    import NavBar from 'components/common/navbar/NavBar'
    import Scroll from 'components/common/scroll/scroll'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import BackTop from 'components/content/backTop/backTop'

    import {getHomeMultidata,getHomeGoods} from "../../network/home";
    export default {
        name: "Home",
        data(){
            return{
                goods:{
                  'pop':{
                      page:0,list:[{img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604056884434&di=a3538d6ee54be48663b5bc07c950b874&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201303%2F19%2F20130319090518_cxVxR.jpeg',title:'goods',price:'15.00',cfav:'5'},
                          {img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604056911388&di=89b52e634dda8f0d7a1f9ffba7c6b9f0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F14%2F20190214093828_vmyhv.jpeg',title:'goods',price:'15.00',cfav:'5'}]
                  },
                    'new':{
                      page:0,list:[{img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604056911388&di=89b52e634dda8f0d7a1f9ffba7c6b9f0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F14%2F20190214093828_vmyhv.jpeg',title:'goods',price:'15.00',cfav:'5'}]
                  },
                    'sell':{
                      page:0,list:[]
                  },
                },
                banners:[
                    {
                        link:'http://www.baidu.com',
                        image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604056884434&di=a3538d6ee54be48663b5bc07c950b874&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201303%2F19%2F20130319090518_cxVxR.jpeg'
                    },
                    {
                        link:'http://www.baidu.com',
                        image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604056911388&di=89b52e634dda8f0d7a1f9ffba7c6b9f0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F14%2F20190214093828_vmyhv.jpeg'
                    },
                    {
                        link:'http://www.baidu.com',
                        image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604056945366&di=38fb4e41192222d1dd899cba7b5a3e70&imgtype=0&src=http%3A%2F%2Fdik.img.kttpdq.com%2Fpic%2F1%2F570%2Fb3529d8cdea75c7d_1366x768.jpg'
                    },
                    {
                        link:'http://www.baidu.com',
                        image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604056945365&di=f4ab00b98d245dd83271c86971a6de08&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F6%2F53ab8cdc115c4.jpg'
                    }
                ],
                recommends:[
                    {
                        title:'1',
                        link:'http://www.baidu.com',
                        image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604056884434&di=a3538d6ee54be48663b5bc07c950b874&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201303%2F19%2F20130319090518_cxVxR.jpeg'
                    },
                    {
                        title:'2',
                        link:'http://www.baidu.com',
                        image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604056911388&di=89b52e634dda8f0d7a1f9ffba7c6b9f0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F14%2F20190214093828_vmyhv.jpeg'
                    },
                    {
                        title:'3',
                        link:'http://www.baidu.com',
                        image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604056945366&di=38fb4e41192222d1dd899cba7b5a3e70&imgtype=0&src=http%3A%2F%2Fdik.img.kttpdq.com%2Fpic%2F1%2F570%2Fb3529d8cdea75c7d_1366x768.jpg'
                    },
                    {
                        title:'4',
                        link:'http://www.baidu.com',
                        image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604056945365&di=f4ab00b98d245dd83271c86971a6de08&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F6%2F53ab8cdc115c4.jpg'
                    }

                ],
                currentType:'pop',
                isShow: false
            }
        },
        components:{
            HomeSwiper,
            RecommendView,
            FeatureView,
            NavBar,
            Scroll,
            TabControl,
            BackTop,
            GoodsList
        },
        created() {

        },
        mounted(){
            this.$bus.$on('itemImageLoad', () => {
                this.$refs.scroll.scroll.refresh()
            })
        },
        computed:{
          showGoods(){
              return this.goods[this.currentType].list
          }
        },
        methods:{
            /**
             * 事件监听相关的说明
             *
             */
            tabClick(index){
                switch (index) {
                    case 0:
                        this.currentType='pop'
                        break
                    case 1:
                        this.currentType='new'
                        break
                    case 2:
                        this.currentType='sell'
                        break
                }
            },
            backTopClick(){
                this.$refs.scroll.scrollTo(0,0);
            },
            controlScroll(position){
                this.isShow=(-position.y)>200
            },
            loadMore(){
              // this.getHomeGoods(this.currentType);
                this.$refs.scroll.finishPullUp();
            },
            /**
             * 网络请求的相关方法
             */
            getHomeMultidata(){
                getHomeMultidata().then(res=>{
                    this.banners=res.data;
                })
            },
            getHomeGoods(type){
                const page=this.goods[type].page+1;
                getHomeGoods(type,page).then(res=>{
                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page+=1;
                })
            }
        }
    }
</script>

<style scoped>
    #home{
        /*padding-top: 44px;*/
        height: 100vh;
        position: relative;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: #ffffff;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 9
    }
    .content{
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
        overflow: hidden;
    }
    .tab-control{
        position: sticky;
        top: 44px;
    }
</style>
