/*

This is to help sign folks up for CoVID vaccines from a variety of places.

It's a *snicker* JavaScript injection... :-)

*/

(function() {

    //What occupations qualify? This reverse hash tree is designed to collapse all former field data into the official categories.
    //It'll be properly hashed in the next assignment
    var qualifiedOccs = {
        "Childcare workers in licensed and registered settings" : [
            "Childcare Worker",
            "Family Childcare Providers"
        ],
        "Clergy" : [
            "Clergy and Other Essential Support for House of Worship"
        ],
        "Communications, IT, and media workers" : [

        ],
        "Educators and staff, including pre-K to 12 and higher education" : [
            "Head Start and Early Head Start",
            "Pre-Kindergarten -12th grade Educator & Staff"
        ],
        "Eldercare and support workers" : [
            "Multigenerational Household"
        ],
        "Elections personnel" : [

        ],
        "First responders" : [
            "Emergency Medical Services (EMS)",
            "Firefighters",
            "First Responder",
            "Law Enforcement",
            "Veterinarians and Support Staff"
        ],
        "Healthcare workers" : [
            "Health Care Worker",
            "Public Health Employee",
            "Funeral Services"
        ],
        "Hospitality workers" : [
            "Grocery Workers",
            "Janitorial Staff"
        ],
        "Individuals experiencing homelessness and those living in shelters" : [
            "Persons experiencing homelessness",
            "Persons living in shelters"
        ],
        "Judicial system workers" : [
            "Judicial Staff",
            "Judiciary"
        ],
        "Laundry services workers" : [

        ],
        "Librarians and library support staff" : [

        ],
        "Long-term care and high-risk congregate care facility residents and staff" : [
            "Long Term Care Facility Staff"
        ],
        "Medical supply chain employees" : [
            "Pharmacy Staff"
        ],
        "Members of tribal communities" : [
            "Members of tribal communities"
        ],
        "Migrant farm workers" : [
            "Food and Agricultural Workers",
            "Migrant Farm Workers"
        ],
        "Postal and shipping service workers" : [
            "Mail Carriers",
            "Postal and Shipping Services",
            "U.S. Postal Service"
        ],
        "Public safety workers" : [
            "Correctional Officers",
            "Public Safety Workers"
        ],
        "Real estate, building, and home services workers" : [

        ],
        "Retail financial institution workers" : [

        ],
        "Sanitation workers" : [

        ],
        "Social service workers and support staff" : [

        ],
        "Transportation workers" : [
            "Airport and Commercial Airlines",
            "Local Transportation",
            "Public Transit Workers"
        ],
        "Utilities workers" : [

        ],
        "Warehousing and logistics workers" : [

        ]
    };

    //Unfold the hash
    var occs = {};
    for (var i in qualifiedOccs) {
        occs[i] = i;
        for (var j in qualifiedOccs[i]) {
            occs[ qualifiedOccs[i][j] ] = i;
        }
    }
    qualifiedOccs = occs;

    /*
        Where to put :
            Essential Worker
            Manufacturing Workers
    */


    //Translation text for data given in forms other than English
    //YES it would be better to change the form so it's all in English or has a language neutral internal state
    // ... but we went with Google Forms and that's not possible. So we need to work around it.
    var langs = {
        //Spanish
        "es" : {

            //General Responses
            "Si"                                        : "Yes",
            "No"                                        : "No",
            "Hombre"                                    : "Male",
            "Mujer"                                     : "Female",
            "Otro o prefiero no decir"                  : "Other or prefer not to say",
            "Ninguna de las anteriores"                 : "None of the above",

            //Occupations
            //""                                        : "Airport and Commercial Airlines",
            "Trabajador de cuidado infantil"            : "Childcare Worker",
            //""                                        : "Clergy",
            //""                                        : "Clergy and Other Essential Support for House of Worship",
            "Funcionario de prisiones"                  : "Correctional Officers",
            "Servicios médicos de emergencia (EMS)"     : "Emergency Medical Services (EMS)",
            "Trabajador esencial"                       : "Essential Worker",
            "Proveedor de cuidado infantil familiar"    : "Family Childcare Providers",
            "Bombero"                                   : "Firefighters",
            "Primer interviniente"                      : "First Responder",
            "Trabajador agroalimentario"                : "Food and Agricultural Workers",
            "Servicio funerario"                        : "Funeral Services",
            "Trabajador de bodegas/mercados "           : "Grocery Workers",
            "Asociación Head Start o Early Head Start"  : "Head Start and Early Head Start",
            "Trabajador de salud"                       : "Health Care Worker",
            //""                                        : "Janitorial Staff",
            //""                                        : "Judicial Staff",
            //""                                        : "Judiciary",
            "Cumplimiento de la ley"                    : "Law Enforcement",
            "Transporte local"                          : "Local Transportation",
            "Personal del centro de atención a largo plazo" : "Long Term Care Facility Staff",
            //""                                        : "Mail Carriers",
            //""                                        : "Manufacturing Workers",
            "Miembro de comunidad tribal"               : "Members of tribal communities",
            "Trabajador agrícola migrante"              : "Migrant Farm Workers",
            "Hogar multigeneracional"                   : "Multigenerational Household",
            "Persona sin hogar"                         : "Persons experiencing homelessness",
            "Persona que vive en un refugio"            : "Persons living in shelters",
            "Trabajador de farmacia"                    : "Pharmacy Staff",
            //""                                        : "Postal and Shipping Services",
            "Educador o empleado en escuela Pre-K a duodécimo grado" : "Pre-Kindergarten -12th grade Educator & Staff",
            "Empleado de salud pública"                 : "Public Health Employee",
            "Trabajador de seguridad pública"           : "Public Safety Workers",
            "Trabajador de transporte público"          : "Public Transit Workers",
            //""                                        : "U.S. Postal Service",
            //""                                        : "Veterinarians and Support Staff",

            //Health Conditions
            "Asma - con hospitalización"                : "Asthma-with hospitalization",
            "Esclerosis lateral amiotrófica"            : "Amyotrophic Lateral Asclerosis (ALS)",
            "Asma"                                      : "Asthma",
            "Transplante de médula osea"                : "Bone Marrow Transplant",
            "Enfermedad Pulmonar Obstructiva Crónica (EPOC)" : "COPD",
            "Cáncer"                                    : "Cancer",
            "Parálisis cerebral"                        : "Cerebral Palsy",
            "Fibrosis quística"                         : "Cystic Fibrosis",
            "Diabetes"                                  : "Diabetes",
            "Síndrome de Down"                          : "Down Syndrome",
            "Epilepsia"                                 : "Epilepsy",
            "VIH"                                       : "HIV",
            "Problemas cardiacos"                       : "Heart Condition",
            "Discapacidades intelectuales y del desarrollo" : "Intellectual and Developmental Disabilities",
            "Enfermedad del riñon"                      : "Kidney Disease",
            "Enfermedad del hígado"                     :  "Liver Disease",
            "Desordenes metabólicos"                    : "Metabolic Disorders",
            "Distrofia muscular"                        : "Muscular Dystrophy",
            "Condición neurológica"                     : "Neurologic Condition",
            "Obesidad"                                  : "Obesity",
            "Trasplante de organo"                      : "Organ transplant",
            "Embarazo"                                  : "Pregnancy",
            "Fibrosis pulmonar"                         : "Pulmonary Fibrosis",
            "Trastornos genéticos severos"              : "Severe Genetic Disorders",
            "Anemia falciforme"                         : "Sickle Cell Anemia",
            "Fumígeno"                                  : "Smoking",
            "Spina bifida"                              : "Spina Bifida",
            "Sistema inmunológico debilitado"           : "Weakened Immune System"

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

        //List of supported hosts
        const supported = [
            "www.riteaid.com",
            "www.cvs.com",
            "www.zocdoc.com",
            "curogram.com",
            "covid-injection-dev.netlify.app",
            "covid-injection.netlify.app"
        ];

        //Check to see if we're *on* a supported host, otherwise we shouldn't mess with it.
        if (supported.indexOf(host) === -1) {
            alert("You are not on a supported vaccine portal.");
            return;
        }

        //As you'll see in the clipboard code below, it assumes that user data resides in the clipboard and is in a delimited list. Copy-pasting from a Google Spreadsheet makes the data delimited by tabs, so that's what we're using here.
        const DELIM = "	";

        //The expected number of columns in the clipboard
        //const COLS = 24; //Unneeded now.

        //Data columns - These are the indexes (starting with 0) for each piece of user info we'll need. If you're using your own form, you'll need to change these to match your order.
        //THESE will soon be obsolete.
        /*
        var EMAIL = 1;
        var FNAME = 2;
        var LNAME = 3;
        var BDAY = 4;
        var PHONE = 5;
        var ADDR = 6;   var ADDR2 = -1; //We'll need the second field soon... I'm a dork for not doing this
        var CITY = 7;
        var STATE = 8;
        var ZIP = 9;
        var SEX = 10;
        var GEN = 11;
        var OCC = 12;
        var EMP = 13;
        var HEALTH = 14;
        var NOTES = 17;
        //Additional notes fields
        var NOTES2 = -1;
        var NOTES3 = -1;

        //Availability grid (new visualization based on Google Forms)
        var A_SUN = -1;
        var A_MON = -1;
        var A_TUE = -1;
        var A_WED = -1;
        var A_THU = -1;
        var A_FRI = -1;
        var A_SAT = -1;

        const DEFAULT_COLS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,17];*/

        //New default columns system!
        const DEFAULT_IDX = {
            email:1,
            fname:2,
            lname:3,
            bday:4,
            phone:5,
            addr:6,
            addr2:-1,
            city:7,
            state:8,
            zip:9,
            sex:10,
            gen:11,
            occ:12,
            emp:13,
            health:14,
            notes:17,
            notes2:-1,
            notes3:-1,
            notes4:-1,
            a_sun:-1,
            a_mon:-1,
            a_tue:-1,
            a_wed:-1,
            a_thu:-1,
            a_fri:-1,
            a_sat:-1
        };

        //The new INDEX! -- copy defaults
        var IDX = {}; for (var i in DEFAULT_IDX) IDX[i] = -1;

        //The new OUTDEX
        var ODX = {};

        //Invalidate all of the old bookmarklets
        if (colOrder == null && outOrder == null) {
            if (confirm("You are using an outdated bookmarklet. Should I redirect you to the CoVID Injection website so you can get a new one?")) {
                location.href="https://covid-injection.netlify.app";
            }
        }

        //Read in columns
        for (var i in colOrder) IDX[i] = colOrder[i];

        //Read out columns
        for (var i in outOrder) ODX[i] = outOrder[i];

        //If you're on the bookmarklet page, load everything in, and then return.
        if (location.href == "https://covid-injection-dev.netlify.app/custom.html" || location.href == "https://covid-injection.netlify.app/custom.html") {

            alert("Loading this bookmarklet's configuration into the custom bookmarklet maker...");

            for (var i=0; i<52; i++) q('#col_'+i).value = "";
            
            for (var i in IDX) {
                console.log(`Setting ${i} to col ${IDX[i]}`);
                if (q('#col_'+IDX[i])) q('#col_'+IDX[i]).value = i;
            }

           q('#output_toggle').checked = true;

            for (var i=0; i<52; i++) if('#out_col_'+i) q('#out_col_'+i).value = "";

            for (var i in ODX) { q('#output_toggle').checked = true;

                console.log(`Setting ${i} to out_col ${ODX[i]}`);
                q('#out_col_'+ODX[i]).value = i;
            }

            return;
        }

        //Numerical month to Full Month
        const FMONTH = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December",
        }

        //Construct and/or recognize the button
        var button = q('#covidInjectionButton');
        var cconsole = q('#covidInjectionConsole');
        var output = q('#covidInjectionOutput');

        //If it's not there, let's add it
        if (button == null) {
            button = document.createElement("button");
            button.id = "covidInjectionButton";
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
            button.style.padding = "1ex";
            button.style.width="250px";
            button.style.position = "fixed";
            button.style.left="10px";
            button.style.top="10px";
            button.style.border="3px solid red";
            button.style.zIndex = 10000;
            button.style.borderRadius = "5px";
            button.style.boxShadow = "5px 5px 5px 5px rgba(0,0,0,.5)";
            button.style.whiteSpace = "normal !important";
            button.style.overflowWrap = "normal !important";
            button.style.wordWrap = "break-word !important";
            button.style.backgroundColor = "#EEE";
        
            //Inject the button into the document
            document.body.appendChild(button);

            //Let's also make a debug console that is separate from the regular console, so that helpers can submit bug reports more easily
            cconsole = document.createElement("div");
            cconsole.id = "covidInjectionConsole";
            cconsole.innerHTML = `<strong>CoVID Injector 💉 Message Console <a href="javascript:navigator.clipboard.writeText(document.getElementById('covidInjectionConsole').innerText);">[copy to clipboard]</a></strong>
                <div id="covidInjectionConsoleDataState" style="font-size:50%"></div>
                <div><strong>Actions:</strong></div>
                <div id="covidInjectionConsoleMessages" style="font-size:75%"></div>`;
            cconsole.style.fontFamily = "Arial";
            cconsole.style.position = "fixed";
            cconsole.style.left="20%";
            cconsole.style.top="20%";
            cconsole.style.right="20%";
            cconsole.style.bottom="20%";
            cconsole.style.border="3px solid darkgoldenrod";
            cconsole.style.color = "darkgoldenrod";
            cconsole.style.padding = "20px";
            cconsole.style.backgroundColor = `rgba(0,0,0,.9)`;
            cconsole.style.boxShadow = "5px 5px 5px 5px rgba(0,0,0,.5)";
            cconsole.style.zIndex = 10001;
            cconsole.style.borderRadius = "5px";
            cconsole.style.whiteSpace = "normal !important";
            cconsole.style.overflowWrap = "normal !important";
            cconsole.style.overflow = "scroll";
            cconsole.style.height="300px";
            cconsole.style.display = "none";

            //Inject the console into the document
            document.body.appendChild(cconsole);

            document.addEventListener('keydown', (e) => {
                if (e.code == "Backquote") {
                    if (cconsole.style.display == "none") cconsole.style.display = "block";
                    else cconsole.style.display = "none";
                }
            });


            //And here is the output form
            output = document.createElement("div");
            output.id = "covidInjectionOutput";
            let volname = localStorage.getItem('volunteerName') == null ? "" : localStorage.getItem('volunteerName');
            output.innerHTML = `<strong>Vaccination Information</strong>
                <br>
                <label for="covidInjectionOutput_vac_vol">Volunteer Name:<br>
                <input id="covidInjectionOutput_vac_vol" type="text" value="${volname}"></label>
                <br>
                <label for="covidInjectionOutput_vac_type">Vaccine Type:<br>
                <select id="covidInjectionOutput_vac_type">
                    <option value="">Choose</option>
                    <option id="covidInjectionOutput_moderna" value="Moderna">Moderna</option>
                    <option id="covidInjectionOutput_pfizer" value="Pfizer">Pfizer</option>
                    <option id="covidInjectionOutput_jnj" value="JnJ">J&amp;J/Jansen</option>
                    <option id="covidInjectionOutput_unknown" value="Unknown">Unknown</option>
                </select></label>
                <br>
                <label for="covidInjectionOutput_vac_loc">Location:<br>
                <input id="covidInjectionOutput_vac_loc" type="text"></label>
                <br>
                <label for="covidInjectionOutput_vac_date">First Dose Date:<br>
                <input id="covidInjectionOutput_vac_date" type="datetime-local"></label>
                <br>
                <label for="covidInjectionOutput_vac_date_2">Second Dose Date:<br>
                <input id="covidInjectionOutput_vac_date_2" type="datetime-local"></label>
                <br>
                <button id="covidInjectionOutput_copy" style="background-color:white; border:1px solid #333; border-radius:7px; padding:.5ex;">Copy Output to Clipboard</button><br>
                (This will overwrite what you currently have in it.)`;
            output.style.fontFamily = "Arial";
            output.style.padding = "1ex";
            output.style.textAlign = "center";
            output.style.position = "fixed";
            output.style.width="250px";
            output.style.right="10px";
            output.style.top="10px";
            output.style.border="3px solid red";
            output.style.zIndex = 10000;
            output.style.borderRadius = "5px";
            output.style.boxShadow = "5px 5px 5px 5px rgba(0,0,0,.5)";
            output.style.whiteSpace = "normal !important";
            output.style.overflowWrap = "normal !important";
            output.style.wordWrap = "break-word !important";
            output.style.display = "none";
            output.style.backgroundColor = "#EEE";

            //Inject the console into the document
            document.body.appendChild(output);

            document.addEventListener('keydown', (e) => {
                if (e.code == "Equal") {
                    if (output.style.display == "none") output.style.display = "block";
                    else output.style.display = "none";
                }
            });

        }

        //Logging function
        var log = function(str) {
            q('#covidInjectionConsoleMessages').innerHTML += `<div>${str}</div>`;
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

        var click = function(query,index) {

            log(`Click ${query}.`);

            if (q(query) == null) {
                log(`ERROR: ${query} not found in the document.`);
                return false;
            }

            q(query).click();

        }

        var clickqai = function(query) {

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

        var stat = function(str) {

            q('#COVID-STATUS').innerHTML = str;
            log(`<strong>${str}</strong>`);

        };

        //Add the function that fires when that button is clicked
        button.onclick = function() { try {

            //Snag the clipboard
            navigator.clipboard.readText().then( c => {

                //Split the clipboard data by the delimiter
                c = c.split(DELIM);

                

                //Detect language
                //figure that out... still...

                


                //Here we need to tease out the given data into whatever different formats we may need


                //Do zip code first
                var u_zip = c[IDX["zip"]];

                //Better check for now, instead of columns: See if the zip code is in the right place
                //if (c.length != COLS) {
                if ( !/^\d\d\d\d\d$/.test(u_zip) ) {

                    var clength = c.length;

                    navigator.clipboard.writeText(`TEST DATA	john.doe.wiley.jane1938@gmail.com	Jim	Doe	4/15/1938	7328679420	9.75 River Rd	Highland Park	New Jersey	08904	Male	Male	None of the Above		Obesity	No	No	<strong>Remember to copy the real data into your clipboard when you're scheduling!</strong>						`).then( c => {

                        alert(`You do not appear to have the data you need in your clipboard. (Zip code expected in column ${IDX["zip"]}, but not found.) Dummy data 'Jim Doe' has just been copied.`);

                        //[EMAIL, FNAME, LNAME, BDAY, PHONE, ADDR, CITY, STATE, ZIP, SEX, GEN, OCC, EMP, HEALTH, NOTES] = DEFAULT_COLS;

                        IDX = {}; for (var i in DEFAULT_IDX) IDX[i] = DEFAULT_IDX[i];

                        pause(500).then(function () {
                            button.click();
                        });

                    } );

                    return;
                    
                }
                
                
                //Email (already OK)
                var u_email = c[IDX["email"]];

                //First Name
                var u_fname = c[IDX["fname"]];

                //Last Name
                var u_lname = c[IDX["lname"]];
                
                //Birthday
                var u_bday = c[IDX["bday"]];

                //Let's break it down to its constituent parts
                var u_bday_arr = u_bday.split('/');
                var u_bday_MMDDYYYY = u_bday_arr[0].padStart(2,"0")+u_bday_arr[1].padStart(2,"0")+u_bday_arr[2];
                var u_bday_MM_DD_YYYY = u_bday_arr[0].padStart(2,"0")+'/'+u_bday_arr[1].padStart(2,"0")+'/'+u_bday_arr[2];;
                var u_bday_Month = FMONTH[parseInt(u_bday_arr[0])];
                var u_bday_Mon = u_bday_Month.substr(0,3);
                var u_bday_M = u_bday_arr[0];
                var u_bday_MM = u_bday_arr[0].padStart(2,"0");
                var u_bday_D = u_bday_arr[1];
                var u_bday_DD = u_bday_arr[1].padStart(2,"0");
                var u_bday_YYYY = u_bday_arr[2];

                //Phone Number (ok so far)
                var u_phone = c[IDX["phone"]];

                //Address
                var u_address = c[IDX["addr"]];
                var u_address_2; 
                    if (IDX["addr2"] == -1) u_address_2 = "";
                    else u_address_2 = c[IDX["addr2"]];

                //City
                var u_city = c[IDX["city"]];

                //State
                var u_state_name;
                var u_state_code;

                const stateNames = {
                    "AL": "Alabama",
                    "AK": "Alaska",
                    "AS": "American Samoa",
                    "AZ": "Arizona",
                    "AR": "Arkansas",
                    "CA": "California",
                    "CO": "Colorado",
                    "CT": "Connecticut",
                    "DE": "Delaware",
                    "DC": "District Of Columbia",
                    "FM": "Federated States Of Micronesia",
                    "FL": "Florida",
                    "GA": "Georgia",
                    "GU": "Guam",
                    "HI": "Hawaii",
                    "ID": "Idaho",
                    "IL": "Illinois",
                    "IN": "Indiana",
                    "IA": "Iowa",
                    "KS": "Kansas",
                    "KY": "Kentucky",
                    "LA": "Louisiana",
                    "ME": "Maine",
                    "MH": "Marshall Islands",
                    "MD": "Maryland",
                    "MA": "Massachusetts",
                    "MI": "Michigan",
                    "MN": "Minnesota",
                    "MS": "Mississippi",
                    "MO": "Missouri",
                    "MT": "Montana",
                    "NE": "Nebraska",
                    "NV": "Nevada",
                    "NH": "New Hampshire",
                    "NJ": "New Jersey",
                    "NM": "New Mexico",
                    "NY": "New York",
                    "NC": "North Carolina",
                    "ND": "North Dakota",
                    "MP": "Northern Mariana Islands",
                    "OH": "Ohio",
                    "OK": "Oklahoma",
                    "OR": "Oregon",
                    "PW": "Palau",
                    "PA": "Pennsylvania",
                    "PR": "Puerto Rico",
                    "RI": "Rhode Island",
                    "SC": "South Carolina",
                    "SD": "South Dakota",
                    "TN": "Tennessee",
                    "TX": "Texas",
                    "UT": "Utah",
                    "VT": "Vermont",
                    "VI": "Virgin Islands",
                    "VA": "Virginia",
                    "WA": "Washington",
                    "WV": "West Virginia",
                    "WI": "Wisconsin",
                    "WY": "Wyoming"
                };

                const stateCodes = {
                    'Alabama': 'AL',
                    'Alaska': 'AK',
                    'American Samoa': 'AS',
                    'Arizona': 'AZ',
                    'Arkansas': 'AR',
                    'California': 'CA',
                    'Colorado': 'CO',
                    'Connecticut': 'CT',
                    'Delaware': 'DE',
                    'District Of Columbia': 'DC',
                    'Federated States Of Micronesia': 'FM',
                    'Florida': 'FL',
                    'Georgia': 'GA',
                    'Guam': 'GU',
                    'Hawaii': 'HI',
                    'Idaho': 'ID',
                    'Illinois': 'IL',
                    'Indiana': 'IN',
                    'Iowa': 'IA',
                    'Kansas': 'KS',
                    'Kentucky': 'KY',
                    'Louisiana': 'LA',
                    'Maine': 'ME',
                    'Marshall Islands': 'MH',
                    'Maryland': 'MD',
                    'Massachusetts': 'MA',
                    'Michigan': 'MI',
                    'Minnesota': 'MN',
                    'Mississippi': 'MS',
                    'Missouri': 'MO',
                    'Montana': 'MT',
                    'Nebraska': 'NE',
                    'Nevada': 'NV',
                    'New Hampshire': 'NH',
                    'New Jersey': 'NJ',
                    'New Mexico': 'NM',
                    'New York': 'NY',
                    'North Carolina': 'NC',
                    'North Dakota': 'ND',
                    'Northern Mariana Islands': 'MP',
                    'Ohio': 'OH',
                    'Oklahoma': 'OK',
                    'Oregon': 'OR',
                    'Palau': 'PW',
                    'Pennsylvania': 'PA',
                    'Puerto Rico': 'PR',
                    'Rhode Island': 'RI',
                    'South Carolina': 'SC',
                    'South Dakota': 'SD',
                    'Tennessee': 'TN',
                    'Texas': 'TX',
                    'Utah': 'UT',
                    'Vermont': 'VT',
                    'Virgin Islands': 'VI',
                    'Virginia': 'VA',
                    'Washington': 'WA',
                    'West Virginia': 'WV',
                    'Wisconsin': 'WI',
                    'Wyoming': 'WY'
                };

                c[IDX["state"]] = c[IDX["state"]].trim();

                //Check if the State is properly formed
                if ( stateCodes[c[IDX["state"]]] == undefined && stateNames[c[IDX["state"]]] == undefined ) {
                    alert(`The State "${c[IDX["state"]]}" is improperly spelled or is in the wrong field. Please check your user's data and try again.`);
                    return;
                }

                if (c[IDX["state"]].length > 2) {
                    u_state_name = c[IDX["state"]];
                    u_state_code = stateCodes[u_state_name];
                }
                else {
                    u_state_code = c[IDX["state"]];
                    u_state_name = stateNames[u_state_code];
                }

                //Sex
                if (IDX["sex"] == -1) IDX["sex"] = IDX["gen"];
                var u_sex = _(c[IDX["sex"]]);
                if ( u_sex == "M") u_sex = "Male";
                else if ( u_sex == "F") u_sex = "Female";
                else if ( u_sex == "O") u_sex = "Other";
                
                //Gender
                var u_gender = _(c[IDX["gen"]]);
                if (u_gender == "M") u_gender = "Male";
                else if (u_gender == "F") u_gender = "Female";
                else if (u_gender == "O") u_gender = "Other";

                //Occupation
                var u_occupation = IDX["occ"] != -1 ? _(c[IDX["occ"]]) : "None of the above";

                //Employer
                var u_employer = IDX["emp"] != -1 ? _(c[IDX["emp"]]) : "Employer";
                
                //Health Conditions
                var u_health_conditions = IDX["health"] != -1 ? _(c[IDX["health"]]) : "None of the above";
                
                //Notes
                var u_notes = IDX["notes"] != -1 ? _(c[IDX["notes"]]) : "";
                var u_notes_2 = IDX["notes2"] != -1 ? _(c[IDX["notes2"]]) : "";
                var u_notes_3 = IDX["notes3"] != -1 ? _(c[IDX["notes3"]]) : "";
                var u_notes_4 = IDX["notes4"] != -1 ? _(c[IDX["notes4"]]) : "";

                var u_temp_password = "Volunteer1!";

                //Availability grid
                var u_a_sun = IDX["a_sun"] != -1 ? c[IDX["a_sun"]] : null;
                var u_a_mon = IDX["a_mon"] != -1 ? c[IDX["a_mon"]] : null;
                var u_a_tue = IDX["a_tue"] != -1 ? c[IDX["a_tue"]] : null;
                var u_a_wed = IDX["a_wed"] != -1 ? c[IDX["a_wed"]] : null;
                var u_a_thu = IDX["a_thu"] != -1 ? c[IDX["a_thu"]] : null;
                var u_a_fri = IDX["a_fri"] != -1 ? c[IDX["a_fri"]] : null;
                var u_a_sat = IDX["a_sat"] != -1 ? c[IDX["a_sat"]] : null;


                //Display name of person the data is from
                q('#COVID-TARGET').innerHTML = "<strong><em>" + u_fname + " " + u_lname + "</em></strong>";

                //Check if there are any considerations
                if (u_notes.length   > 0) q('#COVID-TARGET').innerHTML += "<br><em>" + u_notes   + "</em>";
                if (u_notes_2.length > 0) q('#COVID-TARGET').innerHTML += "<br><em>" + u_notes_2 + "</em>";
                if (u_notes_3.length > 0) q('#COVID-TARGET').innerHTML += "<br><em>" + u_notes_3 + "</em>";
                if (u_notes_4.length > 0) q('#COVID-TARGET').innerHTML += "<br><em>" + u_notes_4 + "</em>";


                //Display availability grid -- pending
                //This feature's gonna rock.


                //Set datastate
                q('#covidInjectionConsoleDataState').innerHTML = JSON.stringify({
                    "u_email":u_email, "u_fname":u_fname, "u_lname":u_lname,
                    "u_bday":u_bday, "u_phone":u_phone, 
                    "u_address":u_address, "u_address_2":u_address_2,
                    "u_city":u_city, "u_state_name":u_state_name, "u_state_code":u_state_code, "u_zip":u_zip,
                    "u_sex":u_sex, "u_gender":u_gender, "u_occupation":u_occupation, "u_health_conditions":u_health_conditions,
                    "u_notes":u_notes, "u_notes_2":u_notes_2, "u_notes_3":u_notes_3, "u_notes_4":u_notes_4,
                    "u_a_sun":u_a_sun, "u_a_mon":u_a_mon, "u_a_tue":u_a_tue, "u_a_wed":u_a_wed, 
                    "u_a_thu":u_a_thu, "u_a_fri":u_a_fri, "u_a_sat":u_a_sat
                }).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');



                //Link up output button
                q('#covidInjectionOutput_copy').addEventListener("click",() => {

                    //Grab output data
                    var od = {
                        vac_vol     : q('#covidInjectionOutput_vac_vol').value,
                        vac_type    : q('#covidInjectionOutput_vac_type').value,
                        vac_date    : q('#covidInjectionOutput_vac_loc').value,
                        vac_date_2  : q('#covidInjectionOutput_vac_date').value,
                        vac_loc     : q('#covidInjectionOutput_vac_date_2').value
                    };

                    //Find largest index
                    let bigindex = -1;
                    for (var i in ODX) if (ODX[i] > bigindex) bigindex = ODX[i];

                    let clipdata = new Array(bigindex+1);

                    for (var i in ODX) {

                        if (c[IDX[i]] == null) {

                            if (od[i] == null) alert(`Field ${i} missing! File a bug report.`);
                            else {
                                clipdata[ODX[i]] = od[i];
                            }
                        }
                        else {
                            clipdata[ODX[i]] = c[IDX[i]];
                        }

                    }

                    clipdata = clipdata.join('	');

                    log("Copying to clipboard: " + clipdata);

                    //Save volunteer name to localStorage
                    localStorage.setItem('volunteerName', od["vac_vol"]);

                    navigator.clipboard.writeText(clipdata).then( c => {
                        
                        log("Copied!");

                        q('#covidInjectionOutput_copy').innerHTML = "Copied!";

                        //Messy, but here we go.
                        q('#covidInjectionOutput_copy').style.transitionDuration = "0s";
                        q('#covidInjectionOutput_copy').style.backgroundColor = "#FCC";

                        pause(1000).then(() => {
                            q('#covidInjectionOutput_copy').innerHTML = "Copy Output to Clipboard";
                            q('#covidInjectionOutput_copy').style.transitionDuration = "1s";
                            q('#covidInjectionOutput_copy').style.backgroundColor = "#FFF";
                        });

                    });

                });



                /* 
                    RITEAID
                */
                if (host == "www.riteaid.com") { console.log("RiteAid detected...")

                    if (location.pathname == "/pharmacy/covid-qualifier") {

                        stat('RiteAid Page 1 detected...');

                        //Add in everything to the appropriate fields
                        set("#dateOfBirth",u_bday_MM_DD_YYYY);
                        set("#city",u_city);

                        set("#state",u_state_name);
                        set("#eligibility_state",u_state_name);
                        
                        set("#zip",u_zip);
                        
                        set("#Occupation",u_occupation);
                        set("#occu",u_occupation);

                        set("#mediconditions",u_health_conditions);
                        set("#medcond",u_health_conditions);

                        //Since there are no fields that need manual filling, click next
                        q("#continue").disabled = false;
                        click("#continue");

                        pause(2000).then(() => {

                            //Click forward
                            click("#learnmorebttn");

                        });
                    
                    }
                    else if (location.pathname == "/pharmacy/apt-scheduler") {

                        if (q("#firstName") == null) {
                        
                            stat('RiteAid Page 2 detected. Continue manually until you get to <em>Customer Information</em>, then click here.');
                        
                        }
                        else {

                            stat('RiteAid fields filled out. Continue and review manually. Sign with an X.');

                            //#firstName
                            set("#firstName",u_fname);

                            //#lastName
                            set("#lastName",u_lname);

                            //#dateOfBirth MM/DD/YYYY
                            set("#dateOfBirth",u_bday_MM_DD_YYYY);

                            //#phone
                            set("#phone",u_phone);

                            //#addr1
                            set("#addr1",u_address);

                            //#email
                            set("#email",u_email);

                            //#city
                            set("#city",u_city);

                            //#patient_state
                            set("#patient_state",u_state_name);

                            //#zip
                            set("#zip",u_zip);

                            //ssnNotProvided
                            click("#ssnNotProvided");

                            //#sendReminderEmail
                            click('label[for="sendReminderEmail"]');

                            //Physician details, hide
                            click('.primarycareprovider label.physcian-details__switch');

                            //#continue switch disabled to false
                            q('#continue').setAttribute("disabled","false");

                            //Click to fill. Manually review and continue.

                            //#mi_gender <-- sex assigned at birth
                            if ( u_sex == "Female" ) set("#mi_gender","Female");
                            else if ( u_sex == "Male" ) set("#mi_gender","Male");
                            else set("#mi_gender","Decline to Answer");

                            //#ptHispanic
                            set("#ptHispanic","Unknown ethnicity");
                            //#mi_origin
                            set("#mi_origin","Unknown ethnicity");

                            //#ptRace
                            set("#ptRace","Unknown");
                            //#mi_represents
                            set("#mi_represents","Unknown");


                            //Do you have a long-term health problem with heart disease, kidney disease, metabolic disorder (e.g. diabetes), anemia, or blood disorders?
                            click('#naptHasHealthProblem');

                            //Do you have a long-term health problem with lung disease or asthma?
                            click('#naptHasLungProblem');

                            //Do you use any nicotine products?
                            click('#naptUsesNicotine');

                            //Do you have allergies to medications, food (i.e. eggs), latex or any vaccine component (e.g. neomycin, formaldehyde, gentamicin, thimerosal, bovine protein, phenol, polymyxin, gelatin, baker's yeast or yeast)?
                            click('#naptHasVaxAllergy');

                            //Have you received any vaccinations in the past 4 weeks?
                            click('#naptGotVaxInLast4Weeks');

                            //Have you ever had a serious reaction after receiving a vaccination?
                            click('#naptHasPriorVaxReaction');

                            //Do you have a neurological disorder such as seizures or other disorders that affect the brain or have had a disorder that resulted from vaccine (e.g. Guillain-Barre Syndrome)?
                            click('#naptHasSeizureHistory');

                            //Do you have cancer, leukemia, AIDS, or any other immune system problem? (in some circumstances you may be referred to your physician)
                            click('#naptHasImmuneProblem');

                            //Do you take prednisone, other steroids, or anticancer drugs, or have you had radiation treatments?
                            click('#naptTakesCancerDrugs');

                            //During the past year, have you received a transfusion of blood or blood products, including anti bodies?
                            click('#naptReceivedTransfusion');

                            //Are you parent, family member, or caregiver to a new born infant?
                            click('#naptIsInfantCaregiver');

                            //Are you pregnant or could you become pregnant in the next three months?
                            click('#naptIsPregnant');

                            //Will you bring your Immunization Record Card with you?
                            click('#naptHasImmRecCard');

                            //Are you currently enrolled in one of our medication adherence programs at Rite Aid (OneTrip Refill, Automated Courtesy Refills, or Rx Messaging - Text, Email, Phone)?
                            click('#naptHasMedAdherenceProgram');

                            //Have you had a pneumococcal vaccine? (You may need two different pneumococcal shots)
                            click('#naptHadFluShot');

                            //Have you had a shingles vaccine?
                            click('#naptHadShinglesShot');

                            //Have you had a whooping cough(Tdap/Td) vaccine?
                            click('#naptHadWhoopShot');

                            click('#continue');

                            //// SCREENING AND CONSENT

                            //sign manually



                        }

                    }
                    else {

                        stat(`RiteAid detected.<br><strong>ERROR:</strong> Unknown pathname "${location.pathname}".`);

                    }

                } //END RiteAid
                

                /*
                    CVS
                */
                else if (host == "www.cvs.com") { console.log("CVS detected...");

                    //On: https://www.cvs.com/immunizations/covid-19-vaccine
                    if (location.pathname == "/immunizations/covid-19-vaccine") {

                        stat('●○○○○○○○○○○○○○<br>CVS Page 1 detected...');
                    
                        //Click: a[data-analytics-name="New York"]
                        click('a[data-analytics-name="New York"]');

                        //wait
                        //await pause(500);

                        //Click: a[data-analytics-name="Schedule an appointment now"]
                        click('a[data-analytics-name="Schedule an appointment now"]');

                    }
                    //On: https://www.cvs.com/vaccine/intake/store/covid-screener/covid-qns
                    else if (location.pathname == "/vaccine/intake/store/covid-screener/covid-qns") {

                        stat('●●○○○○○○○○○○○○<br>On CVS Page 2.<br>Click again.');

                        //Click #q7_2
                        click('#q7_2');
                        //Click #q8_2
                        click('#q8_2');
                        //Click #q9_2
                        click('#q9_2');

                        //Click button[_ngcontent-hll-c70]
                        click('button.btn-control');
                   
                    }
                    //On: https://www.cvs.com/vaccine/intake/store/cvd/dose-select
                    else if (location.pathname == "/vaccine/intake/store/cvd/dose-select") {

                        stat('●●●○○○○○○○○○○○<br>On CVS Page 3.<br>Click again.');

                        //Click #customRadio_1
                        click('#customRadio_1');

                        //Click button[_ngcontent-kqo-c72][type="submit"]
                        click('button[type="submit"].btn-control');

                    }
                    //On: https://www.cvs.com/vaccine/intake/store/eligibility-screener/eligibility-covid
                    else if (location.pathname == "/vaccine/intake/store/eligibility-screener/eligibility-covid") {

                        stat('●●●●○○○○○○○○○○<br>On CVS Page 4.<br>Click again.');

                        //Set #jurisdiction
                        q(`option[value*="EID_${u_state_code}"]`).setAttribute("selected","true");

                        //Fire the change event manually
                        q('#jurisdiction').dispatchEvent(new Event('change'));

                        //Click button!
                        click('button[type="submit"].btn-control');

                    }
                    //On: https://www.cvs.com/vaccine/intake/store/eligibility-screener/eligibility-qns
                    else if (location.pathname == "/vaccine/intake/store/eligibility-screener/eligibility-qns") {

                        stat('●●●●●○○○○○○○○○<br>On CVS Page 5.<br>Click again.');

                        //Age in #q1_0
                        //Have to calculate it roughly
                        var age = (new Date().getFullYear()) - parseInt(u_bday_YYYY);
                        set('#q1_0',age);

                        //Over 65
                        if (age >= 65) {
                            click('#q20');
                        }

                        //Health conditions
                        else if ( u_health_conditions != "None of the Above" && u_health_conditions != "") {
                            click('#q21');
                        }

                        //Priority group
                        else if ( u_occupation != "None of the Above" && u_occupation != "") {

                            click('#q22');
                            
                            //K-12 & Childcare
                            if ( u_occupation == "Pre-Kindergarten -12th grade Educator & Staff" ) {
                                q('option[value*="Teachers and staff in PreK-12 Schools"]').setAttribute("selected", "true");
                            }
                            //Childcare
                            else if ( u_occupation == "Childcare Worker" 
                                || u_occupation == "Family Childcare Providers"
                            ) {
                                q('option[value*="Childcare centers and staff"]').setAttribute("selected", "true");
                            }
                            //Head Start
                            else if ( u_occupation == "Head Start and Early Head Start" ) {
                                q('option[value*="Head Start"]').setAttribute("selected", "true");
                            }
                            //Healthcare Workers
                            else if ( u_occupation == "Health Care Worker") {
                                q('option[value*="Healthcare workers"]').setAttribute("selected", "true");
                            }
                            //First Responders
                            else if ( u_occupation == "Emergency Medical Services (EMS)"
                                    || u_occupation == "Firefighters"
                                    || u_occupation == "First Responder"
                                    || u_occupation == "Law Enforcement"
                            ) {
                                q('option[value*="First responders including law enforcement"]').setAttribute("selected", "true");
                            }
                            //Transit & Public Safety
                            else if ( u_occupation == "Local Transportation"
                                    || u_occupation == "Public Health Employee"
                                    || u_occupation == "Public Safety Workers"
                                    || u_occupation == "Public Transit Workers"
                            ) {
                                q('option[value*="Transit and public safety worker"]').setAttribute("selected", "true");
                            }
                            //Migrant Farm Workers
                            else if ( u_occupation == "Migrant Farm Workers"
                                    || u_occupation == "Food and Agricultural Workers" 
                            ) {
                                q('option[value*="Migrant Farm Worker"]').setAttribute("selected", "true");
                            }
                            //Tribal
                            else if ( u_occupation == "Members of tribal communities") {
                                q('option[value*="Member of a tribal community"]').setAttribute("selected", "true");
                            }
                            //Homeless
                            else if ( u_occupation == "Persons experiencing homelessness"
                                    || u_occupation == "Persons living in shelters"
                            ) {
                                q('option[value*="Person experiencing homelessness"]').setAttribute("selected", "true");
                            }
                            //Elder Care
                            else if ( u_occupation == "Multigenerational Household"
                            ) {
                                q('option[value*="Elder care and support"]').setAttribute("selected", "true");
                            }
                            //Residents of long-term and high risk congregate care settings
                                // *="Residents of long-term and high risk"
                            //Long Term Care Staff
                            else if ( u_occupation == "Long Term Care Facility Staff") {
                                q('option[value*="Healthcare workers or staff of long-term and"]').setAttribute("selected", "true");
                            }
                            //Warehousing and logistics worker
                                //I don't remember this on the list...
                            //Social Services
                                //Or this either...
                            //Elections personnel
                                //I *have* to be missing something...
                            //Hospitality
                            else if ( u_occupation == "Janitorial Staff") {
                                q('option[value*="Hospitality"]').setAttribute("selected", "true");
                            }
                            //Medical supply chain
                            else if ( u_occupation == "Pharmacy Staff") {
                                q('option[value*="Medical supply chain"]').setAttribute("selected", "true");
                            }
                            //Postal and shipping services
                            else if ( u_occupation == "Airport and Commercial Airlines"
                                    || u_occupation == "Mail Carriers"
                                    || u_occupation == "Postal and Shipping Services"
                                    || u_occupation == "U.S. Postal Service"
                            ) {
                                q('option[value*="Postal and shipping services"]').setAttribute("selected", "true");
                            }
                            //Clergy
                            else if ( u_occupation == "Clergy"
                                    || u_occupation == "Clergy and Other Essential Support for House of Worship"
                            ) {
                                q('option[value*="Clergy"]').setAttribute("selected", "true");
                            }
                            //Judicial system workers
                            else if ( u_occupation == "Judicial Staff"
                                    || u_occupation == "Judiciary"
                            ) {
                                q('option[value*="Judicial system workers"]').setAttribute("selected", "true");
                            }
                            //Higher education workers
                                //ADD
                            //Critical infrastructure workers
                                //ADD
                            //Real estate, building, and home service worker
                                //ADD
                            //Laundry service workers
                                //ADD
                            //Librarians and support staff
                                //ADD
                            //Financial institution workers
                                //ADD
                            

                            //OTHER
                            else {
                                q('option[value*="None of the above"]').setAttribute("selected", "true");
                            }

                            //Fire the change event manually
                            q('#qlist').dispatchEvent(new Event('change'));

                        }

                        //None of the above
                        else {
                            click('#q21'); //Elligible anyways.
                        }

                        //Check if employer field is active
                        if (q('#qtext') != null) {

                            //Fill it.... we need to add EMPLOYER info to the form
                            set('#qtext', u_employer.length > 0 ? u_employer : ".");

                        }

                        //Click #qconsent
                        click('#qconsent');

                        //Click button[_ngcontent-kqo-c76].btn-control
                        click('button.btn-control');

                        
                    }
                    //On: https://www.cvs.com/vaccine/intake/store/cvd/how-to-schedule
                    else if (location.pathname == "/vaccine/intake/store/cvd/how-to-schedule") {

                        stat('●●●●●●○○○○○○○○<br>On CVS Page 6.<br>Click again.');
                        
                        //Click button[_ngcontent-kqo-c74].btn-control
                        click('button.btn-control');

                    }
                    //On: https://www.cvs.com/vaccine/intake/store/cvd-store-select/first-dose-select
                    else if (location.pathname == "/vaccine/intake/store/cvd-store-select/first-dose-select") {

                        //Set #address to Zip Code
                        set('#address',u_zip,['input','compositionend']);

                        //Click button[_ngcontent-kqo-c79]
                        click('button');

                        stat('●●●●●●●○○○○○○○<br>On CVS Page 7.<br>Continue manually until the <em>Please Provide Details</em> screen. Then click here again.');
                    }

                    //Patient info enter
                    else if (location.pathname == "/vaccine/intake/store/patient-info") {

                        stat('●●●●●●●●○○○○○○<br>On CVS Page 8.<br>Continue manually.');

                        //#firstName
                        set('#firstName',u_fname);//,['input','compositionend']);

                        //#lastName
                        set('#lastName',u_lname);//,['input','compositionend']);

                        //#dob -- MMDDYYYY without slashes
                        set('#dob',u_bday_MMDDYYYY.trim(),['input','change','blur','compositionend']);//.value = d1;//.split("/").join("");
                        //q('#dob').dispatchEvent(new Event('input'),{ bubbles: true });
                        //q('#dob').dispatchEvent(new Event('change'));
                        //q('#dob').dispatchEvent(new Event('blur'));
                        //q('#dob').dispatchEvent(new Event('compositionend'));

                        //#customRadio_F checkbox female
                        if ( u_sex == "Female") click("#customRadio_F");
                        //#customRadio_M checkbox male
                        else click("#customRadio_M");

                        //#address
                        set('#address',u_address);

                        //#addressLine2
                        //if (u_address_2.length > 0) set('#addressLine2',u_address_2);

                        //#city
                        set('#city',u_city);

                        //#state dropdown -- we're just gonna assume NJ
                        q(`option[value*="${u_state_code}"]`).setAttribute("selected","true");
                        q('#state').dispatchEvent(new Event('change'));

                        //#zip
                        set('#zip',u_zip);

                        //#email
                        set('#email',u_email);

                        //#phoneNumber -- all digits
                        set('#phoneNumber',u_phone);

                        //click button type="submit"
                        click('button.btn-control');

                    }

                    //Insurance status - assuming none
                    else if (location.pathname == "/vaccine/intake/store/insurance-status") {

                        stat('●●●●●●●●●○○○○○<br>On CVS Page 9.<br>Click again.');
                    
                        //click #customRadio_7
                        click('#customRadio_7');

                        //click button type="submit"
                        click('button.btn-control');
                    }

                    //No insurance screen
                    else if (location.pathname == "/vaccine/intake/store/no-insurance") {

                        stat('●●●●●●●●●●○○○○<br>On CVS Page 10.<br>Click again.');
                    
                        //click #consentText
                        click('#consentText');

                        //click button type="submit"
                        click('button.btn-control');

                    }

                    //Immunization questions
                    else if (location.pathname == "/vaccine/intake/store/qns/imz-qns") {

                        stat('●●●●●●●●●●●○○○<br>On CVS Page 11.<br>Click again.');
                    
                        //click #q2_3
                        click('#q2_3');
                        //click #q3_3
                        click('#q3_3');
                        //click #q4_3
                        click('#q4_3');
                        //click #q5_3
                        click('#q5_3');
                        //click #q6_3
                        click('#q6_3');
                        //click #q7_3
                        click('#q7_3');
                        //click #q11_3
                        click('#q11_3');
                        //click #q12_3
                        click('#q12_3');
                        //click #q13_3
                        click('#q13_3');

                        //click button type="submit"
                        click('button.btn-control');
                        
                    }

                    //Additional questions
                    else if (location.pathname == "/vaccine/intake/store/qns/addl-qns") {

                        stat('●●●●●●●●●●●●○○<br>On CVS Page 12.<br>Click again.');
                    
                        //click #qrace_2131-1
                        click('#qrace_2131-1');

                        //click #qethnicity_U
                        click('#qethnicity_U');

                        //click button type="submit"
                        click('button.btn-control');
                        
                    }

                    //Vaccine review page
                    else if (location.pathname == "/vaccine/intake/store/review") {

                        stat('●●●●●●●●●●●●●○<br>On CVS Page 13.<br>Click again.');

                        //click button type="submit"
                        click('button.btn-control');
                        
                    }

                    //Vaccine consent page
                    else if (location.pathname == "/vaccine/intake/store/consent") {

                        //click #consentText
                        click('#consentText');

                        //click button type="submit"
                        click('button.btn-control');

                        stat('●●●●●●●●●●●●●●<br>On CVS Page 14.<br>Print out confirmation page and save it for your signee\'s records.');
                        
                    }


                    else {

                        stat(`CVS detected.<br><strong>ERROR:</strong> Unknown pathname "${location.pathname}".`);

                    }
                
                } //END CVS



                /*
                    ZocDoc (Handles several portals)
                */
                else if (host == "www.zocdoc.com") {

                    //Patient info URL
                    var pi = "https://www.zocdoc.com/booking/patientinfo/";
                    //Signup URL
                    var pi = "https://www.zocdoc.com/booking/signup/";

                    /*
                        St. Peter's
                    */
                    if (location.pathname == "/wl/saintpeterscovid19vaccinemonroe/practice/65013?reason_visit=5243") {

                        stat('St. Peter\'s Page 1 detected. Continue manually until the Patient Information screen.');

                        pause(1000).then(() => {
                            click(`div#modal-root button[data-test="modal-primary-button"]`);
                        });

                    }

                    //There may be multiples here
                    else if (location.href.substr(0,pi.length) == pi) { log("PatientInfoScreen detected.");

                        //Detect St. Peters...
                        if ( q('img[src="https://d2gmqy7n86tnsf.cloudfront.net/c8beebd4-d6b3-4b40-a066-a3bd3bf819f2/bookingLogo.jpeg"]') != null ) {

                            stat('St. Peter\'s Page 2 detected.');

                            //First name
                            set('input[name="firstName"]',u_fname);

                            //Last name
                            set('input[name="lastName"]',u_lname);

                            let bd = d.split("/");

                            //Birth Month
                            set('input[name="birthMonth"]',u_bday_M);

                            //Birth Month
                            set('input[name="birthDay"]',u_bday_D);

                            //Birth Year
                            set('input[name="birthYear"]',u_bday_YYYY);

                            //Male/female
                            if ( u_sex == "Male" )      click('input[value="male"]');
                            else                        click('input[value="female"]');

                            //Wait and submit
                            pause(500).then( () => {
                                click('div[class^="PatientInfoPageView"] button[type="submit"]');
                            });
                        }

                        else if (location.href.substr(0,pi.length) == pi) { log("Signup screen detected.");

                            stat('St. Peter\'s Page 3 detected. Form autofilled. Click "Review and book" when ready.');

                            //Email
                            set('input[name="email"]',u_email);
                            set('input[name="confirmEmail"]',u_email);

                            //Password
                            set('input[name="password"]',u_temp_password);

                            //TOS
                            click('input[name="termsOfService"]');

                            //Uncheck keep me logged in
                            click('input[name="rememberMe"]');

                        }

                    }

                }


                /*
                    Curogram - VNA of Central Jersey, Inc.
                */
                else if (host == "curogram.com") {
                    
                    //Extract which step it is
                    var step = parseInt(q('div.step-header').innerText.split(" ")[1].split(' ')[0]);
                    var title = q('div.step-header').innerText.split(", ")[1].trim();

                    stat(`Curogram VNA Step ${step} : ${title} detected.`);

                    if (title === "Language Selection") {

                        //Select English
                        click('.languages .language');

                        //Queue up next prompt
                        stat(`Curogram VNA Language Selection filled out.<br>Click here again.`);

                    }
                    else if (title === "Introduction") {

                        //Select Get Started
                        click('button.btn-nephritis');

                        //Queue up next prompt
                        stat(`Curogram VNA Introduction bypassed.<br>Select a time slot, then click here again.`);

                    }
                    else if (title === "Pick A Time Slot") {

                        //Queue up next prompt
                        stat(`Curogram VNA Time Slot Screen detected.<br>Select a time slot, then click here again.`);

                    }
                    else if (title === "Identification" && (step < 5)) { //Phone number
                        
                        //Input first name
                        set('input[type="tel"]',u_phone);

                        //Click next
                        click('button.btn-nephritis');

                        //Queue up next prompt
                        stat(`Curogram VNA Phone Number Entered.<br>Click here again.`);

                    }
                    else if (title === "Demographics") { //Demographics

                        //Input first name
                        set('input[name="firstname"]',u_fname);

                        //Input last name
                        set('input[name="lastname"]',u_lname);

                        //DOB -- !!! Insane
                        //Month
                        //document.querySelectorAll('ng-select input')[0].value = u_bday_Month;
                        //document.querySelectorAll('ng-select input')[0].dispatchEvent(new Event('input'),{ bubbles: true });
                        //document.querySelector('ng-select .ng-option-marked').click();
                        setqai('ng-select input', 0, u_bday_Month);
                        click('ng-select .ng-option-marked');

                        //Day
                        //document.querySelectorAll('ng-select input')[1].value = u_bday_D
                        //document.querySelectorAll('ng-select input')[1].dispatchEvent(new Event('input'),{ bubbles: true });
                        //document.querySelector('ng-select .ng-option-marked').click();
                        setqai('ng-select input', 1, u_bday_D);
                        click('ng-select .ng-option-marked');

                        //Year YYYY
                        //document.querySelectorAll('ng-select input')[2].value = u_bday_YYYY;
                        //document.querySelectorAll('ng-select input')[2].dispatchEvent(new Event('input'),{ bubbles: true });
                        //document.querySelector('ng-select .ng-option-marked').click();
                        setqai('ng-select input', 2, u_bday_YYYY);
                        click('ng-select .ng-option-marked');

                        //Input email
                        set('input[type="email"]',u_email);

                        //Sex
                        //document.querySelectorAll('ng-select input')[3].value = u_sex
                        //document.querySelectorAll('ng-select input')[3].dispatchEvent(new Event('input'),{ bubbles: true });
                        //document.querySelector('ng-select .ng-option-marked').click();
                        setqai('ng-select input', 3, u_sex);
                        click('ng-select .ng-option-marked');

                        //Race
                        //document.querySelectorAll('ng-select input')[4].value = "Prefer not to say";
                        //document.querySelectorAll('ng-select input')[4].dispatchEvent(new Event('input'),{ bubbles: true });
                        //document.querySelector('ng-select .ng-option-marked').click();
                        setqai('ng-select input', 4, "Prefer not to say");
                        click('ng-select .ng-option-marked');

                        //Ethnicity (assuming not Hispanic –– we don't collect this)
                        //document.querySelectorAll('ng-select input')[5].value = "Not Hispanic";
                        //document.querySelectorAll('ng-select input')[5].dispatchEvent(new Event('input'),{ bubbles: true });
                        //document.querySelector('ng-select .ng-option-marked').click();
                        setqai('ng-select input', 5, "Not Hispanic");
                        click('ng-select .ng-option-marked');

                        //Click next
                        click('button.btn-nephritis');

                        //Queue up next prompt
                        stat(`Curogram VNA Demographics entered.<br>Click here again.`);

                    }
                    else if (title === "Patient Address") { //Address

                        //Current address
                        //document.querySelectorAll('input[type="radio"]')[2].click();
                        clickqai('input[type="radio"]',2);

                        //Address
                        set('input[name="address"]',u_address);

                        //City
                        set('input[name="city"]',u_city);

                        //State
                        //document.querySelectorAll('ng-select input')[0].value = u_state_code;
                        //document.querySelectorAll('ng-select input')[0].dispatchEvent(new Event('input'),{ bubbles: true });
                        //document.querySelector('ng-select .ng-option-marked').click();
                        setqai('ng-select input',0,u_state_code);
                        click('ng-select .ng-option-marked');

                        //Zipcode
                        set('input[name="zip"]',u_zip);

                        //Click next
                        click('button.btn-nephritis');

                        //Queue up next prompt
                        stat(`Curogram VNA Address entered.<br>Click here again.`);

                    }
                    else if (title === "Screening") { //Screening

                        //Not sick
                        //document.querySelectorAll('input[type="radio"]')[1].click();
                        clickqai('input[type="radio"]',1);

                        //No allergies
                        //document.querySelectorAll('input[type="radio"]')[3].click();
                        clickqai('input[type="radio"]',3);

                        //Vaccine reaction
                        //document.querySelectorAll('input[type="radio"]')[5].click();
                        clickqai('input[type="radio"]',5);

                        //Blood thinner
                        //document.querySelectorAll('input[type="radio"]')[7].click();
                        clickqai('input[type="radio"]',7);

                        //Immunocompromised
                        //document.querySelectorAll('input[type="radio"]')[9].click();
                        clickqai('input[type="radio"]',9);

                        //Antibody therapy
                        //document.querySelectorAll('input[type="radio"]')[11].click();
                        clickqai('input[type="radio"]',11);

                        //Pregnant
                        //document.querySelectorAll('input[type="radio"]')[13].click();
                        clickqai('input[type="radio"]',13);

                        //Breast feeding
                        //document.querySelectorAll('input[type="radio"]')[15].click();
                        clickqai('input[type="radio"]',15);

                        //Don't currently have covid
                        //document.querySelectorAll('input[type="radio"]')[17].click();
                        clickqai('input[type="radio"]',17);

                        //Yes! Gimmie the vaccine! (click last as "YES!")
                        let yes = document.querySelectorAll('input[type="radio"]').length-2;
                        //document.querySelectorAll('input[type="radio"]')[yes].click();
                        clickqai('input[type="radio"]',yes);

                        //Click next
                        click('button.btn-nephritis');

                        //Queue up next prompt
                        stat(`Curogram VNA Screening info entered.<br>Click here again.`);

                    }
                    else if (title === "Disability") {

                        //Click skip!
                        click('button.btn-outline-nephritis');

                        //Queue up next prompt
                        stat(`Curogram VNA Disability skipped.<br>Click here again.`);

                    }
                    else if (title === "Insurance Info") {

                        //Figure out insurance later
                        //document.querySelectorAll('div.checkbox')[1].click();
                        clickqai('div.checkbox',1);

                        //Click next
                        click('button.btn-nephritis');

                        //Queue up next prompt
                        stat(`Curogram VNA Insurance info bypassed.<br>Click here again.`);

                    }
                    else if (title === "Identification") {

                        //Click skip!
                        click('button.btn-outline-nephritis');

                        //Queue up next prompt
                        stat(`Curogram VNA Identification skipped.<br>Click here again.`);

                    }
                    else if (title === "Consent") {

                        //Read and accept
                        if (q('#checkbox1')) click('#checkbox1');
                        if (q('#checkbox2')) click('#checkbox2');

                        //Queue up next prompt
                        stat(`Curogram VNA Consent checked.<br>Sign with an X and continue manually.`);

                    }
                    else {

                        stat(`Curogram VNA detected.<br>Continue manually.`);

                    }
                
                }//END VNA

            });

        } catch(e) {
            q('#COVID-STATUS').innerHTML = `<strong>ERROR: ${e.name}</strong> - ${e.message}`;
        } 
        
        }//end function

        //Push the button! -- https://www.youtube.com/watch?v=v57i1Ze0jB8
        button.click();

    }

    //Place it in a global object so we can use it with the bookmarklet
    window.COVID = {
        inject : inject
    };

})();


/*


<ul class="typeahead__list"><li class="typeahead__item typeahead__group-group" data-group="group" data-index="0"><a href="javascript:;">Airport and Commercial Airlines</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="1"><a href="javascript:;">Childcare Worker</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="2"><a href="javascript:;">Clergy</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="3"><a href="javascript:;">Clergy and Other Essential Support for House of Worship</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="4"><a href="javascript:;">Correctional Officers</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="5"><a href="javascript:;">Emergency Medical Services (EMS)</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="6"><a href="javascript:;">Essential Worker</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="7"><a href="javascript:;">Family Childcare Providers</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="8"><a href="javascript:;">Firefighters</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="9"><a href="javascript:;">First Responder</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="10"><a href="javascript:;">Food and Agricultural Workers</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="11"><a href="javascript:;">Funeral Services</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="12"><a href="javascript:;">Grocery Workers</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="13"><a href="javascript:;">Head Start and Early Head Start</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="14"><a href="javascript:;">Health Care Worker</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="15"><a href="javascript:;">Janitorial Staff</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="16"><a href="javascript:;">Judicial Staff</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="17"><a href="javascript:;">Judiciary</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="18"><a href="javascript:;">Law Enforcement</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="19"><a href="javascript:;">Local Transportation</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="20"><a href="javascript:;">Long Term Care Facility Staff</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="21"><a href="javascript:;">Mail Carriers</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="22"><a href="javascript:;">Manufacturing Workers</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="23"><a href="javascript:;">Members of tribal communities</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="24"><a href="javascript:;">Migrant Farm Workers</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="25"><a href="javascript:;">Multigenerational Household</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="26"><a href="javascript:;">Persons experiencing homelessness</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="27"><a href="javascript:;">Persons living in shelters</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="28"><a href="javascript:;">Pharmacy Staff</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="29"><a href="javascript:;">Postal and Shipping Services</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="30"><a href="javascript:;">Pre-Kindergarten -12th grade Educator &amp; Staff</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="31"><a href="javascript:;">Public Health Employee</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="32"><a href="javascript:;">Public Safety Workers</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="33"><a href="javascript:;">Public Transit Workers</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="34"><a href="javascript:;">Sickle Cell Disease</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="35"><a href="javascript:;">U.S. Postal Service</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="36"><a href="javascript:;">Veterinarians and Support Staff</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="37"><a href="javascript:;">None of the Above</a></li></ul>


*/