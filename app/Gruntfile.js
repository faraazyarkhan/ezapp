module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            desktopJS: {
                options: {
                    baseUrl: "js/app",
                    paths: {
                        "desktop": "init/main"
                    },
                    wrap: true,
                    name: "../libs/almond",
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    mainConfigFile: "js/app/config/config.js",
                    include: ["desktop"],
                    out: "js/app/init/main.min.js"
                }
            },
            desktopCSS: {
                options: {
                    optimizeCss: "standard",
                    cssIn: "./css/main.css",
                    out: "./css/main.min.css"
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'js/app/**/*.js', '!js/app/**/*min.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: false,
                    module: true,
                    document: true
                }
            }
        },

        cucumberjs: {
            files: 'features',
            options: {
                steps: "features/step_definitions"
            }
        },
        
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        
        shell: {
            update_minified: {
                command : 'update-minified.bat' 
            }
        },
        
        copy: {
            main: {
                files: [
                  {
                      src: ['server/environment/globals-dev.js'],
                      dest: 'js/app/config/environment/globals.js'
                  }
                ]
            }
        },
        
        plato: {
          your_task: {
            options : {
                exclude: /\.min\.js$/    // excludes source files finishing with ".min.js"
            },
            files: {
                'reports': ['js/app/**/*.js']
            }
          }
        }
        
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-cucumber');
    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-shell');
    
    grunt.registerTask('build', ['requirejs:desktopJS', 'requirejs:desktopCSS']);
    grunt.registerTask('analysis', ['plato', 'jshint']);
    grunt.registerTask('unit:test', ['karma']);
    grunt.registerTask('acceptance:test', ['build', 'cucumberjs']);
    grunt.registerTask('update:minified', ['build', 'shell:update_minified']);
    grunt.registerTask('default', ['build', 'analysis']);
};







