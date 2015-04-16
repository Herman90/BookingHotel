module.exports = function(grunt) {
    grunt.registerTask('start', ['execute']);
    grunt.registerTask('jshint', ['jshint']);

    grunt.initConfig({
        execute: {
            target: {
                src: ['app.js']
            }
        },
        jshint: {
            files: ['*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-jshint');
}