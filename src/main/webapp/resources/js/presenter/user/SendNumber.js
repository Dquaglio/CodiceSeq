/**
 * Created by gabriele on 08/07/14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'presenter/BasePresenter',
    'text!view/user/SendNumber.html',
    'model/ProcessModel',
    'jquerymobile'
], function( $, _, Backbone, BasePresenter, sendNumberTemplate, Process ){

    var process= new Process();
    var template=_.template(sendNumberTemplate);

    var getParam= function(param) {
        var hash = window.location.hash;
        var expression = new RegExp("#process\\?(\\w+=\\w+&)*"+param+"=(\\d{1,11})");
        var result = expression.exec(hash);
        return result ? result[2] : false;
    }

    var SendNumber = Backbone.View.extend({



        initialize: function () {
            process.clear();
            process.steps.reset();
        },



        id: '#process',

        el: $('body'),

        events: {
            'click #submitNumber': 'addNumber'
        },
        addNumber:function(){},
        render: function() {

        }

    });

    return ManageProcess;

});