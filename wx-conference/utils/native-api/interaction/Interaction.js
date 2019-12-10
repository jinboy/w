/**
 * @class Interaction
 * @classdesc 微信小程序:界面 -> 交互
 * @author tabjin
 * @version 1.0.0
 * @copyright 1.0.0
 */
class Interaction {
    /**
     * @method 显示消息提示框
     * @param title {string} 提示的内容
     * @param icon {string} 图标
     * @param image {string} 自定义图标的本地路径，image 的优先级高于 icon （最低版本 1.1.0）
     * @param duration {number} 提示的延迟时间
     * @param mask {boolean} 是否显示透明蒙层，防止触摸穿透
     */
    static fnShowToast(title = '',
                       icon = 'success',
                       image = '',
                       duration = 1500,
                       mask = fasle) {
        wx.showToast({
            title: title,
            icon: icon,
            image: image,
            duration: duration,
            mask: mask
        });
    }

    /**
     * @method 显示模态对话框
     * @param title {string} 提示的标题
     * @param content {string} 提示的内容
     * @param showCancel {boolean} 是否显示取消按钮
     * @param cancelText {string} 取消按钮的文字，最多 4 个字符
     * @param cancelColor {string} 取消按钮的文字颜色，必须是 16 进制格式的颜色字符串
     * @param confirmText {string} 确认按钮的文字，最多 4 个字符
     * @param confirmColor {string} 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
     */
    static fnShowModal(title,
                       content,
                       showCancel = true,
                       cancelText = '取消',
                       cancelColor = '#000000',
                       confirmText = '确定',
                       confirmColor = '#576B95') {
        wx.showModal({
            title,
            content,
            showCancel,
            cancelText,
            cancelColor,
            confirmText,
            confirmColor,
        });
    }

    /**
     * @method 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框。（基础库 1.1.0 开始支持，低版本需做兼容处理。）
     * @param title {string} 提示的内容
     * @param mask {boolean} 是否显示透明蒙层，防止触摸穿透
     */
    static fnShowLoading(title = '', mask) {
        wx.showLoading({
            title,
            mask
        });
    }

    /**
     * @method 显示操作菜单
     * @param itemList {string} 按钮的文字数组，数组长度最大为 6
     * @param itemColor {string} 按钮的文字颜色
     */
    static fnShowActionSheet(itemList, itemColor = '#000000',) {
        wx.showActionSheet({
            itemList,
            itemColor,
        });
    }

    /**
     * @method 隐藏消息提示框
     */
    static fnHideToast() {
        wx.hideToast();
    }

    /**
     * @method 隐藏 loading 提示框
     */
    static fnHideLoading() {
        wx.hideLoading();
    }
}

export {
    Interaction
}