require.config({
    baseUrl: "/static/js",
    paths: {
        "jquery": "components/jquery/jquery",
        "underscore": "components/underscore/underscore",
        "backbone": "components/backbone/backbone",
        "text": "components/text/text",
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        }
    }
});

require(['views/External'], function(AppView){

    new AppView();

});