// pages/searchPage/searchPage.js
var API = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchTxt: "", // 搜索文字
    Mostlist: [
      {
        id: 1,
        name: "小米MIX3"
      },
      {
        id: 2,
        name: "小米电视"
      },
      {
        id: 3,
        name: "最生活毛巾"
      },
    ], // 最多搜索列表
    searchList: [
      {
        id: 0,
        src: "http://i8.mifile.cn/a1/pms_1539931570.3843664!560x560.jpg",
        name: "小米手机8",
        price: 2599,
        disPrice: 2299
      },
      {
        id: 1,
        src: "http://i1.mifile.cn/a1/pms_1498624482.88089389!200x200.jpg",
        name: "小米激光投影仪",
        price: 9999,
        disPrice: 8999
      },
      {
        id: 2,
        src: "http://i1.mifile.cn/a1/pms_1509694019.50094281!200x200.png",
        name: "小米电视4C 32英寸",
        price: 1399,
        disPrice: 1299
      },
      {
        id: 3,
        src: "http://i1.mifile.cn/a1/pms_1510111588.69169839!200x200.jpg",
        name: "小米电视4S 32英寸",
        price: 1599,
        disPrice: 1399
      },
      {
        id: 4,
        src: "http://i1.mifile.cn/a1/pms_1500287084.72131750!200x200.jpg",
        name: "小米电视4C 40英寸",
        price: 1899,
        disPrice: 1699
      },
      {
        id: 5,
        src: "http://i1.mifile.cn/a1/pms_1535103027.24861415!200x200.jpg",
        name: "小米电视4A 40英寸",
        price: 1999,
        disPrice: 1799
      },
      {
        id: 6,
        src: "http://i1.mifile.cn/a1/pms_1503909218.70932288!200x200.png", 
        name: "小米电视4S 43英寸",
        price: 2199,
        disPrice: 2099
      },
    ], // 搜索匹配列表
    blurList: [], // 模糊搜索名称列表
    resultList: [], // 搜索结果列表
    storageList: [], // 搜索历史列表
    noResult: false, //没有找到商品
    clearBtn: false //显示清空搜索框按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      storageList: wx.getStorageSync('searchTxtList') ? wx.getStorageSync('searchTxtList') : []
    })
  },
  // 输入模糊查询
  inputSearch(e){
    var value = e.detail.value
    var arr = []
    this.setData({
      resultList: [],
      searchTxt: e.detail.value
    })
    if(value){
      for(let item of this.data.searchList){
        if(item.name.indexOf(value) > -1){
          arr.push(item)
        }
      }
      this.setData({
        blurList: arr
      })
    } else{
      this.setData({
        blurList: [],
        noResult: false
      })
    }
  },
  // 模糊查询点击、常用搜索、历史记录搜索
  blurResult(e) {
    var arr = []
    for (let item of this.data.searchList) {
      if (item.name.indexOf(e.currentTarget.dataset.name) > -1) {
        arr.push(item)
      }
    }
    this.addStorage(e.currentTarget.dataset.name)
    this.setData({
      searchTxt: e.currentTarget.dataset.name,
      resultList: arr,
      noResult: arr.length > 0 ? false : true,
    })
  },
  // 搜索按钮点击
  searchBtn() {
    var arr = [];
    if (this.data.searchTxt){
      for (let item of this.data.searchList) {
        if (item.name.indexOf(this.data.searchTxt) > -1) {
          arr.push(item)
        }
      }
      this.addStorage(this.data.searchTxt)
    }
    this.setData({
      resultList: arr,
      noResult: (this.data.searchTxt ? true : false) && !arr.length,
    })
  },
  // 显示清空按钮
  clearBtnShow() {
    this.setData({
      clearBtn: true
    })
  },
  clearBtnHide() {
    this.setData({
      clearBtn: false
    })
  },
  // 封装添加历史搜索
  addStorage(name) {
    var storageArr = this.data.storageList;
    if (storageArr.indexOf(name) < 0){
      storageArr.unshift(name)
    } else {
      storageArr.splice(storageArr.indexOf(name),1)
      storageArr.unshift(name)
    }
    wx.setStorage({
      key: "searchTxtList",
      data: storageArr
    })
    this.setData({
      storageList: storageArr
    })
  },
  // 清空搜索框
  clearInput() {
    this.setData({
      resultList: [],
      noResult: false,
      searchTxt: ""
    })
  },
  // 清空搜索记录
  clearStorage() {
    wx.removeStorageSync("searchTxtList")
    this.setData({
      storageList: []
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})