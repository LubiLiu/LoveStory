let CommonDefine = {
    //故事显示类型
    StoryShowType: {
        //旁白
        Type_Aside: 0,
        //对话
        Type_Dialogue: 1
    },
    //条件类型 
    ConditionType: {
        //自身属性
        Type_Attr: 0,
        //和别人的羁绊
        Type_Emotion: 1,
    },
    //判断方法
    ConditionOper: {
        Oper_Less: 0,
        Oper_LessEqual: 1,
        Oper_Equal: 2,
        Oper_Bigger: 3,
        Oper_BiggerEqual: 4
    },
    //属性类型
    AttrType: {
        //魅力
        Type_Charm: 0,
        //智力
        Type_Intelligence: 1,
        //勇气
        Type_Brave: 2,
        //医术
        Type_Medical: 3,
        //仇恨
        Type_Gatred: 4,
        //冷静
        Type_Calm: 5,
    },
    //结果类型
    ResultType: {
        //章节跳转
        Type_Chapter: 0,
        //属性增加
        Type_AttrAdd: 1,
        //感情增加
        Type_EmotionAdd: 2
    },
    //段落类型 
    StageType: {
        Type_Story: 0,
        Type_Event: 1,
    }
};
module.exports = CommonDefine;