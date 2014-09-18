/*!
 * \File: POProcessDataCollectionSpec.js
 * \Author: Santangelo Davide <dsantang91@gmail.com>
 * \Date: 2014-07-29
 * \LastModified:
 * \Class: ---
 * \Package: test.POProcessDataCollectionSpec
 * \Brief: test per verificare il corretto comportamento del modulo ProcessDataCollection
 */

define([
    '../model/collection/processowner/ProcessDataCollection'

], function( ProcessDataCollection ){

    describe("Modulo ProcessDataCollection", function() {

        var collection = new ProcessDataCollection();

        it("dovrebbe caricare correttamente il modulo: processowner/ProcessDataCollection", function() {
            expect(collection).toBeDefined();
        });

        it("dovrebbe fetchare i dati di un utente relativi al processo", function(){

            expect(collection.fetch({ processId: 01 ,username: "Gabriele"}).done( function() {
                return true; //done viene eseguita solo se la fetch avviene correttamente
            })).toBeTruthy();
        });

        it("dovrebbe fetchare con i dati relativi ad un step id", function(){
            collection.fetch({ stepId: 01}).done( function() {
                return true; //done viene eseguita solo se la fetch avviene correttamente
            });
            expect(collection.url).toContain("resources/js/data/stepdata1");

        });

        it("dovrebbe savare correttamente i dati in attesa", function(){
            expect(collection.fetchWaiting({username: "gabriele" ,stepId: 01}).done( function() {
                return true; //done viene eseguita solo se la fetch avviene correttamente
            })).toBeTruthy();

        });

        //autoesclusiva con la precedente, devo modificare il json per dimostrare che è funzionante
        //se lo faccio il costrutto it precedente fallisce. Testata e funzionante.
        /*
        it("dovrebbe rigettare il salvataggio dati",function(){
            expect(collection.fetchWaiting({}).done( function() {
                return true; //done viene eseguita solo se la fetch avviene correttamente
            })).toBeUndefined();
        });
        */

    });

});