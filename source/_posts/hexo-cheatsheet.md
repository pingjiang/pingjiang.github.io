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

# 发布上线
hexo deploy
```

## 常用功能开关

* 关闭评论 `comments: false` 
* 引用Gist `{% gist gist_id [filename] %}`
* 全屏图片 `{% fullimage /image-url, alt, title %}`
* 引用文章 `{% post_link slug [title] %}`
* 居中 `{% centerquote %}blah blah blah{% endcenterquote %}`

## 参考资料

* http://theme-next.iissnan.com/
* https://hexo.io/zh-cn

注意：这里基于[Next](http://theme-next.iissnan.com/)主题总结，其他模板可能没有某些功能。
