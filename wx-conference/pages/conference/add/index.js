
import {Conference} from "../../../model/conference/conference";
import {AddConferenceInfo} from "../../../model/conference/AddConferenceInfo";
import {Caching} from "../../../utils/native-api/caching/Caching";
import {InteractionEnum} from "../../../utils/native-api/interaction/enum/InteractionEnum";
import {Route} from "../../../utils/native-api/route/Route";
import {Interaction as InterAction} from "../../../utils/native-api/interaction/Interaction";
import {MeetingRoom} from "../../../model/conference/meetingRoom";
import {Agenda} from "../../../model/conference/agenda";

let dateTimePicker = require('../../../utils/dateTimePicker.js');
const app = getApp();

Page({
    data: {
        array: ['中国', '美国', '巴西', '日本'],

        date: '2018-10-01',
        time: '12:00',
        dateTimeArray: null,
        dateTime: null,
        dateTimeArray1: null,
        dateTime1: null,
        startYear: 2000,
        endYear: 2050,

        // 会议主题
        // 会议表单
        conference: {
            // TODO 从缓存获取uid，这个uid是首次加载的时候
            uid: '1219441916791739',
            theme: '',
            dateTime: '',
            roomId: 1,
            address: '',
            longitude: '',
            latitude: '',
            info: '',
            agenda: [{
                typeIndex: 0,
                typeName: '',
                content: '',
            }],
        },

        chooseParticipantNumber: 0, // 参加人员数
        chooseParticipant: [], // 参加人员
        chooseParticipantId: '',
        topic: '', // 议题

        meetingRoom: [], // 会议室列表
        meetingRoomShow: false, // 默认不展示会议室

        collapseData: {
            onTitleTap: 'handleTitleTap',
            panels: [{
                agendaTypeIndex: 0,
                agendaTypeName: '会议议题',
                agendaContent: [],
                expanded: false,
            },],
        },

        isOpen: true, // 默认公开
    },

    onLoad() {
        let that = this;
        // 获取完整的年月日 时分秒，以及默认显示的数组
        let obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        console.log(obj);
        let obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        // 精确到分的处理，将数组的秒去掉
        let lastArray = obj1.dateTimeArray.pop();
        let lastTime = obj1.dateTime.pop();

        //dateTime = obj.dateTime;
        let dateTimeArray = obj.dateTimeArray;
        let dateTimeArray1 = obj1.dateTimeArray;
        let dateTime1 = obj1.dateTime;

        let dateTime = dateTimeArray1[0][dateTime1[0]] + '-' +
            dateTimeArray1[1][dateTime1[1]] + '-' + dateTimeArray1[2][dateTime1[2]] + ' ' + dateTimeArray1[3][dateTime1[3]] + ':' + dateTimeArray1[4][dateTime1[4]]

        this.setData({
            // dateTime: obj.dateTime,
            'conference.dateTime': dateTime,
            dateTime: dateTime,
            dateTimeArray: obj.dateTimeArray,
            dateTimeArray1: obj1.dateTimeArray,
            dateTime1: obj1.dateTime
        });

        that.getAgendaArray();
    },

    async getAgendaArray() {
        let agendaContent = [];
        const agendaList = await Agenda.getAgenda();
        // 内省在agenda模型中做了
        for (let i = 0; i < agendaList.length; i++) {
            agendaContent.push(agendaList[i]);
        }
        this.setData({
            'collapseData.panels[0].agendaContent': agendaContent
        });
        console.log(agendaContent);
        console.log(this.data.collapseData);
    },

    /**
     * 选择会议地点
     * @param e
     */
    radioChange: function (e) {
        console.log('你选择的框架是：');
        console.log(e);
        this.setData({
            'conference.roomId': e.detail.value.id,
            'conference.address': e.detail.value.name,
        });
    },

    /**
     * 发布会议
     * @param e
     */
    async formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        let currentUser = Caching.getStorageSync('currentUser');
        console.log('currentUser', currentUser);
        console.log('currentUser.basicCurrentUserInfo.userid,', currentUser.basicCurrentUserInfo.userid);
        let conference = e.detail.value;
        delete conference.radio;
        delete conference.radio;
        // 表单数据内省
        const addConferenceInfo = new AddConferenceInfo(
            currentUser.basicCurrentUserInfo.userid,
            conference.theme,
            conference.address,
            conference.time,
            conference.info,
            conference.conferee,
            conference.topic,
            conference.roomId,
            currentUser.basicCurrentUserInfo.orgId,
            conference.isOpen ? 1 : 0
        );
        if (addConferenceInfo.dataCheck()) {
            const addConferenceRes = await Conference.addConference(addConferenceInfo);
            InterAction.fnShowToast('新增成功', InteractionEnum.ICON_SUCCESS, '', InteractionEnum.DURATION, false);
            await Route.fnNavigateBack(1);
        }
    },


    changeDate(e) {
        this.setData({
            date: e.detail.value
        });
    },
    changeTime(e) {
        this.setData({
            time: e.detail.value
        });
    },
    changeDateTime(e) {
        this.setData({
            dateTime: e.detail.value
        });
    },
    changeDateTime1(e) {
        this.setData({
            dateTime1: e.detail.value
        });
    },
    changeDateTimeColumn(e) {
        let arr = this.data.dateTime,
            dateArr = this.data.dateTimeArray;

        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

        this.setData({
            dateTimeArray: dateArr,
            dateTime: arr
        });
    },

    changeDateTimeColumn1(e) {
        let arr = this.data.dateTime1,
            dateArr = this.data.dateTimeArray1;

        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

        this.setData({
            dateTimeArray1: dateArr,
            dateTime1: arr
        });
    },

    handleTitleTap(e) {
        const {
            index
        } = e.currentTarget.dataset;
        console.log("e");
        console.log(e);
        console.log("e.currentTarget.dataset");
        console.log(e.currentTarget.dataset);
        const panels = this.data.collapseData.panels;
        console.log("this.data.collapseData.panels");
        console.log(this.data.collapseData.panels);
        console.log(panels[0]);
        // android does not supprt Array findIndex
        // panels[index].expanded = !panels[index].expanded;
        panels[0].expanded = !panels[0].expanded;
        this.setData({
            collapseData: {
                ...this.data.collapseData, // 各数组的值，不是数组
                panels: [...panels], // [...panels]才是一个数组，所以...panels可以用来对方法进行传值
            },
        });
    },


    /** 添加会议室 */
    addMeetingRoom() {
        wx.navigateTo({
            url: '/page/meetingAgenda/bookMeetingRoom/bookMeetingRoom',
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            }
        });
    },

    conferenceThemeInput(e) {
        let that = this;
        that.setData({
            'conference.theme': e.detail.value,
        });
    },

    conferenceTimeInput(e) {
        let that = this;
        console.log("选择时间input被触发");
        that.setData({
            'conference.dateTime': e.detail.value,
        });
    },

    conferenceAddressInput(e) {
        let that = this;
        that.setData({
            'conference.address': e.detail.value,
        });
    },

    conferenceInfoInput(e) {
        let that = this;
        that.setData({
            'conference.info': e.detail.value,
        });
    },

    /**
     * 选择会议室
     * @returns {Promise<void>}
     */
    async chooseLocation() {
        let that = this;

        // 选择会议室
        let meetingRoom = [];
        InterAction.fnShowLoading('加载中...', false);
        const meetingRoomList = await MeetingRoom.getMeetingRoom();
        InterAction.fnHideLoading();
        that.setData({
            meetingRoom: meetingRoomList,
            meetingRoomShow: true
        });
    },

    meetingRoom(e) {
        console.log('e');
        console.log(e);
        let that = this;
        let meetingRoomId = e.target.dataset.meetingRoom.id;
        let meetingRoomName = e.target.dataset.meetingRoom.name;
        that.setData({
            'conference.roomId': meetingRoomId,
            'conference.address': meetingRoomName
        });

    },

    /**
     * 新增会议室
     */
    bookMeetingRoom() {
        wx.navigateTo({
            url: '/pages/conference/meetingRoom/index'
        });
    },

    chooseTime() {
        wx.datePicker({
            format: 'yyyy-MM-dd HH:mm',
            // currentDate: '2012-12-12',// 默认当前时间
            success: (res) => {
                this.setData({
                    dateTime: res.date,
                })
            },
        });
    },


    switchChange(e) {
        console.log('switchChange 事件，值:', e.detail.value);
        this.setData({
            isOpen: e.detail.value
        })
    },
});