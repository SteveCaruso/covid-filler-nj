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
            "Trabajador de cuidado infantil"            : "Childcare Worker",
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
            "Cumplimiento de la ley"                    : "Law Enforcement",
            "Transporte local"                          : "Local Transportation",
            "Personal del centro de atención a largo plazo" : "Long Term Care Facility Staff",
            "Miembro de comunidad tribal"               : "Members of tribal communities",
            "Trabajador agrícola migrante"              : "Migrant Farm Workers",
            "Hogar multigeneracional"                   : "Multigenerational Household",
            "Persona sin hogar"                         : "Persons experiencing homelessness",
            "Persona que vive en un refugio"            : "Persons living in shelters",
            "Trabajador de farmacia"                    : "Pharmacy Staff",
            "Educador o empleado en escuela Pre-K a duodécimo grado" : "Pre-Kindergarten -12th grade Educator & Staff",
            "Empleado de salud pública"                 : "Public Health Employee",
            "Trabajador de seguridad pública"           : "Public Safety Workers",
            "Trabajador de transporte público"          : "Public Transit Workers",

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
    async function inject() {

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
            "www.zocdoc.com"
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
        const EMAIL = 1;
        const FNAME = 2;
        const LNAME = 3;
        const BDAY = 4;
        const PHONE = 5;
        const ADDR = 6;
        const CITY = 7;
        const STATE = 8;
        const ZIP = 9;
        const SEX = 10;
        const GEN = 11;
        const OCC = 12;
        const EMP = 13;
        const HEALTH = 14;
        const NOTES = 17;

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
            //button.style.overflowWrap = "";
        
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

                //Detect language
                //figure that out...

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



                /* 
                    RITEAID
                */
                if (host == "www.riteaid.com") { console.log("RiteAid detected...")

                    if (location.href == "https://www.riteaid.com/pharmacy/covid-qualifier") {

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
                    else if (location.href == "https://www.riteaid.com/pharmacy/apt-scheduler") {

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

                        q('#COVID-STATUS').innerHTML = 'RiteAid detected. Continue manually.';

                    }

                } //END RiteAid
                

                /*
                    CVS
                */
                else if (host == "www.cvs.com") { console.log("CVS detected...");

                    //On: https://www.cvs.com/immunizations/covid-19-vaccine
                    if (location.href == "https://www.cvs.com/immunizations/covid-19-vaccine") {

                        q('#COVID-STATUS').innerHTML = '●○○○○○○○<br>CVS Page 1 detected...';
                    
                        //Click: a[data-analytics-name="New York"]
                        q('a[data-analytics-name="New York"]').click();

                        //wait
                        //await pause(500);

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
                            //wait(500);

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
                    if (location.href == "https://www.zocdoc.com/wl/saintpeterscovid19vaccinemonroe/practice/65013?reason_visit=5243") {

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