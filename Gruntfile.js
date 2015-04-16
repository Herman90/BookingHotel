module.exports = function(grunt) {
    grunt.initConfig({
        execute: {
            target: {
                src: ['app.js']
            }
        },
        jshint: {
            files: ['public/javascripts/**/*.js']
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
    grunt.registerTask('default', ['jshint']);
};