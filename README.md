# CoVID Filler

* [Website](https://covid-injection.netlify.app/)
* [![Netlify Status](https://api.netlify.com/api/v1/badges/7447f05c-93a8-44ac-aef3-f20732e86808/deploy-status)](https://app.netlify.com/sites/covid-injection/deploys)

## A JavaScript Autofill Injection Bookmarklet For CoVID Vaccine Signups

### What is CoVID Filler?

A small bookmarklet that holds a JavaScript "injection" which helps volunteers who are signing folks up for CoVID vaccines enter user information into a number of forms faster than they could do so by hand. It works in conjunction with a spreadsheet signup form.

Presently, it is only designed to work with the New Jersey CoVID elligibility restrictions.

### How Can I Use It?

Visit the [website](https://covid-injection.netlify.app/) and you'll find instructions and the bookmarklet there.

### Spreadsheet Description

Our group currently maintains a Google Form that links its data to a Google Sheet. When you copy a row of the Google Sheet, it reads it in as TSV (Tab Seperated Value) format into the clipboard (i.e. each value is separated by a tab). As a result, this software is dependent upon the order of those values in order to inject them properly.

Soon, there are plans to create a bookmarklet customizer where you can choose the order of the columns arbitrarily to suit whatever form you use.

In the meantime, the order of the columns (and their possible values) are as follows:

Column | Possible values
------ | ---------------
0:Timestamp | M/D/YYYY HH:MM:SS
1:Email Address | (Any standard email address)
2:First Name | (First name)
3:Last Name | (Last name)
4:Birthday | M/D/YYYY
5:Phone number | ########## or ###-###-####
6:Address | (Address)
7:City | (City)
8:State | (Full State Name, e.g "New Jersey")
9:Zipcode | #####
10:Biological sex* | "Male" <br> "Female" <br> "Other or prefer not to say"
11:Gender* | "Male" <br> "Female" <br> "Other or prefer not to say"
12:Occupation* | "Airport and Commercial Airlines" <br> "Childcare Worker" <br> "Clergy" <br> "Clergy and Other Essential Support for House of Worship" <br> "Correctional Officers" <br> "Emergency Medical Services (EMS)" <br> "Essential Worker" <br> "Family Childcare Providers" <br> "Firefighters" <br> "First Responder" <br> "Food and Agricultural Workers" <br> "Funeral Services" <br> "Grocery Workers" <br> "Head Start and Early Head Start" <br> "Health Care Worker" <br> "Janitorial Staff" <br> "Judicial Staff" <br> "Judiciary" <br> "Law Enforcement" <br> "Local Transportation" <br> "Long Term Care Facility Staff" <br> "Mail Carriers" <br> "Manufacturing Workers" <br> "Members of tribal communities" <br> "Migrant Farm Workers" <br> "Multigenerational Household" <br> "Persons experiencing homelessness" <br> "Persons living in shelters" <br> "Pharmacy Staff" <br> "Postal and Shipping Services" <br> "Pre-Kindergarten -12th grade Educator & Staff" <br> "Public Health Employee" <br> "Public Safety Workers" <br> "Public Transit Workers" <br> "U.S. Postal Service" <br> "Veterinarians and Support Staff" <br> "None of the Above"
13:Employer | (Employer)
14:Health Conditions* | "Asthma-with hospitalization" <br> "Amyotrophic Lateral Asclerosis (ALS)" <br> "Asthma" <br> "Bone Marrow Transplant" <br> "COPD" <br> "Cancer" <br> "Cerebral Palsy" <br> "Cystic Fibrosis" <br> "Diabetes" <br> "Down Syndrome" <br> "Epilepsy" <br> "HIV" <br> "Heart Condition" <br> "Intellectual and Developmental Disabilities" <br> "Kidney Disease" <br> "Liver Disease" <br> "Metabolic Disorders" <br> "Muscular Dystrophy" <br> "Neurologic Condition" <br> "Obesity" <br> "Organ transplant" <br> "Pregnancy" <br> "Pulmonary Fibrosis" <br> "Severe Genetic Disorders" <br> "Sickle Cell Anemia" <br> "Smoking" <br> "Spina Bifida" <br> "Weakened Immune System" <br> "None of the Above"
15 thru 16 | (We keep other data here, but it expects 24 columns total.)
17:Notes | (Notes about this person, such as scheduling requirements, preferences, etc. This displays under their name.)
18 thru 23 | (We keep other data here, but it expects 24 columns total.)

\* = It also recognizes Spanish translations of these values as well, which you can see around line 16 in index.js.