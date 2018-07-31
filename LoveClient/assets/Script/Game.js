let Game = {
    async: require('async'),
    moment: require('moment'),
    _: require('lodash'),

    Define: require('./Util/Define'),
    Tools: require('./Util/Tools'),
    HttpUtil: require('./Util/HttpUtil'),

    AudioController: require('./Controller/AudioController'),
    ConfigController: require('./Controller/ConfigController'),
    GameController: require('./Controller/GameController'),
    NotificationController: require('./Controller/NotificationController'),
    ResController: require('./Controller/ResController'),
    TimeController: require('./Controller/TimeController'),
    ShaderController: require('./Controller/ShaderController'),

    GameInstance: null
};
module.exports = Game;

