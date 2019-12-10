import {promisic} from "./util";
import {config} from "../../config/config";
import {Caching} from "../native-api/caching/Caching";

class Http {
    static async request({
                             url,
                             data = {},
                             dataType = 'json',
                             method = 'GET',
                             headers
                         }) {// 传入对象
        const res = await promisic(wx.request)({
            url: `${config.apiBaseUrl}${url}`,// 因为apiBaseUrl是一个固定的配置
            method,
            // data: Object.assign(data, {orgPid: 1}),
            data: Object.assign(
                data,
                {
                    // orgId: Caching.getStorageSync('orgId') == null ? NaN : Caching.getStorageSync('orgId'),
                    orgId: 8,
                    orgPid: config.orgPid
                }
            ),
            dataType,
            header: {
                // 'Content-Type': 'application/json',
                'version': 'v3.0',
                'access-token': ''
            },
        });
        return res.data;
    }
}

export {
    Http
}