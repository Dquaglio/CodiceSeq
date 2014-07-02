define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/user/manageProcessTemplate.html',
 'model/ProcessModel',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, manageProcessTemplate, Process ){

	var ManageProcess = BasePresenter.extend({
	
		process: new Process(),

		initialize: function () {
			this.constructor.__super__.createPage.call(this, "process");
			_.extend(this.events, BasePresenter.prototype.events);
			this.process.clear();
			this.process.steps.reset();
			this.listenTo(this.process, 'processFetched', this.render);
			
			this.update();
		},

		template: _.template(manageProcessTemplate),
		
		id: '#process',

		el: $('body'),

		events: {
			'submit #subscribeForm': 'subscribe',
			'submit #sendDataForm': 'sendData',
			'click #checkCoordinates': 'checkCoordinates',
			'click #skipStep': 'skipStep'
		},

		render: function() {
			if(localStorage.getItem('subscribe'+this.process.id) !== null) {
				if(!this.process.steps.length) {
					$(this.id).html(this.template({
							subscription: false,
							process: this.process.toJSON(),
							complete: true
					})).enhanceWithin();
					localStorage.setItem('complete'+this.process.id, 'true');
				}
				else {
					var step = this.process.steps.models[0].toJSON();
					var position = {};
					for(i=0; i<step.conditions.length; i++) {
						for(j=0; j<step.conditions[i].constraints.length; j++) {
							if(typeof step.conditions[i].constraints[j].latitude !== "undefinited") {
								position.latitude = step.conditions[i].constraints[j].latitude;
								position.longitude = step.conditions[i].constraints[j].longitude;
								position.radius = step.conditions[i].constraints[j].radius;
							}
						}
					}
					$(this.id).html(this.template({
						subscription: false,
						process: this.process.toJSON(),
						_step: step,
						position: position.hasOwnProperty("latitude") ? position : false,
						complete: false
					})).enhanceWithin();
				}
			}
			else {
				$(this.id).html(this.template({
					subscription: true,
					process: this.process.toJSON(),
					complete: false
				})).enhanceWithin();
			}
			
		},

		getParam: function(param) {
			var hash = window.location.hash;
			var expression = new RegExp("#process\\?(\\w+=\\w+&)*"+param+"=(\\d{1,11})");
			var result = expression.exec(hash);
			return result ? result[2] : false;
		},

		update: function() {
			var processId = this.getParam("id");
			this.process.fetchProcess(processId);
		},
		
		setProcess: function() {
			this.process.id = this.processData.step.get("processId");
			var self = this;
			this.process.fetch().done( function() {
				self.render();
			})
		}, 

		subscribe: function(event) {
			event.preventDefault();
			localStorage.setItem('subscribe'+this.process.id, 'true');
			this.render();
		},

		checkCoordinates: function() {
			if (navigator.geolocation) {
				var self = this;
				posizioneCorretta = false;
				$.mobile.loading('show');
				navigator.geolocation.getCurrentPosition(function(position) {
					$.mobile.loading('hide');
					var step = self.process.steps.models[0].toJSON();
					var position1 = {};
					for(i=0; i<step.conditions.length; i++) {
						for(j=0; j<step.conditions[i].constraints.length; j++) {
							if(typeof step.conditions[i].constraints[j].latitude !== "undefinited") {
								position1.latitude = step.conditions[i].constraints[j].latitude;
								position1.longitude = step.conditions[i].constraints[j].longitude;
								position1.radius = step.conditions[i].constraints[j].radius;
							}
						}
					}
					position2 = { latitude: position.coords.latitude, longitude: position.coords.longitude }
					$('#myLatitude').text(position2.latitude.toFixed(4));
					$('#myLongitude').text(position2.longitude.toFixed(4));
					var distance = self.getCoordinatesDistanceInMeters(position1, position2);
					$('#distance').text(distance.toFixed(4));
					if( distance <= position1.radius) {
						$("#coordinatesResult").text("le cordinate inviate rientrano nel raggio richiesto");
						$("#coordinatesResult").addClass("success");
						self.trigger("posizioneCorretta");
					}
					else {
						$("#coordinatesResult").text("le cordinate inviate non rientrano nel raggio richiesto");
						$("#coordinatesResult").addClass("error");
						self.trigger("posizioneErrata");
					}
				});
			}
			else alert("La geolocalizzazione non è supportata da questo browser.");
		},

		getCoordinatesDistanceInMeters: function(position1, position2) {
			var earthRadius = 6371; // Radius of the earth in km
			var latitudesDistance = (Number(position2.latitude)-Number(position1.latitude)) * (Math.PI/180);
			var longitudesDistance = (Number(position2.longitude)-Number(position1.longitude)) * (Math.PI/180);
			var a = 
				Math.sin(latitudesDistance/2) * Math.sin(latitudesDistance/2) +
				Math.cos(Number(position1.latitude) * (Math.PI/180)) * Math.cos(Number(position2.latitude) * (Math.PI/180)) * 
				Math.sin(longitudesDistance/2) * Math.sin(longitudesDistance/2); 
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var distance = earthRadius * c; // Distance in km
			return distance*1000;
		},
		
		
		degToRad: function(deg) {
		  return deg 
		},

		sendData: function(event) {
			event.preventDefault();
			this.checkCoordinates();
			this.listenTo(this, "posizioneCorretta", this.nextStep);
			this.listenTo(this, "posizioneErrata", this.noNextStep);
		},
		
		nextStep: function() {
			alert("Passo superato");
			this.process.steps.remove(this.process.steps.models[0]);
			this.render();
			this.stopListening(this, "posizioneCorretta");
			this.stopListening(this, "posizioneErrata");
		},

		noNextStep: function() {
			alert("Posizione non corretta");
			this.stopListening(this, "posizioneCorretta");
			this.stopListening(this, "posizioneErrata");
		},
		
		skipStep: function() {
			alert("Passo saltato");
			this.process.steps.remove(this.process.steps.models[0]);
			this.render();
		},

	});

	return ManageProcess;

});
