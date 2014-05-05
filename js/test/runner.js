require.config({
    paths: {
        "mocha" : "../lib/mocha/mocha",
        "chai" : "../lib/chai/chai",
        "biomorph" : "../biomorph",
        "genes": "../genes"
    },

    shim: {
        "mocha": {
            init: function(){
                this.mocha.setup("bdd");
                return this.mocha;
            }
        }
    }
});
 
require(["chai", "mocha"], function(chai, mocha){
    var should = chai.should();
     
    require(["test",], function(testfile) {
        mocha.run();
    });
});