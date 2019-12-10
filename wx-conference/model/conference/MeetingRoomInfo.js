import {Interaction as InterAction} from "../../utils/native-api/interaction/Interaction";

/**
 * Created by Tabjin 2019-12-10
 * @descrition
 * @author Tabjin
 * @date 2019/12/10 15:24
 */
class MeetingRoomInfo {
    name;
    location;

    constructor(name, location) {
        this.name = name;
        this.location = location;
    }

    dataIntrospection() {
        if (!this.name) {
            InterAction.fnShowToast('请输入会议室名称', 'none', '', 1500, false);
            return false;
        }
        if (!this.location) {
            InterAction.fnShowToast('请到定位会议室', 'none', '', 1500, false);
            return false;
        }
        return true;
    }
}

export {
    MeetingRoomInfo
}