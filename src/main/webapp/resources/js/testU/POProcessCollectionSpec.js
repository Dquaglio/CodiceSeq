/*!
 * \File: POProcessCollection.js
 * \Author: Santangelo Davide <dsantang91@gmail.com>
 * \Date: 2014-07-29
 * \LastModified:
 * \Class: ---
 * \Package: test.collection.POProcessCollectionSpec
 * \Brief: test per verificare il corretto comportamento del ProcessCollection
 */

define([
    '../model/collection/processowner/ProcessCollection'

], function( ProcessCollection ){

    //test describe funzionante
    describe("Modulo processowner/ProcessCollection", function() {

        var collection= new ProcessCollection({ username: "Gabriele" });

        it("dovrebbe caricare correttamente il modulo processowner/ProcessCollection", function() {
            expect(collection).toBeDefined();
        });

        it("dovrebbe fetchare correttamenta una collection dal server", function(){

            expect( collection.fetch().done( function() {
                return true;//la function done viene eseguita solo se la fecth ha avuto successo
            })).toBeTruthy();

        });

    });

});