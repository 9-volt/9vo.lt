# 9volt website

[9volt website](http://9vo.lt)

## Adding content

* All content images goes into `images` folder
  * Posts and projects thumbnails goes into `images/thumbnails` folder
  * Team members avatars are in `images/avatars` folder
* Posts and projects should be added into `_posts` folder
  * File format should be `YYYY-mm-dd-title.extension`
  * Most common file extensions are Markdown and HTML
  * Set categories according to post type (projects or blog)
* Drafts are kept in `_drafts` folder
  * File format should de `title.extension`

It is not necessary to build local version. You may simply add a file to `_posts` folder and it will be automatically added to website.

## Developing mockup

1. Install node.js
* Install grunt-cli `npm install -g grunt-cli`
* Install all dependencies `npm install`
* Run dev mode `grunt`. In dev mode whenever you edit a source file, it will be compiled.
* Build project `grunt b`. Minifies CSS. Removes temporary files.

## Live preview Jekyll blog

1. Install Jekyll `gem install jekyll`
* Change directory to blog folder `cd 9vo.lt`
* Start server with live reload `jekyll serve --watch --baseurl=`
