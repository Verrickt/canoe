---

title: '删除/var/log后nginx出错'
date: 2022-11-01 20:52:36
tags: ['Nginx','Log','Troubleshoot']
lastmodified: 2022-11-01 20:52:36
slug: inaccessable-log-caused-nginx-configuration-error
---

今天天气不错，我打开自己的小网站，准备欣赏下花了N久魔改的主题。敲好URL，提示500。套的Cloudflare提示我，SSL证书过期了。我用的是StartSSL提供的证书，默认有效期90天。而服务器的Linux版本又比较老，无法使用`certbot`的自动续期功能，所以我啥时候想起来了就手动更新下证书。我这人比较佛系，证书过期也在所难免。所幸更新证书比较简单，`certbot --certonly renew`就搞定了。
出乎意料的是，这次更新完证书后nginx报错`nginx: configuration file /etc/nginx/nginx.conf test failed`。真奇怪，`certbot`仅仅是生成公私钥对，并不会更改nginx的配置；而我自己也好几年没动过nginx了，到底是怎么回事？

<!-- more -->

把`services nginx restart`报的错搜索一番，绝大多数都是`nginx.conf`配置的问题。我的`nginx.conf`已经好几年没动过了，应该不太可能

运行`nginx -t /etc/nginx/nginx.conf`，结果却有些不妙
``` log
nginx: [alert] could not open error log file: open() "/var/log/nginx/error.log" failed (2: No such file or directory)
2022/11/01 06:14:12 [warn] 16737#16737: conflicting server name "example.com" on 0.0.0.0:80, ignored
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
2022/11/01 06:14:12 [emerg] 16737#16737: open() "/var/log/nginx/access.log" failed (2: No such file or directory)
nginx: configuration file /etc/nginx/nginx.conf test failed
```

奇怪，为啥先输出语法正常，又说测试失败呢？

看`alert`的内容，似乎是打不开某个log？但这是个`alert`又不是`error`，好像也没关系吧。花了十几分钟看`nginx.conf`，文件内容又确实没有问题。

我决定先看看这个`log`。`ls`一下发现不存在。`touch /var/log/nginx/access.log`创建文件，重启nginx，一切正常了
```
> nginx -t /etc/nginx/nginx.conf
nginx: [warn] conflicting server name "casper.hohm.in" on 0.0.0.0:80, ignored
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
> service nginx restart
```

这时我才想起来，在某个~~风和日丽~~的午后，我为了给一个很大的下载任务腾地方，把最占地方的`/etc/log`目录删掉了。没想到竟然是它导致了nginx的错误。

PS，就在我写博客的此时发现nginx后面给出了一条`emergency`的报错：
```
2022/11/01 06:14:12 [emerg] 16737#16737: open() "/var/log/nginx/access.log" failed (2: No such file or directory)
```

果然，还是看日志的时候不能分心😂