/*

This is to help sign folks up for CoVID vaccines from a variety of places.

It's a *snicker* JavaScript injection... :-)

*/

(function() {

    async function inject() {

        //Wait function
        var wait = function (time) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, time);
            });
        }

        //Shorten some commonly-used stuff
        var host = document.location.host;
        var el = document.getElementById.bind(document);
        var q = document.querySelector.bind(document);

        //List of supported hosts
        var supported = [
            "www.riteaid.com",
            "www.cvs.com"
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
            button.innerHTML = `
                <strong>CoVID Injector 💉</strong>
                <div id="COVID-STATUS">
                    <strong>Loaded!</strong><br>
                    Make sure the person's info is in your clipboard.<br>
                    Then click here.
                </div>`;
            button.style.width="250px";
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
                if (host == "www.riteaid.com") { console.log("RiteAid detected...")

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

                }//END RiteAid
                
                else if (host == "www.cvs.com") { console.log("CVS detected...")

                    //On: https://www.cvs.com/immunizations/covid-19-vaccine
                    if (location.href == "https://www.cvs.com/immunizations/covid-19-vaccine") {
                        console.log("Page 1 detected...");

                        q('#COVID-STATUS').innerHTML = '●○○○○○○<br>Page 1 detected...';
                    
                        //Click: a[data-analytics-name="New York"]
                        q('a[data-analytics-name="New York"]').click();

                        //wait
                        wait(500);

                        //Click: a[data-analytics-name="Schedule an appointment now"]
                        q('a[data-analytics-name="Schedule an appointment now"]').click();

                    }
                    //On: https://www.cvs.com/vaccine/intake/store/covid-screener/covid-qns
                    else if (location.href == "https://www.cvs.com/vaccine/intake/store/covid-screener/covid-qns") {
                        console.log("Page 2 detected...");

                        q('#COVID-STATUS').innerHTML = '●●○○○○○<br>One Page 2.<br>Click again.';

                        //Click #q7_2
                        q('#q7_2').click();
                        //Click #q8_2
                        q('#q8_2').click();
                        //Click #q9_2
                        q('#q9_2').click();

                        //Click button[_ngcontent-hll-c70]
                        q('button.btn-control').click();
                   
                    }
                    //On: https://www.cvs.com/vaccine/intake/store/cvd/dose-select
                    else if (location.href == "https://www.cvs.com/vaccine/intake/store/cvd/dose-select") {
                        console.log("Page 2.5 detected...");

                        q('#COVID-STATUS').innerHTML = '●●●○○○○<br>On Page 3.<br>Click again.';

                        //Click #customRadio_1
                        q('#customRadio_1').click();

                        //Click button[_ngcontent-kqo-c72][type="submit"]
                        q('button[type="submit"].btn-control').click();

                    }
                    //On: https://www.cvs.com/vaccine/intake/store/eligibility-screener/eligibility-covid
                    else if (location.href == "https://www.cvs.com/vaccine/intake/store/eligibility-screener/eligibility-covid") {
                        console.log("Page 3 detected...");

                        q('#COVID-STATUS').innerHTML = '●●●●○○○<br>On Page 4.<br>Click again.';

                        //Set #jurisdiction 's selected element to one with value=
                        //26: EID_NJ
                        q('option[value="26: EID_NJ"]').setAttribute("selected","true");

                        //Fire the change event manually
                        q('#jurisdiction').dispatchEvent(new Event('change'));

                        //Click button!
                        q('button[type="submit"].btn-control').click();

                    }
                    //On: https://www.cvs.com/vaccine/intake/store/eligibility-screener/eligibility-qns
                    else if (location.href == "https://www.cvs.com/vaccine/intake/store/eligibility-screener/eligibility-qns") {
                        console.log("Page 4 detected...");

                        q('#COVID-STATUS').innerHTML = '●●●●●○○<br>On Page 5.<br>Click again.';

                        //Age in #q1_0
                        //Have to calculate it roughly
                        var age = (new Date().getFullYear()) - parseInt(c[BDAY].split('/')[2]);
                        q('#q1_0').value = age;

                        //Fire the change event manually
                        q('#q1_0').dispatchEvent(new Event('compositionend')); //Yep, that's what they use for checking.

                        //But apparently that's not enough, so we need to add some classes
                        //answer-free-input ng-dirty ng-valid ng-touched

                        //Click #q20
                        q('#q20').click();

                        //wait
                        wait(500);


                        //Select elligibility criteria
                        //THIS PART SUCKS
                        /*

                        <select _ngcontent-kqo-c76="" id="qlist" aria-describedby="listErr" formcontrolname="list" class="dd-list ng-pristine ng-invalid ng-touched">
                            <option _ngcontent-kqo-c76="" disabled="" value="0: null">Select</option>
                            <option _ngcontent-kqo-c76="" value="1: Age 65 or over"> Age 65 or over</option>
                            <option _ngcontent-kqo-c76="" value="2: Teachers K-12, Daycare and preschool workers, a"> Teachers K-12, Daycare and preschool workers, and staff members</option>
                            <option _ngcontent-kqo-c76="" value="3: Healthcare workers (paid and unpaid)"> Healthcare workers (paid and unpaid)</option>
                            <option _ngcontent-kqo-c76="" value="4: Age 16 or over with medical conditions that inc"> Age 16 or over with medical conditions that increase risk of severe illness from COVID-19</option>
                            <option _ngcontent-kqo-c76="" value="5: First responders including law enforcement and "> First responders including law enforcement and fire professionals</option>
                            <option _ngcontent-kqo-c76="" value="6: Transit and public safety worker"> Transit and public safety worker</option>
                            <option _ngcontent-kqo-c76="" value="7: Migrant Farm Worker"> Migrant Farm Worker</option>
                            <option _ngcontent-kqo-c76="" value="8: Member of a tribal community"> Member of a tribal community</option>
                            <option _ngcontent-kqo-c76="" value="9: Person experiencing homelessness or living in a"> Person experiencing homelessness or living in a shelter</option>
                            <option _ngcontent-kqo-c76="" value="10: Residents of long-term and high risk congregat"> Residents of long-term and high risk congregate care settings</option>
                            <option _ngcontent-kqo-c76="" value="11: Healthcare workers or staff of long-term and h"> Healthcare workers or staff of long-term and high risk congregate care settings</option>
                            <option _ngcontent-kqo-c76="" value="12: None of the above"> None of the above</option>
                        </select>

                        */

                        // For some selections #qtext needs to be given info
                        // K-12, First Responders, Transit & PS, Farm Worker, Healthcare Workers
                        // NEED employer 

                        //Senior
                        if (age >= 65) {
                            q('option[value="1: Age 65 or over"]').setAttribute("selected", "true");
                        }
                        //Any health problem
                        else if (c[HEALTH] != "") {
                            q('option[value="4: Age 16 or over with medical conditions that inc"]').setAttribute("selected", "true");
                        }
                        //K-12 & Childcare
                        else if (c[OCC] == "Childcare Worker" 
                                || c[OCC] == "Pre-Kindergarten -12th grade Educator & Staff"
                                || c[OCC] == "Family Childcare Providers"
                                || c[OCC] == "Head Start and Early Head Start"
                        ) {
                            q('option[value="2: Teachers K-12, Daycare and preschool workers, a"]').setAttribute("selected", "true");
                        }
                        //Healthcare Workers
                        else if (c[OCC] == "Health Care Worker") {
                            q('option[value="3: Healthcare workers (paid and unpaid)"]').setAttribute("selected", "true");
                        }
                        //First Responders
                        else if (c[OCC] == "Emergency Medical Services (EMS)"
                                || c[OCC] == "Firefighters"
                                || c[OCC] == "First Responder"
                                || c[OCC] == "Law Enforcement"
                        ) {
                            q('option[value="5: First responders including law enforcement and "]').setAttribute("selected", "true");
                        }
                        //Transit & Public Safety
                        else if (c[OCC] == "Local Transportation"
                                || c[OCC] == "Public Health Employee"
                                || c[OCC] == "Public Safety Workers"
                                || c[OCC] == "Public Transit Workers"
                        ) {
                            q('option[value="6: Transit and public safety worker"]').setAttribute("selected", "true");
                        }
                        //Migrant Farm Workers
                        else if (c[OCC] == "Migrant Farm Workers") {
                            q('option[value="7: Migrant Farm Worker"]').setAttribute("selected", "true");
                        }
                        //Tribal
                        else if (c[OCC] == "Members of tribal communities") {
                            q('option[value="8: Member of a tribal community"]').setAttribute("selected", "true");
                        }
                        //Tribal
                        else if (c[OCC] == "Persons experiencing homelessness"
                                || c[OCC] == "Persons living in shelters"
                        ) {
                            q('option[value="9: Person experiencing homelessness or living in a"]').setAttribute("selected", "true");
                        }
                        //Long Term Care
                        else if (c[OCC] == "Multigenerational Household"
                        ) {
                            q('option[value="10: Residents of long-term and high risk congregat"]').setAttribute("selected", "true");
                        }
                        //Long Term Care Staff
                        else if (c[OCC] == "Long Term Care Facility Staff") {
                            q('option[value="11: Healthcare workers or staff of long-term and h"]').setAttribute("selected", "true");
                        }
                        //OTHER
                        else {
                            q('option[value="12: None of the above"]').setAttribute("selected", "true");
                        }

                        //Fire the change event manually
                        q('#qlist').dispatchEvent(new Event('change'));

                        //Add employer info !!! We don't collect this yet...
                        if (q('#qtext') !== null) {
                            //For now just fill a dummy value
                            q('#qtext').value = ".";
                            //And trip the change event
                            q('#qtext').dispatchEvent(new Event('compositionend'));
                        }

                        //Click #qconsent
                        q('#qconsent').click();

                        //Click button[_ngcontent-kqo-c76].btn-control
                        q('button.btn-control').click();
                    }
                    //On: https://www.cvs.com/vaccine/intake/store/cvd/how-to-schedule
                    else if (location.href == "https://www.cvs.com/vaccine/intake/store/cvd/how-to-schedule") {
                        console.log("Page 5 detected...");

                        q('#COVID-STATUS').innerHTML = '●●●●●●○<br>On Page 6.<br>Click again.';
                        
                        //Click button[_ngcontent-kqo-c74].btn-control
                        q('button.btn-control').click();

                    }
                    //On: https://www.cvs.com/vaccine/intake/store/cvd-store-select/first-dose-select
                    else if (location.href == "https://www.cvs.com/vaccine/intake/store/cvd-store-select/first-dose-select") {
                        console.log("Page 6 detected...");

                        //Set #address to Zip Code
                        q('#address').value = c[ZIP];

                        //Fire change event manually
                        q('#address').dispatchEvent(new Event('compositionend'));

                        //Click button[_ngcontent-kqo-c79]
                        q('button').click();

                        q('#COVID-STATUS').innerHTML = '●●●●●●●<br>On Page 7.<br>Continue manually.';
                    }
                
                } //END CVS

            });

        }

        //Jump ahead
        button.click();

    }

    //Place it in a global object so we can use it with the bookmarklet
    window.COVID = {
        inject : inject
    };

})();