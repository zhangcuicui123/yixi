###网站描述
该网站提供了一些演讲的内容和视频，是一个通过现场演讲和网络视频等方式，分享知识、信息和观点的传播平台

### 网站相关技术
该网站是一个用bootstrap来完成pc与手机端兼容的响应式网站，运用jq的ajax完成接口的调用，并且利用jq完成分页效果

### 网站运行环境
lnmp(Linux+nginx+mysql+php)



### api接口

##### 主页api接口
url:http://api.yixi.tv/api/v1/album

##### 演讲细节api接口
url：http://api.yixi.tv/api/v1/lecture/detail/ + 首页 获取的 lectures 字段中的 id 字段

url示例：http://api.yixi.tv/api/v1/lecture/detail/416

##### 演讲评论接口
url：http://api.yixi.tv/api/v1/lecture/comments/ + 首页 获取的 lectures 字段中的 id 字段 + /page/ + index

url 示例：http://api.yixi.tv/api/v1/lecture/comments/416/page/1

#####演讲相关接口
url：http://api.yixi.tv/api/v1/lecture/ + 首页 获取的 lectures 字段中的 id 字段 + /related

url 示例：http://api.yixi.tv/api/v1/lecture/416/related