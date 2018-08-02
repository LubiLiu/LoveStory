import Game from '../../Game';

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
    },

    onDestroy() {
    },

    start() {
    },

    update(dt) {
    },

    onRestartClick() {

    },
    onPlayClick() {
        cc.director.loadScene("GameScene");
    }
});
