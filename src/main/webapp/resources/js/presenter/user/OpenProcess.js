/*!
 * \File: OpenProcess.js
 * \Author: Marcomin Gabriele <gabriele.marcomin@gmail.com>
 * \Date: 2014-07-01
 * \LastModified:
 * \Class: OpenProcess
 * \Package: com.sirius.sequenziatore.client.presenter.user
 * \Brief: Presentazione della lista dei processi iscrivibili e iscritti in base alla richiesta dal
 *         parte dell'user
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'presenter/BasePresenter',
    'text!view/user/OpenProcess.html',
    'collection/ProcessCollection'
], function( $, _, Backbone, BasePresenter, openProcessTemplate, ProcessCollection ){

    var template= _.template(openProcessTemplate);
    var collection= new ProcessCollection();

    var extractGet=function(expression,string){
        var result=new RegExp(expression).exec(string);
        return result;
    }



    var OpenProcess = BasePresenter.extend({



        initialize: function () {
            this.constructor.__super__.createPage.call(this, "processes");
            this.listenTo(this.collection, 'all', this.render);
        },



        id: '#processes',

        el: $('body'),

        render: function() {
            collection.fetch();
            //variabile che contiene i processi
            var processJson=collection.toJSON();
            this.update();
            var result = extractGet("#process\\?(\\w+=\\w+&)*"+param+"=(\\d{1,11})",address);
            var type_process=null;
            if(result=="new")
                type_process="subscribable";
            else if(result="ongoing")
                type_process="just subscribed";

            $(this.id).html(this.template({ processes: processJson })).enhanceWithin();
        },

        update: function() {
            collection.fetch();
        }

    });

    return OpenProcess;
});