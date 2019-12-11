// components/conference/card/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        conferenceList: Array,
        infoOmitted: Boolean,
        hideInfo: Boolean,
        hideStatus: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {
        infoOmitted: Boolean
    },

    observers: {
        'infoOmitted': function (infoOmitted) {
            if (infoOmitted) {// 省略
                this.data.infoOmitted = true;
            } else {
                this.data.infoOmitted = false;
            }
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 跳转到会议详情
         * @param e
         */
        toConferenceDetail(e) {
            let conference = e.currentTarget.dataset.conference;
            let mid = conference.id;
            wx.navigateTo({
                url: '/pages/conference/detail/index?mid=' + mid,
            });
        },
    }
})