import Game from '../../Game';

cc.Class({
    extends: cc.Component,

    properties: {
        accEditBox: { default: null, type: cc.EditBox, },
        targetCanvas: { default: null, type: cc.Canvas }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    },

    start() {

    },

    update(dt) {

    },

    onDestroy() {
    },

    onStartGame() {
        if (this.accEditBox.string == '') {
            return;
        }
        this.onLoginPlatfrom();
    },

    onLoginPlatfrom() {
    },

    onLoginComplete(msgid, data) {
        cc.director.loadScene("GameScene");
    },
});
