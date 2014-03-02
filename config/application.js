/* Exports an object that defines
 *  all of the configuration needed by the projects'
 *  depended-on grunt tasks.
 *
 * You can find the parent object in: node_modules/lineman/config/application.coffee
 */

module.exports = require(process.env['LINEMAN_MAIN']).config.extend('application', {
	ngtemplates:{
		pccrd:{
			options:{
				base:"app/js/views"
			},
			src: "app/js/views/*.html",
			dest: "<%= files.ngtemplates.dest %>"
		}
	},

	watch:{
		ngtemplates:{
			files:"app/js/views/**/*.html"
		}
	}
});
