({
    baseUrl: ".",
    name: "external",
    out: "external-build.js",
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
})