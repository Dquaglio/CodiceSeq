/*!
 * \File:POED.js
 * \Author: Santangelo Davide <dsantang91@gmail.com>
 * \Date: 2014-07-30
 * \LastModified:
 * \Class: ---
 * \Package: test.presenter.POED
 * \Brief: test per verificare il corretto comportamento del modulo P.O. EventDispatcher
 */
define([
    '../../presenter/processowner/EventDispatcher',
    '../../model/collection/processowner/ProcessDataCollection'

], function( EventDispatcher, ProcessDataCollection){

    describe("Modulo processowner/EventDispatcher'", function() {
        var col = new ProcessDataCollection([], { username: "Gabriele", processId: 1 });
        var  ED= new EventDispatcher();

        it("dovrebbe creare correttamente un oggetto EventDispatcher",function(){
            expect(ED).toBeDefined();

        });

        it("dovrebbe settare il param intervalId a null",function(){
            expect(ED.intervalId).toBeNull();
        });

        it("dovrebbe rilevare correttamente un aggiornamento della collection",function(){
            ED.intervalFunction(col);
            expect(ED.intervalFunction.changed).toBeTruthy();
        });


    });

});