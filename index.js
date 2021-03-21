/*

This is to help sign folks up for CoVID vaccines from a variety of places.

It's a *snicker* JavaScript injection... :-)

*/

(function() {

    function inject() {

        //Shorten some commonly-used stuff
        var host = document.location.host;
        var el = document.getElementById.bind(document);

        //List of supported hosts
        var supported = [
            "www.riteaid.com"
        ];

        //Check to see if we're *on* a supported host, otherwise we shouldn't mess with it.
        if (supported.indexOf(host) === -1) {
            alert("You are not on a supported vaccine portal.");
            return;
        }

        //As you'll see in the clipboard code below, it assumes that user data resides in the clipboard and is in a delimited list. Copy-pasting from a Google Spreadsheet makes the data delimited by tabs, so that's what we're using here.
        var DELIM = "	";

        //Data columns - These are the indexes (starting with 0) for each piece of user info we'll need. If you're using your own form, you'll need to change these to match your order.
        var FNAME = 1;
        var LNAME = 2;
        var BDAY = 3;
        var PHONE = 5;
        var ADDR = 6;
        var CITY = 7;
        var STATE = 8;
        var ZIP = 9;
        var OCC = 10;
        var HEALTH = 11;
        var EMAIL = 15;

        //Construct the button
        var button = document.createElement("button");
            button.id = "MakeTheMagicHappen";
            button.innerHTML = "<h3>CoVID Filler is Loaded!</h3><br>Make sure the person's info is in your clipboard.<br/>Then click on me.";
            button.style.position = "fixed";
            button.style.left="10px";
            button.style.top="10px";
            button.style.border="3px solid red";
            button.style.zIndex = 10000;
            button.style.borderRadius = "5px";
            button.style.boxShadow = "5px 5px 5px 5px rgba(0,0,0,.5)";
        
        //Inject the button into the document
        document.body.appendChild(button);

        //Add the function that fires when that button is clicked
        button.onclick = function() {

            //Snag the clipboard
            navigator.clipboard.readText().then( c => {

                //Split the clipboard data by the delimiter
                c = c.split(DELIM);

                //Add a version of the birthdate so that it has leading zeroes
                //A number of sites want it this way...
                var d = c[BDAY].split('/');
                    console.log(d);
                    d = d[0].padStart(2,"0")+'/'+d[1].padStart(2,"0")+'/'+d[2]; 

                //Riteaid
                if (host == "www.riteaid.com") {

                    //Add in everything to the appropriate fields
                    el("dateOfBirth").value =           d;
                    el("city").value =                  c[CITY];
                    el("state").value =                 c[STATE];
                    el("eligibility_state").value =     c[STATE];
                    el("zip").value =                   c[ZIP];
                    
                    el("Occupation").value =            c[OCC];
                    el("occu").value =                  c[OCC];

                    el("mediconditions").value =        c[HEALTH];
                    el("medcond").value =               c[HEALTH];

                    //Since there are no fields that need manual filling, click next
                    el("continue").disabled = false;
                    el("continue").click();

                }

            });

        }

    }

    //Place it in a global object so we can use it with the bookmarklet
    window.COVID = {
        inject : inject
    };

})();