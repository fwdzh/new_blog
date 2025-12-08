const prefix = '/notes/archlinux'

export default [
    {
        text: "Archlinux",
        collapsible: false,
        items: [
            { text: "Index", link: `${prefix}/index`},
            { text: "安装", link: `${prefix}/install` },
            { text: "Gnome", link: `${prefix}/gnome` },
            { text: "修改根分区大小", link : `${prefix}/changeRootSize`},
            { text: "VS Code 部分快捷键无法生效", link : `${prefix}/vscodeShortCuts` }
        ]
    }
]