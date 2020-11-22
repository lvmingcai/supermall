import BackTop from "components/content/backTop/backTop.vue";
import {debounce} from "common/utils";
//图片列表刷新
export const imgRefrashMixin = {
  mounted() {
	  const refresh=debounce(this.$refs.scroll.refresh,2000);
  	//请求数据列表后刷新
  	this.itemImgLister = ()=> {
  		refresh();
  	}
  	this.$bus.$on('itemImageLoad',this.itemImgLister);
  }
}

//返回顶部
export const scrollTopMixin = {
  data() {
	  return {
		  isShowBackTop: false,
	  }
  },
  components: {
	  BackTop
  },
  methods: {
	  backTop(){
	  	//返回顶部
	  	this.$refs.scroll.scrollTo(0,0);
	  }
  }
}
