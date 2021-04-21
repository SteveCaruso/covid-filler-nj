/*

This is to help sign folks up for CoVID vaccines from a variety of places.

It's a *snicker* JavaScript injection... :-)

*/

(function() {

    //Do the thing!
    async function inject(colOrder,outOrder) {

        //Pause function
        var pause = function (time) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, time);
            });
        }

        //Shorten some commonly-used stuff
        var host = document.location.host;
        const el = document.getElementById.bind(document);
        const q = document.querySelector.bind(document);

        //Logging function
        var log = function(str) {
            console.log(str);
        }

        //Add set function - this makes things easier
        var set = function (query,value,events) {

            if (q(query) == null) {
                log(`ERROR: ${query} not found in the document.`);
                return false;
            }

            if (events == null) events = ["input","change"];

            log(`Set ${query} to "${value}" with events [${events.join(',')}].`);

            //Set the element's value accordingly
            q(query).value = value;

            //Then fire off appropriate events
            if (events) {
                for (var e in events) {
                    q(query).dispatchEvent(new Event(events[e],{ bubbles: true }));
                }
            }

        };

        //Set querySelectorAll index
        var setqai = function(query,index,value,events) {

            let theSet = document.querySelectorAll(query);

            if (theSet.length == 0) {
                log(`ERROR: querySelectorAll(${query}) not found in the document.`);
                return false;
            }
            if (index >= theSet.length) {
                log(`ERROR: Index ${index} is out of bounds in setqai.`);
                return false;
            }

            let elem = theSet[index];

            if (events == null) events = ["input","change"];

            log(`Set ${query}{${index}} to "${value}" with events [${events.join(',')}].`);

            //Set the element's value accordingly
            elem.value = value;

            //Then fire off appropriate events
            if (events) {
                for (var e in events) {
                    elem.dispatchEvent(new Event(events[e],{ bubbles: true }));
                }
            }

        };

        //Click
        var click = function(query) {

            log(`Click ${query}.`);

            if (q(query) == null) {
                log(`ERROR: ${query} not found in the document.`);
                return false;
            }

            q(query).click();

        }

        //Click querySelectorAll index
        var clickqai = function(query,index) {

            log(`Click ${query}{${index}}.`);

            let theSet = document.querySelectorAll(query);

            if (theSet.length == 0) {
                log(`ERROR: querySelectorAll(${query}) not found in the document.`);
                return false;
            }
            if (index >= theSet.length) {
                log(`ERROR: Index ${index} is out of bounds in clickqai.`);
                return false;
            }

            let elem = theSet[index];

            elem.click();

        }

        //Set the status
        var stat = function(str) {

            q('#COVID-STATUS').innerHTML = str;
            log(`<strong>${str}</strong>`);

        };

        //Construct and/or recognize the button
        var cconsole = q('#covidInjectionConsole');

        //If it's not there, let's add it
        if (cconsole == null) {

            //Let's also make a debug console that is separate from the regular console, so that helpers can submit bug reports more easily
            cconsole = document.createElement("div");
            cconsole.id = "covidInjectionConsole";
            cconsole.innerHTML = `<h3>CoVID Injector 💉 Console</h3><iframe src="https://covid-injection-dev.netlify.app/"/>`;
            


            cconsole.style.fontFamily = "Arial";
            cconsole.style.fontSize = "12pt";
            cconsole.style.position = "fixed";
            cconsole.style.left="0px";
            cconsole.style.right="0px";
            cconsole.style.bottom="0px";
            cconsole.style.border="3px solid darkgoldenrod";
            cconsole.style.color = "darkgoldenrod";
            cconsole.style.padding = "20px";
            cconsole.style.backgroundColor = `rgba(1,1,1,.9)`;
            //cconsole.style.boxShadow = "5px 5px 5px 5px rgba(0,0,0,.5)";
            cconsole.style.zIndex = 10001;
            cconsole.style.borderRadius = "5px";
            cconsole.style.whiteSpace = "normal !important";
            cconsole.style.overflowWrap = "normal !important";
            cconsole.style.overflow = "scroll";
            cconsole.style.height="400px";

            //Inject the console into the document
            document.body.appendChild(cconsole);

            document.addEventListener('keydown', (e) => {
                if (e.code == "Backquote") {
                    if (cconsole.style.display == "none") cconsole.style.display = "block";
                    else cconsole.style.display = "none";
                }
            });

        }

        ///////

    }

    //Place it in a global object so we can use it with the bookmarklet
    window.COVID = {
        inject : inject
    };

})();