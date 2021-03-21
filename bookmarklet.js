/*

This is to help sign folks up for CoVID vaccines from a variety of places.

*/

//javascript:
(function() {

    //Construct button
    var button = document.createElement("button");
        button.id = "MakeTheMagicHappen";
        button.innerHTML = `
            <h3>CoVID Filler is Loaded!</h3><br>
            Make sure the person's info is in your clipboard.<br/>
            Then click on me.`;
        button.style.position = "fixed";
        button.style.left="10px";
        button.style.top="10px";
        button.style.border="3px solid red";
        button.style.zIndex = 10000;
        button.style.borderRadius = "5px";
        button.style.boxShadow = "5px 5px 5px 5px rgba(0,0,0,.5)";
    
    //Inject into document
    document.body.appendChild(button);

    //Add click function
    button.onclick = function() {

        var h = document.location.host;
        var el = document.getElementById.bind(document);

        //Clipboard stuff
        navigator.clipboard.readText().then( c => {

            c = c.split("	");
            var d = c[3].split('/');
                console.log(d);
                d = d[0].padStart(2,"0")+'/'+d[1].padStart(2,"0")+'/'+d[2]; 

            if (h == "www.riteaid.com") {
                el("dateOfBirth").value=d;
                el("city").value=c[7];
                el("state").value=c[8];
                el("eligibility_state").value=c[8];
                el("zip").value=c[9];
                
                el("Occupation").value=c[10];
                el("occu").value=c[10];

                el("mediconditions").value=c[11];
                el("medcond").value=c[11];

                el("continue").disabled = false;
                el("continue").click();

            }

        });

    }

})();