require.config({
    baseUrl: "/assets/js",
    paths: {
        "jquery": "components/jquery/jquery",
        "jquery-ui": "components/jquery-ui/ui/jquery-ui.custom",
        "underscore": "components/underscore/underscore",
        "backbone": "components/backbone/backbone",
        "text": "components/text/text",
        "tipsy": "components/tipsy/src/javascripts/jquery.tipsy"
    },
    shim: {
        underscore: {
            exports: '_'
        },
        "jquery-ui": {
            exports: "$",
            deps: ['jquery']
        },
        tipsy:{
            deps: ['jquery'],
            exports: 'tipsy'
        },
        backbone: {
            deps: ["underscore", "jquery-ui"],
            exports: "Backbone"
        }
    }
});

require(['views/app'], function(AppView){
    new AppView();
});