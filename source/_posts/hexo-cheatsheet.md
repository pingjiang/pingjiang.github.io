---
title: hexo-cheatsheet
date: 2018-06-24 19:51:38
categories:
- cheatsheet
tags:
- hexo
---

## 常用命令

```sh
# 写一篇新文章
hexo new "post"
hexo new [layout] "post"

# 发布草稿
hexo publish "post"

# 本地预览
hexo server

# clean 默认会开启缓存，所以发布之前最好clean一下
hexo clean

# 发布上线
hexo deploy
```

## 常用功能开关

* 关闭评论 `comments: false` 
* 引用Gist {% raw %}{% gist gist_id [filename] %}{% endraw %}
* 全屏图片 {% raw %}{% fullimage /image-url, alt, title %}{% endraw %}
* 引用文章 {% raw %}{% post_link slug [title] %}{% endraw %}
* 居中 {% raw %}{% centerquote %}blah blah blah{% endcenterquote %}{% endraw %}

## 参考资料

* http://theme-next.iissnan.com/
* https://hexo.io/zh-cn

注意：这里基于[Next](http://theme-next.iissnan.com/)主题总结，其他模板可能没有某些功能。
