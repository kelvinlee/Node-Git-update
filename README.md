Node-Git-update
===============

Use pm2 update website code when git push.

用 github 的 hook 功能,控制当代码上传时,自动更新代码.

如果出现 `git pull error :error: remote ref is at but expected` 这个错误,在对应文件夹使用: `git remote prune origin`

`http://git.giccoo.com/my/giccoo/` 获取服务器版本号