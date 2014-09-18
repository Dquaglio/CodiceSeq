/*!
 * \File: ProcessDataCollectionSpec.js
 * \Author: Santangelo Davide <dsantang91@gmail.com>
 * \Date: 2014-07-29
 * \LastModified:
 * \Class: ---
 * \Package: test.collection.ProcessDataCollectionSpec
 * \Brief: test per verificare il corretto comportamento del modulo ProcessDataCollection
 */
define([
        '../model/collection/ProcessDataCollection'

], function( ProcessDataCollection ){

    describe("Modulo ProcessDataCollection", function() {

        var collection = new ProcessDataCollection([], { username: "Gabriele", processId: 1 });

        it("dovrebbe caricare correttamente il modulo", function() {
            expect(collection).toBeDefined();
        });

        it("dovrebbe inizializzare correttamente una collection dal server", function(){
            expect(collection.length).not.toBeNull();
        });

    });

});