<template>  
  <div class="main"> 
      <mt-header fixed title="豆瓣电影">
          <router-link to="/search" slot="right"> 
            <mt-button icon="more"   ></mt-button>
          </router-link>
      </mt-header>
      <mt-tab-container class="page-tabbar-container" v-model="selected">  
        <mt-tab-container-item class="mt-tab-container-item" id="index">  
           <index></index>
        </mt-tab-container-item>  
        <mt-tab-container-item id="find">  
          <mt-cell v-for="(n,index) in 5" :key="index" :title="'订单 ' + n" />  
        </mt-tab-container-item>  
        <mt-tab-container-item id="order">  
          <find></find> 
        </mt-tab-container-item>  
        <mt-tab-container-item id="my">  
          <router-link to="/">  
            <mt-button type="danger" size="large">退出</mt-button>  
          </router-link>  
        </mt-tab-container-item>  
      </mt-tab-container> 


    <mt-tabbar v-model="selected" fixed :selected.sync="selected">  
      <mt-tab-item id="index" is-selected>  
        <img slot="icon" v-if="selected!='index'" src="../static/img/user.png">
        <img slot="icon" v-if="selected=='index'" src="../static/img/user_light.png">   
        外卖  
      </mt-tab-item>  
      <mt-tab-item id="find">  
        <img slot="icon" v-if="selected!='find'" src="../static/img/scancode.png"> 
        <img slot="icon" v-if="selected=='find'" src="../static/img/scancode_light.png">  
        订单  
      </mt-tab-item>  
      <mt-tab-item id="order">  
        <img slot="icon" v-if="selected!='order'" src="../static/img/camera.png"> 
        <img slot="icon" v-if="selected=='order'" src="../static/img/camera_light.png">  
        发现  
      </mt-tab-item>  
      <mt-tab-item id="my">  
        <img slot="icon" v-if="selected!='my'" src="../static/img/set.png"> 
        <img slot="icon" v-if="selected=='my'" src="../static/img/set_light.png">  
        我的  
      </mt-tab-item>  
    </mt-tabbar>  
  </div>  
</template>  
<script>  
 import find from '../pages/find'
 import index from '../pages/index'
export default {  
  name: 'page-tabbar',  
  data() {  
    return {  
      selected: 'index'
    };  
  },components:{
    find,
    index
  }  
};  
</script>  
<style >  
.mint-tab-container-item{
  width:100%;
  padding-top: 40px !important;
}
.mint-indexlist-nav{
  position: fixed !important;
}    
</style>  