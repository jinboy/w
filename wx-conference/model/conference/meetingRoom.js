/**
 * 会议室模型
 */

import {ApiUrlConstant} from "../../config/ApiUrlConstant";
import {Interaction as InterAction} from "../../utils/native-api/interaction/Interaction";
import {Http} from "../../utils/tabjin-utils/http";
import {InteractionEnum} from "../../utils/native-api/interaction/enum/InteractionEnum";

class MeetingRoom {
    /**
     * 新增、修改会议室
     * @param name 会议室名称
     * @param location 经纬度字符串
     * @returns {Promise<*>}
     */
    static async addOrUpdateMeetingRoom(meetingRoomInfo) {
        const res = await Http.request({
            url: ApiUrlConstant.ADD_MEETING_ROOM,
            data: {
                name: meetingRoomInfo.name,
                location: meetingRoomInfo.location,
            }
        });
        if (res.code === 1) {
            return res.data;
        } else {
            InterAction.fnShowToast('新增会议室失败', InteractionEnum.ICON_NONE, '', InteractionEnum.DURATION, false);
        }
    }

    /**
     * 会议室删除
     * @param roomId 会议室id
     * @returns {Promise<*>}
     */
    static async deleteMeetingRoom(roomId, orgId) {
        const res = await Http.request({
            url: ApiUrlConstant.DELETE_MEETING_ROOM,
            data: {
                roomId: roomId
            }
        });
        if (res.code) {
            return res.data;
        } else {
            InterAction.fnShowToast('删除会议室失败', InteractionEnum.ICON_NONE, '', InteractionEnum.DURATION, false);
        }
    }

    /**
     * 获取会议室列表
     * @returns {Promise<*>}
     */
    static async getMeetingRoom() {
        const res = await Http.request({
            url: `${ApiUrlConstant.GET_MEETING_ROOM}`,
            data: {}
        });
        console.log('res', res);
        if (res.code === 1) {
            return res.data;
        } else {
            InterAction.fnShowToast('获取会议室失败', InteractionEnum.ICON_NONE, '', InteractionEnum.DURATION, false);
        }
    }
}

export {
    MeetingRoom
}