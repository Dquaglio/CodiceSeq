define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'model/processowner/ProcessModel',
 'text!view/processowner/newProcessTemplate.html',
 'jquerymobile',
 'jquerytouch'
], function( $, _, Backbone, BasePresenter, ProcessModel, newProcessTemplate ) {

	// apre un popup con titolo "title" e contenuto "content"
	var printMessage = function( title, content ) {
		$("#newprocess .alertPanel h3").text( title );
		$("#newprocess .alertPanel p").text( content );
		$("#newprocess .alertPanel").popup("open");
	};

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

	var validateDescription = function( description ) {
		if( description.length > 0 ) return null;
		else return "compilare il campo descrizione";
	};

	var validateImage = function( imageFile ) {
		if( imageFile.size > 1048576 ) return "La dimensione dell'immagine deve essere inferione a 1MB";
		else return null;
	};

	var printBlocksHelp = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		$("#blocksHelp").popup("open");
	};

	var NewProcess = BasePresenter.extend({

		process: new ProcessModel({ id: 1 }),

		blocks: [],

		// constructor
		initialize: function( options ) {
			BasePresenter.prototype.initialize.apply(this, options);
			BasePresenter.prototype.createPage.call(this, "newprocess");
			_.extend(this.events, BasePresenter.prototype.events);
			this.session = options.session;
		},

		template: _.template(newProcessTemplate),
		
		id: '#newprocess',

		el: $('body'),

		events: {
			'click .tabButton': 'changeTab',
			'click .uparrow': 'ascendBlock',
			'click .downarrow': 'descendBlock',
			'click #addUnorderedBlock': 'addUnorderedBlock',
			'click #addSequentialBlock': 'addSequentialBlock',
			'click .delete-block': 'deleteBlock',
			'change #blocksTab .checkButton': 'enableInput',
			'change #descriptionTab .checkButton': 'showInput',
			'click .add-item': 'addStep',
			'click .delete-item': 'removeStep',
			'update .sortable': 'sortBlock',
			'submit #descriptionForm': 'saveDescription',
			'click #cancelDescription': 'cancelDescription',
			'click .helpButton': printBlocksHelp,
		},

		render: function() {
			// template rendering and JQM css enhance
			$(this.id).html(this.template({
				username: this.session.getUsername(),
				process: this.process.toJSON(),
				blocks: this.blocks
			})).enhanceWithin();

			var self = this;
			$( ".sortable" ).sortable({
				start: function(event, ui) { $(this).attr('data-previndex', ui.item.index()); },
				update: function(event, ui) { self.sortBlock(event, ui); }
			});
			$( ".sortable" ).disableSelection();

			// imposta la tab/scheda corrente
			if( typeof this.currentTab != "undefined" && this.currentTab != $(".mainTab").attr("id") )
				$(".tabButton[href=#"+this.currentTab+"]").click();
		},

		// getione dell'evento di cambio tab
		changeTab: function( event ) {
			event.preventDefault();
			event.stopPropagation();
			var target =  $(event.target).attr("href");
			this.currentTab = target.substring(1);
			$(".tab, .mainTab").hide();
			$(target).show();
			$(".tabButton.ui-btn-active").removeClass("ui-btn-active");
			$(event.target).addClass("ui-btn-active");
		},

		ascendBlock: function( event ) {
			event.preventDefault();
			event.stopPropagation();
			var target =  $(event.target).closest(".sequential-block, .unordered-block");
			var sibiling = target.prev(".sequential-block, .unordered-block");
			if( sibiling.length != 0 ) {
				var blockId = target.prevAll(".sequential-block, .unordered-block").length;
				var block = this.blocks[blockId];
				this.blocks[blockId] = this.blocks[blockId-1];
				this.blocks[blockId-1] = block;
				target.after( sibiling );
			}
		},

		showInput: function(event) {
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
		},

		enableInput: function( event ) {
			var div = $(event.target).parent().next(".requiredStep");
			var disabled = div.attr("disabled");
			div.attr("disabled", !disabled );
		},

		descendBlock: function( event ) {
			event.preventDefault();
			event.stopPropagation();
			var target =  $(event.target).closest(".sequential-block, .unordered-block");
			var sibiling = target.next(".sequential-block, .unordered-block");
			if( sibiling.length != 0 ) {
				var blockId = target.prevAll(".sequential-block, .unordered-block").length;
				var block = this.blocks[blockId];
				this.blocks[blockId] = this.blocks[blockId+1];
				this.blocks[blockId+1] = block;
				sibiling.after( target );
			}
		},

		addUnorderedBlock: function( event ) {
			this.blocks.push({ type: "unordered", steps: [] });
			this.render();
		},

		addSequentialBlock: function( event ) {
			this.blocks.push({ type: "sequential", steps: [] });
			this.render();
		},

		deleteBlock: function( event ) {
			event.preventDefault();
			event.stopPropagation();
			var target =  $(event.target).closest(".sequential-block, .unordered-block");
			var blockId = target.prevAll(".sequential-block, .unordered-block").length;
			this.blocks.splice( blockId, 1 );
			/*target.remove();*/
			this.render();
		},

		addStep: function( event ) {
			event.preventDefault();
			event.stopPropagation();
			var target =  $(event.target).closest(".sequential-block, .unordered-block");
			var blockId = target.prevAll(".sequential-block, .unordered-block").length;
			this.addStepLogic.newStep( this.blocks[blockId].steps );
			/*
			var maxStepId = 0;
			for(var i=0; i<this.blocks[blockId].steps.length; i++) {
				if( this.blocks[blockId].steps[i].id > maxStepId )
					maxStepId = this.blocks[blockId].steps[i].id;
			}
			var stepId = maxStepId+1;
			this.blocks[blockId].steps.push({ id: stepId, description: "step "+stepId });
			this.render();
			*/
		},

		removeStep: function( event ) {
			event.preventDefault();
			event.stopPropagation();
			var targetBlock =  $(event.target).closest(".sequential-block, .unordered-block");
			var blockId = targetBlock.prevAll(".sequential-block, .unordered-block").length;
			var targetStep = $(event.target).closest("li");
			var stepId = targetStep.prevAll("li").length;
			this.blocks[blockId].steps.splice( stepId, 1 );
			this.render();
		},

		sortBlock: function( event, ui ) {
			var targetBlock =  $(event.target).closest(".sequential-block, .unordered-block");
			var blockId = targetBlock.prevAll(".sequential-block, .unordered-block").length;
			var fromStepId = Number( $(".sortable").attr('data-previndex') );
			var toStepId = ui.item.index();
			var step = this.blocks[blockId].steps[fromStepId];
			if( toStepId > fromStepId ) {
				for(var i=fromStepId; i<toStepId; i++)
					this.blocks[blockId].steps[i] = this.blocks[blockId].steps[i+1];
			}
			else for(var i=fromStepId; i>toStepId; i--) {
				this.blocks[blockId].steps[i] = this.blocks[blockId].steps[i-1];
			}
			this.blocks[blockId].steps[toStepId] = step;
		},

		saveDescription: function(event) {

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
				var imageFile = $("#image")[0].files[0];
				error = validateImage( imageFile );
			}
			else if( this.process.imageFile ) var imageFile = this.process.imageFile;
			else var imageFile = null;

			if( error ) printMessage("Errore",error );
			else {
				this.process.set({
					name: $("#processName").val().trim().replace(/ +/g, " "),
					description: description,
					completionsMax: completionsMax,
					dateOfTermination: date,
					terminated: false,
					eliminated: false,
					imageUrl: imageFile ? imageFile.name : null,
					imageFile: imageFile
				});
				this.currentTab = "blocksTab";
				this.render();
			}

		},

		cancelDescription: function(event) {
			event.preventDefault();
			event.stopPropagation();
			this.currentTab = "blocksTab";
			this.render();
		}

	});

	return NewProcess;

});
