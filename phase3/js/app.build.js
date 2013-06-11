({
	// This is the root directory of all your modules, relative to the 
	// location of this build profile. This is the directory that will be
	// duplicated.
	"appDir":"./app",

	// This should be the same directory as the baseUrl in your requirejs
	// config in index.html, except that it is relative to the appDir.
	"baseUrl":".",

	// The ouput directory of the optimized scripts, relative to 
	// the build profile.
	"dir":"./app-build",

	// These are the same paths configuration as in index.html, with one
	// exception.
	"paths":{
        "tpls": "./templates",
        "underscore": "../libs/underscore", 
        "backbone": "../libs/backbone", 

        // Here's the difference. If you open phase3/js/app/views/ContainerView.js
        // in your editor, you'll notice that one of the module dependencies is
        // 'jquery', however, no path to jquery is specified in index.html. Some
        // libraries implement the AMD interface, meaning that when the script 
        // is loaded in the browser, it registers itself with any AMD script
        // loader that may be running. JQuery does this, thus we can reference
        // jQuery as a dependency event though it is not a part of the configuration
        // in index.html. The catch is that the optimization script will throw an error
        // if it cannot resolve a dependency reference to an actual file, so we inform
        // the process that the jquery reference doesn't actually exist by mapping it
        // to the "empty:" keyword. This configuration also works if you are loading
        // dependencies from a CDN.
        "jquery": "empty:", 
        "json2": "../libs/json2", 
        "handlebars": "../libs/handlebars", 
        "text": "../libs/require/text", 
        "domReady": "../libs/require/domReady"
	},
	// These are the same shim configuration as in index.html
	"shim":{
		"backbone":{
			"deps":["underscore","json2"],
			"exports":"Backbone"
		},
		"underscore":{
			"exports":"_"
		},
		"handlebars":{
			"exports":"Handlebars"
		}
	},

	// By default, r.js will store the minified copy of every script
	// in the appDir, not just the target modules. If you don't need 
	// that feature, you can deactivate like so.
	"skipDirOptimize":true,

	// These are the modules that you want to minify and combine 
	// dependencies for
	"modules":[
		{
			// I have personally adopted a strategy of creating root 
			// modules for each page of my application, whose purpose 
			// is to provide a target for optimization. They usually perform 
			// initialization of the client functoinality. Here I tell
			// r.js that I want to optimize the organizer app script and all
			// of its dependencies.
			"name":"endpoints/organizer/app"
		}
	]
})