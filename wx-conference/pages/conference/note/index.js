import {Caching} from "../../../utils/native-api/caching/Caching";
import {NoteInfo} from "../../../model/conference/NoteInfo";
import {Notes} from "../../../model/conference/notes";
import {Interaction} from "../../../utils/native-api/interaction/Interaction";
import {Route} from "../../../utils/native-api/route/Route";


const app = getApp();

Page({
    data: {
        conference: null,
        filePaths: null,
        imgArr: [],
        chooseViewShow: true,
        currentUserId: null,
    },
    async onLoad(params) {
        this._initCurrentConference(params.conference);
    },

    _initCurrentConference(conference) {
        this.setData({
            conference: conference,
        });
    },

    async formSubmit(e) {
        const mid = this.data.mid;
        console.log('uid', Caching.getStorageSync('currentUser'));
        const uid = Caching.getStorageSync('currentUser').basicCurrentUserInfo.userid;
        const text = e.detail.value.text;
        const img = ' ';

        const noteInfo = new NoteInfo(mid, uid, text, img);
        console.log('noteInfo', noteInfo);
        if (noteInfo.dateCheck()) {
            const addNoteRes = await Notes.submitNotes(noteInfo);
            Interaction.fnShowToast('提交成功', InteractionEnum.DD_SHOW_TOAST_TYPE_SUCCESS, InteractionEnum.DD_SHOW_TOAST_DURATION);
            setTimeout(function () {
                Route.fnNavigateBack(1);
            }, 2000);
        }
    }
});
