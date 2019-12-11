/**
 * 请假模型
 */

import {TakeOffInfo} from "./TakeOffInfo";
import {Interaction} from "../../utils/native-api/interaction/Interaction";
import {Route} from "../../utils/native-api/route/Route";
import {Location} from "../../utils/native-api/location/Location";
import {Caching} from "../../utils/native-api/caching/Caching";
import {CheckIn} from "../../model/location/checkIn";
import {LocationUtilsCustomized} from "../../utils/tabjin-utils/location/LocationUtilsCustomized";

class TakeOff {
    currentConference;
    leaveType;
    leaveReason

    /**
     * 构造函数
     * @param currentConference 当前会议
     * @param leaveType 请假类型
     * @param leaveReason 请假理由
     */
    constructor(currentConference, leaveType, leaveReason) {
        if (currentConference) {
            this.currentConference = currentConference;
        }
        if (leaveType) {
            this.leaveType = leaveType;
        }
        if (leaveReason) {
            this.leaveReason = leaveReason;
        }
        this._takeOff();
    }

    /**
     * 请假
     * @returns {Promise<void>}
     */
    async _takeOff() {
        if (!(this.currentConference)) {// currentConference，提示为获取到当前会议
            Interaction.fnShowToast('未获取到当前会议，请重启应用', InteractionEnum.NONE, '', InteractionEnum.DURATION, false);
        } else { //有当前会议信息，绑定当前用户与其参加会议的签到行为
            // TODO 首先判断当前用户是否在参加人员中
            await this._initLocationInfo(this.currentConference, this.leaveType, this.leaveReason);
        }
    }

    /**
     * 初始化位置信息
     * @param currentConference 当前会议
     * @returns {Promise<void>}
     * @private
     */
    async _initLocationInfo(currentConference, leaveType, leaveReason) {
        // 会议室地点经纬度
        const currentLocation = currentConference.roomId.location.split(',');
        let longitude = parseFloat(currentLocation[0]);// 纬度
        let latitude = parseFloat(currentLocation[1]);// 经度（大）
        // 当前定位经纬度
        const res = await Location.fnGetLocation();
        const currentLongitude = parseFloat(res.longitude);
        const currentLatitude = parseFloat(res.latitude);

        let distance = 0;

        if (currentConference.roomId.location) {// 会议室经纬度不为空
            distance = LocationUtilsCustomized.getFlatternDistance(latitude, longitude, currentLatitude, currentLongitude);
        }
        // 包装请假对象
        const takeOffInfo = new TakeOffInfo(
            currentConference.id,
            Caching.getStorageSync('user'),
            res.address,
            distance,
            leaveType,
            leaveReason
        );
        if (takeOffInfo.dataIntrospection()) {
            const takeOffRes = await CheckIn.submitCheckInInfo(takeOffInfo);
            // Interaction.fnShowToast('请假成功', InteractionEnum.ICON_SUCCESS, '', InteractionEnum.DURATION, false);
            // setTimeout(function () {
            //     Route.fnNavigateBack(1);
            // }, 2000);
            Route.fnNavigateBack(1);
        }
    }

}

export {
    TakeOff
}