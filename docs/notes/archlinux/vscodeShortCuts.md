---
date: 2025-12-08
title: VS Code 部分快捷键无法生效
---

# VS Code 部分快捷键无法生效

应该主要是 Gnome 桌面会出问题吧，KDE 虽然没用多久，但是这方面还行，网上的评价也是 Gnome 快捷键容易冲突。

## 向上/向下复制行

其实貌似主要是这个快捷键有问题。

:::tip
在 Windows 上的快捷键是 `Shift + Alt + Up/Down`，而在 Linux 上则是 `Ctrl + Shift + Alt + Up/Down`，在大部分 Ubuntu 系统上，大部分时候都没法用，后来才发现其实是 Gnome 的问题。因为之前每次 ICPC 比赛，基本都是 Ubuntu，这个快捷键基本没生效过。
:::

我在设置里禁用了大部分快捷键，确实大部分都用不上，然而还是无法正常生效。了解到部分快捷键的设置是隐藏的，修改后，成功生效。

运行以下命令，会列出系统的快捷键列表。

```bash
gsettings list-recursively org.gnome.desktop.wm.keybindings
```

大概会有这样子的输出：

```bash
org.gnome.desktop.wm.keybindings activate-window-menu @as []
org.gnome.desktop.wm.keybindings always-on-top @as []
org.gnome.desktop.wm.keybindings begin-move @as []
org.gnome.desktop.wm.keybindings begin-resize @as []
org.gnome.desktop.wm.keybindings close ['<Alt>F4']
```

以下几项快捷键可能会与 VS Code 向上/下复制冲突：

```bash
switch-to-workspace-up       ['<Control><Alt>Up']
switch-to-workspace-down     ['<Control><Alt>Down']
move-to-workspace-up         ['<Control><Shift><Alt>Up']
move-to-workspace-down       ['<Control><Shift><Alt>Down']
```

可能只是前两项或后两项，如果有需要，可以测一下，由于我都用不上，全都禁用了。

```bash
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-up "[]"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-down "[]"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-up "[]"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-down "[]"
```

## `Ctrl + Alt + Right/Left` 切换工作区出问题

Gnome 的 `Ctrl + Alt + Right/Left` 可以切换工作区，非常方便，但我之前使用这个快捷键时，若开启了 VS Code 窗口，光标会一直跳，按 `Ctrl + C` 才会停下来。

不过没有记录咋处理的了。

应该也是可能冲突快捷键后面被我禁用了。