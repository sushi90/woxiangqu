/**
 * Created by mengdesen on 14-3-22.
 */
var multiline = require('multiline');
exports.dataInit = function(title,user,index){
    var data = {
        signin : false,
        title : title
    };
    if(user){
        data.signin = true;
        data.gravatar = user.avatar;
    }
    if(index){
        data[index] = 'active';
    }
    return data;
};
exports.codes = function(type){
    var codes = [];
    codes.web =
        [
            {
                tab:'html',
                active:'active',
                code : multiline(function(){/*
<html>
<head>
<title>我想去</title>
</head>
<body>
<h3>woxiangqu.com</h3>
</body>
</html>
                 */})
            },
            {
                tab:'css',
                code:multiline(function(){/*
body{
    background-color: #eee;
}
                 */})
            },
            {
                tab:'javascript',
                code:multiline(function(){/*
function wxq(){

}
                 */})
            }
        ];
    codes.javascript = [
            {
                tab:'javascript',
                active:'active',
                code:multiline(function(){/*
function wxq(){

}
                 */})

    }
    ];
    codes.text = [
        {
            tab:'text',
            active:'active',
            code:''
        }
    ];
    return codes[type];
};

exports.testcases = function(type){
    var testcases = [];
    testcases.web =
        [
            {
                tab:'html',
                active:'active',
                code : multiline(function(){/*
<html>
<head>
<title>我想去</title>
</head>
<body>
<h3>woxiangqu.com</h3>
</body>
</html>
                 */})
            },
            {
                tab:'css',
                code:multiline(function(){/*
body{
    background-color: #eee;
}
                 */})
            },
            {
                tab:'javascript',
                code:multiline(function(){/*
expect(wxq(1,2),3);
                 */})
            }
        ];
    testcases.javascript = [
        {
            tab:'javascript',
            active:'active',
            code:multiline(function(){/*
expect(wxq(1,2),3,'test');
             */})

        }];
    return testcases[type];
};