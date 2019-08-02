## 新增 webapp manifest 研究

********************************************************************************************

### manifest 文档说明

* ``文件名`` 任意

* ``扩展名`` 任意

* ``CACHE MANIFEST`` 必须 manifest 文档的标志，该行以下至其他关键字为 当前页面 要缓存 的资源

* ``CACHE:`` 非必须 该行以下至其他关键字为 当前页面 要缓存 的资源

* ``NETWORK:`` 非必须 该行以下至其他关键字为 当前页面 不用缓存 的资源

* ``FALLBACK:`` 非必须 该行以下的每一行皆由两部分组成，表示当请求第一部分资源失败时使用第二部分资源代替

### manifest 使用说明

在需要使用缓存的页面的 ```<html>``` 标签中插入 manifest="xx.xxx" 即可，如

```
<html lang="en" manifest="qiantu.manifest">
```


