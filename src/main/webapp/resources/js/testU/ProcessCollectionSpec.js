/*!
 * \File: ProcessCollectionSpec.js
 * \Author: Santangelo Davide <dsantang91@gmail.com>
 * \Date: 2014-07-29
 * \LastModified:
 * \Class: ---
 * \Package: test.collection.ProcessCollectionSpec
 * \Brief: test per verificare il corretto comportamento del modulo ProcessCollection
 */
define([
    '../model/collection/ProcessCollection'

], function( ProcessCollection ){

    //test describe funzionante
    describe("Modulo ProcessCollection", function() {

        var collection= new ProcessCollection({ username: "Gabriele" });

        it("dovrebbe caricare correttamente il modulo user/ProcessCollection", function() {
            expect(collection).toBeDefined();
        });



        it("dovrebbe fetchare correttamenta una collection vuota dal server", function(){
           expect(collection.fetch({ running: true }).done( function() {
               return true;//la function done viene eseguita solo se la fetch avviene correttamente
            })).toBeTruthy();
        });

    });

});
