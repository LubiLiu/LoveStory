var Define = {
    Regex: {
        url: '((http|ftp|https)://)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(/[a-zA-Z0-9\&%_\./-~-]*)?',
        mail: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$',
    },
    EVENT_KEY: {
        CHANGE_GAMESTATE: '0',
        LOADED_COMPLETE: '5',

        CONNECT_TO_GATESERVER: '100',

        USERINFO_UPDATECOINS: '200',
        USERINFO_UPDATEITEMS: '201',
        USERINFO_UPDATEHOTELS: '202',
        USERINFO_UPDATEBOYS: '203',
        USERINFO_UPDATEORDERS: '204',
        USERINFO_UPDATEMONEY: '205',

        NET_OPEN: '300',
        NET_CLOSE: '301',

        TIP_TIPS: '401',
        TIP_BARRAGE: '402',
        TIP_RESULT: '403',

        MUSIC_CHANGE: '500',
        EFFECT_CHANGE: '501'
    },
    DATA_KEY: {
        WORKING_BOY: 'WB',
    },
    HEART_BEAT: {
        INTERVAL: 10,
        TIMEOUT: 30,
    }
}

module.exports = Define;

//pbjs -t static-module -w commonjs -o ./ProtoMsg.js  *.proto