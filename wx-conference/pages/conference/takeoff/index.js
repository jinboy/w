import {TakeOff} from "../../../components/models/TakeOff";
import {InteractionEnum} from "../../../utils/native-api/interaction/enum/InteractionEnum";
import {Route} from "../../../utils/native-api/route/Route";
import {Interaction} from "../../../utils/native-api/interaction/Interaction";

const app = getApp();

Page({
    data: {
        conference: null,
        leaveType: '',
        leaveReason: null,
        isTakeOff: 0, // 请假标志，0，请假失败；1请假成功
        isTake: 'wa'
    },

    onLoad(param) {
        let conference = JSON.parse(param.conference);
        // console.log('从会议详情界面携带的数据为：' + conference);
        // console.log(conference);
        this.setData({
            conference: conference
        });
    },

    chooseTakeOffType() {
        wx.showActionSheet({
            itemList: ['病假', '事假'],
            success: (res) => {
                console.log(res);
                const btn = res.tapIndex === -1 ? '取消' : '第' + res.tapIndex + '个';
                console.log(res);
                switch (res.tapIndex) {
                    case 0:
                        this.setData({
                            leaveType: '病假'
                        });
                        break;
                    case 1:
                        this.setData({
                            leaveType: '事假'
                        })
                }
            },
        });
    },


    /**
     * 表单提交
     */
    async formSubmit(e) {
        this.setData({
            leaveReason: e.detail.value.leaveReason
        })
        let currentConference = this.data.conference;
        const takeOff = await new TakeOff(currentConference, this.data.leaveType, this.data.leaveReason);
        Interaction.fnShowToast('请假成功', InteractionEnum.ICON_SUCCESS, '', InteractionEnum.DURATION, false);
        setTimeout(() => {
            Route.fnNavigateBack(1);
        }, 1500);
    },
}); 