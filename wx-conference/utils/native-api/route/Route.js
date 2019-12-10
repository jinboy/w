/**
 * Created by Tabjin 2019-12-10
 * @descrition 路由
 * @author Tabjin
 * @date 2019/12/10 15:35
 */
class Route {
    /**
     * @description 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
     * @param url {string} （必填）需要跳转的 tabBar 页面的路径 (代码包路径)（需在 app.json 的 tabBar 字段定义的页面），路径后不能带参数。
     */
    static async fnSwitchTab(url) {
        return await promisic(wx.switchTab)({
            url,
        });
    }

    /**
     * 关闭所有页面，打开到应用内的某个页面
     * @param url {string} （必填）需要跳转的应用内页面路径 (代码包路径)，路径后可以带参数。
     * 参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；
     * 如 'path?key=value&key2=value2'
     * @returns {Promise<unknown>}
     */
    static async fnReLaunch(url) {
        return await promisic(wx.reLaunch)({
            url,
        })
    }

    /**
     * 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
     * @param url {string} （必填）需要跳转的应用内非 tabBar 的页面的路径 (代码包路径), 路径后可以带参数。
     * 参数与路径之间使用 ? 分隔，参数键与参数值用 = 相连，不同参数用 & 分隔；
     * 如 'path?key=value&key2=value2'
     * @returns {Promise<unknown>}
     */
    static fnRedirectTo(url) {
        wx.redirectTo({
            url
        });
    }

    /**
     * 保留当前页面，跳转到应用内的某个页面。
     * 但是不能跳到 tabbar 页面。
     * 使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
     * @param url {string} （必填）需要跳转的应用内非 tabBar 的页面的路径 (代码包路径), 路径后可以带参数。
     * 参数与路径之间使用 ? 分隔，参数键与参数值用 = 相连，不同参数用 & 分隔；
     * 如 'path?key=value&key2=value2'
     * @returns {Promise<unknown>}
     */
    static fnNavigateTo(url) {
        wx.navigateTo({
            url
        });
    }

    /**
     * @description 关闭当前页面，返回上一页面或多级页面。
     * 可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。
     * @param delta {number} （必填）返回的页面数，如果 delta 大于现有页面数，则返回到首页。
     * @returns {Promise<unknown>}
     */
    static fnNavigateBack(delta) {
        wx.navigateBack({
            delta,
        });
    }
}

export {
    Route
}