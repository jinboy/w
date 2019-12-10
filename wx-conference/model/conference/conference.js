/**
 *
 */
import {Http} from "../../utils/tabjin-utils/http";
import {ApiUrlConstant} from "../../config/ApiUrlConstant";
import {InteractionEnum} from "../../utils/native-api/interaction/enum/InteractionEnum";
import {Interaction} from "../../utils/native-api/interaction/Interaction";

class Conference {

    /**
     * 新增会议
     * @returns {Promise<*>}
     */
    static async addConference(addConferenceInfo) {
        const res = await Http.request({
            url: ApiUrlConstant.ADD_CONFERENCE,
            data: null
        });
        if (res.code === 1) {
            return res.data;
        } else {
            Interaction.fnShowToast('新增会议失败', InteractionEnum.ICON_NONE, '', InteractionEnum.DURATION, false);
        }
    }

    /**
     * 获取会议列表
     * @param uid
     * @returns {Promise<*>}
     */
    static async getConferenceList(uid) {
        const conferenceList = await Http.request({
            url: '5d8b1a1a7820d',
            data: {
                uid: uid
            }
        });
        if (conferenceList.code === 1) {
            return conferenceList.data;
        } else {
            Interaction.fnShowToast('会议列表加载失败！', InteractionEnum.ICON_NONE, '', InteractionEnum.DURATION, false);
        }
    }

    /**
     * 获取会议详情
     * @param mid
     * @param uid
     * @returns {Promise<*>}
     */
    static async getConferenceDetail(mid, uid) {
        const currentConference = await Http.request({
            url: `5d8d73e29c22c`,
            data: {
                mid: mid,
                uid: uid
            }
        });
        if (currentConference.code === 1) {
            return currentConference.data
        } else {
            Interaction.fnShowToast('获取会议详情失败！', InteractionEnum.ICON_NONE, '', InteractionEnum.DURATION, false);
        }
    }

    /**
     * 取消会议
     * @param mid 会议id
     * @returns {Promise<*>}
     */
    static async cancelConference(mid) {
        return await Http.request({
            url: `5d8ed2e38a05d`,
            data: {
                mid: mid
            }
        })
    }

    /**
     * 提取用户id
     * @param conferee 用户列表
     * @returns {Array}
     */
    static extractUserId(conferee) {
        let userIdArr = [];
        for (let i = 0; i < conferee.length; i++) {
            userIdArr.push(conferee[i].userid);
        }
        return userIdArr;
    }
}

export {
    Conference
}