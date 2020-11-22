<template>
    <div id="detail">
        <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
        <scroll class="content" ref="scroll" :probe-type="3" @controlScroll="contentScroll">
            <detail-swiper :banners="topBanners"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
            <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
            <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
            <goods-list ref="goods" :goods="recommendInfo"></goods-list>
        </scroll>
        <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
        <detail-bottom-bar></detail-bottom-bar>
    </div>
</template>

<script>
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBottomBar from './childComps/DetailBottomBar'

    import Scroll from 'components/common/scroll/scroll'
    import GoodsList from 'components/content/goods/GoodsList'
    import BackTop from 'components/content/backTop/backTop'

    import {getDetail} from "network/detail";
    import {debounce} from 'common/utils.js'
    import {imgRefrashMixin,scrollTopMixin} from 'common/mixins.js'

    export default {
        name: "Detail",
        mixins:[imgRefrashMixin,scrollTopMixin],
        data(){
            return{
                id: null,
                topBanners:[
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
                goods:{title:'1',price:'2',oldPrice:'3',discountDesc:'4',columns:['5','6'],services:[{name:'7',icon:'8'}]},
                shop:{
                    shopLogo :'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604056945365&di=f4ab00b98d245dd83271c86971a6de08&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F6%2F53ab8cdc115c4.jpg',
                    name : '1',
                    score : [{name:'2',score:'3',isBetter:true}],
                    cSells : '4',
                    cGoods : '5',
                },
                detailInfo:{
                    desc:'1',
                    detailImage:[
                        {
                            key:'2',
                            list:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604056945365&di=f4ab00b98d245dd83271c86971a6de08&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F6%2F53ab8cdc115c4.jpg']
                        }
                    ]
                },
                paramInfo:{
                    rule:[
                        [
                            [
                            '1','2','3'
                            ]
                        ]
                    ],
                    info:[{
                        key:'1',
                        value:'2'
                    }]
                },
                commentInfo:[
                    {
                        user:{avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604056945365&di=f4ab00b98d245dd83271c86971a6de08&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F6%2F53ab8cdc115c4.jpg',uname:'2'},
                        content:'3',
                        created:'4',
                        style:'5',
                        images:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604056945365&di=f4ab00b98d245dd83271c86971a6de08&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F6%2F53ab8cdc115c4.jpg']
                    }
                ],
                recommendInfo: [{img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604056884434&di=a3538d6ee54be48663b5bc07c950b874&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201303%2F19%2F20130319090518_cxVxR.jpeg',title:'goods',price:'15.00',cfav:'5',id:'1'},
                    {img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604056911388&di=89b52e634dda8f0d7a1f9ffba7c6b9f0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F14%2F20190214093828_vmyhv.jpeg',title:'goods',price:'15.00',cfav:'5',id:'2'}],
                itemImgLister: null,
                themeTopYs:[],
                getThemeTopY: null,
                currentIndex: null
            }
        },
        components:{
            DetailBaseInfo,
            DetailCommentInfo,
            DetailGoodsInfo,
            DetailNavBar,
            DetailBottomBar,
            DetailParamInfo,
            DetailShopInfo,
            DetailSwiper,
            Scroll,
            GoodsList,
            BackTop
        },
        created() {
            this.id=this.$route.params.id;
        },
        mounted(){
            this.getThemeTopY=debounce(()=>{
              this.themeTopYs.push(0);
              this.themeTopYs.push(this.$refs.param.$el.offsetTop);
              this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
              this.themeTopYs.push(this.$refs.goods.$el.offsetTop);
              this.themeTopYs.push(Number.MAX_VALUE);
            })
        },
        methods:{
            getDetail(id){
                getDetail(id).then(res=>{

                })
            },
            imgLoad(){
                this.$refs.scroll.refresh();
                this.getThemeTopY();
            },
            titleClick(index){
                this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],1000);
            },
            contentScroll(position){
                const positionY=-position.y;
                for (let i=0; i<this.themeTopYs.length-1;i++){
                    if (this.currentIndex!==i&&(positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])){
                        this.currentIndex=i;
                        this.$refs.nav.currentIndex=this.currentIndex;
                    }
                }
                // 判断backtop是否显示
                this.isShowBackTop=(-position.y)>200;
            }
        }
    }
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        height: 100vh;
        background-color: #FFFFFF;
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #FFFFFF;
    }
    .content{
        height: calc(100% - 93px);
    }
</style>
