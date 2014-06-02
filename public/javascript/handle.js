/**
 * Created by mengdesen on 14-3-15.
 */
$('.ui.dropdown').dropdown({'on': 'hover'});

var rules = {
    title: {
        identifier: 'title',
        rules: [
            {
                type: 'empty',
                prompt: '请先输入题目名称'
            }
        ]
    },
    intro: {
        identifier: 'intro',
        rules: [
            {
                type: 'empty',
                prompt: '请先输入题目描述'
            }
        ]
    },
    company: {
        identifier: 'company',
        rules: [
            {
                type: 'empty',
                prompt: '请输入所属公司'
            }
        ]
    },
    tags: {
        identifier: 'tags',
        rules: [
            {
                type: 'empty',
                prompt: '请输入题目标签'
            }
        ]
    }
};
var url = '/question/create';

if(update){
    url = '/question/update'
}
var settings = {
    on: 'blur',
    inline: 'true',
    onSuccess: function(){
        var question = {};
        question.title = $('#title').val();
        question.intro = $('#intro').val();
        question.company = $('#company').val();
        if(update){
            question.id = location.pathname.split('/')[3];
            question.language = language;
        }
        else{
            question.language = location.pathname.split('/')[3];
        }
        question.preview = (question.language == 'web');
        question.tags = $('#tags').val().split(';');
        if(!question.tags[question.tags.length-1]){
            question.tags.pop();
        }
        if(editor){
            question.testcase = getCodes();
        }
        $.post(url,question,function(data){
            if(data.error){
                console.log('error');
                return;
            }
            location.href = '/question/'+data.qid;
        });
    }
};

$('.ui.form').form(rules,settings);