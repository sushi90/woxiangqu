/**
 * Created by mengdesen on 14-3-25.
 */
module.exports = function (hbs) {
    hbs.registerHelper('breaklines', function (text) {
        text = hbs.Utils.escapeExpression(text);
        text = text.toString();
        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
        return new hbs.SafeString(text);
    });

    hbs.registerHelper('ifs', function (v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });

    hbs.registerHelper('math', function (a, operator, b) {
       return eval(a + operator + b);
    });

    hbs.registerHelper('pagination', function(pageNum, pageCount, pageURL){
         pageNum = parseInt(pageNum);
         pageCount = parseInt(pageCount);
        var output = '';
        for(var i=3;i>0;i--){
            var page = pageNum-i;
            if(page <= 0){
                continue;
            }
            output += '<a class="item"' + 'href="' + pageURL + page + '">';
            output += page;
            output += ' </a>';
        }

        output += '<a class="active item"' + 'href="' + pageURL + pageNum + '">';
        output += pageNum;
        output += ' </a>';

        for( i=1;i<=3;i++){
            page = pageNum + i;
            if(page > pageCount){
                break;
            }
            output += '<a class="item"' + 'href="' + pageURL + page + '">';
            output += page;
            output += ' </a>';
        }
        return new hbs.SafeString(output);
    });

    hbs.registerHelper('comment', function(context, options) {
        var ret = "";
        for(var i=0; i<context.length; i++) {
            ret = ret + options.fn(context[i]);
        }
        return ret;
    });
};