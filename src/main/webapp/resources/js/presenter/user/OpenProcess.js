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
    var parseGet=function(){
        var result = new Array();
        var query = window.location.search.substring(1);
        if (query){
            //splito la querystring
            var stringList = query.split('&');
            var firstPart=stringList[0].split('=');
            if(firstPart[0]=="type")
                result[unescape(firstPart[0])]=unescape(firstPart[1]);
        }
        var sito = get['sito'];
        return result;
    }


    var OpenProcess = BasePresenter.extend({

        session:null,
        template: _.template(openProcessTemplate),
        collection: new ProcessCollection({ username: "Gabriele" }),
        id: '#processes',
        el: $('body'),

        initialize: function () {
            this.constructor.__super__.createPage.call(this, "processes");
            this.listenTo(this.collection, 'all', this.render);
            this.session = options.session;
        },

        //renderizza il template usando i dati acquisiti dal fetching
        render: function( options,tipo) {
            // default value
            var error = typeof options.error !== "undefined" ? options.error : null;
            // template rendering and JQM css enhance
            $(this.id).html(this.template({
                processes: this.collection.toJSON(),
                username: this.session.getUsername(),
                error: error,
                tipo:tipo
                })).enhanceWithin();
        },

        // aggiorna la collezione di processi "collection", recuperando i dati dal server
        update: function() {
            var self = this;
            var gets = parseGet.call(self);
            //se la lunghezza dell'array risultato vuol dire che il parsing ha trovato una variabile type
            var subscribe=null;
            //variabile testuale per il template
            var tipo="";

            if(gets.length == 1);{
                //?type=new
                if(result=="new") {
                    subscribe = true;
                    tipo="iscrivibili"
                }
                //?type=ongoing
                else if(result="ongoing"){
                    subscribe=false;
                    tipo="già iscritti";
                }
            }

            self.collection.fetch({subscribe:subscribe}).done( function() {
                self.render({},tipo);
            }).fail( function(error) {
                if(error.status == 0)
                    self.render({ text: "Errore di connessione" });
                else
                    self.render({ text: error.status+" "+error.statusText });
            }).always( function() { self.trigger("updated"); });
        }
    });
    return OpenProcess;
});