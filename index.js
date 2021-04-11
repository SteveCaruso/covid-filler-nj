/*

This is to help sign folks up for CoVID vaccines from a variety of places.

It's a *snicker* JavaScript injection... :-)

*/

(function() {

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
    async function inject(colOrder) {

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
        var el = document.getElementById.bind(document);
        var q = document.querySelector.bind(document);

        //List of supported hosts
        const supported = [
            "www.riteaid.com",
            "www.cvs.com",
            "www.zocdoc.com",
            "curogram.com"
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
        var EMAIL = 1;
        var FNAME = 2;
        var LNAME = 3;
        var BDAY = 4;
        var PHONE = 5;
        var ADDR = 6;
        var CITY = 7;
        var STATE = 8;
        var ZIP = 9;
        var SEX = 10;
        var GEN = 11;
        var OCC = 12;
        var EMP = 13;
        var HEALTH = 14;
        var NOTES = 17;

        const DEFAULT_COLS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,17];

        //If different columns are passed, set them
        if (colOrder) {
            [EMAIL, FNAME, LNAME, BDAY, PHONE, ADDR, CITY, STATE, ZIP, SEX, GEN, OCC, EMP, HEALTH, NOTES] = colOrder;
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
            button.style.width="250px";
            button.style.position = "fixed";
            button.style.left="10px";
            button.style.top="10px";
            button.style.border="3px solid red";
            button.style.zIndex = 10000;
            button.style.borderRadius = "5px";
            button.style.boxShadow = "5px 5px 5px 5px rgba(0,0,0,.5)";
            button.style.whiteSpace = "normal !important";
            //button.style.overflowWrap = "";
        
            //Inject the button into the document
            document.body.appendChild(button);
        }

        //Add the function that fires when that button is clicked
        button.onclick = function() { try {

            //Snag the clipboard
            navigator.clipboard.readText().then( c => {

                //Split the clipboard data by the delimiter
                c = c.split(DELIM);

                //Better check for now, instead of columns: See if the zip code is in the right place
                //if (c.length != COLS) {
                if ( !/^\d\d\d\d\d$/.test(c[ZIP]) ) {

                    var clength = c.length;

                    navigator.clipboard.writeText(`TEST DATA	john.doe.wiley.jane1938@gmail.com	Jim	Doe	4/15/1938	7328679420	9.75 River Rd	Highland Park	New Jersey	08904	Male	Male	None of the Above		Obesity	No	No	<strong>Remember to copy the real data into your clipboard when you're scheduling!</strong>						`).then( c => {

                        alert(`You do not appear to have the data you need in your clipboard. (Zip code expected in column ${c[ZIP]}, but not found.) Dummy data 'Jim Doe' has just been copied.`);

                        [EMAIL, FNAME, LNAME, BDAY, PHONE, ADDR, CITY, STATE, ZIP, SEX, GEN, OCC, EMP, HEALTH, NOTES] = DEFAULT_COLS;

                        pause(500).then(button.click);

                    } );

                    return;
                    
                }

                //Detect language
                //figure that out...

                //Display name of person the data is from
                q('#COVID-TARGET').innerHTML = "<strong><em>" + c[FNAME] + " " + c[LNAME] + "</em></strong>";

                //Check if there are any considerations
                if (c[NOTES].length > 0) {
                    q('#COVID-TARGET').innerHTML += "<br>(<em>" + c[NOTES] + "</em>)";
                }


                //Here we need to tease out the given data into whatever different formats we may need

                
                
                //Email
                //First Name
                //Last Name
                //Birthday
                //Phone Number
                //Address
                //City
                //State
                //Zip
                //Sex
                if (SEX == -1) SEX = GEN;
                //Gender
                //Occupation
                if (OCC == -1) {
                    OCC = c.length;
                    c.push("None of the Above");
                }
                //Employer
                if (EMP == -1) {
                    EMP = c.length;
                    c.push("Employer");
                }
                //Health Conditions
                if (HEALTH == -1) {
                    HEALTH = c.length;
                    c.push("None of the Above");
                }
                //Notes
                if (NOTES == -1) {
                    NOTES = c.length;
                    c.push("");
                }


                //Add a version of the birthdate so that it has leading zeroes
                //A number of sites want it this way...
                var d1; var d2;
                var d = c[BDAY].split('/');
                    console.log(d);
                    d1 = d[0].padStart(2,"0")+d[1].padStart(2,"0")+d[2];
                    d2 = d;
                    d = d[0].padStart(2,"0")+'/'+d[1].padStart(2,"0")+'/'+d[2];



                /* 
                    RITEAID
                */
                if (host == "www.riteaid.com") { console.log("RiteAid detected...")

                    if (location.pathname == "/pharmacy/covid-qualifier") {

                        q('#COVID-STATUS').innerHTML = 'RiteAid Page 1 detected...';

                        //Add in everything to the appropriate fields
                        q("#dateOfBirth").value =           d;
                        q("#city").value =                  c[CITY];
                        q("#state").value =                 c[STATE];
                        q("#eligibility_state").value =     c[STATE];
                        q("#zip").value =                   c[ZIP];
                        
                        q("#Occupation").value =            _(c[OCC]);
                        q("#occu").value =                  _(c[OCC]);

                        q("#mediconditions").value =        _(c[HEALTH]);
                        q("#medcond").value =               _(c[HEALTH]);

                        //Since there are no fields that need manual filling, click next
                        q("#continue").disabled = false;
                        q("#continue").click();

                        pause(2000).then(() => {

                            //Click forward
                            q("#learnmorebttn").click();

                        });
                    
                    }
                    else if (location.pathname == "/pharmacy/apt-scheduler") {

                        if (q("#firstName") == null) {
                        
                            q('#COVID-STATUS').innerHTML = 'RiteAid Page 2 detected. Continue manually until you get to <em>Customer Information</em>, then click here.';
                        
                        }
                        else {

                            q('#COVID-STATUS').innerHTML = 'RiteAid fields filled out. Continue and review manually. Sign with an X.';

                            //Click to fill. Review and manually continue.

                            //#firstName
                            q("#firstName").value = c[FNAME];

                            //#lastName
                            q("#lastName").value = c[LNAME];

                            //#dateOfBirth MM/DD/YYYY
                            q("#dateOfBirth").value = d;

                            //#phone
                            q("#phone").value = c[PHONE];

                            //#addr1
                            q("#addr1").value = c[ADDR];

                            //#email
                            q("#email").value = c[EMAIL];

                            //#city
                            q("#city").value = c[CITY];

                            //#patient_state
                            q("#patient_state").value = "New Jersey";

                            /*
<ul class="typeahead__list"><li class="typeahead__item typeahead__group-group" data-group="group" data-index="0"><a href="javascript:;">Alaska</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="1"><a href="javascript:;">Alabama</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="2"><a href="javascript:;">Arkansas</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="3"><a href="javascript:;">Arizona</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="4"><a href="javascript:;">California</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="5"><a href="javascript:;">Colorado</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="6"><a href="javascript:;">Connecticut</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="7"><a href="javascript:;">District Of Columbia</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="8"><a href="javascript:;">Delaware</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="9"><a href="javascript:;">Florida</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="10"><a href="javascript:;">Georgia</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="11"><a href="javascript:;">Hawaii</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="12"><a href="javascript:;">Iowa</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="13"><a href="javascript:;">Idaho</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="14"><a href="javascript:;">Illinois</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="15"><a href="javascript:;">Indiana</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="16"><a href="javascript:;">Kansas</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="17"><a href="javascript:;">Kentucky</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="18"><a href="javascript:;">Louisiana</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="19"><a href="javascript:;">Massachusetts</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="20"><a href="javascript:;">Maryland</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="21"><a href="javascript:;">Maine</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="22"><a href="javascript:;">Michigan</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="23"><a href="javascript:;">Minnesota</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="24"><a href="javascript:;">Missouri</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="25"><a href="javascript:;">Mississippi</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="26"><a href="javascript:;">Montana</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="27"><a href="javascript:;">North Carolina</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="28"><a href="javascript:;">North Dakota</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="29"><a href="javascript:;">Nebraska</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="30"><a href="javascript:;">New Hampshire</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="31"><a href="javascript:;">New Jersey</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="32"><a href="javascript:;">New Mexico</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="33"><a href="javascript:;">Nevada</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="34"><a href="javascript:;">New York</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="35"><a href="javascript:;">Ohio</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="36"><a href="javascript:;">Oklahoma</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="37"><a href="javascript:;">Oregon</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="38"><a href="javascript:;">Pennsylvania</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="39"><a href="javascript:;">Rhode Island</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="40"><a href="javascript:;">South Carolina</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="41"><a href="javascript:;">South Dakota</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="42"><a href="javascript:;">Tennessee</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="43"><a href="javascript:;">Texas</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="44"><a href="javascript:;">Utah</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="45"><a href="javascript:;">Virginia</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="46"><a href="javascript:;">Vermont</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="47"><a href="javascript:;">Washington</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="48"><a href="javascript:;">Wisconsin</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="49"><a href="javascript:;">West Virginia</a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="50"><a href="javascript:;">Wyoming</a></li></ul>
                            */

                            //#zip
                            q("#zip").value = c[ZIP];

                            //#sendReminderEmail
                            q('label[for="sendReminderEmail"]').click();

                            //Physician details, hide
                            q('.primarycareprovider label.physcian-details__switch').click();

                            //#continue switch disabled to false
                            q('#continue').setAttribute("disabled","false");

                            //Click to fill. Manually review and continue.

                            //#mi_gender <-- sex assigned at birth
                            if ( _(c[SEX]) == "Female" ) q("#mi_gender").value = "Female";
                            else if ( _(c[SEX]) == "Male" ) q("#mi_gender").value = "Male";
                            else q("#mi_gender").value = "Decline to Answer";
                            /*

<input type="text" class="medical-information__gender form__input error" id="mi_gender" name="mi_gender" aria-label="Select Gender" autocomplete="false" ptsexassignedatbirth="true">

<ul class="typeahead__list"><li class="typeahead__item typeahead__group-group" data-group="group" data-index="0"><a href="javascript:;"><span class="typeahead__display">Decline to Answer</span></a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="1"><a href="javascript:;"><span class="typeahead__display">Female</span></a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="2"><a href="javascript:;"><span class="typeahead__display">Male</span></a></li></ul>

                            */

                            //#ptWeight  <-- weight if less than 110 lbs
                            //Ignore

                            //#mi_origin <-- latino
                            /*

<input type="text" class="medical-information__origin form__input" id="mi_origin" name="mi_origin" aria-label="Select Race" autocomplete="false" pthispanic="true">

<ul class="typeahead__list"><li class="typeahead__item typeahead__group-group" data-group="group" data-index="0"><a href="javascript:;"><span class="typeahead__display">Hispanic or Latino</span></a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="1"><a href="javascript:;"><span class="typeahead__display">Not Hispanic or Latino</span></a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="2"><a href="javascript:;"><span class="typeahead__display">Unknown ethnicity</span></a></li></ul>
*/

                            /*
<input type="text" class="medical-information__represents form__input error" id="mi_represents" name="mi_represents" aria-label="Select Hispanic" autocomplete="false" ptrace="true">

<ul class="typeahead__list"><li class="typeahead__item typeahead__group-group" data-group="group" data-index="0"><a href="javascript:;"><span class="typeahead__display">American Indian or Alaska Native</span></a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="1"><a href="javascript:;"><span class="typeahead__display">Asian</span></a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="2"><a href="javascript:;"><span class="typeahead__display">Black or African American</span></a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="3"><a href="javascript:;"><span class="typeahead__display">Native Hawaiian or Other Pacific Islander</span></a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="4"><a href="javascript:;"><span class="typeahead__display">White</span></a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="5"><a href="javascript:;"><span class="typeahead__display">Other</span></a></li><li class="typeahead__item typeahead__group-group" data-group="group" data-index="6"><a href="javascript:;"><span class="typeahead__display">Unknown</span></a></li></ul>
                            */


                            //Do you have a long-term health problem with heart disease, kidney disease, metabolic disorder (e.g. diabetes), anemia, or blood disorders?

                            //#ysptHasHealthProblem yes click?
                            //#noptHasHealthProblem no click?
                            //#naptHasHealthProblem don't know click?
                            q('#naptHasHealthProblem').click();

                            //Do you have a long-term health problem with lung disease or asthma?

                            //#ysptHasLungProblem
                            //#noptHasLungProblem
                            //#naptHasLungProblem
                            q('#naptHasLungProblem').click();

                            //Do you use any nicotine products?
                            //ysptUsesNicotine
                            //noptUsesNicotine
                            //naptUsesNicotine
                            q('#naptUsesNicotine').click();

                            //Do you have allergies to medications, food (i.e. eggs), latex or any vaccine component (e.g. neomycin, formaldehyde, gentamicin, thimerosal, bovine protein, phenol, polymyxin, gelatin, baker's yeast or yeast)?
                            //ysptHasVaxAllergy
                            //noptHasVaxAllergy
                            //naptHasVaxAllergy
                            q('#naptHasVaxAllergy').click();

                            //Have you received any vaccinations in the past 4 weeks?
                            //ysptGotVaxInLast4Weeks
                            //noptGotVaxInLast4Weeks
                            //naptGotVaxInLast4Weeks
                            q('#naptGotVaxInLast4Weeks').click();

                            //Have you ever had a serious reaction after receiving a vaccination?
                            //ysptHasPriorVaxReaction
                            //noptHasPriorVaxReaction
                            //naptHasPriorVaxReaction
                            q('#naptHasPriorVaxReaction').click();

                            //Do you have a neurological disorder such as seizures or other disorders that affect the brain or have had a disorder that resulted from vaccine (e.g. Guillain-Barre Syndrome)?
                            //ysptHasSeizureHistory
                            //etc
                            q('#naptHasSeizureHistory').click();

                            //Do you take prednisone, other steroids, or anticancer drugs, or have you had radiation treatments?
                            //ysptTakesCancerDrugs
                            //etc
                            q('#naptTakesCancerDrugs').click();

                            //During the past year, have you received a transfusion of blood or blood products, including anti bodies?
                            //ysptReceivedTransfusion
                            //etc
                            q('#naptReceivedTransfusion').click();

                            //Are you parent, family member, or caregiver to a new born infant?
                            //ysptIsInfantCaregiver
                            q('#naptIsInfantCaregiver').click();

                            //Are you pregnant or could you become pregnant in the next three months?
                            //ysptIsPregnant
                            q('#naptIsPregnant').click();

                            //Will you bring your Immunization Record Card with you?
                            //ysptHasImmRecCard
                            q('#naptHasImmRecCard').click();

                            //Are you currently enrolled in one of our medication adherence programs at Rite Aid (OneTrip Refill, Automated Courtesy Refills, or Rx Messaging - Text, Email, Phone)?
                            //ysptHasMedAdherenceProgram
                            q('#naptHasMedAdherenceProgram').click();

                            //Have you had a pneumococcal vaccine? (You may need two different pneumococcal shots)
                            //ysptHadFluShot
                            q('#naptHadFluShot').click();

                            //Have you had a shingles vaccine?
                            //ysptHadShinglesShot
                            q('#naptHadShinglesShot').click();

                            //Have you had a whooping cough(Tdap/Td) vaccine?
                            //ysptHadWhoopShot
                            q('#naptHadWhoopShot').click();

                            //#continue <-- click

                            //// SCREENING AND CONSENT

                            //sign manually



                        }

                    }
                    else {

                        q('#COVID-STATUS').innerHTML = `RiteAid detected.<br><strong>ERROR:</strong> Unknown pathname "${location.pathname}".`;

                    }

                } //END RiteAid
                

                /*
                    CVS
                */
                else if (host == "www.cvs.com") { console.log("CVS detected...");

                    //On: https://www.cvs.com/immunizations/covid-19-vaccine
                    if (location.pathname == "/immunizations/covid-19-vaccine") {

                        q('#COVID-STATUS').innerHTML = '●○○○○○○○○○○○○○<br>CVS Page 1 detected...';
                    
                        //Click: a[data-analytics-name="New York"]
                        q('a[data-analytics-name="New York"]').click();

                        //wait
                        //await pause(500);

                        //Click: a[data-analytics-name="Schedule an appointment now"]
                        q('a[data-analytics-name="Schedule an appointment now"]').click();

                    }
                    //On: https://www.cvs.com/vaccine/intake/store/covid-screener/covid-qns
                    else if (location.pathname == "/vaccine/intake/store/covid-screener/covid-qns") {

                        q('#COVID-STATUS').innerHTML = '●●○○○○○○○○○○○○<br>On CVS Page 2.<br>Click again.';

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
                    else if (location.pathname == "/vaccine/intake/store/cvd/dose-select") {

                        q('#COVID-STATUS').innerHTML = '●●●○○○○○○○○○○○<br>On CVS Page 3.<br>Click again.';

                        //Click #customRadio_1
                        q('#customRadio_1').click();

                        //Click button[_ngcontent-kqo-c72][type="submit"]
                        q('button[type="submit"].btn-control').click();

                    }
                    //On: https://www.cvs.com/vaccine/intake/store/eligibility-screener/eligibility-covid
                    else if (location.pathname == "/vaccine/intake/store/eligibility-screener/eligibility-covid") {

                        q('#COVID-STATUS').innerHTML = '●●●●○○○○○○○○○○<br>On CVS Page 4.<br>Click again.';

                        //Set #jurisdiction 's selected element to one with value=
                        //26: EID_NJ
                        q('option[value*="EID_NJ"]').setAttribute("selected","true");

                        //Fire the change event manually
                        q('#jurisdiction').dispatchEvent(new Event('change'));

                        //Click button!
                        q('button[type="submit"].btn-control').click();

                    }
                    //On: https://www.cvs.com/vaccine/intake/store/eligibility-screener/eligibility-qns
                    else if (location.pathname == "/vaccine/intake/store/eligibility-screener/eligibility-qns") {

                        q('#COVID-STATUS').innerHTML = '●●●●●○○○○○○○○○<br>On CVS Page 5.<br>Click again.';

                        //Age in #q1_0
                        //Have to calculate it roughly
                        var age = (new Date().getFullYear()) - parseInt(c[BDAY].split('/')[2]);
                        q('#q1_0').value = age;

                        //Fire the change event manually
                        q('#q1_0').dispatchEvent(new Event('input'));

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
                            //wait(500);

                            /*
April 2nd changes:

<select _ngcontent-sim-c76="" id="qlist" aria-describedby="listErr" formcontrolname="list" class="dd-list ng-pristine ng-invalid ng-touched"><option _ngcontent-sim-c76="" disabled="" value="0: null">Select</option>
√ <option _ngcontent-sim-c76="" value="1: Teachers and staff in PreK-12 Schools"> Teachers and staff in PreK-12 Schools</option>
√ <option _ngcontent-sim-c76="" value="2: Childcare centers and staff"> Childcare centers and staff</option>
√ <option _ngcontent-sim-c76="" value="3: Head Start, Part C Intervention &amp; licensed home"> Head Start, Part C Intervention &amp; licensed home visitors and staff</option>
√ <option _ngcontent-sim-c76="" value="4: Healthcare workers (paid and unpaid)"> Healthcare workers (paid and unpaid)</option>
√ <option _ngcontent-sim-c76="" value="5: First responders including law enforcement and "> First responders including law enforcement and fire professionals</option>
√ <option _ngcontent-sim-c76="" value="6: Transit and public safety worker"> Transit and public safety worker</option>
√ <option _ngcontent-sim-c76="" value="7: Migrant Farm Worker"> Migrant Farm Worker</option>
√ <option _ngcontent-sim-c76="" value="8: Member of a tribal community"> Member of a tribal community</option>
√ <option _ngcontent-sim-c76="" value="9: Person experiencing homelessness or living in a"> Person experiencing homelessness or living in a shelter</option>
√ <option _ngcontent-sim-c76="" value="10: Residents of long-term and high risk congregat"> Residents of long-term and high risk congregate care settings</option>
√ <option _ngcontent-sim-c76="" value="11: Healthcare workers or staff of long-term and h"> Healthcare workers or staff of long-term and high risk congregate care settings</option>
√ <option _ngcontent-sim-c76="" value="12: Elder care and support"> Elder care and support</option>
? <option _ngcontent-sim-c76="" value="13: Warehousing and logistics worker"> Warehousing and logistics worker</option>
? <option _ngcontent-sim-c76="" value="14: Social services support staff"> Social services support staff</option>
? <option _ngcontent-sim-c76="" value="15: Elections personnel"> Elections personnel</option>
√ <option _ngcontent-sim-c76="" value="16: Hospitality"> Hospitality</option>
√ <option _ngcontent-sim-c76="" value="17: Medical supply chain"> Medical supply chain</option>
√ <option _ngcontent-sim-c76="" value="18: Postal and shipping services"> Postal and shipping services</option>
√ <option _ngcontent-sim-c76="" value="19: Clergy"> Clergy</option>
√ <option _ngcontent-sim-c76="" value="20: Judicial system workers"> Judicial system workers</option>
<option _ngcontent-sim-c76="" value="21: None of the above"> None of the above</option><!----></select>

                        */


                            //K-12 & Childcare
                            if ( _(c[OCC]) == "Pre-Kindergarten -12th grade Educator & Staff" ) {
                                q('option[value*="Teachers and staff in PreK-12 Schools"]').setAttribute("selected", "true");
                            }
                            //Childcare
                            else if ( _(c[OCC]) == "Childcare Worker" 
                                || _(c[OCC]) == "Family Childcare Providers"
                            ) {
                                q('option[value*="Childcare centers and staff"]').setAttribute("selected", "true");
                            }
                            //Head Start
                            else if ( _(c[OCC]) == "Head Start and Early Head Start" ) {
                                q('option[value*="Head Start"]').setAttribute("selected", "true");
                            }
                            //Healthcare Workers
                            else if ( _(c[OCC]) == "Health Care Worker") {
                                q('option[value*="Healthcare workers"]').setAttribute("selected", "true");
                            }
                            //First Responders
                            else if ( _(c[OCC]) == "Emergency Medical Services (EMS)"
                                    || _(c[OCC]) == "Firefighters"
                                    || _(c[OCC]) == "First Responder"
                                    || _(c[OCC]) == "Law Enforcement"
                            ) {
                                q('option[value*="First responders including law enforcement"]').setAttribute("selected", "true");
                            }
                            //Transit & Public Safety
                            else if ( _(c[OCC]) == "Local Transportation"
                                    || _(c[OCC]) == "Public Health Employee"
                                    || _(c[OCC]) == "Public Safety Workers"
                                    || _(c[OCC]) == "Public Transit Workers"
                            ) {
                                q('option[value*="Transit and public safety worker"]').setAttribute("selected", "true");
                            }
                            //Migrant Farm Workers
                            else if ( _(c[OCC]) == "Migrant Farm Workers"
                                    || _(c[OCC]) == "Food and Agricultural Workers" 
                            ) {
                                q('option[value*="Migrant Farm Worker"]').setAttribute("selected", "true");
                            }
                            //Tribal
                            else if ( _(c[OCC]) == "Members of tribal communities") {
                                q('option[value*="Member of a tribal community"]').setAttribute("selected", "true");
                            }
                            //Homeless
                            else if ( _(c[OCC]) == "Persons experiencing homelessness"
                                    || _(c[OCC]) == "Persons living in shelters"
                            ) {
                                q('option[value*="Person experiencing homelessness"]').setAttribute("selected", "true");
                            }
                            //Elder Care
                            else if ( _(c[OCC]) == "Multigenerational Household"
                            ) {
                                q('option[value*="Elder care and support"]').setAttribute("selected", "true");
                            }
                            //Long Term Care Staff
                            else if ( _(c[OCC]) == "Long Term Care Facility Staff") {
                                q('option[value*="Healthcare workers or staff of long-term and"]').setAttribute("selected", "true");
                            }
                            //Warehousing and logistics worker??
                                //I don't remember this on the list...
                            //Social Services
                                //Or this either...
                            //Elections personnel
                                //I *have* to be missing something...
                            //Hospitality
                            else if ( _(c[OCC]) == "Janitorial Staff") {
                                q('option[value*="Hospitality"]').setAttribute("selected", "true");
                            }
                            //Medical supply chain
                            else if ( _(c[OCC]) == "Pharmacy Staff") {
                                q('option[value*="Medical supply chain"]').setAttribute("selected", "true");
                            }
                            //Postal and shipping services
                            else if ( _(c[OCC]) == "Airport and Commercial Airlines"
                                    || _(c[OCC]) == "Mail Carriers"
                                    || _(c[OCC]) == "Postal and Shipping Services"
                                    || _(c[OCC]) == "U.S. Postal Service"
                            ) {
                                q('option[value*="Postal and shipping services"]').setAttribute("selected", "true");
                            }
                            //Clergy
                            else if ( _(c[OCC]) == "Clergy"
                                    || _(c[OCC]) == "Clergy and Other Essential Support for House of Worship"
                            ) {
                                q('option[value*="Clergy"]').setAttribute("selected", "true");
                            }
                            //Judicial system workers
                            else if ( _(c[OCC]) == "Judicial Staff"
                                    || _(c[OCC]) == "Judiciary"
                            ) {
                                q('option[value*="Judicial system workers"]').setAttribute("selected", "true");
                            }

                            //OTHER
                            else {
                                q('option[value*="None of the above"]').setAttribute("selected", "true");
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
                            q('#qtext').dispatchEvent(new Event('input'));
                        }

                        //Click #qconsent
                        q('#qconsent').click();

                        //Click button[_ngcontent-kqo-c76].btn-control
                        q('button.btn-control').click();

                        
                    }
                    //On: https://www.cvs.com/vaccine/intake/store/cvd/how-to-schedule
                    else if (location.pathname == "/vaccine/intake/store/cvd/how-to-schedule") {

                        q('#COVID-STATUS').innerHTML = '●●●●●●○○○○○○○○<br>On CVS Page 6.<br>Click again.';
                        
                        //Click button[_ngcontent-kqo-c74].btn-control
                        q('button.btn-control').click();

                    }
                    //On: https://www.cvs.com/vaccine/intake/store/cvd-store-select/first-dose-select
                    else if (location.pathname == "/vaccine/intake/store/cvd-store-select/first-dose-select") {

                        //Set #address to Zip Code
                        q('#address').value = c[ZIP];

                        //Fire change event manually
                        q('#address').dispatchEvent(new Event('input'));
                        q('#address').dispatchEvent(new Event('compositionend'));

                        //Click button[_ngcontent-kqo-c79]
                        q('button').click();

                        q('#COVID-STATUS').innerHTML = '●●●●●●●○○○○○○○<br>On CVS Page 7.<br>Continue manually until the <em>Please Provide Details</em> screen. Then click here again.';
                    }

                    //Patient info enter
                    else if (location.pathname == "/vaccine/intake/store/patient-info") {

                        q('#COVID-STATUS').innerHTML = '●●●●●●●●○○○○○○<br>On CVS Page 8.<br>Continue manually.';

                        //#firstName
                        q('#firstName').value = c[FNAME];
                        q('#firstName').dispatchEvent(new Event('input'));
                        q('#firstName').dispatchEvent(new Event('compositionend'));

                        //#lastName
                        q('#lastName').value = c[LNAME];
                        q('#lastName').dispatchEvent(new Event('input'));
                        q('#lastName').dispatchEvent(new Event('compositionend'));

                        //#dob -- MMDDYYYY without slashes
                        q('#dob').value = d1;//.split("/").join("");
                        q('#dob').dispatchEvent(new Event('input'),{ bubbles: true });
                        q('#dob').dispatchEvent(new Event('change'));
                        q('#dob').dispatchEvent(new Event('blur'));
                        q('#dob').dispatchEvent(new Event('compositionend'));

                        //#customRadio_F checkbox female
                        if ( _(c[SEX]) == "Female") q("#customRadio_F").click();
                        //#customRadio_M checkbox male
                        else q("#customRadio_M").click();

                        //#address
                        q('#address').value = c[ADDR];
                        q('#address').dispatchEvent(new Event('input'));
                        q('#address').dispatchEvent(new Event('compositionend'));

                        //#addressLine2
                        //Address 2?

                        //#city
                        q('#city').value = c[CITY];
                        q('#city').dispatchEvent(new Event('input'));
                        q('#city').dispatchEvent(new Event('compositionend'));

                        //#state dropdown -- we're just gonna assume NJ
                        q('option[value="35: NJ"]').setAttribute("selected","true");
                        q('#state').dispatchEvent(new Event('change'));

                        //#zip
                        q('#zip').value = c[ZIP];
                        q('#zip').dispatchEvent(new Event('input'));
                        q('#zip').dispatchEvent(new Event('compositionend'));

                        //#email
                        q('#email').value = c[EMAIL];
                        q('#email').dispatchEvent(new Event('input'));
                        q('#email').dispatchEvent(new Event('compositionend'));

                        //#phoneNumber -- all digits
                        q('#phoneNumber').value = c[PHONE].split("-").join("").split(" ").join("");
                        q('#phoneNumber').dispatchEvent(new Event('input'));
                        q('#phoneNumber').dispatchEvent(new Event('compositionend'));

                    }

                    //Insurance status - assuming none
                    else if (location.pathname == "/vaccine/intake/store/insurance-status") {

                        q('#COVID-STATUS').innerHTML = '●●●●●●●●●○○○○○<br>On CVS Page 9.<br>Click again.';
                    
                        //click #customRadio_7
                        q('#customRadio_7').click();

                        //click button type="submit"
                        q('button.btn-control').click();
                    }

                    //No insurance screen
                    else if (location.pathname == "/vaccine/intake/store/no-insurance") {

                        q('#COVID-STATUS').innerHTML = '●●●●●●●●●●○○○○<br>On CVS Page 10.<br>Click again.';
                    
                        //click #consentText
                        q('#consentText').click();

                        //click button type="submit"
                        q('button.btn-control').click();

                    }

                    //Immunization questions
                    else if (location.pathname == "/vaccine/intake/store/qns/imz-qns") {

                        q('#COVID-STATUS').innerHTML = '●●●●●●●●●●●○○○<br>On CVS Page 11.<br>Click again.';
                    
                        //click #q2_3
                        q('#q2_3').click();
                        //click #q3_3
                        q('#q3_3').click();
                        //click #q4_3
                        q('#q4_3').click();
                        //click #q5_3
                        q('#q5_3').click();
                        //click #q6_3
                        q('#q6_3').click();
                        //click #q7_3
                        q('#q7_3').click();
                        //click #q11_3
                        q('#q11_3').click();
                        //click #q12_3
                        q('#q12_3').click();
                        //click #q13_3
                        q('#q13_3').click();

                        //click button type="submit"
                        q('button.btn-control').click();
                        
                    }

                    //Additional questions
                    else if (location.pathname == "/vaccine/intake/store/qns/addl-qns") {

                        q('#COVID-STATUS').innerHTML = '●●●●●●●●●●●●○○<br>On CVS Page 12.<br>Click again.';
                    
                        //click #qrace_2131-1
                        q('#qrace_2131-1').click();

                        //click #qethnicity_U
                        q('#qethnicity_U').click();

                        //click button type="submit"
                        q('button.btn-control').click();
                        
                    }

                    //Vaccine review page
                    else if (location.pathname == "/vaccine/intake/store/review") {

                        q('#COVID-STATUS').innerHTML = '●●●●●●●●●●●●●○<br>On CVS Page 13.<br>Click again.';

                        //click button type="submit"
                        q('button.btn-control').click();
                        
                    }

                    //Vaccine consent page
                    else if (location.pathname == "/vaccine/intake/store/consent") {

                        //click #consentText
                        q('#consentText').click();

                        //click button type="submit"
                        q('button.btn-control').click();

                        q('#COVID-STATUS').innerHTML = '●●●●●●●●●●●●●●<br>On CVS Page 14.<br>Print out confirmation page and save it for your signee\'s records.';
                        
                    }


                    else {

                        q('#COVID-STATUS').innerHTML = `CVS detected.<br><strong>ERROR:</strong> Unknown pathname "${location.pathname}".`;

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

                        q('#COVID-STATUS').innerHTML = 'St. Peter\'s Page 1 detected. Continue manually until the Patient Information screen.';

                        pause(1000).then(() => {
                            q(`div#modal-root button[data-test="modal-primary-button"]`).click();
                        });

                    }

                    //There may be multiples here
                    else if (location.href.substr(0,pi.length) == pi) { console.log("PatientInfoScreen detected.");

                        //Detect St. Peters...
                        if ( q('img[src="https://d2gmqy7n86tnsf.cloudfront.net/c8beebd4-d6b3-4b40-a066-a3bd3bf819f2/bookingLogo.jpeg"]') != null ) {

                            q('#COVID-STATUS').innerHTML = 'St. Peter\'s Page 2 detected.';

                            //First name
                            q('input[name="firstName"]').value = c[FNAME];
                            q('input[name="firstName"]').dispatchEvent(new Event('input',{ bubbles: true }));

                            //Last name
                            q('input[name="lastName"]').value = c[LNAME];
                            q('input[name="lastName"]').dispatchEvent(new Event('input',{ bubbles: true }));

                            let bd = d.split("/");

                            //Birth Month
                            q('input[name="birthMonth"]').value = bd[0];
                            q('input[name="birthMonth"]').dispatchEvent(new Event('input',{ bubbles: true }));

                            //Birth Month
                            q('input[name="birthDay"]').value = bd[1];
                            q('input[name="birthDay"]').dispatchEvent(new Event('input',{ bubbles: true }));

                            //Birth Year
                            q('input[name="birthYear"]').value = bd[2];
                            q('input[name="birthYear"]').dispatchEvent(new Event('input',{ bubbles: true }));

                            //Male/female
                            if ( _(c[SEX]) == "Male" ) q('input[value="male"]').click();
                            else q('input[value="female"]').click();

                            //Wait and submit
                            pause(500).then( () => {
                                q('div[class^="PatientInfoPageView"] button[type="submit"]').click();
                            });
                        }

                        else if (location.href.substr(0,pi.length) == pi) { console.log("Signup screen detected.");

                            q('#COVID-STATUS').innerHTML = 'St. Peter\'s Page 3 detected. Form autofilled. Click "Review and book" when ready.';

                            //Email
                            q('input[name="email"]').value = c[EMAIL];
                            q('input[name="email"]').dispatchEvent(new Event('input',{ bubbles: true }));
                            q('input[name="confirmEmail"]').value = c[EMAIL];
                            q('input[name="confirmEmail"]').dispatchEvent(new Event('input',{ bubbles: true }));

                            //Password
                            q('input[name="password"]').value = 'Volunteer1!';
                            q('input[name="password"]').dispatchEvent(new Event('input',{ bubbles: true }));

                            //TOS
                            q('input[name="termsOfService"]').click();

                            //Uncheck keep me logged in
                            q('input[name="rememberMe"]').click();

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

                    console.log("Step:",step,title);

                    q('#COVID-STATUS').innerHTML = `Curogram VNA Step ${step} detected.`;

                    if (title === "Language Selection") {

                        //Select English
                        q('.languages .language').click();

                        //Queue up next prompt
                        q('#COVID-STATUS').innerHTML = `Curogram VNA Language Selection filled out.<br>Click here again.`;

                    }
                    else if (title === "Introduction") {

                        //Select Get Started
                        q('button.btn-nephritis').click();

                        //Queue up next prompt
                        q('#COVID-STATUS').innerHTML = `Curogram VNA Introduction bypassed.<br>Select a time slot, then click here again.`;

                    }
                    else if (title === "Pick A Time Slot") {

                        //Queue up next prompt
                        q('#COVID-STATUS').innerHTML = `Curogram VNA Time Slot Screen detected.<br>Select a time slot, then click here again.`;

                    }
                    else if (title === "Identification" && (step < 5)) { //Phone number
                        
                        //Input first name
                        q('input[type="tel"]').value = c[PHONE];
                        q('input[type="tel').dispatchEvent(new Event('input'),{ bubbles: true });

                        //Click next
                        q('button.btn-nephritis').click();

                        //Queue up next prompt
                        q('#COVID-STATUS').innerHTML = `Curogram VNA Phone Number Entered.<br>Click here again.`;

                    }
                    else if (title === "Demographics") { //Demographics

                        //Input first name
                        q('input[name="firstname"]').value = c[FNAME];
                        q('input[name="firstname').dispatchEvent(new Event('input'),{ bubbles: true });

                        //Input last name
                        q('input[name="lastname"]').value = c[LNAME];
                        q('input[name="lastname').dispatchEvent(new Event('input'),{ bubbles: true });

                        //DOB -- !!! Insane
                        //Month
                        document.querySelectorAll('ng-select input')[0].value = FMONTH[parseInt(d2[0])];
                        document.querySelectorAll('ng-select input')[0].dispatchEvent(new Event('input'),{ bubbles: true });
                        document.querySelector('ng-select .ng-option-marked').click();

                        //Day
                        document.querySelectorAll('ng-select input')[1].value = parseInt(d2[1]);
                        document.querySelectorAll('ng-select input')[1].dispatchEvent(new Event('input'),{ bubbles: true });
                        document.querySelector('ng-select .ng-option-marked').click();

                        //Year YYYY
                        document.querySelectorAll('ng-select input')[2].value = d2[2];
                        document.querySelectorAll('ng-select input')[2].dispatchEvent(new Event('input'),{ bubbles: true });
                        document.querySelector('ng-select .ng-option-marked').click();

                        //Input email
                        q('input[type="email"]').value = c[EMAIL];
                        q('input[type="email').dispatchEvent(new Event('input'),{ bubbles: true });

                        //Sex
                        document.querySelectorAll('ng-select input')[3].value = c[SEX];
                        document.querySelectorAll('ng-select input')[3].dispatchEvent(new Event('input'),{ bubbles: true });
                        document.querySelector('ng-select .ng-option-marked').click();

                        //Race
                        document.querySelectorAll('ng-select input')[4].value = "Prefer not to say";
                        document.querySelectorAll('ng-select input')[4].dispatchEvent(new Event('input'),{ bubbles: true });
                        document.querySelector('ng-select .ng-option-marked').click();

                        //Ethnicity (assuming not Hispanic –– we don't collect this)
                        document.querySelectorAll('ng-select input')[5].value = "Not Hispanic";
                        document.querySelectorAll('ng-select input')[5].dispatchEvent(new Event('input'),{ bubbles: true });
                        document.querySelector('ng-select .ng-option-marked').click();

                        //Click next
                        q('button.btn-nephritis').click();

                        //Queue up next prompt
                        q('#COVID-STATUS').innerHTML = `Curogram VNA Demographics entered.<br>Click here again.`;

                    }
                    else if (title === "Patient Address") { //Address

                        //Current address
                        document.querySelectorAll('input[type="radio"]')[2].click();

                        //Address
                        q('input[name="address"]').value = c[ADDR];
                        q('input[name="address"]').dispatchEvent(new Event('input'),{ bubbles: true });

                        //City
                        q('input[name="city"]').value = c[CITY];
                        q('input[name="city"]').dispatchEvent(new Event('input'),{ bubbles: true });

                        //State - ASSUMING NJ!!
                        document.querySelectorAll('ng-select input')[0].value = "NJ";
                        document.querySelectorAll('ng-select input')[0].dispatchEvent(new Event('input'),{ bubbles: true });
                        document.querySelector('ng-select .ng-option-marked').click();

                        //Zipcode
                        q('input[name="zip"]').value = c[ZIP];
                        q('input[name="zip"]').dispatchEvent(new Event('input'),{ bubbles: true });

                        //Click next
                        q('button.btn-nephritis').click();

                        //Queue up next prompt
                        q('#COVID-STATUS').innerHTML = `Curogram VNA Address entered.<br>Click here again.`;

                    }
                    else if (title === "Screening") { //Screening

                        //Not sick
                        document.querySelectorAll('input[type="radio"]')[1].click();

                        //No allergies
                        document.querySelectorAll('input[type="radio"]')[3].click();

                        //Vaccine reaction
                        document.querySelectorAll('input[type="radio"]')[5].click();

                        //Blood thinner
                        document.querySelectorAll('input[type="radio"]')[7].click();

                        //Immunocompromised
                        document.querySelectorAll('input[type="radio"]')[9].click();

                        //Antibody therapy
                        document.querySelectorAll('input[type="radio"]')[11].click();

                        //Pregnant
                        document.querySelectorAll('input[type="radio"]')[13].click();

                        //Breast feeding
                        document.querySelectorAll('input[type="radio"]')[15].click();

                        //Don't currently have covid
                        document.querySelectorAll('input[type="radio"]')[17].click();

                        //Yes! Gimmie the vaccine! (click last as "YES!")
                        let yes = document.querySelectorAll('input[type="radio"]').length-2;
                        document.querySelectorAll('input[type="radio"]')[yes].click();

                        //Click next
                        q('button.btn-nephritis').click();

                        //Queue up next prompt
                        q('#COVID-STATUS').innerHTML = `Curogram VNA Screening info entered.<br>Click here again.`;

                    }
                    else if (title === "Disability") {

                        //Click skip!
                        q('button.btn-outline-nephritis').click();

                        //Queue up next prompt
                        q('#COVID-STATUS').innerHTML = `Curogram VNA Disability skipped.<br>Click here again.`;

                    }
                    else if (title === "Insurance Info") {

                        //Figure out insurance later
                        document.querySelectorAll('div.checkbox')[1].click();

                        //Click next
                        q('button.btn-nephritis').click();

                        //Queue up next prompt
                        q('#COVID-STATUS').innerHTML = `Curogram VNA Insurance info bypassed.<br>Click here again.`;

                    }
                    else if (title === "Identification") {

                        //Click skip!
                        q('button.btn-outline-nephritis').click();

                        //Queue up next prompt
                        q('#COVID-STATUS').innerHTML = `Curogram VNA Identification skipped.<br>Click here again.`;

                    }
                    else if (title === "Consent") {

                        //Read and accept
                        if (q('#checkbox1')) q('#checkbox1').click();
                        if (q('#checkbox2')) q('#checkbox2').click();

                        //Queue up next prompt
                        q('#COVID-STATUS').innerHTML = `Curogram VNA Consent checked.<br>Sign with an X and continue manually.`;

                    }
                    else {

                        q('#COVID-STATUS').innerHTML = `Curogram VNA detected.<br>Continue manually.`;

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