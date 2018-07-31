var path = require('path');
module.exports = {
    apps: [
        {
            name: 'gate',
            script: path.join(__dirname, '../GateServer/index.js'),
            env: {
                CONFIG_PATH: path.join(__dirname, '../Config/GateServer1/')
            }
        },
        {
            name: 'login1',
            script: path.join(__dirname, '../LoginServer/index.js'),
            env: {
                CONFIG_PATH: path.join(__dirname, '../Config/LoginServer1/')
            }
        },
        {
            name: 'game1',
            script: path.join(__dirname, '../GameServer/index.js'),
            env: {
                CONFIG_PATH: path.join(__dirname, '../Config/GameServer1/')
            }
        }
    ]
}
