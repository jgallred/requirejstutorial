({
	"appDir":"./app",
	"baseUrl":".",
	"dir":"./app-build",
	"paths":{
        "tpls": "./templates",
        "underscore": "../libs/underscore", 
        "backbone": "../libs/backbone", 
        "jquery": "empty:", 
        "json2": "../libs/json2", 
        "handlebars": "../libs/handlebars", 
        "text": "../libs/require/text", 
        "domReady": "../libs/require/domReady"
	},
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
	"skipDirOptimize":true,
	"modules":[
		{
			// This is the common library
			"name":"libs/framework"
		},
		{
			"name":"endpoints/organizer/app", 

			// We can exclude a module and all its dependencies from the 
			// optimization of any module. Here we tell r.js to ignore
			// framework.js and all of its dependency tree
			"exclude":[
				"libs/framework"
			],

			// Let's say you are developing and want to speed up the browser
			// by loading the production scripts, but still want to develop
			// on one or more modules. Running r.js with excludeShallow will
			// exclude only these modules from the current optimization, but
			// still include all dependencies.
			"excludeShallow": [
                "views/ItemView"
            ]
		}
	]
})