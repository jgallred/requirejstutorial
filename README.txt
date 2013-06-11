#A Requirejs Tutorial

The following tutorial will walk you through some of the functionality of [Requirejs http://requirejs.org/]. For the purposes of this tuturial, you will being using an imcomplete toy application call Organizer. Organzer lets you create containers and add items to them. You can drag containers to reorder and nest them and you can drag items between containers. Again, the implementation is very incomplete and not well written, nor was it meant to be, but it is sufficient to demonstrate how requirejs can help cleanup the code. Note that, for the sake of simplicity, I have left off a backend so no persistence is available. This application uses the Backbone JavaScript framework, but the principles can be applied to pretty much any JavaScript implementation.

##Installation
Clone the repository to your web root. The result of each lab can be navigated to by going to {url to clone}/phase{number}

##Phase 0
This starting application is pretty typical of standard web pages.
1. Open phase0/index.html in your favorite text editor OR open it in your web browser and inspect the page source.
2. You'll notice under the the #wrapper div that we load all of the various third party libraries we are using. After that comes the Handlebars templates used by some of our views. Then we load our data into the client, which would normally be handled by the server side script. Finally we load app.js. App.js contains all of our Backbone classes for the page. It's small, since our app is small, but it is hard to manage.

##Phase 1
Well, putting all our classes in one file isn't managable, so we separated them into their own files. You'll see in the js folder that we've added subfolders for collections, models, and views. This is definately easier to look at.
1. Open phase0/index.html in your text editor.
2. You'll notice that now we load each Backbone class before we load app.js, which just holds the logic for starting our application. Unfortunately, on any web page where we want to use these componsents, we have to be sure to add all the script tags and ensure they are loaded in the right order. It's still not a great setup.

##Phase 2 - RequireJS to the Rescue
We don't want to worry about which scripts need to be loaded and when. RequireJS lets us do this.
1. We started by wrapping each backbone class in a RequireJS module. Open phase2/js/models/item.js. A module is a javascript closure passed to RequireJS's define() function. The first argument is an array of javascript dependencies, second comes the module closure, whose parameters are those dependencies. Notice that we are requiring the Backbone and Underscore libraries as dependencies. Once they are loaded, RequireJS will call our module closure. In the module, we create our new class and then we return it. The result of our closure is saved and when other modules require 'models/item', they will get the Item class.
2. But how does RequireJS know where we keep the backbone and underscore libraries? Or how to use them, since they are not written as modules. Open phase2/index.html in your text editor. You should see that after we load the css, we insert a script tag that populates the require variable with our configuration, after which we load the requirejs script. Take time to read all of the comments around the configuration so that you understand what we are doing.
3. Scroll down to the bottom of index.html. Notice that all the script tags for the modules are gone. We don't need to know what scripts are required and what order they have to be declared in anymore. We just want to execute one of them, namely our application, and let RequireJS handle the rest of it. RequireJS defines the require() function to do this. require() takes an array of dependencies, like define(), and then executes the given callback once the dependency tree has been loaded.
4. Open index.html in your browser and start your browser's developer tools. Go to the network monitor and reload the page. You should see that each module gets loaded individually, even the javascript libraries, backbone and handlebars.

##Phase 3 - Reducing script loads
Loading a bunch scripts asynchronously during development is fine, however its a real waste of the server's time in production. Fortunately, RequireJS lets us combine and minify all the modules required to run the page.
1. The thing to know about RequireJS's optimization process is that it will create a duplicate directory of your scripts directory, starting at the baseUrl. We don't really need to do that for the whole JS directory because there may be scripts on our site that have nothing to do with our modules. So we relocate our modules to a subdirectory of js/ called app/.  
2. Requirejs lets us create a build profile so that we can easily optimize the project whenever we want. Open phase3/js/app.build.js in a text editor and take time to read all the comments.
3. Now install [Node http://nodejs.org/] on your machine. Change your working directory to phase3/js. Now run "node libs/require/r.js -o app.build.js". R.js will trace the dependencies of each module in the modules array and combine and minify its dependencies and output the result to the same location of
target module in the output directory. You can open phase3/js/app-build/endpoints/organizer/app.js and see the output of the process.
4. Now we want our production application to load the optimized version of our scripts. Open phase3/index.html and find the requirejs config. Change the the baseUrl from "js/app" to "js/app-build" and open the application in your browser. Examine the network traffic with your developer tools. You should see that now only app.js is loaded instead of all the individual module scripts.

##Phase 4
So we have some common modules/dependencies between pages that we want to separate out into their optimized script that we can load. This way, if we need to load multiple optimized modules onto a page, we don't have to include the common stuff in the minification process.
1. Open phase4/js/app/libs/framework.js in your text editor. Notice we've created a dummy module that requires the common modules as dependencies. It's sole purpose is to serve as an optimization target.
2. Now open phase4/js/app.build.js. Read the comments there to understand how we separate out the common scripts.
3. Change your working directory to phase4/js and run "node libs/require/r.js -o app.build.js".
4. Now open index.html in your text editor and scroll down to right before we bootstrap the data. You'll notice we've added a new script tag for the optimized (under app-build) framework script file. It will be loaded, registering the module dependencies with requirejs, so that they are not loaded asynchronously as dependencies.

Congrats! You now have a basic understanding of the use of requirejs.