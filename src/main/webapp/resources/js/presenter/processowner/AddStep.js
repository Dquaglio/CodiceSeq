/*!
* \File: AddStep.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-08-31
* \Class: AddStep
* \Package: com.sirius.sequenziatore.client.presenter.processowner
* \Brief: Gestione della creazione di un passo
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/processowner/addStepTemplate.html',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, addStepTemplate ) {

	// PRIVATE

	// apre un popup con titolo "title" e contenuto "content"
	var printMessage = function( title, content ) {
		$("#newprocess .alertPanel h3").text( title );
		$("#newprocess .alertPanel p").text( content );
		$("#newprocess .alertPanel").popup("open");
	};

	// mostra e rende obbligatori i campi dati selezionati
	var showInput = function( event ) {
		var hideDiv = $(event.target).parent().next('.hide');
		hideDiv.toggle();
		if(hideDiv.is(':visible')) {
			hideDiv.find('input').prop('disabled',false);
			hideDiv.find('input:not([type="time"])').prop('required',true);
		}
		else {
			hideDiv.find('input').prop('required',false);
			hideDiv.find('input').prop('disabled',true);
		}
	};

	// cambia il vincolo di obbligatorietà dei dati geografici
	var changeConstraints = function( event ) {
		if( $(event.target).is(":checked") )
			$('#latitude, #longitude').prop('required',true);
		else $('#latitude, #longitude').prop('required',false);
	};

	// controlla la validità della descrizione description
	var validateDescription = function( description ) {
		if( description.length > 0 ) return null;
		else return "compilare il campo descrizione";
	};

	// aggiorna la lista dei dati testuali
	var updateTextualData = function( event, empty ) {
		event.preventDefault();
		event.stopPropagation();
		var options = getData.call(this);
		if( options ) {	
			if( typeof empty == "undefined" ) options.step._textualData.push({});
			else if( empty && !options.step._textualData.length ) options.step._textualData = null;
			if( !$('#imageDataList').parent().is(':visible') ) options.step._imageData = null;
			if( !$('#numericDataList').parent().is(':visible') ) options.step._numericData = null;
			this.render( options );
		}
	};

	// aggiorna la lista dei dati di tipo immagine
	var updateImageData = function( event, empty ) {
		event.preventDefault();
		event.stopPropagation();
		var options = getData.call(this);
		if( options ) {
			if( typeof empty == "undefined" ) options.step._imageData.push({});
			else if( empty && !options.step._imageData.length ) options.step._imageData = null;
			if( !$('#textualDataList').parent().is(':visible') ) options.step._textualData = null;
			if( !$('#numericDataList').parent().is(':visible') ) options.step._numericData = null;
			this.render( options );
		}
	};

	// aggiorna la lista dei dati numerici
	var updateNumericData = function( event, empty ) {
		event.preventDefault();
		event.stopPropagation();
		var options = getData.call(this);
		if( options ) {
			if( typeof empty == "undefined" ) options.step._numericData.push({});
			else if( empty && !options.step._numericData.length ) options.step._numericData = null;
			if( !$('#textualDataList').parent().is(':visible') ) options.step._textualData = null;
			if( !$('#imageDataList').parent().is(':visible') ) options.step._imageData = null;
			this.render( options );
		}
	};

	// rimuove il dato selezionato
	var deleteData = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		var target = $(event.target).closest(".data-item");
		var hasSiblings = Boolean( $(target).siblings(".data-item").length );
		var textual = Boolean( $(target).find('.textualData').length );
		var numeric = Boolean( $(target).find('.numericData').length );
		var image = Boolean( $(target).find('.imageData').length );
		$(target).find('input').first().val("");
		if( textual ) updateTextualData.call( this, event, !hasSiblings );
		else if( numeric ) updateNumericData.call( this, event, !hasSiblings );
		else if( image ) updateImageData.call( this, event, !hasSiblings );
	};

	// restituisce i dati e i vincoli inseriti dall'utente relativi al passo in creazione
	var getData = function() {
		var blockId = Number( $('#addStepForm').attr('data-block') );
		var stepId = Number( $('#addStepForm').attr('data-step') );
		var block = _.findWhere( this.blocks, { id: blockId } );;
		var step = _.findWhere( block.steps, { id: stepId } );
		step._description = $("#processDescription").val().trim();
		step._requiresApproval = $("#requiresApproval").is(":checked");
		step._optional = $("#optional").is(":checked");
		step._geographicData = getGeographicData();
		var index = 1;
		step._textualData = getTextualData( index );
		index += step._textualData.length;
		step._imageData = getImageData( index );
		index += step._imageData.length;
		step._numericData = getNumericData( index );
		var options = { blockId: blockId, step: step };
		return options;
	};

	// restituisce vincoli geografici inseriti dall'utente
	var getGeographicData = function() {
		var geographicData = null;
		if( $('#geographicDataCheck').is(":checked") ) {
			var latitude = $("#latitude").val().trim();
			latitude = latitude.match(/^(\+|-)?\d+(.\d+)?$/) ? latitude : null;
			var longitude = $("#longitude").val().trim();
			longitude = longitude.match(/^(\+|-)?\d+(.\d+)?$/) ? longitude : null;
			var radius = $("#radius").val().trim();
			radius = radius.match(/^(\+|-)?\d+(.\d+)?$/) ? radius : null;
			if( latitude && longitude )
				geographicData = { latitude: latitude, longitude: longitude, radius: radius, altitude: 0 };
		}
		return geographicData;
	};

	// restituisce la lista dei dati testuali inseriti dall'utente
	var getTextualData = function( index ) {
		var textualData = [];
		$("#textualDataList .textualData").each(function( i, element ) {
			var description = $(element).find('input').val().trim();
			if( description ) textualData.push({ id: index+i, description: description });
		});
		return textualData;
	};

	// restituisce la lista dei dati di tipo immagine inseriti dall'utente
	var getImageData = function( index ) {
		var imageData = [];
		$("#imageDataList .imageData").each(function( i, element ) {
			var description = $(element).find('input').val().trim();
			if( description ) imageData.push({ id: index+i, description: description });
		});
		return imageData;
	};

	// restituisce la lista dei dati numerici inseriti dall'utente
	var getNumericData = function( index ) {
		var numericData = [];
		$("#numericDataList .numericData").each(function( i, element ) {
			var options = { id: index+i };
			options.description = $(element).find('input').first().val().trim();
			if( options.description ) {
				options.isDecimal = $(element).find('[id^="isDecimal"]').is(":checked");
				options.minValue = null;
				if( $(element).find('[id^="minValueCheck"]').is(":checked") ) {
					var minValue = $(element).find('[id|="minValue"]').val().trim();
					if( minValue.match(/^(\+|-)?\d{1,9}$/) ) options.minValue = Number(minValue);
				}
				options.maxValue = null;
				if( $(element).find('[id^="maxValueCheck"]').is(":checked") ) {
					var maxValue = $(element).find('[id|="maxValue"]').val().trim();
					if( maxValue.match(/^(\+|-)?\d{1,9}$/) ) options.maxValue = Number(maxValue);
				}
				numericData.push( options );
			}
		});
		return numericData;
	};

	// annulla la modifica/creazione del passo
	var cancelStep = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		var blockId = Number( $('#addStepForm').attr('data-block') );
		var stepId = Number( $('#addStepForm').attr('data-step') );
		var block = _.findWhere( this.blocks, { id: blockId } );
		if( block ) {
			var step = _.findWhere( block.steps, { id: stepId } );
			if ( step ) {
				delete step["_textualData"];
				delete step["_imageData"];
				delete step["_numericData"];
			}
		}
		this.trigger("updated");
	};

	// salva il passo se i dati inseriti dall'utente rispettano i vincoli
	var saveStep = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		var options = getData.call(this);
		if( options ) {
			var block = _.findWhere( this.blocks, { id: options.blockId } );
			var step = options.step;
			var error = null;
			if( !step._geographicData && !step._textualData.length && !step._imageData.length && !step._numericData.length ) {
				error = "Il passo deve contenere almeno un dato o un vincolo geografico.";
			}
			if(!error) error = validateDescription( step._description );
			if( !error ) {
				step.description = step._description;
				delete step._description;
				step.requiresApproval = step._requiresApproval;
				delete step._requiresApproval;
				step.optional = step._optional;
				delete step._optional;
				step.geographicData = step._geographicData;
				delete step._geographicData;
				step.textualData = step._textualData;
				delete step._textualData;
				step.imageData = step._imageData;
				delete step._imageData;
				step.numericData = step._numericData;
				delete step._numericData;
				step.processId = 1;
				if( step.id == 0 ) {
					var newStep = _.clone(step);
					block.steps.splice( block.steps.indexOf( step ), 1 );
					var maxStepId = 0;
					for(var i=0; i<block.steps.length; i++) {
						if( block.steps[i].id > maxStepId )
							maxStepId = block.steps[i].id;
					}
					newStep.id = maxStepId+1;
					block.steps.push( newStep );
				}
				this.trigger("updated");
			}
			else printMessage("Errore",error);
		}
	};

	// PUBLIC

	var AddStep = BasePresenter.extend({

		session: null,
		blocks: null,

		// Constructor
		initialize: function( options ) {
			_.extend(this.events, BasePresenter.prototype.events);
			this.session = options.session;
			this.blocks = options.blocks;
		},

		template: _.template(addStepTemplate),

		id: '#newprocess',

		el: $('body'),

		events: {
			'click .back': cancelStep,
			'change #addStepForm .checkButton': showInput,
			'change #geographicDataCheck': changeConstraints,
			'click #addTextualData': updateTextualData,
			'click #addNumericData': updateNumericData,
			'click #addImageData': updateImageData,
			'click #addStepForm .delete-data': deleteData,
			'click #cancelStep ': cancelStep,
			'submit #addStepForm': saveStep,
		},

		render: function( options ) {
			// template rendering and JQM css enhance
			$(this.id).html(this.template({
				blockId: options.blockId,
				username: this.session.getUsername(),
				step: options.step
			})).enhanceWithin();
		},

		// gestisce la richiesta di creazione/modifica di un passo
		update: function( blockId, stepId ) {	
			var options = { blockId: blockId };
			var block = _.findWhere( this.blocks, { id: blockId } );
			if( block ) {
				if( stepId ) {
					var step = _.findWhere( block.steps, { id: stepId } );
					if( !step ) this.trigger("updated");
					else {
						if( !step.textualData.length ) step.textualData = null;
						if( !step.imageData.length ) step.imageData = null;
						if( !step.numericData.length ) step.numericData = null;
					}
				}
				else {
					var step = _.findWhere( block.steps, { id: 0 } );
					if( !step ) {
						block.steps.push({ id: 0 });
						step = _.findWhere( block.steps, { id: 0 } )
					}
				}
				options["step"] = step ? step : null;
				this.render( options );
			}
			else this.trigger("updated");
		}

	});

	return AddStep;

});
