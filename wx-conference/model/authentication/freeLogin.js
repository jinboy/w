/**
 * 小程序登录 模块
 */
import {promisic} from "../../utils/tabjin-utils/util";
import {Http} from "../../utils/tabjin-utils/http";
import {Storage} from "../../utils/storage";
import {ApiUrlConstant} from "../../config/ApiUrlConstant";
import {InteractionEnum} from "../../utils/native-api/interaction/enum/InteractionEnum";
import {Interaction as InterAction} from "../../utils/native-api/interaction/Interaction";

class FreeLogin {

    /**
     * 调用微信接口获取登录凭证（code）
     */
    static async _getCode() {
        const res = await promisic(wx.login)({});
        console.log(res);
        if (!res.code) {
            return;
        }
        return res.code;
    }

    /**
     * 拿到登录凭证请求登录态
     * @returns {Promise<void>}
     */
    static async login() {
        const code = await this._getCode();
        const res = await Http.request({
            url: ApiUrlConstant.WX_LOGIN,
            data: {
                code
            }
        });
        if (res.code === 1) {
            return res.data;
        } else {
            InterAction.fnShowToast('抱歉，获取登录凭证失败', InteractionEnum.ICON_NONE, '', InteractionEnum.DURATION, false);
            return null;
        }
    }

    /**
     * 保存用户openid到缓存
     * @returns {Promise<void>}
     */
    static async setStorage() {
        const openId = await this.login();
        if (openId) {
            Storage.setStorageSyncByKeyAndValue('user', openId);
        } else {
            return;
        }
    }
}

export {
    FreeLogin
}