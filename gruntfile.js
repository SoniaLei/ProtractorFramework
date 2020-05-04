module.exports = function (grunt) {

    grunt.initConfig({
        // pkg: grunt.file.readJSON('package.json'),
        // uglify: {
        //     options: {
        //         banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        //     },
        //     build: {
        //         src: 'src/<%= pkg.name %>.js',
        //         dest: 'build/<%= pkg.name %>.min.js'
        //     }
        // },


        // protractor: {
        //     options: {
        //         configFile: "node_modules/protractor/example/conf.js", // Default config file
        //         keepAlive: true, // If false, the grunt process stops when the test fails.
        //         noColor: false, // If true, protractor will not use colors in its output.
        //         args: {
        //             // Arguments passed to the command
        //         }
        //     },
        //     your_target: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
        //         options: {
        //             configFile: "e2e.conf.js", // Target-specific config file
        //             args: {} // Target-specific arguments
        //         }
        //     },
        // },

    })


    grunt.registerTask('run', function () {
        console.log('I am running');
    });

    grunt.registerTask('sleep', function () {
        console.log('I am sleeping');
    });

    grunt.registerTask('all', ['sleep', 'run'])
}
