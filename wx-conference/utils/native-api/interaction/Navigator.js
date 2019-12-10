/**
 *
 */
class Navigator {
    /**
     * @method fnShowNavigationBarLoading 在当前页面显示导航条加载动画
     */
    static fnShowNavigationBarLoading() {
        wx.showNavigationBarLoading();
    }

    /**
     * @method setNavigationBarTitle 动态设置当前页面的标题
     * @param title {string} (必填)页面标题
     */
    static fnSetNavigationBarTitle(title = '') {
        wx.setNavigationBarTitle({
            title
        });
    }

    /**
     * @method setNavigationBarColor 设置页面导航条颜色
     * @param frontColor {string} (必填) 前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000
     * @param backgroundColor {string} (必填) 背景颜色值，有效值为十六进制颜色
     * @param animation {Object} (非必填) 动画效果
     */
    static fnSetNavigationBarColor(frontColor, backgroundColor, animation) {
        wx.setNavigationBarColor({
            frontColor,
            backgroundColor,
            // TODO 新建Animation类
            animation,
        });
    }

    /**
     * @method fnHideNavigationBarLoading 在当前页面隐藏导航条加载动画
     */
    static fnHideNavigationBarLoading() {
        wx.hideNavigationBarLoading();
    }

    /**
     * @method  隐藏返回首页按钮。
     * 微信7.0.7版本起，当用户打开的小程序最底层页面是非首页时，默认展示“返回首页”按钮，
     * 开发者可在页面 onShow 中调用 hideHomeButton 进行隐藏。
     */
    static fnHideHomeButton() {
        wx.hideHomeButton();
    }
}

export {
    Navigator
}