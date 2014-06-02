/**
 * Created by mdemo on 14-3-30.
 */
$('.tabular.ui.menu .item').tab();
$('.ui.dropdown').dropdown({'on':'hover'});
var editors = [];
for(var i=0;i<window.tabs.length;i++){
    var editorName = 'editor-'+ tabs[i];
    editors[editorName] = ace.edit(editorName);
    editors[editorName].setOptions({
        maxLines: Infinity,
        showPrintMargin: false
    });
    editors[editorName].getSession().setMode("ace/mode/" + tabs[i]);
    editors[editorName].setTheme("ace/theme/tomorrow");
    if(showPreview){
        editors[editorName].on('change',function(o){
            preview();
        });
    }
}
var preview = null;
if(showPreview){
    preview = function(){
        $('#preview').contents().find('html').get(0).innerHTML = editors['editor-html'].getValue();
        var style = '<style type="text/css">'+editors['editor-css'].getValue()+'</style>';
        $('#preview').contents().find('head').append(style);
        var script = '<script>try{' + editors['editor-javascript'].getValue()+'}catch(e){}</script>';
        try{
            $('#preview').contents().find('body').append(script);
        }
        catch(e){}
    }

    preview();
    $('#preview-toggle').click(function(e){
        if($('#preview-container').hasClass('preview-fullscreen')){
            $('#preview-container').removeClass('preview-fullscreen');
            return;
        }
        $('#preview-container').addClass('preview-fullscreen');

    });
}

var getCodes = function(){
    var codes = [];
    for(var i=0;i<window.tabs.length;i++){
        var editorName = 'editor-'+ tabs[i];
        var code = {
            tab: window.tabs[i],
            code: editors[editorName].getValue()
        };
        if(i==0){
            code.active = true;
        }
        codes.push(code);
    }
    return codes;
};