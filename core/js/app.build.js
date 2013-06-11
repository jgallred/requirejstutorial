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
			"name":"libs/framework"
		},
		{
			"name":"endpoints/organizer/app", 
			"exclude":["libs/framework"]
		}
	]
})