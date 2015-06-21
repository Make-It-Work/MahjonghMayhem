module.exports = function(grunt) {
  grunt.initConfig({
 		browserify: {
      js: {
        src: 'app/js/app.js',
        dest: 'dist/js/app.js',
        options: {
          external: ['angular'],
          debug: false,
          browserifyOptions: { debug: false }
        }
      }
    },
 		copy: {
      all: {
        // This copies all the html and css into the dist/ folder
        expand: true,
        cwd: 'app/',
        src: ['**/*.html', '**/*.css'],
        dest: 'dist/',
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/css/green_app.css': 'app/css/green_app.scss',
          'dist/css/blue_app.css': 'app/css/blue_app.scss'
        }
      }
    },
 		watch: {
      js: {
        files: "app/**/*.js",
        tasks: "browserify"
      },
      html: {
        files: 'app/**/*.html',
        tasks: 'copy'
      },
      css: {
        files: 'app/**/*.scss',
        tasks: 'sass'
      }
    }
 	});

	 // Load the npm installed tasks
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

	// The default tasks to run when you type: grunt
	grunt.registerTask('default', ['browserify', 'copy', 'sass']);
};
