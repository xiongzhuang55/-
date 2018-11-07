//index.js
//获取应用实例
const app = getApp()
var API = require('../../utils/api.js')
Page({
  data: {
    accredit: true,
    list: []
  },
  onLoad: function () {
    var that = this
    // 使用 Mock
    API.ajax('', function (res) {
      //这里既可以获取模拟的res
      console.log(res)
      that.setData({
        list: res.data
      })
    });
    console.log(this.data.list)
  },
  // 搜索框跳转
  search() {
    wx.navigateTo({
      url: '/pages/searchPage/searchPage',
    })
  },
  // 跳转商品详情
  shopDetail(e){
    wx.navigateTo({
      url: '/pages/shopDetail/shopDetail?title=' + e.currentTarget.dataset.title,
    })
  },
  // 跳转我的授权窗口
  toAccredit() {
    wx.switchTab({
      url: '/pages/me/me',
    })
  },
  onShow(){
    if (app.globalData.userInfo) {
      this.setData({
        accredit: false
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          accredit: false
        })
      }
    }
  }
})
