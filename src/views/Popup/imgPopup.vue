<template>
    <div class="popupBox" v-show="imgShow">
        <div id="mask"></div>
        <div class="pop error_pop"> 
            <div class="pop_tit">上传头像<a href="javaScript:;" class="a_close" id="domMessage1_close" @click="close">x</a></div>
            <div class="cropper-content">
                <div>
                    <span class="choose-pic">请选择图片：</span>
                    <label class="btn" for="uploads">上传图片</label>
                     <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
                </div>
                <div style="overflow:hidden">
                    <div class="cropper">
                        <vueCropper
                            ref="cropper"
                            :img="option.img"
                            :outputSize="option.size"
                            :outputType="option.outputType"
                            :info="true"
                            :full="option.full"
                            :canMove="option.canMove"
                            :canMoveBox="option.canMoveBox"
                            :original="option.original"
                            :autoCrop="option.autoCrop"
                            :autoCropWidth="option.autoCropWidth"
                            :autoCropHeight="option.autoCropHeight"
                            :fixedBox="option.fixedBox"
                            @realTime="realTime"
                            @imgLoad="imgLoad"
                        ></vueCropper>
                    </div>
                    <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '10px'}">
                        <div :style="previews.div" class="preview">
                            <img :src="previews.url" :style="previews.img">
                        </div>
                    </div>
                </div>
                <div class="btnright">
                    <a href="javascript:" class="conmit" @click="finish('blob')">确定</a>
                    <a href="javascript:" class="cancel" @click="close">取消</a>
                    <!-- <div class="upload-btn">
                        <button  @click="down('blob')">下载</button>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueCropper from 'vue-cropper'
export default {
    data(){
        return {
            token:'',
            imgShow:false,
            crap: false,
            previews: {},
            option: {
                img: '',
                size: 1,
                full: false,
                outputType: 'png',
                canMove: true,
                original: false,
                canMoveBox: true,
                autoCrop: true,
                autoCropWidth: 200,
                autoCropHeight: 200,
                fixedBox: true,
            },
            downImg: '#',
            imgUrl:''
        }
    },
    created(){
        this.token = localStorage.getItem('token')
    },
   components:{
        'vueCropper':VueCropper
   },
   methods: {
        imgBlock(){
            this.imgShow = true
        },
        close(){
            this.imgShow = false
        },
        finish (type) {
                this.$refs.cropper.getCropData((data) => {
                this.model = true
                this.imgShow = false
                this.imgUrl = data
                const formData = new FormData()
                formData.append('imgBase64', data);

                this.$http.post('/account/saveimg',formData,{
                    headers:{
                        enctype: 'multipart/form-data',
                    }
                }).then(res=>{
                    console.log(res)
                    this.$emit('imgpp',({imgUrl:this.imgUrl,data:res.data}))
                }).catch(err=>{
                    console.log(err)
                })
                // console.log(this.imgUrl)
                
                })
         
        },
        // 实时预览函数
        realTime (data) {
            this.previews = data
        },
        down (type) {
            var aLink = document.createElement('a')
            aLink.download = 'author-img' // 输出
            if (type === 'blob') {
                this.$refs.cropper.getCropBlob((data) => {
                // console.log(data)
                this.downImg = window.URL.createObjectURL(data)
                // console.log(this.downImg)
                aLink.href = window.URL.createObjectURL(data)
                aLink.click()
                })
            } else {
                this.$refs.cropper.getCropData((data) => {
                this.downImg = data
                aLink.href = data
                aLink.click()
                })
            }
        },
        uploadImg (e, num) {
            //上传图片
            this.option.img
            var file = e.target.files[0]
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                return false
            }
            var reader = new FileReader()
            reader.onload = (e) => {
                let data
                if (typeof e.target.result === 'object') {
                    // 把Array Buffer转化为blob 如果是base64不需要
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                } else {
                    data = e.target.result
                }
                if (num === 1) {
                    this.option.img = data
                } else if (num === 2) {
                    this.example2.img = data
                }
            } // 转化为base64
            reader.readAsDataURL(file) // 转化为blob reader.readAsArrayBuffer(file)
        },
        imgLoad (msg) {
        //    console.log(msg)
        },
    }
}
</script>

<style scoped>
    .cropper-content{
        overflow: hidden;
        padding: 20px 15px;
    }
    .pop{
        width: 800px
    }
    .cropper{
        width: 538px;
        height: 364px;
        padding: 10px;
        float: left;
    }
    .show-preview{
        width: 200px;
        height: 200px;
        overflow: hidden;
        margin: 10px;
        border: 1px solid #ddd;
    }
    .preview{
        overflow: hidden;
        background: #cccccc;

    }
    .btnright {
        width: 50%;
        margin: 20px auto 0;
        text-align: right;
        padding-right: 5px;
        overflow: hidden;
    }
    .btnright a {
        width: 116px;
        height: 34px;
        line-height: 34px;
        margin-right: 20px;
        display: block;
        float: left;
        text-align: center;
    }
    .btnright .conmit {
        background: #2963CA;
        color: #fff;
    }
    .btnright .cancel {
        background: #EFEFEF;
        color: #2963CA;
    }
    .scope-btn{
        width: 350px;
    }
    .choose-pic {
        font-size: 14px;
        color: #14579E;
        letter-spacing: 0.88px;
        font-weight: 600;
    }
    .btn {
        outline: none;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        -webkit-transition: .1s;
        transition: .1s;
        font-weight: 500;
        padding: 8px 15px;
        font-size: 12px;
        border-radius: 3px;
        color: #fff;
        background-color: #67c23a;
        border-color: #67c23a;
    }
</style>
