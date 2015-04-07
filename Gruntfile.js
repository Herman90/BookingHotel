module.exports = function(grunt) {
    grunt.registerTask('start', ['execute']);

    grunt.initConfig({
        execute: {
            target: {
                src: ['app.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-execute');
}