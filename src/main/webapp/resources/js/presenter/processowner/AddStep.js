define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/processowner/addStepTemplate.html',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, addStepTemplate ) {

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

	var addTextualData = function( event, empty ) {
		event.preventDefault();
		event.stopPropagation();
		var empty = typeof empty !== "undefined" ? empty : false;
		var self = this;
		var blockId = Number( $('#addStepForm').attr('data-block') );
		var stepId = Number( $('#addStepForm').attr('data-step') );
		var block = _.findWhere( self.blocks, { id: blockId } );
		if( !block ) {} // block error;
		else {
			var step = _.findWhere( block.steps, { id: stepId } );
			if ( !step ) {} // step error;
			else {
				var data = [];
				$("#textualDataList .textualData").each(function( index, element ) {
					var description = $(element).find('input').val().trim();
					if( description ) data.push({ id: index, description: description });
				});
				if( empty ) step["_textualData"] = data.length ? data : null;
				else step["_textualData"] = data;
				this.render({ blockId: blockId, step: step });
			}
		}
	};

	var addImageData = function( event, empty ) {
		event.preventDefault();
		event.stopPropagation();
		var empty = typeof empty !== "undefined" ? empty : false;
		var self = this;
		var blockId = Number( $('#addStepForm').attr('data-block') );
		var stepId = Number( $('#addStepForm').attr('data-step') );
		var block = _.findWhere( self.blocks, { id: blockId } );
		if( !block ) {} // block error;
		else {
			var step = _.findWhere( block.steps, { id: stepId } );
			if ( !step ) {} // step error;
			else {
				var data = [];
				$("#imageDataList .imageData").each(function( index, element ) {
					var description = $(element).find('input').val().trim();
					if( description ) data.push({ id: index, description: description });
				});
				if( empty ) step["_imageData"] = data.length ? data : null;
				else step["_imageData"] = data;
				this.render({ blockId: blockId, step: step });
			}
		}
	};

	var addNumericData = function( event, empty ) {
		event.preventDefault();
		event.stopPropagation();
		var empty = typeof empty !== "undefined" ? empty : false;
		var self = this;
		var blockId = Number( $('#addStepForm').attr('data-block') );
		var stepId = Number( $('#addStepForm').attr('data-step') );
		var block = _.findWhere( self.blocks, { id: blockId } );
		if( !block ) {} // block error;
		else {
			var step = _.findWhere( block.steps, { id: stepId } );
			if ( !step ) {} // step error;
			else {
				var data = [];
				$("#numericDataList .numericData").each(function( index, element ) {
					var options = { id: index };
					options.description = $(element).find('input').first().val().trim();
					options.isDecimal = false;
					options.minValue = null;
					options.maxValue = null;
					if( options.description ) {
						if( $(element).find('[id^="isDecimal"]').is(":checked") ) options.isDecimal = true;
						if( $(element).find('[id^="minValueCheck"]').is(":checked") ) {
							var minValue = $(element).find('[id|="minValue"]').val().trim();
							if( minValue.match(/^(\+|-)?\d{1,9}$/) ) options.minValue = Number(minValue);
						}
						if( $(element).find('[id^="maxValueCheck"]').is(":checked") ) {
							var maxValue = $(element).find('[id|="maxValue"]').val().trim();
							if( maxValue.match(/^(\+|-)?\d{1,9}$/) ) options.maxValue = Number(maxValue);
						}
						data.push( options );
					}
				});
				if( empty ) step["_numericData"] = data.length ? data : null;
				else step["_numericData"] = data;
				this.render({ blockId: blockId, step: step });
			}
		}
	};

	var deleteData = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		var target = $(event.target).closest(".data-item");
		var hasSiblings = Boolean( $(target).siblings(".data-item").length );
		var textual = Boolean( $(target).find('.textualData').length );
		var numeric = Boolean( $(target).find('.numericData').length );
		var image = Boolean( $(target).find('.imageData').length );
		$(target).remove();
		if( textual ) addTextualData.call( this, event, !hasSiblings );
		else if( numeric ) addNumericData.call( this, event, !hasSiblings );
		else if( image ) addImageData.call( this, event, !hasSiblings );
	};

	var showTextualData = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		$(event.target).hide();
		$('#textualDataList').parent().show();
	};

	var showNumericData = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		$(event.target).hide();
		$('#numericDataList').parent().show();
	};

	var showImageData = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		$(event.target).hide();
		$('#imageDataList').parent().show();
	};

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
			'change #addStepForm .checkButton': showInput,
			'click #showTextualData': showTextualData,
			'click #showNumericData': showNumericData,
			'click #showImageData': showImageData,
			'click .add-data #addTextualData': addTextualData,
			'click .add-data #addNumericData': addNumericData,
			'click .add-data #addImageData': addImageData,
			'click #addStepForm .delete-data': deleteData
		},

		render: function( options ) {
			// template rendering and JQM css enhance
			$(this.id).html(this.template({
				blockId: options.blockId,
				username: this.session.getUsername(),
				step: options.step
			})).enhanceWithin();
		},

		update: function( blockId, stepId ) {
			var options = { blockId: blockId };
			var block = _.findWhere( this.blocks, { id: blockId } );
			if( block ) {
				if( stepId ) {
					var step = _.findWhere( block.steps, { id: stepId } );
					if( !step ) {} // step error;
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
			else {} // block error
			this.trigger("updated");
		}

	});

	return AddStep;

});
