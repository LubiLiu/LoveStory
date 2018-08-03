let CommonDefine = {
    //故事显示类型
    StoryShowType: {
        //对话
        Type_Dialogue: 101,
        Type_Aside: 102,
        Type_Chapter: 103,
        Type_Option: 201,
        Type_Button: 202,
        Type_Condition: 203,
        Type_Dead: 301,
        Type_End: 302
    },
    //条件类型 
    ConditionType: {
        //自身属性
        Type_Attr: 1,
        //和别人的羁绊
        Type_Emotion: 2,
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
        //属性增加
        Type_AttrAdd: 1,
        //感情增加
        Type_EmotionAdd: 2
    },
};
module.exports = CommonDefine;