class PullDownRefresh {
    /**
     * @method fnStartPullDownRefresh 开始下拉刷新。调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。
     */
    static fnStartPullDownRefresh() {
        wx.startPullDownRefresh();
    }

    /**
     * @method fnStopPullDownRefresh 停止当前页面下拉刷新。
     */
    static fnStopPullDownRefresh() {
        wx.stopPullDownRefresh();
    }
}

export {
    PullDownRefresh
}