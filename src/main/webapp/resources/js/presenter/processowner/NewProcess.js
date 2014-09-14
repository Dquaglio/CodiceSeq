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

	var enableInput = function( event ) {
		var div = $(event.target).parent().next(".requiredStep");
		var disabled = div.attr("disabled");
		div.attr("disabled", !disabled );
	};
	
	// getione dell'evento di cambio tab
	var changeTab = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		var target =  $(event.target).attr("href");
		this.currentTab = target.substring(1);
		$(".tab, .mainTab").hide();
		$(target).show();
		$(".tabButton.ui-btn-active").removeClass("ui-btn-active");
		$(event.target).addClass("ui-btn-active");
	};

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
			this.listenTo( this.addStepLogic, "updated", function() {
				self.trigger("updated");
			});
		},

		template: _.template(newProcessTemplate),
		
		id: '#newprocess',

		el: $('body'),

		events: {
			'click .tabButton': changeTab,
			'click .uparrow': 'ascendBlock',
			'click .downarrow': 'descendBlock',
			'click #addUnorderedBlock': 'addUnorderedBlock',
			'click #addSequentialBlock': 'addSequentialBlock',
			'click .delete-block': 'deleteBlock',
			'change #blocksTab .checkButton': enableInput,
			'change #descriptionTab .checkButton': showInput,
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

		update: function() {
			if( getParam("block") ) {
				this.addStepLogic.update( getParam("block"), getParam("step") );
			}
			else {
				this.render();
				this.trigger("updated");
			}
		},

		ascendBlock: function( event ) {
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
		},

		descendBlock: function( event ) {
			event.preventDefault();
			event.stopPropagation();
			var target =  $(event.target).closest(".sequential-block, .unordered-block");
			var sibiling = target.next(".sequential-block, .unordered-block");
			if( sibiling.length != 0 ) {
				var blockNumber = target.prevAll(".sequential-block, .unordered-block").length;
				var block = this.blocks[blockNumber];
				this.blocks[blockNumber] = this.blocks[blockNumber+1];
				this.blocks[blockNumber+1] = block;
				sibiling.after( target );
			}
		},

		addUnorderedBlock: function( event ) {
			var maxBlockId = 0;
			for(var i=0; i<this.blocks.length; i++) {
				if( this.blocks[i].id > maxBlockId )
					maxBlockId = this.blocks[i].id;
			}
			var blockId = maxBlockId+1;
			this.blocks.push({ id: blockId, type: "unordered", steps: [] });
			this.render();
		},

		addSequentialBlock: function( event ) {
			var maxBlockId = 0;
			for(var i=0; i<this.blocks.length; i++) {
				if( this.blocks[i].id > maxBlockId )
					maxBlockId = this.blocks[i].id;
			}
			var blockId = maxBlockId+1;
			this.blocks.push({ id: blockId, type: "sequential", steps: [] });
			this.render();
		},

		deleteBlock: function( event ) {
			event.preventDefault();
			event.stopPropagation();
			var target =  $(event.target).closest(".sequential-block, .unordered-block");
			var blockNumber = target.prevAll(".sequential-block, .unordered-block").length;
			this.blocks.splice( blockNumber, 1 );
			/*target.remove();*/
			this.render();
		},

		removeStep: function( event ) {
			event.preventDefault();
			event.stopPropagation();
			var targetBlock =  $(event.target).closest(".sequential-block, .unordered-block");
			var blockNumber = targetBlock.prevAll(".sequential-block, .unordered-block").length;
			var targetStep = $(event.target).closest("li");
			var stepNumber = targetStep.prevAll("li").length;
			this.blocks[blockNumber].steps.splice( stepNumber, 1 );
			this.render();
		},

		sortBlock: function( event, ui ) {
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
