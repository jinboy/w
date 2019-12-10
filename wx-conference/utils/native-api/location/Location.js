/**
 * Created by Tabjin 2019-12-10
 * @description
 * @author Tabjin
 * @date 2019/12/10 14:30
 */
import {promisic} from "../../tabjin-utils/util";

class Location {
    /**
     * @description 关闭监听实时位置变化，前后台都停止消息接收
     */
    static fnStopLocationUpdate() {
        wx.stopLocationUpdate();
    }

    /**
     * @description 开启小程序进入前后台时均接收位置消息，需引导用户开启授权。授权以后，小程序在运行中或进入后台均可接受位置消息变化。
     * 调用前需要 用户授权 scope.userLocationBackground
     */
    static fnStartLocationUpdateBackground() {
        wx.startLocationUpdateBackground();
    }

    /**
     * @description 开启小程序进入前台时接收位置消息
     */
    static fnStartLocationUpdate() {
        wx.startLocationUpdate();
    }

    /**
     * @description 使用微信内置地图查看位置
     * @param latitude {number} （必填）纬度，范围为-90~90，负数表示南纬。使用 gcj02 国测局坐标系
     * @param longitude {number} （必填）经度，范围为-180~180，负数表示西经。使用 gcj02 国测局坐标系
     * @param scale {number} （非必填）缩放比例，范围5~18
     * @param name {string} （非必填）位置名
     * @param address {string} （非必填）地址的详细说明
     */
    static async fnOpenLocation(latitude, longitude, scale, name, address) {
        await wx.openLocation({
            latitude, longitude, scale, name, address
        });
    }

    /**
     * @description 监听实时地理位置变化事件，需结合 wx.startLocationUpdateBackground、wx.startLocationUpdate使用。
     */
    static fnOnLocationChange() {
        wx.onLocationChange();
    }

    /**
     * @description 取消监听实时地理位置变化事件
     */
    static fnOffLocationChange() {
        wx.offLocationChange();
    }

    /**
     * @description 获取当前的地理位置、速度。
     * 当用户离开小程序后，此接口无法调用。
     * 开启高精度定位，接口耗时会增加，可指定 highAccuracyExpireTime 作为超时时间。
     * @param type {string} （非必填）wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
     * @param altitude {string} （非必填）传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
     * @param isHighAccuracy {boolean} （非必填）开启高精度定位
     * @param highAccuracyExpireTime {number} （非必填）高精度定位超时时间(ms)，指定时间内返回最高精度，该值3000ms以上高精度定位才有效果
     */
    static fnGetLocation(type = 'wgs84', altitude, isHighAccuracy, highAccuracyExpireTime) {
        wx.getLocation({type, altitude, isHighAccuracy, highAccuracyExpireTime});
    }

    /**
     * @description 打开地图选择位置。
     * @param latitude {number} （非必填）目标地纬度
     * @param longitude {number}（非必填）目标地经度
     */
    static async fnChooseLocation(latitude, longitude) {
        const res = await promisic(wx.chooseLocation)({
            latitude, longitude
        });
        return res;
    }
}

export {
    Location
}