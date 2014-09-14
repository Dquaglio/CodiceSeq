/*!
* \File: SendPosition.js
* \Author: Marcomin Gabriele <gabriele.marcomin@gmail.com>
* \Date: 2014-06-26
* \LastModified: 2014-07-11
* \Class: OpenProcess
* \Package: com.sirius.sequenziatore.client.presenter.user
* \Brief: classe presenter necessaria al calcolo e inserimento della posizione geografica
*/

define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/user/SendPosition.html',
 'model/ProcessModel',
 'jquerymobile',
  'gmap3'
], function( $, _, Backbone, BasePresenter, SendPositionTemplate, ProcessModel ){

    var process =  null;
    var template = _.template(SendPositionTemplate);

    var getCoordinatesDistanceInMeters= function(position1, position2) {
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
    };

    var degToRad= function(deg) {
        return deg
    };

    var get=function(processModel){

    };

    var computeCoordinates = function() {
        $('#canvas').gmap3({
            getgeoloc:{
                callback : function(cords){
                    if (cords){
                        $('#canvas').html(cords.lat());
                        //passo le coordinate calcolate con jqmap alla variabile di istanza
                        this.coordinates=cords;
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
                                options:{icon: "../../../img/user.png"}
                            }
                        });
                    } else {
                        $('#canvas').html('not localised !');
                    }
                }
            }
        });
    }

    var SendPosition = BasePresenter.extend({
        cordinates:null,
        el: $('insert'),
        events: {
            'click #checkCoordinates': 'checkCoordinates',
            'click #sendCoordinates': 'insertCoordinates'
        },

        //metodi

		initialize: function () {
			this.constructor.__super__.createPage.call(this, "process");
			_.extend(this.events, BasePresenter.prototype.events);
            //temporaneo
            this._process = new ProcessModel({ id: 1 }, { username: "Gabriele" });
			this.update();
		},

        render: function() {
            var lat=computeCoordinates.call(this);
		},
        checkCoordinates:function(){
            var lat=computeCoordinates.call(this);
            var distanza=getCoordinatesDistanceInMeters(lat,this.geographicData);
        }


	});

	return SendPosition;

});
