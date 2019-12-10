/**
 * 议题业务模型
 */

import {Http} from "../../utils/tabjin-utils/http";
import {Interaction as InterAction} from "../../utils/native-api/interaction/Interaction";
import {InteractionEnum} from "../../utils/native-api/interaction/enum/InteractionEnum";
import {ApiUrlConstant} from "../../config/ApiUrlConstant";

class Agenda {
    static async getAgenda() {

        const agenda = await Http.request({
            url: ApiUrlConstant.AGENDA,
        });
        if (agenda.code === 1) {
            return agenda.data;
        } else {
            InterAction.fnShowToast('加载议题失败，请检查网络...', InteractionEnum.ICON_NONE, '', InteractionEnum.DURATION, false);
        }
    }
}

export {
    Agenda
}
