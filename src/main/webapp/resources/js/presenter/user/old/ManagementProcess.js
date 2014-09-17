define([
    'jquery',
    'underscore',
    'backbone',
    'presenter/BasePresenter',
    'text!view/user/manageBase.html',
    'text!view/user/managementProcessTemplate.html',
    'presenter/user/SendData',
    'model/ProcessModel',
    'model/ProcessDataModel',
    'jquerymobile'

], function( $, _, Backbone, BasePresenter,BaseTemplate, manageProcessTemplate, SendData,Process,ProcessDataModel ){

    //funzione per il parsing della querystring per ManagementProcess
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
            for(i=0;i<3;i++){
                var part=stringList[i].split('=');
                if(i==0 && part[0]=="id") {
                    //aggiungo il valore di id nel risultato
                    result[unescape(part[0])] = unescape(part[1]);
                }
                else if(i==1 && part[0]=="step") {
                    //aggiungo il valore di step nel risultato
                    result[unescape(part[0])] = unescape(part[1]);
                }
                else if(i==2 && part[0]=="send") {
                    //aggiungo il valore di step nel risultato
                    result[unescape(part[0])] = unescape(part[1]);
                }
            }
        }
        return result;
    }

    var ManagementProcess = BasePresenter.extend({
        process: null,
        session:null,
        //template scheletro
        baseTemplate: _.template(BaseTemplate),
        //template del management
        template: _.template(manageProcessTemplate),
        id: '#process',
        el: $('body'),
        widget:$('widget'),

        events: {
            'click #skipStep': 'skipStep',
            'click #submitProcess': 'subscribeProcess'
        },

        //metodi

		initialize: function () {
            BasePresenter.prototype.initialize.apply(this, options);
            BasePresenter.prototype.createPage.call(this, "process");
            //creao il widget SendData
            this.sendData=new SendData();
            this.session = options.session;
		},

        render: function( options,tipo,id) {
            var error = typeof options.error !== "undefined" ? options.error : null;
            //carico il template scheletro
            $(this.id).html(this.baseTemplate);
            if(tipo==false)
                this.widget.append(this.template({
                                    process: this.process.toJSON(),
                                    username: this.session.getUsername(),
                                    error: error,
                                    step:this.process.steps.toJSON()
            }))
            else if(tipo==true){
                this.widget.append(this.sendData.el);

                this.sendData({step:this.process.steps.get(id).toJSON()});
                this.sendData.render();
            }
        },

        update: function() {
            //this.$el.html( this.template( this.model.toJSON() ) );
            // Alias di this, id processo, id passo, parsing querystring
            var self = this,idProcess="",idStep="",gets = parseGet.call(self);
            //booleano per verificare la necessità di renderizzare SendData

            //cambiare con la funzione di vanni
            var send=false;
            if(gets["id"]!= null) {
               idProcess = gets["id"];
            }
            if(gets["step"]!= null && gets["step"]!=this.idProcess)
                this.idStep=gets["step"];

            if(gets["send"]!= null && gets["send"]==1)
                send=Boolean(gets["send"]);

            //fetching
            self.process.fetch({id:idProcess,username:this.session.getUsername()}).done( function() {
                self.render({},send,idProcess);
            }).fail( function(error) {
                if(error.status == 0)
                    self.render({ text: "Errore di connessione" });
                else
                    self.render({ text: error.status+" "+error.statusText });
            }).always( function() { self.trigger("updated"); });
        },

        //funzione che gestisce l'evento per l'iscrizione al processo
        subscribeProcess:function(){
            this.process.subscribe(this.session.getUsername());
            //aggiorno process
            this.update();
        },

        //evento che gestisce il salto passo
        skipStep:function(){
            var now = new Date();
            var sending = new ProcessDataModel({stepId:getParam("step"), username: this.session.getUsername(), dateTime: now, values: null});
            sending.save().done( function() {
                //aggiorno il process e la view
                this.update()
            }).fail( function(error) {
                //renderizzo l'errore
                if(error.status == 0)
                    this.render({ text: "Errore di connessione" });
                else
                    this.render({ text: error.status+" "+error.statusText });
            });
        }

	});

	return ManagementProcess;
});