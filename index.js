/*

This is to help sign folks up for CoVID vaccines from a variety of places.

It's a *snicker* JavaScript injection... :-)

*/

(function() {

    //Translation text for data given in forms other than English
    //YES it would be better to change the form so it's all in English or has a language neutral internal state
    // ... but we went with Google Forms and that's not possible. So we need to work around it.
    var langs = {
        //English
        "en" : {

        },
        //Spanish
        "es" : {

            //General Responses
            "Si"                            : "Yes",
            "No"                            : "No",
            "Hombre"                        : "Male",
            "Mujer"                         : "Female",
            "Otro o prefiero no decir"      : "Other or prefer not to say",
            "Ninguna de las anteriores"     : "None of the above",

            //Occupations
            "" : "Childcare Worker",
            "" : "Correctional Officers",
            "" : "Emergency Medical Services (EMS)",
            "" : "Essential Worker",
            "" : "Family Childcare Providers",
            "" : "Firefighters",
            "" : "First Responder",
            "" : "Food and Agricultural Workers",
            "" : "Funeral Services",
            "" : "Grocery Workers",
            "" : "Head Start and Early Head Start",
            "" : "Health Care Worker",
            "" : "Law Enforcement",
            "" : "Local Transportation",
            "" : "Long Term Care Facility Staff",
            "" : "Members of tribal communities",
            "" : "Migrant Farm Workers",
            "" : "Multigenerational Household",
            "" : "Persons experiencing homelessness",
            "" : "Persons living in shelters",
            "" : "Pharmacy Staff",
            "" : "Pre-Kindergarten -12th grade Educator & Staff",
            "" : "Public Health Employee",
            "" : "Public Safety Workers",
            "" : "Public Transit Workers"
        }
    };

    //Language input data
    const LANG = "en";

    //Translator
    function _(s) {
        if (langs[LANG]) if (langs[LANG][s]) return langs[LANG][s];
        return s;
    }

    //Do the thing!
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
        const supported = [
            "www.riteaid.com",
            "www.cvs.com"
        ];

        //Check to see if we're *on* a supported host, otherwise we shouldn't mess with it.
        if (supported.indexOf(host) === -1) {
            alert("You are not on a supported vaccine portal.");
            return;
        }

        //As you'll see in the clipboard code below, it assumes that user data resides in the clipboard and is in a delimited list. Copy-pasting from a Google Spreadsheet makes the data delimited by tabs, so that's what we're using here.
        const DELIM = "	";

        //The expected number of columns in the clipboard
        const COLS = 25;

        //Data columns - These are the indexes (starting with 0) for each piece of user info we'll need. If you're using your own form, you'll need to change these to match your order.
        const FNAME = 1;
        const LNAME = 2;
        const BDAY = 3;
        const PHONE = 5;
        const ADDR = 6;
        const CITY = 7;
        const STATE = 8;
        const ZIP = 9;
        const OCC = 10;
        const HEALTH = 11;
        const NOTES = 14;
        const EMAIL = 15;
        const SEX = 16;
        const GEN = 17;
        const EMP = 18;

        //Construct the button
        var button = document.createElement("button");
            button.id = "MakeTheMagicHappen";
            button.innerHTML = `
                <strong>CoVID Injector 💉</strong>
                <div id="COVID-TARGET">
                </div>
                <div id="COVID-STATUS">
                    <strong>Loaded!</strong><br>
                    Make sure the person's info is in your clipboard.<br>
                    Then click here.
                </div>`;
            button.style.fontFamily = "Arial";
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

                if (c.length != COLS) {
                    alert(`You do not appear to have the data you need in your clipboard. (Expected ${COLS} columns, found ${c.length})`);
                    return;
                }

                //Display name of person the data is from
                q('#COVID-TARGET').innerHTML = "<strong><em>" + c[FNAME] + " " + c[LNAME] + "</em></strong>";

                //Check if there are any considerations
                if (c[NOTES].length > 0) {
                    q('#COVID-TARGET').innerHTML += "<br>(<em>" + c[NOTES] + "</em>)";
                }

                //Add a version of the birthdate so that it has leading zeroes
                //A number of sites want it this way...
                var d = c[BDAY].split('/');
                    console.log(d);
                    d = d[0].padStart(2,"0")+'/'+d[1].padStart(2,"0")+'/'+d[2]; 

                //Riteaid
                if (host == "www.riteaid.com") { console.log("RiteAid detected...")

                    if (location.href == "https://www.riteaid.com/pharmacy/covid-qualifier") {

                        q('#COVID-STATUS').innerHTML = 'RiteAid Page 1 detected...';

                        //Add in everything to the appropriate fields
                        el("dateOfBirth").value =           d;
                        el("city").value =                  c[CITY];
                        el("state").value =                 c[STATE];
                        el("eligibility_state").value =     c[STATE];
                        el("zip").value =                   c[ZIP];
                        
                        el("Occupation").value =            _(c[OCC]);
                        el("occu").value =                  _(c[OCC]);

                        el("mediconditions").value =        _(c[HEALTH]);
                        el("medcond").value =               _(c[HEALTH]);

                        //Since there are no fields that need manual filling, click next
                        el("continue").disabled = false;
                        el("continue").click();
                    
                    }
                    else if (location.href == "https://www.riteaid.com/pharmacy/apt-scheduler") {

                        q('#COVID-STATUS').innerHTML = 'RiteAid Page 2 detected. Continue manually.';

                    }
                    else {

                        q('#COVID-STATUS').innerHTML = 'RiteAid detected. Continue manually.';

                    }

                } //END RiteAid
                
                else if (host == "www.cvs.com") { console.log("CVS detected...");

                    //On: https://www.cvs.com/immunizations/covid-19-vaccine
                    if (location.href == "https://www.cvs.com/immunizations/covid-19-vaccine") {

                        q('#COVID-STATUS').innerHTML = '●○○○○○○○<br>CVS Page 1 detected...';
                    
                        //Click: a[data-analytics-name="New York"]
                        q('a[data-analytics-name="New York"]').click();

                        //wait
                        wait(500);

                        //Click: a[data-analytics-name="Schedule an appointment now"]
                        q('a[data-analytics-name="Schedule an appointment now"]').click();

                    }
                    //On: https://www.cvs.com/vaccine/intake/store/covid-screener/covid-qns
                    else if (location.href == "https://www.cvs.com/vaccine/intake/store/covid-screener/covid-qns") {

                        q('#COVID-STATUS').innerHTML = '●●○○○○○○<br>On CVS Page 2.<br>Click again.';

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

                        q('#COVID-STATUS').innerHTML = '●●●○○○○○<br>On CVS Page 3.<br>Click again.';

                        //Click #customRadio_1
                        q('#customRadio_1').click();

                        //Click button[_ngcontent-kqo-c72][type="submit"]
                        q('button[type="submit"].btn-control').click();

                    }
                    //On: https://www.cvs.com/vaccine/intake/store/eligibility-screener/eligibility-covid
                    else if (location.href == "https://www.cvs.com/vaccine/intake/store/eligibility-screener/eligibility-covid") {

                        q('#COVID-STATUS').innerHTML = '●●●●○○○○<br>On CVS Page 4.<br>Click again.';

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

                        q('#COVID-STATUS').innerHTML = '●●●●●○○○<br>On CVS Page 5.<br>Click again.';

                        //Age in #q1_0
                        //Have to calculate it roughly
                        var age = (new Date().getFullYear()) - parseInt(c[BDAY].split('/')[2]);
                        q('#q1_0').value = age;

                        //Fire the change event manually
                        q('#q1_0').dispatchEvent(new Event('compositionend')); //Yep, that's what they use for checking.

                        //March 22nd - q20-23 changed
                        /*
                            q20 - Age 65 or over
                            q21 - Age 16 or over with medical conditions that increase risk of severe illness from COVID-19
                            q22 - In another priority group
                            q23 - None of the above
                        */

                        //Over 65
                        if (age >= 65) {
                            q('#q20').click();
                        }

                        //Health conditions
                        else if ( _(c[HEALTH]) != "None of the Above" && c[HEALTH] != "") {
                            q('#q21').click();
                        }

                        //Priority group
                        else if ( _(c[OCC]) != "None of the Above" && c[OCC] != "") {

                            q('#q22').click();
                            
                            //Wait for it to populate
                            wait(500);

                            /*
<select _ngcontent-shj-c76="" id="qlist" aria-describedby="listErr" formcontrolname="list" class="dd-list ng-touched ng-pristine ng-invalid">
<option _ngcontent-shj-c76="" disabled="" value="0: null">Select</option>
<option _ngcontent-shj-c76="" value="1: Teachers K-12, Daycare and preschool workers, a"> Teachers K-12, Daycare and preschool workers, and staff members</option>
<option _ngcontent-shj-c76="" value="2: Healthcare workers (paid and unpaid)"> Healthcare workers (paid and unpaid)</option>
<option _ngcontent-shj-c76="" value="3: First responders including law enforcement and "> First responders including law enforcement and fire professionals</option>
<option _ngcontent-shj-c76="" value="4: Transit and public safety worker"> Transit and public safety worker</option>
<option _ngcontent-shj-c76="" value="5: Migrant Farm Worker"> Migrant Farm Worker</option>
<option _ngcontent-shj-c76="" value="6: Member of a tribal community"> Member of a tribal community</option>
<option _ngcontent-shj-c76="" value="7: Person experiencing homelessness or living in a"> Person experiencing homelessness or living in a shelter</option>
<option _ngcontent-shj-c76="" value="8: Residents of long-term and high risk congregate"> Residents of long-term and high risk congregate care settings</option>
<option _ngcontent-shj-c76="" value="9: Healthcare workers or staff of long-term and hi"> Healthcare workers or staff of long-term and high risk congregate care settings</option>
<option _ngcontent-shj-c76="" value="10: None of the above"> None of the above</option><!----></select>
                        */


                            //K-12 & Childcare
                            if ( _(c[OCC]) == "Childcare Worker" 
                                || _(c[OCC]) == "Pre-Kindergarten -12th grade Educator & Staff"
                                || _(c[OCC]) == "Family Childcare Providers"
                                || _(c[OCC]) == "Head Start and Early Head Start"
                            ) {
                                q('option[value="1: Teachers K-12, Daycare and preschool workers, a"]').setAttribute("selected", "true");
                            }
                            //Healthcare Workers
                            else if ( _(c[OCC]) == "Health Care Worker") {
                                q('option[value="2: Healthcare workers (paid and unpaid)"]').setAttribute("selected", "true");
                            }
                            //First Responders
                            else if ( _(c[OCC]) == "Emergency Medical Services (EMS)"
                                    || _(c[OCC]) == "Firefighters"
                                    || _(c[OCC]) == "First Responder"
                                    || _(c[OCC]) == "Law Enforcement"
                            ) {
                                q('option[value="3: First responders including law enforcement and "]').setAttribute("selected", "true");
                            }
                            //Transit & Public Safety
                                    else if ( _(c[OCC]) == "Local Transportation"
                                    || _(c[OCC]) == "Public Health Employee"
                                    || _(c[OCC]) == "Public Safety Workers"
                                    || _(c[OCC]) == "Public Transit Workers"
                            ) {
                                q('option[value="4: Transit and public safety worker"]').setAttribute("selected", "true");
                            }
                            //Migrant Farm Workers
                            else if ( _(c[OCC]) == "Migrant Farm Workers") {
                                q('option[value="5: Migrant Farm Worker"]').setAttribute("selected", "true");
                            }
                            //Tribal
                            else if ( _(c[OCC]) == "Members of tribal communities") {
                                q('option[value="6: Member of a tribal community"]').setAttribute("selected", "true");
                            }
                            //Homeless
                            else if ( _(c[OCC]) == "Persons experiencing homelessness"
                                    || _(c[OCC]) == "Persons living in shelters"
                            ) {
                                q('option[value="7: Person experiencing homelessness or living in a"]').setAttribute("selected", "true");
                            }
                            //Long Term Care
                            else if ( _(c[OCC]) == "Multigenerational Household"
                            ) {
                                q('option[value="8: Residents of long-term and high risk congregate"]').setAttribute("selected", "true");
                            }
                            //Long Term Care Staff
                            else if ( _(c[OCC]) == "Long Term Care Facility Staff") {
                                q('option[value="9: Healthcare workers or staff of long-term and hi"]').setAttribute("selected", "true");
                            }
                            //OTHER
                            else {
                                q('option[value="10: None of the above"]').setAttribute("selected", "true");
                            }

                            //Fire the change event manually
                            q('#qlist').dispatchEvent(new Event('change'));

                        }

                        //None of the above
                        else {
                            q('#q23').click();
                        }

                        //Check if employer field is active
                        if (q('#qtext') != null) {

                            //Fill it.... we need to add EMPLOYER info to the form
                            q('#qtext').value = c[EMP].length > 0 ? c[EMP] : ".";

                            //Fire the change event manually
                            q('#qtext').dispatchEvent(new Event('compositionend'));
                        }

                        //Click #qconsent
                        q('#qconsent').click();

                        //Click button[_ngcontent-kqo-c76].btn-control
                        q('button.btn-control').click();

                        
                    }
                    //On: https://www.cvs.com/vaccine/intake/store/cvd/how-to-schedule
                    else if (location.href == "https://www.cvs.com/vaccine/intake/store/cvd/how-to-schedule") {

                        q('#COVID-STATUS').innerHTML = '●●●●●●○○<br>On CVS Page 6.<br>Click again.';
                        
                        //Click button[_ngcontent-kqo-c74].btn-control
                        q('button.btn-control').click();

                    }
                    //On: https://www.cvs.com/vaccine/intake/store/cvd-store-select/first-dose-select
                    else if (location.href == "https://www.cvs.com/vaccine/intake/store/cvd-store-select/first-dose-select") {

                        //Set #address to Zip Code
                        q('#address').value = c[ZIP];

                        //Fire change event manually
                        q('#address').dispatchEvent(new Event('compositionend'));

                        //Click button[_ngcontent-kqo-c79]
                        q('button').click();

                        q('#COVID-STATUS').innerHTML = '●●●●●●●○<br>On CVS Page 7.<br>Continue manually until the <em>Please Provide Details</em> screen. Then click here again.';
                    }

                    //Patient info enter
                    else if (location.href == "https://www.cvs.com/vaccine/intake/store/patient-info") {

                        q('#COVID-STATUS').innerHTML = '●●●●●●●●<br>On CVS Page 8.<br>Continue manually.';

                        //#firstName
                        q('#firstName').value = c[FNAME];
                        q('#firstName').dispatchEvent(new Event('compositionend'));

                        //#lastName
                        q('#lastName').value = c[LNAME];
                        q('#lastName').dispatchEvent(new Event('compositionend'));

                        //#dob -- MMDDYYYY without slashes
                        q('#dob').value = d.split("/").join("");
                        q('#dob').dispatchEvent(new Event('compositionend'));

                        //#customRadio_F checkbox female
                        if ( _(c["SEX"]) == "Female") q("#customRadio_F").click();
                        //#customRadio_M checkbox male
                        else q("#customRadio_M").click();

                        //#address
                        q('#address').value = c[ADDR];
                        q('#address').dispatchEvent(new Event('compositionend'));

                        //#addressLine2
                        //Address 2?

                        //#city
                        q('#city').value = c[CITY];
                        q('#city').dispatchEvent(new Event('compositionend'));

                        //#state dropdown -- we're just gonna assume NJ
                        q('option[value="35: NJ"]').setAttribute("selected","true");
                        q('#state').dispatchEvent(new Event('change'));

                        /*

                        <select _ngcontent-rmj-c55="" id="state" formcontrolname="state" autocomplete="off" aria-describedby="" class="ng-untouched ng-pristine ng-invalid"><option _ngcontent-rmj-c55="" disabled="" value="0: null">Select</option><option _ngcontent-rmj-c55="" value="1: AL" aria-label="AL"> AL</option><option _ngcontent-rmj-c55="" value="2: AK" aria-label="AK"> AK</option><option _ngcontent-rmj-c55="" value="3: AS" aria-label="AS"> AS</option><option _ngcontent-rmj-c55="" value="4: AZ" aria-label="AZ"> AZ</option><option _ngcontent-rmj-c55="" value="5: AR" aria-label="AR"> AR</option><option _ngcontent-rmj-c55="" value="6: CA" aria-label="CA"> CA</option><option _ngcontent-rmj-c55="" value="7: CO" aria-label="CO"> CO</option><option _ngcontent-rmj-c55="" value="8: CT" aria-label="CT"> CT</option><option _ngcontent-rmj-c55="" value="9: DE" aria-label="DE"> DE</option><option _ngcontent-rmj-c55="" value="10: DC" aria-label="DC"> DC</option><option _ngcontent-rmj-c55="" value="11: FM" aria-label="FM"> FM</option><option _ngcontent-rmj-c55="" value="12: FL" aria-label="FL"> FL</option><option _ngcontent-rmj-c55="" value="13: GA" aria-label="GA"> GA</option><option _ngcontent-rmj-c55="" value="14: GU" aria-label="GU"> GU</option><option _ngcontent-rmj-c55="" value="15: HI" aria-label="HI"> HI</option><option _ngcontent-rmj-c55="" value="16: ID" aria-label="ID"> ID</option><option _ngcontent-rmj-c55="" value="17: IL" aria-label="IL"> IL</option><option _ngcontent-rmj-c55="" value="18: IN" aria-label="IN"> IN</option><option _ngcontent-rmj-c55="" value="19: IA" aria-label="IA"> IA</option><option _ngcontent-rmj-c55="" value="20: KS" aria-label="KS"> KS</option><option _ngcontent-rmj-c55="" value="21: KY" aria-label="KY"> KY</option><option _ngcontent-rmj-c55="" value="22: LA" aria-label="LA"> LA</option><option _ngcontent-rmj-c55="" value="23: ME" aria-label="ME"> ME</option><option _ngcontent-rmj-c55="" value="24: MH" aria-label="MH"> MH</option><option _ngcontent-rmj-c55="" value="25: MD" aria-label="MD"> MD</option><option _ngcontent-rmj-c55="" value="26: MA" aria-label="MA"> MA</option><option _ngcontent-rmj-c55="" value="27: MI" aria-label="MI"> MI</option><option _ngcontent-rmj-c55="" value="28: MN" aria-label="MN"> MN</option><option _ngcontent-rmj-c55="" value="29: MS" aria-label="MS"> MS</option><option _ngcontent-rmj-c55="" value="30: MO" aria-label="MO"> MO</option><option _ngcontent-rmj-c55="" value="31: MT" aria-label="MT"> MT</option><option _ngcontent-rmj-c55="" value="32: NE" aria-label="NE"> NE</option><option _ngcontent-rmj-c55="" value="33: NV" aria-label="NV"> NV</option><option _ngcontent-rmj-c55="" value="34: NH" aria-label="NH"> NH</option><option _ngcontent-rmj-c55="" value="35: NJ" aria-label="NJ"> NJ</option><option _ngcontent-rmj-c55="" value="36: NM" aria-label="NM"> NM</option><option _ngcontent-rmj-c55="" value="37: NY" aria-label="NY"> NY</option><option _ngcontent-rmj-c55="" value="38: NC" aria-label="NC"> NC</option><option _ngcontent-rmj-c55="" value="39: ND" aria-label="ND"> ND</option><option _ngcontent-rmj-c55="" value="40: MP" aria-label="MP"> MP</option><option _ngcontent-rmj-c55="" value="41: OH" aria-label="OH"> OH</option><option _ngcontent-rmj-c55="" value="42: OK" aria-label="OK"> OK</option><option _ngcontent-rmj-c55="" value="43: OR" aria-label="OR"> OR</option><option _ngcontent-rmj-c55="" value="44: PW" aria-label="PW"> PW</option><option _ngcontent-rmj-c55="" value="45: PA" aria-label="PA"> PA</option><option _ngcontent-rmj-c55="" value="46: PR" aria-label="PR"> PR</option><option _ngcontent-rmj-c55="" value="47: RI" aria-label="RI"> RI</option><option _ngcontent-rmj-c55="" value="48: SC" aria-label="SC"> SC</option><option _ngcontent-rmj-c55="" value="49: SD" aria-label="SD"> SD</option><option _ngcontent-rmj-c55="" value="50: TN" aria-label="TN"> TN</option><option _ngcontent-rmj-c55="" value="51: TX" aria-label="TX"> TX</option><option _ngcontent-rmj-c55="" value="52: UT" aria-label="UT"> UT</option><option _ngcontent-rmj-c55="" value="53: VT" aria-label="VT"> VT</option><option _ngcontent-rmj-c55="" value="54: VI" aria-label="VI"> VI</option><option _ngcontent-rmj-c55="" value="55: VA" aria-label="VA"> VA</option><option _ngcontent-rmj-c55="" value="56: WA" aria-label="WA"> WA</option><option _ngcontent-rmj-c55="" value="57: WV" aria-label="WV"> WV</option><option _ngcontent-rmj-c55="" value="58: WI" aria-label="WI"> WI</option><option _ngcontent-rmj-c55="" value="59: WY" aria-label="WY"> WY</option><!----></select>

                        */

                        //#zip
                        q('#zip').value = c[ZIP];
                        q('#zip').dispatchEvent(new Event('compositionend'));

                        //#email
                        q('#email').value = c[EMAIL];
                        q('#email').dispatchEvent(new Event('compositionend'));

                        //#phoneNumber -- all digits
                        q('#phoneNumber').value = c[PHONE].split("-").join("").split(" ").join("");
                        q('#phoneNumber').dispatchEvent(new Event('compositionend'));

                    }

                    else {

                        q('#COVID-STATUS').innerHTML = "CVS detected. Continue manually.";

                    }
                
                } //END CVS

            });

        }

        //Push the button! -- https://www.youtube.com/watch?v=v57i1Ze0jB8
        button.click();

    }

    //Place it in a global object so we can use it with the bookmarklet
    window.COVID = {
        inject : inject
    };

})();