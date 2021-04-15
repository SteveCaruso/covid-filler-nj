# CoVID Injection

* [Main branch](https://covid-injection.netlify.app/): [![Netlify Status](https://api.netlify.com/api/v1/badges/7447f05c-93a8-44ac-aef3-f20732e86808/deploy-status)](https://app.netlify.com/sites/covid-injection/deploys)
* [Development branch](https://covid-injection-dev.netlify.app/): [![Netlify Status](https://api.netlify.com/api/v1/badges/253e9e6f-a428-4fbd-8ae6-0ddbd39a78c6/deploy-status)](https://app.netlify.com/sites/covid-injection-dev/deploys)

## A JavaScript Autofill Injection Bookmarklet For CoVID Vaccine Signups

### What is CoVID Injection?

A small bookmarklet that holds a JavaScript "injection" which helps volunteers who are signing folks up for CoVID vaccines enter user information into a number of forms faster than they could do so by hand. It works in conjunction with a spreadsheet signup form.

Presently, it is only designed to work with the New Jersey CoVID elligibility restrictions, but it should work with other States as well.

### How Can I Use It?

Visit the [website](https://covid-injection.netlify.app/) and you'll find instructions and the bookmarklet generator there.

### Spreadsheet Description

When you copy a row of the Google or Excel Spreadsheet, it reads the data into the clipboard as a TSV (Tab Seperated Value) list – i.e. each value is separated by a tab.

Using the [custom bookmarklet generator](https://covid-injection.netlify.app/custom.html), you can create a bookmarklet that can recognize those values and will autofill from your own spreadsheet (with some restrictions).

The following columns are **required** and the acceptable values are as follows:

Column | Possible values
------ | ---------------
Email Address | (Any standard email address)
First Name | (First name)
Last Name | (Last name)
Birthday | M/D/YYYY or MM/DD/YYYY
Phone number | ########## or ###-###-####
Address | (Address)
City | (City)
State | Full State Name, e.g. "New Jersey" <br>or 2-letter code e.g. "NJ"
Zipcode | #####
Biological sex* | "Male" or "M" <br> "Female" or "F" <br> "Other or prefer not to say" or "O"


The following columns are **optional**, and the acceptable values for them are as follows:

Column | Possible values
------ | ---------------
Gender* | "Male" or "M" <br> "Female" or "F" <br> "Other or prefer not to say" or "O" <br> (Defaults to Sex)
Occupation* | "Airport and Commercial Airlines" <br> "Childcare Worker" <br> "Clergy" <br> "Clergy and Other Essential Support for House of Worship" <br> "Correctional Officers" <br> "Emergency Medical Services (EMS)" <br> "Essential Worker" <br> "Family Childcare Providers" <br> "Firefighters" <br> "First Responder" <br> "Food and Agricultural Workers" <br> "Funeral Services" <br> "Grocery Workers" <br> "Head Start and Early Head Start" <br> "Health Care Worker" <br> "Janitorial Staff" <br> "Judicial Staff" <br> "Judiciary" <br> "Law Enforcement" <br> "Local Transportation" <br> "Long Term Care Facility Staff" <br> "Mail Carriers" <br> "Manufacturing Workers" <br> "Members of tribal communities" <br> "Migrant Farm Workers" <br> "Multigenerational Household" <br> "Persons experiencing homelessness" <br> "Persons living in shelters" <br> "Pharmacy Staff" <br> "Postal and Shipping Services" <br> "Pre-Kindergarten -12th grade Educator & Staff" <br> "Public Health Employee" <br> "Public Safety Workers" <br> "Public Transit Workers" <br> "U.S. Postal Service" <br> "Veterinarians and Support Staff" <br> "None of the Above"
Employer | (Employer)
Health Conditions* | "Asthma-with hospitalization" <br> "Amyotrophic Lateral Asclerosis (ALS)" <br> "Asthma" <br> "Bone Marrow Transplant" <br> "COPD" <br> "Cancer" <br> "Cerebral Palsy" <br> "Cystic Fibrosis" <br> "Diabetes" <br> "Down Syndrome" <br> "Epilepsy" <br> "HIV" <br> "Heart Condition" <br> "Intellectual and Developmental Disabilities" <br> "Kidney Disease" <br> "Liver Disease" <br> "Metabolic Disorders" <br> "Muscular Dystrophy" <br> "Neurologic Condition" <br> "Obesity" <br> "Organ transplant" <br> "Pregnancy" <br> "Pulmonary Fibrosis" <br> "Severe Genetic Disorders" <br> "Sickle Cell Anemia" <br> "Smoking" <br> "Spina Bifida" <br> "Weakened Immune System" <br> "None of the Above"
Notes | (Any notes needed)
Notes 2 | (Any notes needed)
Notes 3 | (Any notes needed)
Notes 4 | (Any notes needed)
Availability | (See video tutorial on the website for how to set this feature up.)

\* = It also recognizes Spanish translations of these values as well, which you can see around line 16 in index.js.