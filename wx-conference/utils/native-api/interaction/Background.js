class Background {
    /**
     *  @method fnSetBackgroundTextStyle 动态设置下拉背景字体、loading 图的样式
     * @param textStyle {string} （必填）下拉背景字体、loading 图的样式。
     */
    static fnSetBackgroundTextStyle(textStyle) {
        x.setBackgroundTextStyle({
            textStyle
        })
    }

    /**
     * @method fnSetBackgroundColor 动态设置窗口的背景色
     * @param backgroundColor {string} （非必填）窗口的背景色，必须为十六进制颜色值
     * @param backgroundColorTop {string} （非必填）顶部窗口的背景色，必须为十六进制颜色值，仅 iOS 支持
     * @param backgroundColorBottom {string} （非必填）底部窗口的背景色，必须为十六进制颜色值，仅 iOS 支持
     */
    static fnSetBackgroundColor(backgroundColor,
                                backgroundColorTop,
                                backgroundColorBottom) {
        wx.setBackgroundColor({
            backgroundColor,
            backgroundColorTop,
            backgroundColorBottom,
        });
    }
}

/**
 * object.textStyle 的合法值
 * @type {{LIGHT: string, DARK: string}}
 */
const TextStyle = {
    DARK: 'dark',// dark样式
    LIGHT: 'light',// light样式
}

export {
    Background,
    TextStyle
}