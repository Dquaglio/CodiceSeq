/*!
* \File: MainProcessOwner.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-08-31
* \Class: MainProcessOwner
* \Package: com.sirius.sequenziatore.client.presenter.processowner
* \Brief: Gestione della pagina principale dell'utente Process owner
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'collection/processowner/ProcessDataCollection',
 'text!view/processowner/mainProcessOwnerTemplate.html',
 'model/processowner/ProcessModel',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, ProcessDataCollection, mainProcessOwnerTemplate ,X) {

	var MainProcessOwner = BasePresenter.extend({

		session: null,
		collection: new ProcessDataCollection(),

		// constructor
		initialize: function( options ) {
			BasePresenter.prototype.initialize.apply(this, options);
			BasePresenter.prototype.createPage.call(this, "home");
			this.session = options.session;
			this.waitingDataNumber = 0;
			var process={
					name:"name",
					description:"description",
					completionsMax:21,
					dateOfTermination:new Date(2014,08,30,10,5,8),
					terminated:false,
					eliminated:false,
					imageUrl:"indirizzo immagine",
					id:25,
			};
			var blockList=[];
			var block={
					id:21,
					type:null,
					requiredSteps:4,
					first:true,
					nextBlockId:-1,
					steps:null
			};
			blockList.push(block);
			var x=new X({process:process,blockList:blockList});
			
			x.save().done(function(){
				console.log("YEAH");
			}).fail(function(error){
				console.log(error.status+error.statusText);
			});
		},

		template: _.template(mainProcessOwnerTemplate),

		id: '#home',

		el: $('body'),

		render: function() {
			// template rendering and JQM css enhance
			$(this.id).html(this.template({
				username: this.session.getUsername(),
				waitingDataNumber: this.waitingDataNumber
			})).enhanceWithin();
		},

		// gestione della notifica dell'evento: un passo richiede approvazione
		notifyWaitingData: function( collection ) {
			if( collection.length != this.waitingDataNumber ) {
				collection.length = this.waitingDataNumber;
				this.render();
			}
		},

		// aggiorna il numero di passi che richiedono approvazione
		update: function() {
			var self = this;
			this.collection.fetchWaiting().done( function() {
				if( self.waitingDataNumber != self.collection.length ) {
					self.waitingDataNumber = self.collection.length;
					self.render();
				}
			}).fail( function() {
				self.render();
			}).always( function() { self.trigger("updated"); });
		}

	});

	return MainProcessOwner;

});
