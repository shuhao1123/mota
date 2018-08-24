var root = "http://47.100.57.20";
var api = {
  //行业数据 四级联动
  "industry": root + "/industry/industry_api/?cate=[16,30,26,21,23,25,26]&apiName=search_category",

  //整体市场行情
  "overall": root + "/industry/industry_api/?apiName=leveCategorySold&is_list=16",

  //行业构成
  "sub_industry": root + "/industry/industry_api/?apiName=cat_structure",

  //子行业成交量分布
  "sub_industry_son": root + "/industry/industry_api/",

  //热销店铺top100
  "store_top": root + "/industry/seller_api/?apiName=get_hot_shop",

  //卖家省份分布
  "seller_provinces": root + "/industry/seller_api/?apiName=seller_province_distri",

  //卖家信用分布
  "seller_credit": root + "/industry/seller_api/?apiName=get_shop_credit_num",

  //热销宝贝top100
  "store_baby": root + "/industry/item_api/?apiName=get_hot_good",

  //宝贝列表
  "baby_list": root + "/rivalAnalyze/shop_bady_profile/?apiName=shop_goods_list",

  //主推宝贝
  "baby_rank": root + "/rivalAnalyze/shop_bady_profile/?apiName=hotGoodsRank",

  //热销宝贝
  "baby_hot": root + "/rivalAnalyze/shop_bady_profile/?apiName=majorGoods",

  //飙升宝贝
  "baby_surge": root + "/rivalAnalyze/shop_bady_profile/?apiName=soaringGoodsRank"
}
