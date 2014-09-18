/*!
 * \File:LoginLogicSpec.js
 * \Author: Santangelo Davide <dsantang91@gmail.com>
 * \Date: 2014-07-30
 * \LastModified:
 * \Class: ---
 * \Package: test.presenter.LoginLogic
 * \Brief: test per verificare il corretto comportamento del modulo LoginLogic
 */

define([
    '../../presenter/LoginLogic'

], function( LoginLogic){

    describe("Modulo presenter/LoginLogic", function() {

        var  LL= new LoginLogic();

        it("dovrebbe creare correttamente un oggetto LoginLogic",function(){
            expect(LL).toBeDefined();
        });

        it("dovrebbe chiamare la function refresh per l'avvenuta login",function(){
            var  LK= new LoginLogic();
            spyOn(LK.login().refresh(), 'refresh');
            LoginLogic.login();
            expect(LK.login().refresh()).toHaveBeenCalled();
        });

    });

});