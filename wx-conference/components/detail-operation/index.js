// components/detail-operation/index.js

import {OperationGroupJudger} from "../models/operation/operationGroupJudger";
import {OperationGroup} from "../models/operation/operation-group";
import {pageUrlConstant} from "../../config/PageUrlConstant";
import {Route} from "../../utils/native-api/route/Route";
import {PositioningCheckIn} from "../models/PositioningCheckIn";
import {Conference} from "../../model/conference/conference";

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },

    data: {
        conference: Object,
        operationGroup: Object,
        imgObjArr: Array,
    },

    properties: {
        data: Object,
        isLeaderInDepts: Boolean,// 是否是主管
        // onPackageConfereeInfo: (currentConference) => {
        //     console.log('currentConference', currentConference);
        // },
        // onPackageReadInfo: (currentConference) => {
        //     console.log('currentConference', currentConference);
        // },
        // onChange: (d) => {
        //     console.log(d)
        // }
    },

    lifetimes: {
        attached() {
            // 在组件实例进入页面节点树时执行
            const operationGroup = new OperationGroup();
            this.setData({
                conference: this.properties.data,
                operationGroup: operationGroup
            });
        },

        detached() {
            // 在组件实例被从页面节点树移除时执行
        },
    },

    observers: {
        'conference': function (conference) {
            // TODO 监听operationGroup
            const operationJudger = new OperationGroupJudger(conference.sign_type);// 页面渲染时初始化按钮状态
            if (this.data.operationGroupLocated) {// 有手动签到
                console.log('this.data.operationGroupLocated', this.data.operationGroupLocated);
                this.bindInitOperationGroup(this.data.operationGroupLocated);
            } else {//
                console.log('operationJudger.operationGroup', operationJudger.operationGroup);
                this.bindInitOperationGroup(operationJudger.operationGroup);
            }
        },
    },

    methods: {
        bindInitOperationGroup(operationGroup) {
            this.setData({
                operationGroup: operationGroup
            });
        },

        /**
         * 签到当前会议
         * @returns {Promise<void>}
         */
        async locationCheckCurrentConference() {
            let positioning = new PositioningCheckIn(this.data.conference);
            await positioning.checkIn();

            const currentConference = await Conference.getConferenceDetail(this.properties.data.id, Caching.getStorageSync('user'));
            // this.properties.onPackageConfereeInfo(currentConference);
            // this.properties.onPackageReadInfo(currentConference);

            this.setData({
                conference: currentConference,
                operationGroupLocated: positioning.operationGroup.operationGroup
            });

        },

        /**
         * 请假
         */
        takeOff() {
            const conference = this.data.data;
            Route.fnNavigateTo(`${pageUrlConstant.takeOff}?conference=` + JSON.stringify(conference));
        },

        /**
         * 照片
         */
        toPhoto() {
            let imgArr = this.data.conference.imgs;
            let mid = this.data.conference.id;
            Route.fnNavigateTo(`${pageUrlConstant.photo}?imgArr=` + JSON.stringify(imgArr) + '&mid=' + mid);
        },

        /**
         * 纪要
         */
        summary() {
            Route.fnNavigateTo(`${pageUrlConstant.conferenceSummary}?conference=` + JSON.stringify(this.data.conference));
        },

        /**
         * 笔记
         */
        note() {
            Route.fnNavigateTo(`${pageUrlConstant.conferenceNote}?mid=` + this.data.conference.id);
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
