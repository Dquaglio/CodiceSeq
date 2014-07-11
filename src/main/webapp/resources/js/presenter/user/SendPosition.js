/*!
 * \File: SendPosition.js
 * \Author: Marcomin Gabriele <gabriele.marcomin@gmail.com>
 * \Date: 2014-06-08
 * \LastModified:
 * \Class: SendPosition
 * \Package: com.sirius.sequenziatore.client.presenter.user
 * \Brief: Gestione dell'invio della posizione per la conclusione di un passo
 */
define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/user/SendPosition.html',
 'model/ProcessModel',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, SendPositionTemplate, Process ){

	var SendPosition = BasePresenter.extend({

        //attributi

		process: new Process(),

        template: _.template(SendPositionTemplate),

        id: '#send_position',

        el: $('body'),

        events: {
            'submit #sendPositionForm': 'loadCoordinates'
        },

        //metodi

		initialize: function () {
			this.constructor.__super__.createPage.call(this, "send_position");
			_.extend(this.events, BasePresenter.prototype.events);
		},

        loadCoordinates:function(){
            var metersForDegrees=35;
            //attesa raggio di tolleranza
            var userCoordinates=this.checkCoordinates();
        },

        render: function() {
					$(this.id).html(this.template()).enhanceWithin();

		},

		getParam: function(param) {
            /*
			var hash = window.location.hash;
			var expression = new RegExp("#send_position\\?(\\w+=\\w+&)*"+param+"=(\\d{1,11})");
			var result = expression.exec(hash);
			return result ? result[2] : false;*/
		},

        checkCoordinates: function() {
            var coordinates;
            $('#map-canvas').gmap3({
                getgeoloc:{
                    callback : function(coords){
                        if (coords){
                            //latitudine
                            coordinates.x=coords.lat();
                            //longitudine
                            coordinates.y=coords.lng();
                            //aggiorno la mappa
                            $(this).gmap3({
                                map:{
                                    options: {
                                        center:cords,
                                        zoom: 18,
                                        disableDefaultUI: true
                                    }
                                },
                                marker:{
                                    latLng:cords,
                                    options:{icon: "mini.png"}
                                }
                            });
                        }
                        else
                            $('#map-canvas').html('not trovato!');
                    }
                }
            });
            return coordinates;

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
		}


	});

	return SendPosition;

});
