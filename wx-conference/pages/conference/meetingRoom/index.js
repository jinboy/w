import {Location} from "../../../utils/native-api/location/Location";
import {Interaction as InterAction} from "../../../utils/native-api/interaction/Interaction";
import {MeetingRoomInfo} from "../../../model/conference/MeetingRoomInfo";
import {Route} from "../../../utils/native-api/route/Route";
import {MeetingRoom} from "../../../model/conference/meetingRoom";

const app = getApp();

Page({
    data: {
        room: [
            {
                rid: 1,
                rName: '东边会议室',
            }
        ],
        chooseLocation: false,// 是否定位成功
        location: '',
    },

    onLoad(e) {

    },


    onPullDownRefresh() {
        console.log('重新加载')
    },

    /**
     * 点击地点选择位置
     * @returns {Promise<void>}
     */
    async chooseLocation() {
        const location = await Location.fnChooseLocation();
        console.log(location);
        if (location) {
            this.setData({
                chooseLocation: true,
                'conference.address': location.address,// 地址
                'conference.longitude': location.longitude,// 经度(钉钉接口模拟器这边有问题)
                'conference.latitude': location.latitude,// 纬度
                location: `${location.longitude},${location.latitude}`,
            });
        } else {
            this.setData({
                chooseLocation: false,
            });
        }
    },

    meetingRoom(e) {
        console.log(e);
        let that = this;
        let meetingRoom = e.target.dataset.meetingRoom;
        console.log(meetingRoom);
        that.setData({
            'conference.address': meetingRoom
        });

    },

    /**
     * 提交表单
     * @param e
     * @returns {Promise<void>}
     */
    async submit(e) {
        const name = e.detail.value.name;
        const location = e.detail.value.location;
        const meetingRoomInfo = new MeetingRoomInfo(name, location);
        if (meetingRoomInfo.dataIntrospection()) {
            const res = await MeetingRoom.addOrUpdateMeetingRoom(meetingRoomInfo);
            InterAction.fnShowToast('编辑会议室成功，请重新点击地点刷新会议室', 'success', 2000);
            setTimeout(() => {
                Route.fnNavigateBack(1);
            }, 1500);

        }
    }
});
