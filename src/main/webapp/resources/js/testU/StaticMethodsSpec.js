/*!
 * \File:StaticMethods.js
 * \Author: Santangelo Davide <dsantang91@gmail.com>
 * \Date: 2014-07-30
 * \LastModified:
 * \Class: ---
 * \Package: test.StaticMethodsSpec
 * \Brief: test per verificare il corretto comportamento di funzioni statiche
 */

describe("Modulo StaticMethodsSpec", function() {

    it("dovrebbe ritornare null se description.lenght è >0", function() {
        var description = "test metodo validate description";
        expect(validateDescription(description)).toBeNull();
    });

    it("dovrebbe ritornare false per il fallimento del controllo sulla regexp", function(){
        expect(getParamCS("5")).toBeFalsy();
    });

    it("dovrebbe ritornare false per il fallimento del controllo sulla regexp", function(){
        expect(getParam("20")).toBeFalsy();
    });
});

