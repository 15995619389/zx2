(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node / CommonJS
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
})(function ($) {

    'use strict';

    var console = window.console || { log: function () { } };

    function CropAvatar($element) {
        this.$container = $element;

        //this.$avatarView = this.$container.find('.avatar-view');
        //this.$avatar = this.$avatarView.find('img');
        this.$avatarModal = this.$container.find('#avatar-modal');
        this.$loading = this.$container.find('.loading');

        this.$avatarForm = this.$avatarModal.find('.avatar-form');
        this.$avatarUpload = this.$avatarForm.find('.avatar-upload');
        this.$avatarSrc = this.$avatarForm.find('.avatar-src');
        this.$avatarData = this.$avatarForm.find('.avatar-data');
        this.$avatarInput = this.$avatarForm.find('.avatar-input');

        //this.$avatarSave = this.$avatarForm.find('.avatar-save');
        //this.$avatarBtns = this.$avatarForm.find('.avatar-btns');

        this.$avatarWrapper = this.$avatarModal.find('.avatar-wrapper');
        this.$avatarPreview = this.$avatarModal.find('.avatar-preview');

        //��������
        this.$avatarCancel = this.$avatarForm.find('.cancel');
        this.$avatarSubmit = this.$avatarForm.find('.conmit');

        this.init();
        console.log(this);
    }

    CropAvatar.prototype = {
        constructor: CropAvatar,

        support: {
            fileList: !!$('<input type="file">').prop('files'),
            blobURLs: !!window.URL && URL.createObjectURL,
            formData: !!window.FormData
        },

        init: function () {
            this.support.datauri = this.support.fileList && this.support.blobURLs;

            //if (!this.support.formData) {
            //  this.initIframe();
            //}

            //this.initTooltip();
            //this.initModal();
            this.addListener();
        },

        addListener: function () {
            //this.$avatarView.on('click', $.proxy(this.click, this));

            this.$avatarInput.on('change', $.proxy(this.change, this));
            //this.$avatarForm.on('submit', $.proxy(this.submit, this));
            //this.$avatarBtns.on('click', $.proxy(this.rotate, this));

            //��������
            this.$avatarCancel.on('click', $.proxy(this.cropDone, this));
            this.$avatarSubmit.on('click', $.proxy(this.submit, this));
        },

        //initTooltip: function () {
        //  this.$avatarView.tooltip({
        //    placement: 'bottom'
        //  });
        //},

        //initModal: function () {
        //  this.$avatarModal.modal({
        //    show: false
        //  });
        //},

        //initPreview: function () {
        //  var url = this.$avatar.attr('src');

        //  this.$avatarPreview.empty().html('<img src="' + url + '">');
        //},

        //initIframe: function () {
        //  var target = 'upload-iframe-' + (new Date()).getTime(),
        //      $iframe = $('<iframe>').attr({
        //        name: target,
        //        src: ''
        //      }),
        //      _this = this;

        //  // Ready ifrmae
        //  $iframe.one('load', function () {

        //    // respond response
        //    $iframe.on('load', function () {
        //      var data;

        //      try {
        //        data = $(this).contents().find('body').text();
        //      } catch (e) {
        //        console.log(e.message);
        //      }

        //      if (data) {
        //        try {
        //          data = $.parseJSON(data);
        //        } catch (e) {
        //          console.log(e.message);
        //        }

        //        _this.submitDone(data);
        //      } else {
        //        _this.submitFail('Image upload failed!');
        //      }

        //      _this.submitEnd();

        //    });
        //  });

        //  this.$iframe = $iframe;
        //  this.$avatarForm.attr('target', target).after($iframe.hide());
        //},

        //click: function () {
        //  this.$avatarModal.modal('show');
        //  this.initPreview();
        //},

        change: function () {
            var files,
                file;
            if (this.support.datauri) {
                $("div.avatar-body div.alert").remove();
                files = this.$avatarInput.prop('files');
                if (files.length > 0) {
                    file = files[0];

                    if (this.isImageFile(file)) {
                        if (this.url) {
                            URL.revokeObjectURL(this.url); // Revoke the old one
                        }

                        this.url = URL.createObjectURL(file);
                        this.startCropper();
                    } else {
                        this.alert('请选择上传的图片！');
                    }
                }
            } else {
                file = this.$avatarInput.val();

                if (this.isImageFile(file)) {
                    //this.syncUpload();
                }
            }
        },

        submit: function () {
            $("div.avatar-body div.alert").remove();
            if (!this.$avatarSrc.val() && !this.$avatarInput.val()) {
                this.alert('请选择上传的图片！');
                return false;
            }

            if (this.support.formData) {
                this.ajaxUpload();
                return false;
            }
        },

        //rotate: function (e) {
        //  var data;

        //  if (this.active) {
        //    data = $(e.target).data();

        //    if (data.method) {
        //      this.$img.cropper(data.method, data.option);
        //    }
        //  }
        //},

        isImageFile: function (file) {
            if (file.type) {
                return /^image\/\w+$/.test(file.type);
            } else {
                return /\.(jpg|jpeg|png|gif)$/.test(file);
            }
        },

        startCropper: function () {
            var _this = this;
            if (this.active) {
                this.$img.cropper('replace', this.url);
            } else {
                this.$img = $('<img src="' + this.url + '">');
                this.$avatarWrapper.empty().html(this.$img);
                this.$img.cropper({
                    aspectRatio: 1 / 1,
                    preview: this.$avatarPreview.selector,
                    strict: false,
                    crop: function (data) {
                        var json = [
                              '{"x":' + data.x,
                              '"y":' + data.y,
                              '"height":' + data.height,
                              '"width":' + data.width,
                              '"rotate":' + data.rotate + '}'
                        ].join();

                        _this.$avatarData.val(json);
                    }
                });

                this.active = true;
            }
        },

        stopCropper: function () {
            if (this.active) {
                this.$img.cropper('destroy');
                this.$img.remove();
                this.active = false;
            }
        },

        ajaxUpload: function () {
            //var $imgData = this.$img.cropper('getCroppedCanvas')
            //var dataurl = $imgData.toDataURL('image/png');

            var cropBoxData = this.$img.cropper('getCropBoxData');//��ȡ����ļ�
            var imageRate = 1;//ͼƬ��������ű���
            var width = cropBoxData.width * imageRate;
            var height = cropBoxData.height * imageRate;
            //���ɽ��canvas,�������ͼƬ����ĸ߿�
            var croppedCanvas = this.$img.cropper('getCroppedCanvas', {
                width: width,
                height: height
            });

            var result = null;//Ҫ���ص������
            var encoderOptions = 0.8;//ͼƬ��������
            //�����base64��ʽ����ô��ȡԴ�ļ����ͽ��б���,����ͼƬĬ�ϱ���Ϊjpeg
            //if (typeof file === 'string' && /^data:image/.test(file)) {
            //    var fileType = file.substring('data:image/'.length, file.indexOf(';base64,'));
            //    result = croppedCanvas.toDataURL(fileType, encoderOptions);
            //}
            result = croppedCanvas.toDataURL('image/png', encoderOptions);


            var url = this.$avatarForm.attr('action'),
                data = new FormData(this.$avatarForm[0]),
                _this = this;

            data.append("imgBase64", result);//  
            //data.append("fileFileName", "photo.jpg");
            //alert(JSON.stringify( data));
            //alert(JSON.stringify( data));
            $.ajax(url, {
                type: 'post',
                data: data,
                //dataType: 'json',
                processData: false,
                contentType: false,

                beforeSend: function () {
                    _this.submitStart();
                },

                success: function (data) {
                    _this.submitDone(data);
                },

                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    _this.submitFail(textStatus || errorThrown);
                },

                complete: function () {
                    _this.submitEnd();
                }
            });
        },

        //syncUpload: function () {
        //  this.$avatarSave.click();
        //},

        submitStart: function () {
            this.$loading.fadeIn();
        },

        submitDone: function (data) {
            //console.log(data);
            //if ($.isPlainObject(data) && data.state === 200) {
            if (data) {
                this.url = data;
                if (this.support.datauri || this.uploaded) {
                    this.uploaded = false;
                    if (this.url) {
                        var htmlImg = "";
                        htmlImg += "<li>";
                        htmlImg += "<img  id=\"ImgUrl\"  src=" + this.url + " alt=\"\" width=\"142\" height=\"142\" />";
                        htmlImg += "</li>";
                        $(".wap_tol ul").html(htmlImg);
                    }
                    this.cropDone();
                } else {
                    this.uploaded = true;
                    this.$avatarSrc.val(this.url);
                    this.startCropper();
                }

                this.$avatarInput.val('');
            }
                //} else if (data.message) {
                //  this.alert(data.message);
                //}
                //} 
            else {
                this.alert('Failed to response');
            }
        },

        submitFail: function (msg) {
            this.alert(msg);
        },

        submitEnd: function () {
            this.$loading.fadeOut();
        },

        cropDone: function () {
            this.$avatarForm.get(0).reset();
            this.stopCropper();
            $.unblockUI();
        },

        alert: function (msg) {
            var $alert = [
                  '<div class="alert alert-danger avater-alert">',
                    // '<button type="button" class="close" data-dismiss="alert">&times;</button>',
                    msg,
                  '</div>'
            ].join('');

            this.$avatarUpload.after($alert);
        },
        //cancelClick:function(){
        //    alert(111);
        //}
    };

    $(function () {
        return new CropAvatar($('#crop-avatar'));
    });

});
