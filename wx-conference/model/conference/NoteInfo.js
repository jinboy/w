/**
 * dingding_conference  NoteInfo
 * Created by Tabjin
 * date 2019-12-02
 * time 20-50
 */



import {InteractionEnum} from "../../utils/native-api/interaction/enum/InteractionEnum";
import {Interaction} from "../../utils/native-api/interaction/Interaction";

class NoteInfo {
    mid;
    uid;
    text;
    img;

    constructor(mid, uid, text, img) {
        this.mid = mid;
        this.userid = uid;
        this.text = text;
        this.img = img;
    }

    dateCheck() {
        if (!this.mid) {
            Interaction.fnShowToast('未获取到当前会议，请重新进入该页面', InteractionEnum.ICON_NONE, '', InteractionEnum.DURATION, false);
            return false;
        }
        if (!this.userid) {
            Interaction.fnShowToast('未获取到当前用户，请退出并重新打开', InteractionEnum.ICON_NONE, '', InteractionEnum.DURATION, false);
            return false;
        }
        if (!this.text) {
            Interaction.fnShowToast('请输入笔记内容', InteractionEnum.ICON_NONE, '', InteractionEnum.DURATION, false);
            return false;
        }
        if (!this.img) {
            Interaction.fnShowToast('请选择图片', InteractionEnum.ICON_NONE, '', InteractionEnum.DURATION, false);
            return false;
        }
        return true;
    }
}

export {
    NoteInfo
}