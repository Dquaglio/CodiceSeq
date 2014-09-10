define([
    'jquery',
    'underscore',
    'backbone',
    'presenter/BasePresenter',
    'text!view/user/sendDataTemplate.html',
    'model/ProcessDataModel',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, SendDataTemplate, SendImage , SendText, SendNumber, SendPosition,ProcessDataModel){

    var SendData = BasePresenter.extend({

        session:null,
        process:null,
        idProcess:null,
        idStep:null,
        el:$('sendData'),
        template : _.template(SendDataTemplate),

        //metodi

        initialize: function () {
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
        render: function() {
            this.step;
            process.fetch();
            /* blocco render da adattare
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



             */
            //in attesa di modifiche
		    $(this.id).html(template({
					            text: true,
					            position: true,
					            number: true,
                                image:true
				            })).enhanceWithin();
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
