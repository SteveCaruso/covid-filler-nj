/*

This is to help sign folks up for CoVID vaccines from a variety of places.

*/

(function() {

    function inject() {

        var host = document.location.host;
        var el = document.getElementById.bind(document);

        var supported = [
            "www.riteaid.com"
        ];

        if (supported.indexOf(host) === -1) {
            alert("You are not on a supported vaccine portal.");
            return;
        }

        /* Data columns */
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

        /* Construct button */
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
        
        /* Inject into document */
        document.body.appendChild(button);

        /* Add click function */
        button.onclick = function() {

            /* Clipboard stuff */
            navigator.clipboard.readText().then( c => {

                c = c.split("	");
                var d = c[BDAY].split('/');
                    console.log(d);
                    d = d[0].padStart(2,"0")+'/'+d[1].padStart(2,"0")+'/'+d[2]; 

                if (host == "www.riteaid.com") {

                    el("dateOfBirth").value=d;
                    el("city").value=c[CITY];
                    el("state").value=c[STATE];
                    el("eligibility_state").value=c[STATE];
                    el("zip").value=c[ZIP];
                    
                    el("Occupation").value=c[OCC];
                    el("occu").value=c[OCC];

                    el("mediconditions").value=c[HEALTH];
                    el("medcond").value=c[HEALTH];

                    el("continue").disabled = false;
                    el("continue").click();

                }

            });

        }

    }

    /* Place it in a global object */
    window.COVID = {
        inject : inject
    };

})();