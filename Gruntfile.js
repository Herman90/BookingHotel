module.exports = function(grunt) {
    grunt.initConfig({
        execute: {
            target: {
                src: ['app.js']
            }
        },
        jshint: {
            files: ['public/javascripts/**/*.js'],
            options: {
                'node': true,
                'browser': true,
                'bitwise': true,
                'camelcase': true,
                'curly': true,
                'eqeqeq': true,
                'indent': 4,
                'latedef': 'nofunc',
                'noarg': true,
                'quotmark': 'single',
                'undef': true,
                'unused': true,
                'strict': true,
                'smarttabs': true,
                'globals': {
                    'angular': false,
                    'jQuery': true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('start', ['execute']);
    grunt.registerTask('jshintCheck', ['jshint']);
};