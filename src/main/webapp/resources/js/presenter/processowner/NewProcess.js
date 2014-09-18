/*!
* \File: NewProcess.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-08-31
* \Class: NewProcess
* \Package: com.sirius.sequenziatore.client.presenter.processowner
* \Brief: Gestione della creazione di un processo
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'model/processowner/ProcessModel',
 'presenter/processowner/AddStep',
 'text!view/processowner/newProcessTemplate.html',
 'jquerymobile',
 'jquerytouch'
], function( $, _, Backbone, BasePresenter, ProcessModel, AddStep, newProcessTemplate ) {

	// PRIVATE

	// ritorna il paramentro get con nome "param" se presente nella url, altrimenti ritorna false
	var getParam = function( param ) {
		var hash = window.location.hash;
		var expression = new RegExp("#newprocess\\?(\\w+=\\w+&)*("+param+"=(\\d{1,11}))|("+param+"=(\\w{1,20}))");
		var result = expression.exec(hash);
		return result ? ( Number(result[3]) || result[5]  ) : false;
	};

	// apre un popup con titolo "title" e contenuto "content"
	var printMessage = function( title, content ) {
		$("#newprocess .alertPanel h3").text( title );
		$("#newprocess .alertPanel p").text( content );
		$("#newprocess .alertPanel").popup("open");
	};

	// controlla la data e ritorna true o un eventuale stringa di descrizione dell'errore
	var validateDate = function( dateInput, resultDate ) {
		var date = null;
		var matches = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec( dateInput );
		if( matches ) {
			var day = matches[1];
			var month = matches[2] - 1;
			var year = matches[3];
			date = new Date( year, month, day );
		}
		else {
			var matches = /^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/.exec( dateInput );
			if( matches ) {
				var day = matches[3];
				var month = matches[2] - 1;
				var year = matches[1];
				date = new Date( year, month, day );
			}
		}
		if( date ) {
			if( date.getDate() == day && date.getMonth() == month && date.getFullYear() == year ) {
				resultDate.setTime( date.getTime() );
				return null;
			}
			else return "Data non valida";
		}
		else return "Inserire la data nel formato gg/mm/aaaa o aaaa-mm-gg";
	};

	// controlla l'ora e ritorna true o un eventuale stringa di descrizione dell'errore
	var validateTime = function( timeInput, date ) {
		var error = null;
		if( timeInput.length > 0 ) {
			var matches = /^([0-1]?[0-9]|2[0-3])(:([0-5]?[0-9]))(:([0-5]?[0-9]))?/.exec( timeInput );
			if( !matches ) error = "Inserire l'orario nel formato hh:mm o hh:mm:ss";
			else {
				date.setHours( matches[1], matches[3] );
				if( matches[5] ) date.setSeconds( matches[5] );
			}
		}
		var currentDate = new Date();
		if( !error && date <= currentDate ) error = "La data di terminazione deve essere maggiore della data corrente";
		return error;
	};

	// controlla il testo in input e ritorna true o un eventuale stringa di descrizione dell'errore
	var validateDescription = function( description ) {
		if( description && description.length > 0 ) return null;
		else return "compilare il campo descrizione";
	};

	var validateImage = function( imageFile ) {
		if( imageFile.size > 1048576 ) return "La dimensione dell'immagine deve essere inferione a 1MB";
		else return null;
	};

	// salva le opzioni sui blocchi impostate dall'utente
	var saveOptions = function() {
		var self = this;
		$(".unordered-block").each( function( i, element ) {
			if( $(element).find('.requiredStepCheck').is(':checked') ) {	
				var requiredSteps = Number( $(element).find('.requiredStep').val().trim() );
				var blockNumber = $(element).prevAll(".sequential-block, .unordered-block").length;
				var block = self.blocks[blockNumber];
				if( block ) {
					if( requiredSteps > block.steps.length || requiredSteps < 1 ) {
						block.requiredSteps = null;
					}
					else block.requiredSteps = requiredSteps ? requiredSteps : null;
				}
			}
		});
	};

	// visualizza il pannello di help relativo all'aggiunta di blocchi
	var printBlocksHelp = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		$("#blocksHelp").popup("open");
	};

	// mostra e rende obbligatori i campi dati selezionati
	var showInput = function(event) {
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
	
	// getione dell'evento di cambio tab
	var changeTab = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		saveOptions.call(this);
		var target =  $(event.target).attr("href");
		this.currentTab = target.substring(1);
		$(".tab, .mainTab").hide();
		$(target).show();
		$(".tabButton.ui-btn-active").removeClass("ui-btn-active");
		$(event.target).addClass("ui-btn-active");
	};

	// delega la gestione della creazione di un nuovo passo alla classe AddStep
	var addStep = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		saveOptions.call(this);
		var targetBlock =  $(event.target).closest(".sequential-block, .unordered-block");
		var blockNumber = targetBlock.prevAll(".sequential-block, .unordered-block").length;
		var blockId = this.blocks[blockNumber].id;
		this.addStepLogic.update( blockId );
	};
	
	// delega la gestione della modifica di un passo alla classe AddStep
	var editStep = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		saveOptions.call(this);
		var targetBlock =  $(event.target).closest(".sequential-block, .unordered-block");
		var blockNumber = targetBlock.prevAll(".sequential-block, .unordered-block").length;
		var blockId = this.blocks[blockNumber].id;
		var targetStep = $(event.target).closest("li");
		var stepNumber = targetStep.prevAll("li").length;
		var stepId = this.blocks[blockNumber].steps[stepNumber].id;
		this.addStepLogic.update( blockId, stepId );
	};

	// gestisce lo spostamento di un blocco ad un livello superiore
	var ascendBlock = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		var target =  $(event.target).closest(".sequential-block, .unordered-block");
		var sibiling = target.prev(".sequential-block, .unordered-block");
		if( sibiling.length != 0 ) {
			var blockNumber = target.prevAll(".sequential-block, .unordered-block").length;
			var block = this.blocks[blockNumber];
			this.blocks[blockNumber] = this.blocks[blockNumber-1];
			this.blocks[blockNumber-1] = block;
			target.after( sibiling );
		}
	};

	// gestisce lo spostamento di un blocco ad un livello inferiore
	var descendBlock = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		saveOptions.call(this);
		var target =  $(event.target).closest(".sequential-block, .unordered-block");
		var sibiling = target.next(".sequential-block, .unordered-block");
		if( sibiling.length != 0 ) {
			var blockNumber = target.prevAll(".sequential-block, .unordered-block").length;
			var block = this.blocks[blockNumber];
			this.blocks[blockNumber] = this.blocks[blockNumber+1];
			this.blocks[blockNumber+1] = block;
			sibiling.after( target );
		}
	};

	// aggiunge un blocco non ordinato
	var addUnorderedBlock = function( event ) {
		var maxBlockId = 0;
		for(var i=0; i<this.blocks.length; i++) {
			if( this.blocks[i].id > maxBlockId )
				maxBlockId = this.blocks[i].id;
		}
		var blockId = maxBlockId+1;
		this.blocks.push({ id: blockId, type: "UNORDERED", steps: [] });
		this.render();
	};

	// aggiunge un blocco sequenziale
	var addSequentialBlock = function( event ) {
		var maxBlockId = 0;
		for(var i=0; i<this.blocks.length; i++) {
			if( this.blocks[i].id > maxBlockId )
				maxBlockId = this.blocks[i].id;
		}
		var blockId = maxBlockId+1;
		this.blocks.push({ id: blockId, type: "SEQUENTIAL", steps: [] });
		this.render();
	};

	// rimuove il blocco selezionato
	var deleteBlock = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		var target =  $(event.target).closest(".sequential-block, .unordered-block");
		var blockNumber = target.prevAll(".sequential-block, .unordered-block").length;
		this.blocks.splice( blockNumber, 1 );
		/*target.remove();*/
		this.render();
	};

	// rimuove il passo selezionato
	var removeStep = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		var targetBlock =  $(event.target).closest(".sequential-block, .unordered-block");
		var blockNumber = targetBlock.prevAll(".sequential-block, .unordered-block").length;
		var targetStep = $(event.target).closest("li");
		var stepNumber = targetStep.prevAll("li").length;
		this.blocks[blockNumber].steps.splice( stepNumber, 1 );
		this.render();
	};

	// gestione del cambio dell'ordine dei passi di un blocco sequenziale
	var sortBlock = function( event, ui ) {
		var targetBlock =  $(event.target).closest(".sequential-block, .unordered-block");
		var blockNumber = targetBlock.prevAll(".sequential-block, .unordered-block").length;
		var fromStepNumber = Number( $(".sortable").attr('data-previndex') );
		var toStepNumber = ui.item.index();
		var step = this.blocks[blockNumber].steps[fromStepNumber];
		if( toStepNumber > fromStepNumber ) {
			for(var i=fromStepNumber; i<toStepNumber; i++)
				this.blocks[blockNumber].steps[i] = this.blocks[blockNumber].steps[i+1];
		}
		else for(var i=fromStepNumber; i>toStepNumber; i--) {
			this.blocks[blockNumber].steps[i] = this.blocks[blockNumber].steps[i-1];
		}
		this.blocks[blockNumber].steps[toStepNumber] = step;
	};

	// salva la descrizione del processo in creazione
	var saveDescription = function( event ) {

		event.preventDefault();
		event.stopPropagation();
		
		var description = $("#processDescription").val().trim();
		var error = validateDescription( description );

		if( !error && $("#dateOfTerminationCheck").is(":checked") ) {
			var date = new Date();
			error = validateDate( $("#dateOfTermination").val().trim(), date );
			if( !error ) error = validateTime( $("#timeOfTermination").val().trim(), date );
		}
		else var date = null;

		if( !error && $("#completionsMaxCheck").is(":checked") ) {
			var completionsMax = $("#completionsMax").val();
		}
		else var completionsMax = 0;

		if( $("#image")[0].files.length > 0 ) {
			var imageFile = $("#image").get(0).files[0];
			error = validateImage( imageFile );
		}
		else if( this.process.get("imageFile") ) var imageFile = this.process.get("imageFile");
		else var imageFile = null;
		
		if( imageFile ) {
			var imageUrl = imageFile.name;
			var fileName = imageUrl.substring(0, imageUrl.lastIndexOf('.'));
		}

		if( error ) printMessage("Errore",error );
		else {
			this.process.set({
				name: $("#processName").val().trim().replace(/ +/g, " "),
				description: description,
				completionsMax: completionsMax,
				dateOfTermination: date,
				terminated: false,
				eliminated: false,
				imageUrl: imageFile ? fileName : null,
				imageFile: imageFile
			});
			this.currentTab = "blocksTab";
			this.render();
		}

	};

	// annulla le modifiche alla descrizione del processo in creazione
	var cancelDescription = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		this.currentTab = "blocksTab";
		this.render();
	};

	// rimuove i dati temporanei del blocco e imposta i valori di default
	var parseBlock = function( block ) {
		var _step = _.findWhere( block.steps, { id: 0 } );
		if( _step ) block.steps.splice( block.steps.indexOf( _step ), 1 );
		block.requiredSteps = block.requiredSteps ? block.requiredSteps : block.steps.length;
		for(var i=0; i<block.steps.length; i++) {
			var step = block.steps[i];
			step.first = false;
			step.nextStepId = typeof block.steps[i+1] !== "undefined" ? block.steps[i+1].id : 0;
			if( block.steps[i].requiredPosition ) {
				var radius = block.steps[i].requiredPosition.radius;
				block.steps[i].requiredPosition.radius = radius ? radius : 0;
			}
			delete step["_description"];
			delete step["_requiresApproval"];
			delete step["_optional"];
			delete step["_requiredPosition"];
			delete step["_textualData"];
			delete step["_numericData"];
			delete step["_imageData"];
			_.forEach( block.steps[i].numericData, function( data ) {
				data.maxValue = data.maxValue ? data.maxValue : 999999999;
				data.minValue = data.minValue ? data.minValue : -999999999;
			});
		}
		if( block.steps.length ) block.steps[0].first = true;
	};

	// salva il processo creato
	var saveProcess = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		saveOptions.call(this);
		if( this.process.get("name") ) {
			var noSteps = true;
			var processBlocks = [];
			for(var i=0; i<this.blocks.length; i++) {
				parseBlock( this.blocks[i] );
				if( this.blocks[i].steps.length ) {
					noSteps = false;
					processBlocks.push( this.blocks[i] );
				}
			}
			if( !this.blocks.length ) printMessage("Errore","Il processo deve contenere almeno un blocco.");
			else if( noSteps ) printMessage("Errore","Il processo deve contenere almeno un passo.");
			else {
				for(var i=0; i<processBlocks.length; i++) {
					processBlocks[i].nextBlockId = typeof processBlocks[i+1] !== "undefined" ? processBlocks[i+1].id : 0;
					processBlocks[0].first = false;
				}
				processBlocks[0].first = true;
				var file = _.clone( this.process.get("imageFile") );
				var options = { blocks: processBlocks, image: null };
				if( file ) {
					var formData = new FormData();
					formData.append("image", file);
					options.image = formData;
				}
				var self = this;
				//this.process.saveImage( options ).done( function() {
				self.process.unset("imageFile", { silent: true });
				self.process.save(null, options).done( function() {
					printMessage("Azione eseguita","Salvataggio processo avvenuto con successo.");
					self.process.clear({ silent: true });
					self.blocks.splice( 0, self.blocks.length );
					$("#newprocess .alertPanel").on( "popupafterclose", function() {
						self.render();
						window.location.assign("#home");
					});
				}).fail( function(error) {
					if( options.image ) self.process.set({ imageFile: options.image });
					printMessage("Errore","Errore nella comunicazione con il server.");
				});
				//}).fail( function() {
				//	printMessage("Errore","Errore nell'invio dell'imagine del processo.");
				//});
			}
		}
		else printMessage("Errore","La descrizione del processo non è stata ancora compilata.");
	};

	
	var cancelProcess = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		this.process.clear({ silent: true });
		this.blocks = [];
		this.render();
		window.location.assign('#home');
	};

	// PUBLIC

	var NewProcess = BasePresenter.extend({

		process: new ProcessModel({ id: 1 }),
		addStepLogic: null,
		blocks: [],

		// constructor
		initialize: function( options ) {
			BasePresenter.prototype.initialize.apply(this, options);
			BasePresenter.prototype.createPage.call(this, "newprocess");
			_.extend(this.events, BasePresenter.prototype.events);
			this.session = options.session;
			this.addStepLogic = new AddStep({ session: options.session, blocks: this.blocks });
			// rilancia l'evento "updated" della sub-view "addStepLogic"
			var self = this;
			this.listenTo( this.addStepLogic, "updated", this.render);
		},

		template: _.template(newProcessTemplate),
		
		id: '#newprocess',

		el: $('body'),

		events: {
			'click .tabButton': changeTab,
			'click .uparrow': ascendBlock,
			'click .downarrow': descendBlock,
			'click #addUnorderedBlock': addUnorderedBlock,
			'click #addSequentialBlock': addSequentialBlock,
			'click .delete-block': deleteBlock,
			'change #blocksTab .checkButton': showInput,
			'change #descriptionTab .checkButton': showInput,
			'click .delete-item': removeStep,
			'update .sortable': sortBlock,
			'click .helpButton': printBlocksHelp,
			'click .add-item': addStep,
			'click .block-item': editStep,
			'submit #descriptionForm': saveDescription,
			'click #cancelDescription': cancelDescription,
			'submit #blocksForm': saveProcess,
			'click #cancelProcess': cancelProcess
		},

		render: function() {
			// salva le modifiche alle opzioni sui blocchi
			if( blocks && blocks.length ) saveOptions.call(this);
			// template rendering and JQM css enhance
			$(this.id).html(this.template({
				username: this.session.getUsername(),
				process: this.process.toJSON(),
				blocks: this.blocks
			})).enhanceWithin();

			var self = this;
			$( ".sortable" ).sortable({
				start: function(event, ui) { $(this).attr('data-previndex', ui.item.index()); },
				update: function(event, ui) { sortBlock.call(self, event, ui); }
			});
			$( ".sortable" ).disableSelection();

			// imposta la tab/scheda corrente
			if( typeof this.currentTab != "undefined" && this.currentTab != $(".mainTab").attr("id") )
				$(".tabButton[href=#"+this.currentTab+"]").click();
		}

	});

	return NewProcess;

});
