/*!
 * \File:LoginLogicSpec.js
 * \Author: Santangelo Davide <dsantang91@gmail.com>
 * \Date: 2014-07-30
 * \LastModified:
 * \Class: ---
 * \Package: test.presenter.BasePresenter
 * \Brief: test per verificare il corretto comportamento del modulo BasePresenter
 */

define([
    '../../presenter/BasePresenter',
    '../../model/UserDataModel'

], function( BasePresenter, UserDataModel ){

    describe("Modulo presenter/BasePresenter", function() {

       var  UserDataModel= new UserDataModel();
       var  BasePresenter= new BasePresenter({session: UserDataModel});

        it("dovrebbe creare correttamente un oggetto BasePresenter",function(){
            expect(UserDataModel).toBeDefined();

        });

        it("dovrebbe caricare correttamente il modulo presenter/BasePresenter", function(){
            expect(BasePresenter).toBeDefined();
        });

        it("la spia dovrebbe valutare positivamente l'avvenuta chiamata alla function refresh",function(){
            spyOn(BasePresenter.logout().session.refresh(), 'refresh');
            BasePresenter.logout();
            expect(BasePresenter.logout().session.refresh()).toHaveBeenCalled();
        });

    });

});