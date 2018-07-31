import Tools from '../Util/Tools';

import grayfrag from '../Shader/grayfrag'
import grayvert from '../Shader/grayvert';
import normalfrag from '../Shader/normalfrag';
import normalvert from '../Shader/normalvert';

var ShaderController = function () {
    this.shaderPrograms = {};
    this.shaderFiles = {
        gray: [grayfrag, grayvert],
        normal: [normalfrag, normalvert]
    };
}

ShaderController.prototype.Init = function (cb) {
    Tools.InvokeCallback(cb);
};

ShaderController.prototype.SetShader = function (sprite, shaderName) {
    let glProgram = this.shaderPrograms[shaderName];
    if (this.shaderFiles[shaderName] == null) {
        console.log('[严重错误] 没有该shader资源 ' + shaderName);
        return;
    }
    if (!glProgram) {
        glProgram = new cc.GLProgram();
        let frag = this.shaderFiles[shaderName][0];
        let vert = this.shaderFiles[shaderName][1];
        glProgram.initWithString(vert, frag);
        if (!cc.sys.isNative) {
            glProgram.initWithVertexShaderByteArray(vert, frag);
            glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
        }
        glProgram.link();
        glProgram.updateUniforms();
        this.shaderPrograms[shaderName] = glProgram;
    }
    sprite._sgNode.setShaderProgram(glProgram);
    return glProgram;
};


module.exports = new ShaderController();