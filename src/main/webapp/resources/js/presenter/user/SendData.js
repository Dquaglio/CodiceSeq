/*!
* \File: ProcessData.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-08-31
* \Class: ProcessData
* \Package: com.sirius.sequenziatore.client.presenter.processowner
* \Brief: Gestione della visualizzazione dei dati inviati dagli utenti riguardanti un processo creato
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'model/user/ProcessDataModel',
 'presenter/BasePresenter',
 'text!view/user/sendDataTemplate.html',
 'jquerymobile'
], function( $, _, Backbone, ProcessDataModel, BasePresenter, sendDataTemplate ){

	// PRIVATE

	// apre un popup con titolo "title" e contenuto "content"
	var printMessage = function( title, content ) {
		$("#process .alertPanel h3").text( title );
		$("#process .alertPanel p").text( content );
		$("#process .alertPanel").popup("open");
	};

	// controlla il testo in input e ritorna true o un eventuale stringa di descrizione dell'errore
	var validateDescription = function( description ) {
		if( description && description.length > 0 ) return null;
		else return "Un dato testuale non è stato inserito.";
	};

	// calcola la distanza tra due coordinate
	var getCoordinatesDistance = function( requiredPosition, coordinates ) {
		var degToRad = function( degree  ) {
			return degree * (Math.PI/180);
		};
		var earthRadius = 6371; // Radius of the earth in Km
		var latitudesDistance = degToRad( coordinates.latitude - requiredPosition.latitude );
		var longitudesDistance = degToRad( coordinates.longitude - requiredPosition.longitude );
		var a = Math.sin( latitudesDistance/2 ) * Math.sin( latitudesDistance/2 ) +
			Math.cos( degToRad( requiredPosition.latitude ) ) *
			Math.cos( degToRad( coordinates.latitude ) ) *
			Math.sin( longitudesDistance/2 ) * Math.sin( longitudesDistance/2 );
		var b = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a) );
		var distance = earthRadius * b; // distance in Km
		return distance * 1000;
	};

	// calcola le coordinate dell'utente
	var getCoordinates = function() {
		var deferred = $.Deferred();
		if (navigator.geolocation) {
			var self = this;
			navigator.geolocation.getCurrentPosition( function( position ) {
				var coordinates = {
					latitude: Number(position.coords.latitude),
					longitude: Number(position.coords.longitude),
					altitude: Number(position.coords.altitude)
				};
				deferred.resolve( coordinates );
			}, function( error ) {
				deferred.reject("Geolocalizzazione fallita");
			}, { timeout: 20000 });
		}
		else deferred.reject("La geolocalizzazione non è supportata da questo browser");
		return deferred.promise();
	};

	// controlla che le coordinate dell'utente rientrino nel raggio d'accettazione
	var checkCoordinates = function( event ) {
		if( typeof event !== "undefined" ) {
			event.preventDefault();
			event.stopPropagation();
		}
		var deferred = $.Deferred();
		$.mobile.loading('show');
		getCoordinates().done( function( coordinates ) {
			$.mobile.loading('hide');
			var requiredPosition = {
				latitude: Number($("#latitude").text()),
				longitude: Number($("#longitude").text()),
				altitude: Number($("#altitude").text()),
				radius: Number($("#radius").text())
			};
			$('#userLatitude').text( coordinates.latitude.toFixed(4) );
			$('#userLongitude').text( coordinates.longitude.toFixed(4) );
			var distance = getCoordinatesDistance( requiredPosition, coordinates );
			$('#userRadius').text(distance.toFixed(4));
			if( distance <= requiredPosition.radius ) {
				$("#coordinatesResult").text("le cordinate inviate rientrano nel raggio richiesto");
				$("#coordinatesResult").addClass("success");
				deferred.resolve( coordinates );
			}
			else {
				$("#coordinatesResult").text("le cordinate inviate non rientrano nel raggio richiesto");
				$("#coordinatesResult").addClass("error");
				deferred.reject();
			}
		}).fail( function( errorMessage ) {
			$.mobile.loading('hide');
			printMessage("Errore",errorMessage);
			deferred.reject();
		});
		return deferred.promise();
	};

	// annulla l'esecuzione del passo
	var cancelData = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		var targetId = $(event.target).attr("href");
		window.location.assign("#"+targetId);
	};

	var setTextualData = function( data /*values*/ ) {
		var error = null;
		data.numericValues = [];
		$("#sendDataForm .textualData").each( function( i, element ) {
			var description = $(element).val().trim();
			error = validateDescription( description );
			if( !error ) data.numericValues.push({
				value: description,
				type: "TEXTUAL",
				dataId: $(element).attr("dataId")
			});
		});
		return error;
	};

	var setImageData = function( data /*values*/, imageFiles ) {
		var error = null;
		data.imageValues = [];
		$("#sendDataForm .imageData").each( function( i, element ) {
			if( $(element)[0].files.length > 0 ) {
				var file = $(element)[0].files[0];
				imageFiles.push( file );
				data.imageValues.push({
					imageUrl: file.name.substring(0, file.name.lastIndexOf('.')),
					type: "IMAGE",
					dataId: $(element).attr("dataId")
				});
			}
			else error = "Un'immagine non è stata caricata.";
		});
		return error;
	};

	var setNumericData = function( data /*values*/ ) {
		var error = null;
		data.numericValues = [];
		$("#sendDataForm .numericData").each( function( i, element ) {
			var number = Number( $(element).val() );
			var stringNumber = $(element).val().replace(".",",");
			if( number && stringNumber.match(/^(\+|-)?\d+(,\d+)?$/) ) data.numericValues.push({
				value: number,
				type: "NUMERIC",
				dataId: $(element).attr("dataId")
			});
			else error = "Un dato numerico non è stato inserito nel corretto formato.";
		});
		return error;
	};

	var setGeographicData = function( data /*values*/, coordinates ) {
		data.geographicValues = [];
		data.geographicValues.push({
			latitude: coordinates.latitude,
			longitude: coordinates.longitude,
			altitude: coordinates.altitude,
			type: "GEOGRAPHIC",
			dataId: $("#sendDataForm #geographicData").attr("dataId")
		});
	};

	var saveImages = function( model, imageFiles ) {
		var deferreds = [];
		for(i=0; i<imageFiles.length; i++) {
			var formData = new FormData();
			var file = imageFiles[i]
			formData.append("image", file);
			deferreds.push( model.saveImage( formData ) );
		}
		return deferreds;
	}

	// invia i dati inseriti al server se i requisiti sono soddisfatti
	var sendData = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		var data = {
			username: this.session.getUsername(),
			stepId: $('#sendDataForm').attr("stepId"),
			sentTime: new Date()
		};
		//var values = [];
		var error = setTextualData( data /*values*/ );
		var imageFiles = [];
		error = error ? error : setImageData( data /*values*/, imageFiles );
		error = error ? error : setNumericData( data /*values*/ );
		if( error ) printMessage("Errore",error);
		else if( $('#geographicData').length ) checkCoordinates().done( function( coordinates ) {
			setGeographicData( data /*values*/, coordinates );
			//data.values = values;
			var model = new ProcessDataModel( data );
			console.log( model.toJSON() );
			if(!error) $.when.apply(null, saveImages( model, imageFiles )).done( function() {
				$.when( model.save() ).done( function() {
					printMessage("Passo superato", "I dati sono stati inviati e il passo è superato.");
					$("#process .alertPanel").on( "popupafterclose", function() {
						window.location.assign("#process?id="+$('#sendDataForm').attr("processId"));
					});
				}).fail( function(error) {
					console.log(error.status);
					printMessage("Errore","Comunicazione con il server fallita.");
				});
			}).fail( function() {
				printMessage("Errore","Invio delle immagini al server fallito.");
			});
		});
		else {
			//data.values = values;
			var model = new ProcessDataModel( data );
			if(!error) $.when.apply(null, saveImages( model, imageFiles )).done( function() {
				$.when( model.save() ).done( function() {
					printMessage("Passo superato", "I dati sono stati inviati e il passo è superato.");
					$("#process .alertPanel").on( "popupafterclose", function() {
						window.location.assign("#process?id="+$('#sendDataForm').attr("processId"));
					});
				}).fail( function(error) {
					console.log(error.status);
					console.log(error);
					printMessage("Errore","Comunicazione con il server fallita.");
				});
			}).fail( function() {
				printMessage("Errore","Invio delle immagini al server fallito.");
			});
		}
	};


	// PUBLIC
	var SendData = BasePresenter.extend({

		session: null,

		// Constructor
		initialize: function( options ) {
			this.session = options.session;
		},

		template: _.template(sendDataTemplate),

		id: '#process',

		el: $('body'),

		// events list
		events: {
			'click #checkCoordinates': checkCoordinates,
			'submit #sendDataForm': sendData,
			'click #cancelData': cancelData
		},

		// template rendering and JQM css enhance
		render: function( options, error ) {
			options["username"] = this.session.getUsername();
			options["error"] = typeof error !== "undefined" ? error : null;
			_.extend(this.events, BasePresenter.prototype.events);
			$(this.id).html(this.template( options )).enhanceWithin();
		},

		// aggiorna i dati della collezione "collection" recuperandoli dal server
		update: function( param, options ) {
			if( !options.subscribed ) {
				this.render( options, { text:"Non sei iscritto al processo selezionato", status: 400 });
				this.trigger("updated");
			}
			else if( options.process.terminated ) {
				this.render( options, { text:"Il processo selezionato è terminato", status: 400 });
				this.trigger("updated");
			}
			else if( step = _.findWhere(options.steps, {id: param.stepId}) ) {
				options.step = step;
				this.render( options );
				this.trigger("updated");
			}
			else {
				this.render( options, { text:"Passo inesistente o non eseguibile", status: 400 });
				this.trigger("updated");
			}
		}

	});

	return SendData;

});