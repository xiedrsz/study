requirejs.config({
    baseUrl: './',
    paths: {
        analyzer: "js/analyzer",
        check: "js/check"
    }
});

// Start the main app logic.
requirejs(['analyzer', 'check'], function (analyzer, check) {
    console.log(check.format("YYYY-MM-DD"));
});