/**
 * 签到信息模型
 */


import {CheckInException} from "../../exception/exception";
import {Interaction} from "../../utils/native-api/interaction/Interaction";
import {InteractionEnum} from "../../utils/native-api/interaction/enum/InteractionEnum";

class TakeOffInfo {
    mid;
    uid;
    address;
    distance;
    leaveType;
    leaveReason;

    constructor(mid, uid, address, distance, leaveType, leaveReason) {
        this.mid = mid;
        this.uid = uid;
        this.address = address;
        this.distance = distance;
        this.leaveType = leaveType;
        this.leaveReason = leaveReason;
    }

    dataIntrospection() {
        return this._introspection();
    }

    /**
     * 对象数据内省
     * @returns {boolean}
     * @private
     */
    _introspection() {
        if (!this.mid) {
            console.log(`${CheckInException.MID_NULL}`);
            return false;
        }
        if (!this.uid) {
            console.log(`${CheckInException.UID_NULL}`);
            return false;
        }
        if (!this.leaveType) {
            Interaction.fnShowToast('请假类型不能为空', InteractionEnum.NONE, '', InteractionEnum.DURATION, false);
            return false;
        }
        if (!this.leaveReason) {
            Interaction.fnShowToast('请假理由不能为空', InteractionEnum.NONE, '', InteractionEnum.DURATION, false);
            return false;
        }
        return true;
    }
}

export {
    TakeOffInfo
}