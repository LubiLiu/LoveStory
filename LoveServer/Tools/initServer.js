let async = require('async');
let path = require('path');
let fs = require('fs');
let process = require('child_process');

let action = function () {
    async.waterfall([
        function (anext) {
            //Gate Server 的初始化
            process.exec('npm install', { cwd: path.join(__dirname, '../GateServer/') }, function (err, stdout, stderr) {
                console.log(stdout);
                anext(err);
            });
        },
        function (anext) {
            //Login Server 的初始化
            process.exec('npm install', { cwd: path.join(__dirname, '../LoginServer/') }, function (err, stdout, stderr) {
                console.log(stdout);
                anext(err);
            });
        },
        function (anext) {
            //Game Server 的初始化
            process.exec('npm install', { cwd: path.join(__dirname, '../GameServer/') }, function (err, stdout, stderr) {
                console.log(stdout);
                anext(err);
            });
        },
        function (anext) {
            //根据config文件夹结构生成Log文件夹
            let sourcePath = path.join(__dirname, '../Config/');
            let targetPath = path.join(__dirname, '../Logs/');
            if(!fs.existsSync(targetPath)){
                fs.mkdirSync(targetPath);
            }
            fs.readdir(sourcePath, function (err, files) {
                for (let i = 0; i < files.length; i++) {
                    let dirName = path.join(sourcePath, files[i]);
                    if (fs.statSync(dirName).isDirectory()) {
                        let targetDirName = path.join(targetPath, files[i]);
                        if (!fs.existsSync(targetDirName)) {
                            fs.mkdirSync(targetDirName);
                        }
                    }
                }
            });
        }
    ], function (err) {
        console.log('初始化完成');
    });
}
action();
