// var mozjpeg = require('imagemin-mozjpeg');
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: { 
      dev: {            
        options: {                      
          style: 'expanded',
          sourcemap: 'auto',
        },
        files: {                                  
          'dev/.temp/style.css': 'dev/scss/main.scss'
        }
      },
      dist: {
        options: {               
          style: 'compressed',
          sourcemap: 'none',
        },
        files: {                                  
          'dev/.temp/style.css': 'dev/scss/main.scss'
        }
      }
    },

    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({browsers: 'last 8 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'dev/.temp/style.css'
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'node_modules/tone/build/Tone.js',
          'dev/js/*.js'
        ],

        dest: 'dev/.temp/script.js'
      }

    },

    uglify: {
      dist: {
        files: {
          'dev/.temp/script.js': ['dev/.temp/script.js']
        }
      }
    },

    devcode: // see https://www.npmjs.com/package/grunt-devcode for usage
    {
      options:
      {
        html: true,        // html files parsing?
        js: true,          // javascript files parsing?
        css: true,         // css files parsing?
        clean: true,       // removes devcode comments even if code was not removed
        block: {
          open: 'devcode', // with this string we open a block of code
          close: 'endcode' // with this string we close a block of code
        },
        dest: 'public'       // default destination which overwrittes environment variable
      },
      dist: {             // settings for task used with 'devcode:dist'
        options: {
            source: 'dev/',
            dest: 'dev/.temp/',
            env: 'production'
        }
      }
    },

    htmlmin: {
      dev: {                                       // Target
        options: {                                 // Target options
          removeComments: false,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'dev/.temp/index.html': 'dev/index.html',// 'destination': 'source'
        }
      },                                          
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                          // Dictionary of files
          'dev/.temp/index.html': 'dev/.temp/index.html', // 'destination': 'source'
        }
      }
    },

    inline: {
      dist: {
        src: 'dev/.temp/index.html',
        dest: 'public/index.html'
      }
    },


    imagemin: {                          
      dynamic: { 
        options: {                       // Target options
          optimizationLevel: 3,
          svgoPlugins: [{ removeViewBox: false }]
          // use: [mozjpeg()]
        },                        
        files: [{
          expand: true,                    // Enable dynamic expansion
          cwd: 'assets/',                  // Src matches are relative to this path
          src: ['assets/*.*'], // Actual patterns to match
          dest: 'public/'                    // Destination path prefix
        }]
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      src: {
        files: ['dev/*.html', 'dev/js/*.js', 'dev/scss/*.scss', 'assets/*.*', 'dev/guides/*.*'],
        tasks: ['dev']
      },
      options: {
        livereload: true,
      },
    },

    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.jonassandstedt.se',
          port: 21,
          authKey: 'live'
        },
        src: 'public/',
        dest: 'sagtand-colab/interactive',
        exclusions: ['.ftppass', '.DS_Store']
      }
    }
  });

  // css / sass
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  
  // js
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // HTML
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-inline');

  // images
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Utillities
  grunt.loadNpmTasks('grunt-devcode');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ftp-deploy');

  grunt.registerTask('dist', ['sass:dist', 'postcss', 'concat', 'uglify', 'devcode:dist', 'htmlmin:dist', 'inline', 'imagemin', 'ftp-deploy']);
  grunt.registerTask('dev', ['sass:dev', 'postcss', 'concat', 'htmlmin:dev', 'inline', 'imagemin']);
  grunt.registerTask('default', ['sass:dev', 'postcss', 'concat', 'htmlmin:dev', 'inline', 'imagemin', 'watch']);

  // grunt.registerTask('dist', ['postcss', 'concat', 'uglify', 'devcode:dist', 'htmlmin:dist', 'inline']);
  // grunt.registerTask('dev', ['postcss', 'concat', 'htmlmin:dev', 'inline']);
  // grunt.registerTask('default', ['postcss', 'concat', 'htmlmin:dev', 'inline', 'watch']);

}