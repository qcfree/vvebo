{
	// 所有的选填字段都可以不填，程序会自己去猜，不一定能猜得出来，猜不出来的得自己去补规则
	//(必填) 主页地址，建议填list段中的url,程序会从url中提取homeUrl, url中至少要包含{cateId}和{catePg}才能被识别
	// https://www.zxzjhd.com/vodshow/{cateId}-{area}--{class}-----{catePg}---{year}.html
	// https://www.zxzjhd.com/list/{cateId}-{catePg}.html
	"homeUrl": "https://www.zxzjhd.com/",
	//(选填) http请求需要的header，一般就填个UA
	"header":{
		"User-Agent":"Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1"
	},
	//(选填) 分类名
	"cateManual": {
		"电影": "1",
		"美剧": "2",
		"韩剧": "3",
		"日剧": "4",
		"泰剧": "5",
		"动漫": "6"
	},
	//(选填) 列表页 
	"list":{
		//(选填) 当前页面解析区域截取，程序会从截取后的数据中查找各字段，这里只是演示，按实际需求填写
		"region":["<html>", "</html>"],
		//"url": "https://www.zxzjhd.com/list/{cateId}-{catePg}.html",
		//(选填) 列表页的页面地址，具体规则和xpath一致，不存在在里会使用homeUrl，但是homeUrl必须是带{cateId}\{catePg}的这个格式
		"url": "https://www.zxzjhd.com/vodshow/{cateId}-{area}-{by}-{class}-{lang}----{catePg}---{year}.html", 
		// (选填) 有的网站分类的第一页和后面的页url规则不同，可以这样指定具体的catePg 对应的url
		//"1": "https://www.zxzjhd.com/vodshow/{cateId}-{area}--{class}-----1---{year}.html",
		// 视频ID，列表页不能正常显示一般都是这个规则不对
		// 爬虫使用JSONArray来获取相关字段内容，JSONArray中共用到5个参数，具体说明：
		// 1 要获取字段的前缀，必填
		// 2 要获取字段的后缀，必填，这两个参数确定后一般要取的字段就出来了
		// 3 获取到字段后该字段正确值的左偏移量，真正的值会加上这个偏移量，默认为0
		// 4 获取到字段后该字段正确值的右偏移量，真正的值会加上这个偏移量，默认为0
		// 5 定位到该字段后，往上回溯的层级(往上数祖先节点，如果当前字段没有匹配到标签的起始位置也要算一个节点)，具体是要找到包含当前页各字段的那部分代码(本页要求的如 vod_id, vod_name vod_pic)
 		"vod_id": ["href=\"/detail/", ".html",0,0,3],
		//(选填) 视频名
		"vod_name": ["title=\"", "\""],
		//(选填) 图片
		"vod_pic":["data-original=\"", "\""],
		//(选填) 副标题
		"vod_remarks":["<span class=\"pic-text text-right\">","</span>"]
	},
	//(选填) 详情页
	"detail":{
		//(选填) 当前页面解析区域截取，程序会从截取后的数据中查找各字段，这里只是演示，按实际需求填写
		"region":["<html>", "</html>"],
		//(选填) 详情页的url, 不存在时会使用list.vod_id进行推算
		"url": "https://www.zxzjhd.com/detail/{vid}.html",
		//(选填) 视频名
		"vod_name":["<h1 class=\"title\">", "</h1>"],  
		//(选填) 视频图片
		"vod_pic": ["<img class=\"lazyload\" data-original=\"","\""], 
		//(选填) 演员
		"vod_actor":[">主演：","</p>"],
		//(选填) 导演，需要有一个字段说明回溯层级，一般选用导演字段
		"vod_director":[">导演：", "</p>",0,0,2], 
		//(选填) 地区
		"vod_area":["地区：", "/"],
		//(选填) 年份
		"vod_year":["年份：", "/"],
		//(选填) 类型
		"vod_type":["类型：", "/"],
		//(选填) 
		"vod_remarks":["更新：","</p>"],
		//(选填) 视频简介
		"vod_content":["简介：","</p>"]
	},
	//(选填) 播放列表页
	"playlist":{
		//(选填) 当前页面解析区域截取，程序会从截取后的数据中查找各字段，这里只是演示，按实际需求填写
		"region":["<html>", "</html>"],
		//(选填) 当sort为1时会对找到播放列表进行倒序
		"sort": 0,
		 //(选填) 播放列表页的url, 一般都和详情页的地址一样，有部分网站的播放页和详情页不同时才填这个字段
		"url": "https://www.zxzjhd.com/detail/{vid}.html",
		//(选填) 播放url的字段规则，这里需要回溯到包含单个播放源全部play_url的html节点
		"vod_play_url": ["i><a href=\"/video/", "\"",-7,0,2],
		//(选填) 播放地址的名称
		"vod_play_url_title": [".html\">", "<"],
		//(选填) 播放源的名称，如果有的话需要，查找到的播放列表会根据该字段的内容顺序进行排序
		"vod_play_from": [ 
			// 如果播放源的名称不能保证在页面上是唯一的
			["<h3>播放线路5</h3>", "在线之家(别名)"]
		]
	},
	//(选填) 播放页，不用去管，用来尝试解析直链的
	"play":{
		//(选填) 当前页面解析区域截取，程序会从截取后的数据中查找各字段，这里只是演示，按实际需求填写
		"region":["<html>", "</html>"],
		// (选填) 嗅探关键字，有的网站视频url有特殊关键字的可以在这里指明
		"keywords":[".mp4", ".m3u8", ".flv"]
	},
	//(选填) 搜索页 search 不存在时会先去尝试json搜索接口，如果网站不支持再去页面上找搜索页的url
	"search":{
		//(选填) 当前页面解析区域截取，程序会从截取后的数据中查找各字段，这里只是演示，按实际需求填写
		"region":["<html>", "</html>"],
		// 搜索页的URL
		"url": "https://zxzjhd.com/vodsearch/-------------.html?wd={wd}", 
		//(选填) 视频ID
		"vod_id": ["/detail/", ".html",0,0,3],
		//(选填) 视频名
		"vod_name": ["title=\"", "\""],
		//(选填) 图片
		"vod_pic":["data-original=\"", "\""],
		//(选填) 副标题
		"vod_remarks":["<span class=\"pic-text text-right\">","</span>"]
	},
	// json格式的搜索接口示例
	// "search":{
	//	"url": "https://www.llyady.cc/index.php/ajax/suggest?mid=1&wd={wd}",
	//	"lookback": 3,
	//	"vod_id": "id",
	//	"vod_name": "name",
	//	"vod_pic":"pic"
	//}
	//(选填) 过滤相关规则，需要配合list.url使用
	// Filters =======================================================
	"filter": {
      "1": [
        {
          "key": "class",
          "name": "剧情",
          "value": [
            {"n": "全部剧情","v": ""},
            {"n": "喜剧","v": "喜剧"},
            {"n": "爱情","v": "爱情"},
            {"n": "恐怖","v": "恐怖"},
            {"n": "动作","v": "动作"},
            {"n": "科幻","v": "科幻"},
            {"n": "剧情","v": "剧情"},
            {"n": "战争","v": "战争"},
            {"n": "警匪","v": "警匪"},
            {"n": "犯罪","v": "犯罪"},
            {"n": "动画","v": "动画"},
            {"n": "奇幻","v": "奇幻"},
            {"n": "冒险","v": "冒险"}
          ]
        },
        {
          "key": "area",
          "name": "地区",
          "value": [
            {"n": "全部","v": ""},
            {"n": "大陆","v": "大陆"},
            {"n": "香港","v": "香港"},
            {"n": "台湾","v": "台湾"},        
            {"n": "欧美","v": "欧美"},
            {"n": "韩国","v": "韩国"},
            {"n": "日本","v": "日本"},
            {"n": "泰国","v": "泰国"},
            {"n": "印度","v": "印度"},
            {"n": "俄罗斯","v": "俄罗斯"},
            {"n": "其他","v": "其他"}
          ]
        },
        {
          "key": "year",
          "name": "年份",
          "value": [
            {"n": "全部","v": ""},
            {"n": "2022","v": "2022"},
            {"n": "2021","v": "2021"},
            {"n": "2020","v": "2020"},
            {"n": "2019","v": "2019"},
            {"n": "2018","v": "2018"},
            {"n": "2017","v": "2017"},
            {"n": "2016","v": "2016"},
            {"n": "2015","v": "2015"},
            {"n": "2014","v": "2014"},
            {"n": "2013","v": "2013"},
            {"n": "2012","v": "2012"},
            {"n": "2011","v": "2011"},
            {"n": "2010","v": "2010"},
            {"n": "2009","v": "2009"},
            {"n": "2008","v": "2008"},
            {"n": "2007","v": "2007"},
            {"n": "2006","v": "2006"},
            {"n": "2005","v": "2005"},
            {"n": "2004","v": "2004"},
            {"n": "2003","v": "2003"},
            {"n": "2002","v": "2002"},
            {"n": "2001","v": "2001"},
            {"n": "2000","v": "2000"}
          ]
        }
      ],
      "2": [
        {
          "key": "class",
          "name": "剧情",
          "value": [
            {"n": "全部剧情","v": ""},
            {"n": "剧情","v": "剧情"},
            {"n": "喜剧","v": "喜剧"},
            {"n": "爱情","v": "爱情"},
            {"n": "动作","v": "动作"},
            {"n": "悬疑","v": "悬疑"},
            {"n": "恐怖","v": "恐怖"},
            {"n": "奇幻","v": "奇幻"},
            {"n": "惊悚","v": "惊悚"},
            {"n": "犯罪","v": "犯罪"},
            {"n": "科幻","v": "科幻"},
            {"n": "音乐","v": "音乐"},
            {"n": "其他","v": "其他"}
          ]
        },
        {
          "key": "year",
          "name": "年份",
          "value": [
            {"n": "全部","v": ""},
            {"n": "2022","v": "2022"},
            {"n": "2021","v": "2021"},
            {"n": "2020","v": "2020"},
            {"n": "2019","v": "2019"},
            {"n": "2018","v": "2018"},
            {"n": "2017","v": "2017"},
            {"n": "2016","v": "2016"},
            {"n": "2015","v": "2015"},
            {"n": "2014","v": "2014"},
            {"n": "2013","v": "2013"},
            {"n": "2012","v": "2012"},
            {"n": "2011","v": "2011"}
          ]
        }
      ],
      "3": [
        {
          "key": "class",
          "name": "剧情",
          "value": [
            {"n": "全部剧情","v": ""},
            {"n": "剧情","v": "剧情"},
            {"n": "喜剧","v": "喜剧"},
            {"n": "爱情","v": "爱情"},
            {"n": "动作","v": "动作"},
            {"n": "悬疑","v": "悬疑"},
            {"n": "恐怖","v": "恐怖"},
            {"n": "奇幻","v": "奇幻"},
            {"n": "惊悚","v": "惊悚"},
            {"n": "犯罪","v": "犯罪"},
            {"n": "科幻","v": "科幻"},
            {"n": "音乐","v": "音乐"},
            {"n": "其他","v": "其他"}
          ]
        },
        {
          "key": "year",
          "name": "年份",
          "value": [
            {"n": "全部","v": ""},
            {"n": "2022","v": "2022"},
            {"n": "2021","v": "2021"},
            {"n": "2020","v": "2020"},
            {"n": "2019","v": "2019"},
            {"n": "2018","v": "2018"},
            {"n": "2017","v": "2017"},
            {"n": "2016","v": "2016"},
            {"n": "2015","v": "2015"},
            {"n": "2014","v": "2014"},
            {"n": "2013","v": "2013"},
            {"n": "2012","v": "2012"},
            {"n": "2011","v": "2011"}
          ]
        }
      ],
      "4": [
        {
          "key": "class",
          "name": "剧情",
          "value": [
            {"n": "全部剧情","v": ""},
            {"n": "剧情","v": "剧情"},
            {"n": "喜剧","v": "喜剧"},
            {"n": "爱情","v": "爱情"},
            {"n": "动作","v": "动作"},
            {"n": "悬疑","v": "悬疑"},
            {"n": "恐怖","v": "恐怖"},
            {"n": "奇幻","v": "奇幻"},
            {"n": "惊悚","v": "惊悚"},
            {"n": "犯罪","v": "犯罪"},
            {"n": "科幻","v": "科幻"},
            {"n": "音乐","v": "音乐"},
            {"n": "其他","v": "其他"}
          ]
        },
        {
          "key": "year",
          "name": "年份",
          "value": [
            {"n": "全部","v": ""},
            {"n": "2022","v": "2022"},
            {"n": "2021","v": "2021"},
            {"n": "2020","v": "2020"},
            {"n": "2019","v": "2019"},
            {"n": "2018","v": "2018"},
            {"n": "2017","v": "2017"},
            {"n": "2016","v": "2016"},
            {"n": "2015","v": "2015"},
            {"n": "2014","v": "2014"},
            {"n": "2013","v": "2013"},
            {"n": "2012","v": "2012"},
            {"n": "2011","v": "2011"}
          ]
        }
      ],
      "5": [
        {
          "key": "year",
          "name": "年份",
          "value": [
            {"n": "全部","v": ""},
            {"n": "2022","v": "2022"},
            {"n": "2021","v": "2021"},
            {"n": "2020","v": "2020"},
            {"n": "2019","v": "2019"},
            {"n": "2018","v": "2018"},
            {"n": "2017","v": "2017"},
            {"n": "2016","v": "2016"},
            {"n": "2015","v": "2015"},
            {"n": "2014","v": "2014"},
            {"n": "2013","v": "2013"},
            {"n": "2012","v": "2012"},
            {"n": "2011","v": "2011"}
          ]
        }
      ],
      "6": [
        {
          "key": "class",
          "name": "剧情",
          "value": [
            {"n": "全部剧情","v": ""},
            {"n": "情感","v": "情感"},
            {"n": "科幻","v": "科幻"},
            {"n": "热血","v": "热血"},
            {"n": "推理","v": "推理"},
            {"n": "搞笑","v": "搞笑"},
            {"n": "冒险","v": "冒险"},
            {"n": "萝莉","v": "萝莉"},
            {"n": "校园","v": "校园"},
            {"n": "动作","v": "动作"},
            {"n": "机战","v": "机战"},
            {"n": "运动","v": "运动"},
            {"n": "战争","v": "战争"},
            {"n": "少年","v": "少年"}
          ]
        },
        {
          "key": "area",
          "name": "地区",
          "value": [
            {"n": "全部","v": ""},
            {"n": "国产","v": "国产"},
            {"n": "日本","v": "日本"},
            {"n": "欧美","v": "欧美"},
            {"n": "其他","v": "其他"}
          ]
        },
        {
          "key": "year",
          "name": "年份",
          "value": [
            {"n": "全部","v": ""},
            {"n": "2022","v": "2022"},
            {"n": "2021","v": "2021"},
            {"n": "2020","v": "2020"},
            {"n": "2019","v": "2019"},
            {"n": "2018","v": "2018"},
            {"n": "2017","v": "2017"},
            {"n": "2016","v": "2016"},
            {"n": "2015","v": "2015"},
            {"n": "2014","v": "2014"},
            {"n": "2013","v": "2013"},
            {"n": "2012","v": "2012"},
            {"n": "2011","v": "2011"}
          ]
        }
      ]
    }
  
}
