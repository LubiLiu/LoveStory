let define = {
    Regex: {
        url: '((http|ftp|https)://)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(/[a-zA-Z0-9\&%_\./-~-]*)?',
        mail: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$',
    },
    ServerType: {
        TypeLogin: 1,
        TypeGame: 2,
    },
    ServerStatus: {
        StatusRunning: 1,
        StatusPause: 2,
        StatusDown: 3
    },
    ValidationType: {
        Registe: 1,
        QuickLogin: 2
    },
    ServerCommon: {
        TickInterval: 5000,
        TokenTimeout: 60,
        TokenSecret: '',
        ValidationTimeout: 60
    },
    DataKey: {
        ServerName: 'servername'
    },
};

module.exports = define;