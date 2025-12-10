---
title: Git 入门指北
date: 2025-12-10
---

# Git 入门指北

## Git 有啥用？

Git 是一个很好用的代码管理工具，从这方面来说，其实 Git 也可以拿来当网盘来着。其实我也不是很了解的，不过也用了很久了，也可以小小总结一下。

网上已经有很多的教程和攻略，我主要谈谈自己的理解和印象了。Git 可以保存下来我喜欢的代码，可以同步代码方便在不同设备进行工作，可以回退到以前的版本，结合 Github pages 或 Cloudflare 可以很方便地构建静态网站。

## 创建第一（？）个仓库

基于 Git 的代码托管平台主要有 Github，GitLab，Gitee，基础的操作都差不多，目前没用过 GitLab，这里主要以 Gitee 为例。

![](https://image.wuyi.host/posts/20251210232108185.png)

首先我们创建一个仓库，点击头像左侧的加号可创建仓库，取一个仓库名称，Gitee 现在会自动生成路径。这个我不太了解，主要用 GitHub，不过感觉尽量取一样的比较好。

其他内容都不需要管，保持默认即可，可以看看是否和我这里一样，点击创建。创建成功后，会出现这样的页面。其实直接复制第一块命令和第二块，就可以完成创建和上传，但是当熟练之后其实没有必要，并且我们这里了解一些这些命令是干啥的。

以下所有出现的代码块，均为命令行命令，粘贴进命令行运行。

![](https://image.wuyi.host/posts/20251211011134580.png)

### Git 信息设置

我们提交代码时，需要让 Git 知道是谁提交了代码，所以需要配置用户名和邮箱。这里的 `--global` 代表我们设置的是全局的信息。

这里其实就是上方页面的第一块的部分，如果你创建仓库后显示了着一块，直接复制即可。如果没有，把 `" "` 里的内容替换为你的用户名和邮箱就可。建议设置成 gitee 或 github 的用户名或邮箱，不设置成这样应该也行。

```bash
git config --global user.name "fwdzh"
git config --global user.email "wu_yi_@outlook.com"
```

### 创建仓库

#### 初始化

选择一个文件夹作为你的 Git 仓库，命令行里进入对应的文件夹，如果你不知道该怎么做，使用 VS Code 打开那个文件夹。

按 ``Ctrl + ` `` 可以打开VS Code 的终端。如果发现 `Ctrl + v` 无法在 VS Code 终端中粘贴内容，试试 `Ctrl + Shift + v`。

![](https://image.wuyi.host/posts/20251210234448230.png)

```bash
git init
```

首先需要运行这个命令来初始化 Git 仓库，这会在该文件下新建一个名为 `.git` 的文件夹，但是 VS Code 和 Windows 文件管理器默认会隐藏这个文件夹。

#### 连接远程仓库

目前我们只创建了本地仓库，并未与远程仓库连接。

这个里面是我的 gitee 仓库的链接哈，创好仓库之后第一行就有 https 链接的，可以直接复制替换一下。或者那个第二块的代码的倒数第二行其实就是这个，复制一下即可。

```bash
git remote add origin https://gitee.com/fwdzh/example.git
```

`git remote add` 就是添加远程仓库的，origin 相当于是我们给这个远程仓库取的名字，也可以叫别的，但默认都会叫 origin。先不必管这个。

添加之后，输入

```bash
git remote -v
```

检查是否连上了远程仓库，如果连上了，大概会显示这样的内容。

![](https://image.wuyi.host/posts/20251211000710260.png)

#### 提交与推送

目前我们的仓库是空的，因此需要添加一些文件。

随便创建一个文件，然后输入

```bash
git add .
git commit -m "First Commit"
```

`git add` 命令是将文件提交到暂存区的，后面跟的是文件或文件夹的相对路径，`.` 表示的就是当前的整个文件夹。因此这个命令会将整个文件夹中的文件提交到暂存区。

`git commit -m` 可以理解为给你的提交评论，说明你修改了啥东西，后面跟一个字符串，可以是任何你想写的内容。这个是必须要填的，相当于正式地提交修改，但不会同步到远程仓库。

推送代码：

```bash
git push -u origin master
```

只有第一次需要这样输入，因为 `-u` 会设置以后默认推送到 origin 的 master 分支，暂时不用理会这些。

若成功，应该需要输入账号密码，或在浏览器认证。

![](https://image.wuyi.host/posts/20251211001420300.png)

若成功，大概会这样显示，我输错了，用了个 `git push`，那个失败了，不需要管。

![](https://image.wuyi.host/posts/20251211001706746.png)

成功推送之后，回到浏览器看 gitee 仓库，里面会有刚才我们推送的文件。

以后每次修改文件推送，大概的流程就是

```bash
git add .
git commit -m "msg"
git push
```

不一定要 `git add .` ，这里举个例子，实际开发应该不推荐每次都提交整个文件夹。刚入门的话就这样用也没问题。

commit 的 msg 替换成自己想 commit 的内容。

由于我们第一次推送用的是 `git push -u origin master`，之后再提交代码只需要用 `git push` 就可以了。

## 如何抄作业

举个例子，比如你要把别人的仓库弄一份到自己这来。

![](https://image.wuyi.host/posts/20251211002839655.png)

点击仓库首页的 `克隆/下载`，会出现这个，第一行是这个仓库的地址，第二行是克隆这个仓库到本地的命令，其实就是地址前面加了个 `git clone`。

一般你要下载到本地，直接复制第二个即可。默认会下载到当前文件夹下，文件夹的名字一般和仓库名相同。

可以指定路径，比如

```bash
git clone https://gitee.com/fwdzh/example.git ./test
```

会把这个 git 仓库下载到当前目录下的 /test 文件夹。

此时这个文件夹里是会有 `.git` 文件夹的，如果你尝试做刚才类似的添加远程仓库的操作，会发现失败了。因为当前仓库已经关联了远程仓库。

输入

```bash
git remote -v
```

可以查看远程仓库信息。

默认一般是 origin 啥的，我们可以删除掉这个远程连接，但是如果删了在添加自己的，再推送，我们的仓库会有原仓库的提交。因为历史的 `commit` 信息都是存在 `.git` 文件夹里的，所以直接删掉那个文件夹就可以了。这样我们的本地文件夹变成了非 git 文件夹。

再按刚才的 `git init`，`git remote add origin` 等操作来一次就好了。

### fork

fork 就是把别人的仓库复制一份到我们自己的仓库，并且可以追踪原本的仓库，以后可以拉取更新。

比如你看到一个仓库比较有意思，想拉取一份自己开发一些新功能或者方便学习，可以使用 fork，fork 的仓库，会显示原本仓库的提交记录，也会显示你的仓库是从哪个仓库 fork 的。

## ssh 连接

如果你的操作系统或者 IDE 无法记忆密码，你可能每次推送代码都需要输入密码，非常麻烦，我们可以使用 ssh 连接。

以及国内访问 github 可能会很卡，不设置 git 代理经常推送失败 443 端口超时之类的，使用 ssh 可以避免？可能是，不过我一般是挂代理。

### 创建公钥

我们首先需要创建并导入 ssh 公钥。

```bash
ssh-keygen -t ed25519
```

-t 是指定密钥类型，ed25519 的密钥会很短，我用的这个，如果失败了，可以改成 `ssh-keygen -t rsa`。我以前看的教程都是生成 rsa 来着。

然后一直回车/yes就行，生成好的密钥在用户文件夹下的 `.ssh` 文件夹，复制 `id_ed22519.pub` 里的内容，大概是这个名字吧，rsa 则是 `id_rsa`。去 gitee/github 的个人设置，找到添加公钥，随便取个名就行。

### ssh 连接

如果之前已经用 https 连接，需要先删除。

![](https://image.wuyi.host/posts/20251211011345000.png)

输入 `git remote -v` 查看远程信息，删除不必要的。

比如我这个，默认是 origin 是 https 连接的，链接前面有 `https` 就是 https……

![](https://image.wuyi.host/posts/20251211005009857.png)

然后再去这里，点上面的 ssh，复制这个链接。

```bash
git remote add origin master "你的链接"
git remote -v
```

添加远程仓库并查看远程信息，若为 git@ 这样，则连上 ssh 了，以后推送就不需要输入密码了。

不过由于我们删除了先前的 origin 分支，下一次推送需要使用 `git push -u origin master`，然后之后还是 `git push` 就行。

![](https://image.wuyi.host/posts/20251211005554712.png)

## 其他

![](https://image.wuyi.host/posts/20251211005554712.png)

GitHub 默认分支是 main，所以可能需要把这里的 `git push -u origin master` 改成 `git push -u orgin main`，可能还要用 `git branch` 切换分支到 main。

GitHub Pages 可以免费部署静态页面，GitHub Actions 可以自动构建/部署，Cloudflare 和 GitLab 也有类似功能，用这些可以弄一些博客啥的，也都很简单，很多不用写什么代码。

啊啊啊，好像也没写啥东西，但是花了两小时，而且写出来可能也没啥意义。就这样吧！