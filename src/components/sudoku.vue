<template>
<div>
    <div class="sudoku_row"  >
        <div class="sudoku_item " :to="sudoku.path" :class="curSelect==sudoku.id?'opacity':''" v-for="(sudoku,index) in sudokus" :key="index" @touchstart="touchstart(index)" @touchend="touchend">
            <img :src="sudoku.img_src" width="40" height="40" >
            {{sudoku.name}}
        </div>
    </div> 
    <mt-button type="primary" @click="openAction">openAction</mt-button>

     <mt-button type="primary" ref='primary' @click="openMsgBox">openMsgBox</mt-button>
    <mt-popup
      :modal=false
      v-model="popupVisible"
      pop-transition="popup-fade"
      position="top">
      123456
    </mt-popup>

    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>

</div>  
</template>  
<script>  
import { Toast ,MessageBox} from 'mint-ui';
export default {  
  name: 'sudoku',  
  data() {  
    return {  
      sudokus:[{
                id:0,
                name:'飞机',
                img_src:require('../static/img/plane.png')
            },{
                id:1,
                name:'游戏',
                img_src:require('../static/img/game.png'),
                path:'/search'
            },{
                id:2,
                name:'音乐',
                img_src:require('../static/img/music.png')
            },{
                id:3,
                name:'物流',
                img_src:require('../static/img/logistics.png')
            },{
                id:4,
                name:'医院',
                img_src:require('../static/img/hospital.png')
            },{
                id:5,
                name:'医院',
                img_src:require('../static/img/hospital.png')
            },{
                id:6,
                name:'医院',
                img_src:require('../static/img/hospital.png')
            },{
                id:7,
                name:'医院',
                img_src:require('../static/img/hospital.png')
            },{
                id:8,
                name:'医院',
                img_src:require('../static/img/hospital.png')
            },{
                id:9,
                name:'医院',
                img_src:require('../static/img/hospital.png')
            },{
                id:10,
                name:'医院',
                img_src:require('../static/img/hospital.png')
            }],
            curSelect:null,     //当前点击的
            popupVisible:false, //pop是否显示
            sheetVisible:false, //action是否显示
            actions:[]          //actions的选项
    };  
  },components:{
    
  },methods:{
        touchstart:function(e){
            var that = this;
            var list = that.sudokus;
            for (var i = 0, len = list.length; i < len; ++i) {
                if (list[i].id == e) {
                    that.curSelect = i;
                }
                if (e == 0) {
                    that.popupVisible = true;
                }
                setTimeout(function(){
                  that.popupVisible = false;
                },1000)
            }
        },touchend:function(){       
            var that = this;
            that.curSelect = null;
        },openAction:function(){
            this.sheetVisible = true;
        },takePhoto:function() {
            Toast({
              message: '提示',
              position: 'bottom',
              duration: 2000
            });
        },
        openAlbum:function() {
           console.log('opening album');
        },
        openMsgBox:function(){
          console.log(this.$refs.primary.type)
          MessageBox({
            title: '提示',
            message: '确定执行此操作?',
            showCancelButton: true
          }).then(action => {
            if (action == 'confirm') {
              console.log('abc');
            }else{
              console.log('取消');
            }
        });
        }
    },
    mounted() {
      this.actions = [{
        name: '拍照',
        method: this.takePhoto
      }, {
        name: '从相册中选择',
        method: this.openAlbum
      }]
    }
};  
</script>  
<style >  
    .sudoku_row{
        display: flex;
        align-items: center;
        width:100%;
        flex-wrap: wrap;
    }
    .sudoku_item{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width:25%;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 12px;
    }
    .opacity{
        opacity: 0.4;
        background: #e5e5e5;
    }
    .sudoku_item img{
        margin-bottom: 3px;
        display: block;
    }
    .mint-popup-top{
      width:100% !important;
      line-height: 40px !important;
      text-align: center;
      background:#4b4b4b !important;
      color: white;
    }
</style>  