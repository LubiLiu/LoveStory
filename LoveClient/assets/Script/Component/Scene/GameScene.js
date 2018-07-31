import Game from '../../Game'
cc.Class({
    extends: cc.Component,

    properties: {
        canvas: { default: null, type: cc.Canvas },
        pageButtons: { default: [], type: [cc.Button] },
        pageIndex: { default: 0, type: cc.Integer },
        pagePrefabs: { default: [], type: [cc.Prefab] },
        pageComponents: { default: [], type: [cc.Object] },
        pageParentNode: { default: null, type: cc.Node },
        moneyLabel: { default: null, type: cc.Label },
    },

    onLoad() {
        Game.Tools.AutoFit(this.canvas);
        Game.NotificationController.On(Game.Define.EVENT_KEY.USERINFO_UPDATEMONEY, this, this.onUpdateMoney);
        this.onPageButtonClick(null, 0);
        this.moneyLabel.string = Game.UserModel.GetMoney();
    },

    start() {
    },

    update(dt) {
    },

    onDestroy() {
        Game.NotificationController.Off(Game.Define.EVENT_KEY.USERINFO_UPDATEMONEY, this, this.onUpdateMoney);
    },

    onPageButtonClick(event, index) {
        this.pageIndex = index;
        this._updatePageButton();
        this._switchPage();
    },
    onUpdateMoney(value) {
        this.moneyLabel.string = value;
    },

    _updatePageButton() {
        for (let i = 0; i < this.pageButtons.length; i++) {
            let button = this.pageButtons[i];
            if (i == this.pageIndex) {
                button.interactable = false;
            }
            else {
                button.interactable = true;
            }
        }
    },
    _switchPage() {
        let component = this.pageComponents[this.pageIndex];
        if (component == null) {
            let prefab = this.pagePrefabs[this.pageIndex];
            if (prefab != null) {
                let node = cc.instantiate(prefab);
                this.pageParentNode.addChild(node);
                component = node.getComponent(prefab._name);
                component.Init();
                this.pageComponents[this.pageIndex] = component;
            }
        }

        if (component != null) {
            component.node.active = true;
            component.Update();
        }

        for (let i = 0; i < this.pageComponents.length; i++) {
            if (i != this.pageIndex) {
                let component = this.pageComponents[i];
                if (component != null) {
                    component.node.active = false;
                }
            }
        }
    }
});
