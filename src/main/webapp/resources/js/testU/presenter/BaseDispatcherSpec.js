/*!
 * \File:BaseDispatcherSpec
 * \Author: Santangelo Davide <dsantang91@gmail.com>
 * \Date: 2014-07-30
 * \LastModified:
 * \Class: ---
 * \Package: test.presenter.BaseDispatcher
 * \Brief: test per verificare il corretto comportamento del modulo BaseDispatcher
 */
define([
    '../../presenter/BaseDispatcher'

], function( BaseDispatcher ){

    describe("Modulo presenter/BaseDispatcher", function() {

        var BDisp= new BaseDispatcher();
        afterEach(function () {
            BDisp= new BaseDispatcher();
        });

        it("dovrebbe caricare correttamente il modulo presenter/BaseDispatcher", function() {
           expect(BDisp).toBeDefined();
        });

        it("dovrebbe ritornare un array vuoto",function(){

            expect(BDisp.size()).toBe(0);
        });


        it("dovrebbe ritornare un oggetto observer", function(){
            BDisp.addObserver({});
            expect(BDisp.size()).toBe(1);
        });

        it("dovrebbe rimuovere correttamente un observer", function(){
            var observer= {};
            BDisp.addObserver(observer);
            BDisp.removeObserver(observer);
            BDisp.removeObserver({});
            expect(BDisp.size()).toBe(0);

        });

        it("dovrebbe fallire se richiedo un index fuori misura", function(){
            var index= 5;
            var observer= {};
            BDisp.addObserver(observer);
            expect(BDisp.getObserver(index)).toBeUndefined();
        });

    });

});
