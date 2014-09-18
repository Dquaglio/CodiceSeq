/*!
 * \File: ProcessModel.js
 * \Author: Santangelo Davide <dsantang91@gmail.com>
 * \Date: 2014-07-29
 * \LastModified:
 * \Class: ---
 * \Package: test.ProcessModelSpec
 * \Brief: test per verificare il corretto comportamento del modulo ProcessModel
 */
define([
    '../model/ProcessModel'

], function( ProcessModel ){

    describe("Modulo user/ProcessModel", function() {

        model = new ProcessModel({ id: 1 }, { username: "Gabriele" });



        it("dovrebbe caricare correttamente il modulo user/ProcessModel", function() {
            expect(model).toBeDefined();
        });

        it("dovrebbe ", function(){
            expect(model.fetch().done( function() {
                return true;
            }).fail(function(){return false})).toBeTruthy();
        });

        it("Dovrebbe dare un errore nella sottoscrizione al processo di un utente", function(){
            var bool=false;
            model.subscribe("Gabriele").done( function() {
                }).fail( function() {
                bool=true;
                });
            expect(bool).toBeTruthy();
        });


    });

});