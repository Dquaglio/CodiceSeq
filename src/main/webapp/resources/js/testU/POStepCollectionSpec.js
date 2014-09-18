/*!
 * \File: POStepCollection.js
 * \Author: Santangelo Davide <dsantang91@gmail.com>
 * \Date: 2014-07-29
 * \LastModified:
 * \Class: ---
 * \Package: test.collection.POStepCollectionSpec
 * \Brief: test per verificare il corretto comportamento della StepCollection
 */
define([
    '../model/collection/processowner/StepCollection'

], function( StepCollection ){

    describe("Modulo processowner/StepCollection", function() {

        var collection= new StepCollection([], { processId : "10" });

        it("dovrebbe caricare correttamente il modulo processowner/StepCollection", function() {
            expect(collection).toBeDefined();
        });

        it("dovrebbe inizilizzare correttamente la collection", function(){
            expect(collection.url).toContain("/js/data/allstep10");
        });

    });

});