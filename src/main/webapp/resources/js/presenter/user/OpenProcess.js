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
    'text!view/user/openProcessTemplate.html',
    'collection/ProcessCollection'
], function( $, _, Backbone, BasePresenter, openProcessTemplate, ProcessCollection ){

    //metodo privato per il parsing dei valori nella querystring
    var getParam = function( param ) {
        var hash = window.location.hash;
        var expression = new RegExp("#process\\?(\\w+=\\w+&)*("+param+"=(\\d{1,11}))|("+param+"=(\\w{1,20}))");
        var result = expression.exec(hash);
        return result ? ( Number(result[3]) || result[5]  ) : false;
    };
    var parseGet=function(){
        var result = new Array();
        var query = window.location.search.substring(1);
        if (query){
            //splito la querystring
            var stringList = query.split('&');
            var firstPart=stringList[0].split('=');
            if(firstPart[0]=="type")
                console.log(firstPart[1]);
                result[unescape(firstPart[0])]=unescape(firstPart[1]);
        }
        return result;
    }


    var OpenProcess = BasePresenter.extend({

        session:null,
        template: _.template(openProcessTemplate),

        id: '#processes',
        el: $('body'),

        initialize: function (options) {
            BasePresenter.prototype.initialize.apply(this, options);
            BasePresenter.prototype.createPage.call(this, "processes");
            this.session = options.session;
            console.log(this.session.getUsername());
            this.collection= new ProcessCollection({ username: this.session.getUsername()});

        },

        //renderizza il template usando i dati acquisiti dal fetching
        render: function( options,tipo) {
            // default value
            var error = typeof options.error !== "undefined" ? options.error : null;
            // template rendering and JQM css enhance
            $(this.id).html(this.template({
                processes: this.collection.toJSON(),
                username: this.session.getUsername(),
                error: "cojon",
                tipo:tipo
                })).enhanceWithin();
        },

        // aggiorna la collezione di processi "collection", recuperando i dati dal server
        update: function() {
            var self = this;
            var gets = getParam("type");
            //se la lunghezza dell'array risultato vuol dire che il parsing ha trovato una variabile type
            var subscribe=null;
            //variabile testuale per il template
            var tipo="";
            if(gets=="new") {
                    subscribe = false;
                    tipo="iscrivibili"
                }
                //?type=ongoing
                else if(gets=="ongoing"){
                    subscribe=true;
                    tipo="già iscritti";
                }

            self.collection.fetch({running:true}).done( function() {
                console.log("pollo");
                self.render({},tipo);
            }).fail( function(error) {
                console.log("polla");
                if(error.status == 0)
                    self.render({ text: "Errore di connessione" },"ghei");
                else
                    self.render({ text: error.status+" "+error.statusText },tipo);
            }).always( function() { self.trigger("updated"); });
        }
    });
    return OpenProcess;
});