import Tools from '../util/Tools';
let ConfigController = function () {
    this._configs = {};
};
/**
 * 
 * @param {Function} cb 
 */
ConfigController.prototype.Init = function (cb) {
    cc.loader.loadResDir('Json/', function (err, datas, urls) {
        if (err) {
            Tools.InvokeCallback(cb, err);
            return;
        }
        for (let i = 0; i < datas.length; i++) {
            let data = datas[i];
            this._configs[urls[i]] = data;
        }
        console.log(this._configs);
        Tools.InvokeCallback(cb, null);
    }.bind(this));
};

ConfigController.prototype.GetConfig = function (key) {
    return this._configs[key];
}

module.exports = new ConfigController();