---
title: hexo-cheatsheet
date: 2018-06-24 19:51:38
categories:
- cheatsheet
tags:
- hexo
---

## 创建一个博客

1. 使用[Hexo](https://hexo.io)命令行工具`hexo-cli`快速创建一个博客项目。

```sh
npm i -g hexo-cli
hexo init blog
cd $_
npm i
```

2. 选择一个比较流行的主题[Next](http://theme-next.iissnan.com/)，并配置

```sh
git clone https://github.com/theme-next/hexo-theme-next.git themes/next
```

这里使用的`Pisces`风格，可以这样配置。

```yaml
scheme: Pisces
```

3. 配置tags和categories

```sh
# tags页面如果需要使用标签云显示，需要设置type: "tags"
hexo new page "tags"
# categories页面如果需要使用标签云显示，需要设置type: "categories"
hexo new page "categories"
```

4. 配置静态页面，用于显示demos

```yaml
# 在source目录下面创建一个demos文件夹，然后配置如下
skip_render:
  - 'demos/**'
```

5. 配置数据驱动的页面

在`_data`目录下面创建json或者yaml文件，然后在代码中可以使用`site.data.filename`引用文件内容。可以使用swig模板动态创建内容。

```swig
  <ul>
  {% for item in site.data.tools.items %}
    <li>
      {{ item.name }}
    </li>
  {% endfor %}
  </ul>
```

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
