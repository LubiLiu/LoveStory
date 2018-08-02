import Define from '../Util/Define';
import Tools from '../Util/Tools';

import NotificationController from '../Controller/NotificationController';

var ArchiveController = function () {
}

ArchiveController.prototype.Init = function (cb) {
    Tools.InvokeCallback(cb, null);
}

module.exports = new ArchiveController();