require.config({
    paths: {}

});

require(["app"], function(App){
    "use strict";
    App.init();
    App.run();
});