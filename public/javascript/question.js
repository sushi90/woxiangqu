/**
 * Created by mengdesen on 14-3-14.
 */

$('.ui.dropdown').dropdown({'on':'hover'});
$('#submit').click(function () {
    $('#message').html('');
    var data = {
        id:location.pathname.split('/')[2],
        codes: getCodes()
    };
    $.post('/question/verify',data,function(data){
        var message = '';
        for(var i=0;i<data.length;i++){
                if(data[i].pass){
                   message+= '<div class="ui success message"><div class="header">';
                }
                else{
                    message+= '<div class="ui error message"><div class="header">';
                }
            message+=data[i].info;
            message+='</div></div>'
        }
        $('#message').append(message);
    });
});

$(".thumbs.up.icon").click(function(e){
    var questionId = window.location.href.substr(window.location.href.indexOf('question') + 9);
    var userName = $(e.target).parent().parent().find('.author').text();
    var data = {
        questionId: questionId,
        userName: userName
    }
    $.post('/question/thumbs', data, function(pointResult){
        $(e.target).parent().find('.point').text(pointResult);
    })
})

