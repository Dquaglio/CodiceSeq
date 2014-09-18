/*!
 * \File: StepCollectionSpec
 * \Author: Santangelo Davide <dsantang91@gmail.com>
 * \Date: 2014-07-29
 * \LastModified:
 * \Class: ---
 * \Package: test.StepCollectionSpec
 * \Brief: test per verificare il corretto comportamento del modulo StepCollection
 */
define([
    '../model/collection/StepCollection'

], function( StepCollection){

    describe("Modulo StepCollection", function() {

        var Scollection = new StepCollection([], { processId: 1, username: "Gabriele" });

        it("dovrebbe caricare correttamente il modulo", function() {
            expect(Scollection).toBeDefined();
        });

        it("dovrebbe iniziatilizzare correttamente il modulo", function() {
            expect(Scollection.url).toContain("resources/js/data/userGabriele");
        });

        
         it("dovrebbe fectchare correttamente i dati dal server", function(){

         expect(collection.fetch().done( function() {
         return true;//se non entra nella done, allora la fetch ha fallito.
         })).toBeTruthy();
         });

    });

});