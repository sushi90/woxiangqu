/**
 * Created by Administrator on 14-3-13.
 */
//var expect = require('chai').expect;
//var testjs = require('../lib/testJS_API');
//var testQuestion = require('../models/testQuestion.js');
//var test = require("../lib/test-framework-js.js");
var mongoose = require('mongoose');
var question = require('../models/question')(mongoose, mongoose.Schema);
var Question = mongoose.model('Question');
//console.log(Question)
Question.getAnswerByQuestionId('534a0db594b1354c0c28baa7',function(err, answer){
    if(err){
        console.log(err);
        return;
    }
    console.log(JSON.stringify(answer));
})

//describe('testJs',function(){
//    it('should test js code', function(){
//        var sandbox = {
//            count: 2,
//            animal: 'cat'
//        },code = 'count+= 1;animal = "kitty"';
//        var result = testjs.validate(code,sandbox);
//        console.log(result);
//        expect(result).to.have.a.property('count',3);
//        expect(result).to.have.a.property('animal','kitty');
//    })
//});

//describe('test',function(){
//        it("should test", function(){
//            var noOdds = function ( values ){
//                // Return all non-odd values
//                var vArray = new Array();
//                for(value in values){
//                    if(value == 0){
//                        vArray.push(parseInt(value));
//                    }else if(value%2 === 0){
//                        vArray.push(parseInt(value));
//                    }
//                }
//                return vArray;
//            }
//            var result = testQuestion.testCase('noOdds',noOdds,'test.assertSimilar(noOdds([0,1,2,3]),noOdds([0,1,2,3]),"why")');
//            expect(result).to.have.a.property('result','passed');
//        })
//    }
//)

