const State = {
    State_Idle: 1,
    State_Delay: 2,
    State_Interval: 3,
}
import Game from '../Game';
cc.Class({
    extends: cc.Component,

    properties: {
        touched: { default: [], type: cc.Boolean },
        delayTime: { default: 0, type: cc.Float },
        passedTime: { default: 0, type: cc.Float },
        intervalTime: { default: 0, type: cc.Integer },
        startFunc: { default: null },
        processFunc: { default: null },
        completeFunc: { default: null },
        state: { default: State.State_Idle }
    },

    onLoad() {
        this.touched = false;
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);

        this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onMouseUp, this);
    },

    start() {
    },

    update(dt) {
        if (this.touched) {
            this.passedTime += dt;
            if (this.state == State.State_Delay) {
                if (this.passedTime >= this.delayTime) {
                    this.state = State.State_Interval;
                    this.passedTime = 0.0;
                }
            } else if (this.state == State.State_Interval) {
                if (this.passedTime >= this.intervalTime) {
                    this.passedTime = 0.0;
                    Game.Tools.InvokeCallback(this.processFunc);
                }
            }
        }
    },
    onDestroy() {
        this.node.off(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.node.off(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);

        this.node.off(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onMouseUp, this);
    },
    onMouseDown() {
        this.touched = true;
        this.passedTime = 0.0;
        this.state = State.State_Delay;
        Game.Tools.InvokeCallback(this.startFunc);
    },
    onMouseUp() {
        this.touched = false;
        Game.Tools.InvokeCallback(this.completeFunc);
    },

    Init(delayTime, intervalTime, startFunc, processFunc, completeFunc) {
        this.delayTime = delayTime;
        this.intervalTime = intervalTime;
        this.startFunc = startFunc;
        this.processFunc = processFunc;
        this.completeFunc = completeFunc;
    }
});
