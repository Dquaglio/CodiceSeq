/*!
 * \File: ProcessDataModel
 * \Author: Santangelo Davide <dsantang91@gmail.com>
 * \Date: 2014-07-29
 * \LastModified:
 * \Class: ---
 * \Package: test.ProcessDataModelSpec
 * \Brief: test per verificare il corretto comportamento del modulo ProcessDataModel
 */
define([
    '../model/ProcessDataModel'

], function( ProcessDataModel ){

    describe("Modulo model/ProcessDataModel", function() {

        var values = new Array();
        values.push({ dataId: 1, value: "testo" });
        values.push({ dataId: 1, value: 12.34 });
        values.push({ dataId: 1, imageUrl: "img/Tesoro" });
        values.push({ dataId: 1, latitude: 12.34 , longitude: 12.34, altitude: 12.34 });
        var now = new Date();

        var model = new ProcessDataModel({
            stepId: 1, username: "Gabriele", dateTime: now, values: values
        });

        it("dovrebbe caricare correttamente il modulo user/ProcessCollection", function() {
            expect(model).toBeDefined();
        });

        it("dovrebbe fallire il salvataggio dei falsi dati",function(){
            var testvar=false;
             model.save().done( function() {
                            }).fail( function() { testvar=true;
                            }

        );
            expect(testvar).toBeTruthy();

        });

    });

});
