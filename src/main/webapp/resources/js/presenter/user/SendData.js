define([
    'jquery',
    'underscore',
    'backbone',
    'presenter/BasePresenter',
    'text!view/user/sendDataTemplate.html',
    'model/ProcessDataModel',
    'presenter/user/SendImage',
    'presenter/user/SendText',
    'presenter/user/SendNumber',
    'presenter/user/SendPosition',
    'jquerymobile'
], function( $, _, Backbone, BasePresenter, SendDataTemplate, ProcessDataModel,SendImage , SendText, SendNumber, SendPosition,ProcessDataModel){

    var getParam = function( param ) {
        var hash = window.location.hash;
        var expression = new RegExp("#process\\?(\\w+=\\w+&)*("+param+"=(\\d{1,11}))|("+param+"=(\\w{1,20}))");
        var result = expression.exec(hash);
        return result ? ( Number(result[3]) || result[5]  ) : false;
    };

    var SendData = BasePresenter.extend({

        session:null,
        processData:null,
        idProcess:null,
        idStep:null,
        collectInformation:null,
        el:$('sendData'),
        template : _.template(SendDataTemplate),

        //metodi

        initialize: function () {
            //se l'idStep e idProcess sono nulli oppure è cambiato il passo, creo un nuovo collectInformation

            this.session=options.session;
		},
    /*riferimento per i nomi dei dati
    {
        "id": 1,
        "processId": 1,
        "description": "Raggiungi torre archimede, dicci cosa vedi e inviaci le coordinate",
        "nextStep": 2,
        "requiresApproval": false,
        "optional": true,
        "textualData" : [
        { "id": 1, "description": "Cosa vedi" }
    ],
        "numericData": null,
        "imageData": null,
        "geographicData": {
        "latitude": 45.411331,
            "longitude": 11.8876318,
            "altitude": 17,
            "radius": 2000
    }
    }
    */
        render: function(options) {
            if((this.idProcess==null || getParam("id")!=this.idProcess)||(this.idStep==null || getParam("step")!=this.idStep)) {
                this.collectInformation=new Array();
                this.idProcess=getParam("id");
                this.idProcess=getParam("step");
            }
            var _send=getParam("send");
            var innerSend=null;
            if(_send=="image"){
                if(typeof this.sendImage== undefined)
                    this.sendImage=new SendImage();
                innerSend=this.sendImage;
            }
            else if(_send="text"){
                if(typeof this.sendText== undefined)
                    this.sendText=new SendText();
                innerSend=this.sendText;
            }
            else if(_send="number"){
                if(typeof this.sendNumber== undefined)
                    this.sendNumber=new SendNumber();
                innerSend=this.sendNumber;
            }
            else if(_send="position"){
                if(typeof this.sendPosition== undefined)
                    this.sendPosition=new SendPosition();
                innerSend=this.sendPosition;
            }
            if(innerSend==null){
                $(this.el).html(this.template({
                    image:"",
                    position:"",
                    text:"",
                    number:""
                }));}
            else{
                $(this.el).append(innerSend.el);
                innerSend.({step:this.process.steps.get(id).toJSON()});
                innerSend.render();
            }
        },

        getData:function(){

        },

        saveData:function(){

        }
	});
    //guida per inviare dati versione vecchia
    /* Cosente di inviare al server i dati di un passo eseguito.
     *
     * ESEMPIO UTLIZZO
     * // array dei valori rilevati
     * var values = new Array();
     * values.push({ dataId: 1, value: "testo" });
     * values.push({ dataId: 1, value: 12.34 });
     * values.push({ dataId: 1, imageUrl: "img/Tesoro" });
     * values.push({ dataId: 1, latitude: 12.34 , longitude: 12.34, altitude: 12.34 });
     *
     * // data corrente; il formato è da concordare con i progettisti del database
     * var now = new Date();
     *
     * var model = new ProcessDataModel({
     *		stepId: 1, username: "Gabriele", dateTime: now, values: values
     *	});
     *
     * // per testare si può invertire fail con save
     * model.save().done( function() {
     *		console.log("salvato con successo")
     *	}).fail( function() {
     *		console.log("errore di connessione")
     *	});
     */
	return SendData;

});
