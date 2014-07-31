define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/user/ManagementProcess.html',
 'text!view/user/ManageBase.html',
 'model/ProcessModel',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter,BaseTemplate, manageProcessTemplate, Process ){

    var baseTemplate= _.template(BaseTemplate);
    var template= _.template(manageProcessTemplate);
    var process= new Process();

	var ManagementProcess = BasePresenter.extend({




        id: '#process',
        el: $('body'),

        events: {
            'click #insertData':'insertData',
            'click #chooseStep': 'chooseStep',
            'click #skipStep': 'skipStep'
        },

        //metodi

		initialize: function () {
			this.constructor.__super__.createPage.call(this, "process");
			_.extend(this.events, BasePresenter.prototype.events);
			this.process.clear();
			this.process.steps.reset();
			this.listenTo(this.process, 'processFetched', this.render);
			
			this.update();
		},






        render: function() {
        },
        insertData:function(){},
        chooseStep:function(){},
        skipStep:function(){}

	});

	return ManagementProcess;

});
