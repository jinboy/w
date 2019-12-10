import {PageUrlConstant} from "../../../config/pageUrlConstant";
import {PositioningCheckIn} from "../models/PositioningCheckIn";
import {Conference} from "../../../model/conference/conference";
import {Caching} from "../../../utils/native-api/caching/caching";
import {Route} from "../../utils/native-api/route/Route";

Component({
    data: {
        conference: Object,
        operationGroup: Object,
        imgObjArr: Array,
    },

    properties: {
        data: Object,
        isLeaderInDepts: Boolean,// 是否是主管
        onPackageConfereeInfo: (currentConference) => {
            console.log('currentConference', currentConference);
        },
        onPackageReadInfo: (currentConference) => {
            console.log('currentConference', currentConference);
        },
        onChange: (d) => {
            console.log(d)
        }
    },

    lifetimes: {
        attached() {
            // 在组件实例进入页面节点树时执行
        },

        detached() {
            // 在组件实例被从页面节点树移除时执行
        },
    },

    observers: {
        'operationGroup':function(operationGroup) {
            if (!operationGroup) {
                return;
            }

        }
    },

    // didMount() {
    //     let operationGroup = new OperationGroup();
    //     this.setData({
    //         operationGroup: operationGroup
    //     });
    // },

    // async didUpdate(prevProps, prevData) {
    //     this.data.conference = this.properties.data;// 拿到父级传来的conference
    //     if (this.data.operationGroupLocated) {
    //         // 已经定位签到
    //         this.setData({
    //             operationGroup: this.data.operationGroupLocated
    //         });
    //     } else {
    //         // 没有定位签到默认为加载到详情页时，直接根据用户数据判断是否签到
    //         let operationJudger = new OperationGroupJudger(this.data.conference.sign_type);// 页面渲染时初始化按钮状态
    //         this.setData({
    //             operationGroup: operationJudger.operationGroup
    //         });
    //     }
    // },

    didUnmount() {
        //    嘻嘻嘻嘻
    },

    methods: {
        /**
         * 签到当前会议
         * @returns {Promise<void>}
         */
        async locationCheckCurrentConference() {
            let positioning = new PositioningCheckIn(this.data.conference);
            await positioning.checkIn();

            const currentConference = await Conference.getConferenceDetail(this.properties.data.id, Caching.getStorageSync('user'));
            this.properties.onPackageConfereeInfo(currentConference);
            this.properties.onPackageReadInfo(currentConference);

            this.setData({
                operationGroupLocated: positioning.operationGroup.operationGroup
            });
            // console.log('operationGroupLocated', this.data.operationGroupLocated);

        },

        /**
         * 请假
         */
        takeOff() {
            const conference = this.data.conference;
            Route.fnNavigateTo(`${PageUrlConstant.takeOff}?conference=` + JSON.stringify(conference));
        },

        /**
         * 照片
         */
        toPhoto() {
            let imgArr = this.data.conference.imgs;
            let mid = this.data.conference.id;
            Route.fnNavigateTo(`${PageUrlConstant.photo}?imgArr=` + JSON.stringify(imgArr) + '&mid=' + mid);
        },

        /**
         * 纪要
         */
        summary() {
            Route.fnNavigateTo(`${PageUrlConstant.conferenceSummary}?conference=` + JSON.stringify(this.data.conference));
        },

        /**
         * 笔记
         */
        note() {
            Route.fnNavigateTo(`${PageUrlConstant.conferenceNote}?mid=` + this.data.conference.id);
        },

        /**
         * 发送钉
         */
        notice() {
            let useridArr = [];
            this.data.readInfo[1].forEach(user => {
                useridArr.push(user.userid);
            });
            Ding.createNoticeDing({
                users: useridArr,
                corpId: app.globalData.corpId,
                text: this.data.conference.theme,
            })
        },
    },
});
