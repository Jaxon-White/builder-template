import type { Category } from "@/lib/types";

// Church HQ's subcategories and plain-language definitions, word for word from "Standard
// Categories and For Groups for TSO Resources" (revised working draft, 29 Oct 2026). Use only
// these names; HQ asks that new ones go through its review, not be made up per office.

export type Subcategory = { name: string; definition: string };

/** HQ's "What it covers" line for each category. */
export const CATEGORY_COVERS: Record<Category, string> = {
  addiction:
    "Treatment, recovery support, and harm-reduction services for alcohol, drugs, nicotine, and other substance-use concerns.",
  "clothing-household": "Free or low-cost clothing, furniture, bedding, baby supplies, and basic household goods.",
  disability:
    "Services designed for people with physical, mental, intellectual, or developmental disabilities and their families.",
  "domestic-violence":
    "Safety, shelter, advocacy, and support for people harmed by a partner or family member and for survivors of abuse.",
  education:
    "Programs for diplomas and GEDs, English and literacy, college and trade education, scholarships, and practical life or parenting skills.",
  employment:
    "Help finding, obtaining, and keeping work, including job search, placement, and training tied to employment.",
  food: "Food to take home or eat on site, plus food-benefit programs such as SNAP and WIC.",
  "homeless-services":
    "Shelter and daily-living services for people without stable housing, including hygiene, communication, storage, and housing navigation.",
  housing:
    "Help finding, keeping, or paying for a place to live. This includes crisis shelter, time-limited housing, rentals, low-income properties, payment assistance, homeownership, and repairs.",
  "id-replacement":
    "Help obtaining or replacing identity and vital documents, including help with application steps and fees.",
  legal:
    "Free or low-cost legal assistance, immigration help, record clearing, identity-theft support, and tax preparation.",
  medical:
    "Health care for the body, teeth, and eyes, including pregnancy care, rehabilitation, prescriptions, testing, and health coverage.",
  "mental-health": "Counseling, treatment, crisis response, suicide prevention, support groups, and grief or trauma care.",
  reentry:
    "Resources for individuals preparing to leave or recently released from jail or prison, including coordinated reentry navigation.",
  seniors:
    "Services designed for older adults, including long-term care, in-home help, benefits counseling, and social connection. Each program sets its own age.",
  transportation:
    "Help getting from place to place through public transit, rides, vehicle support, vouchers, travel assistance, or bicycles.",
  utilities: "Help paying for or obtaining power, gas, water, phone, and internet service.",
  veterans:
    "Services for people who served in the U.S. military and their families, including benefits, health care, housing, and peer support.",
};

export const SUBCATEGORIES: Record<Category, Subcategory[]> = {
  addiction: [
    { name: "Residential treatment and detox", definition: "Live-in treatment or medically supported withdrawal services." },
    { name: "Outpatient treatment", definition: "Treatment received while the person continues living at home." },
    { name: "Sober living", definition: "Substance-free shared housing that supports ongoing recovery." },
    {
      name: "Support and recovery community",
      definition:
        "Peer groups, recovery meetings, coaching, and community-based support for all types of addiction, including substance use, pornography, alcohol, gambling, and more.",
    },
    { name: "Naloxone", definition: "Access to overdose-reversal medication and training on its use." },
    { name: "Quitting tobacco", definition: "Programs and supports that help people stop using tobacco or nicotine." },
  ],
  "clothing-household": [
    { name: "Clothing", definition: "Everyday, seasonal, work, school, or interview clothing." },
    { name: "Furniture", definition: "Beds, tables, chairs, couches, and other basic furnishings." },
    { name: "Household goods", definition: "Bedding, cookware, dishes, small appliances, and other home essentials." },
    {
      name: "Thrift stores",
      definition: "Stores offering donated items at reduced cost; note any vouchers or special assistance separately.",
    },
    { name: "Baby items", definition: "Diapers, formula, cribs, car seats, clothing, and other infant supplies." },
  ],
  disability: [
    { name: "Advocacy and rights", definition: "Help understanding, protecting, or exercising disability-related rights." },
    {
      name: "Assistive technology and equipment",
      definition: "Devices, equipment, or technology that improve access, mobility, communication, or daily functioning.",
    },
    {
      name: "Disability benefits (SSI/SSDI)",
      definition: "Help understanding or applying for federal disability-income programs.",
    },
    { name: "Help at home and respite", definition: "In-home support and temporary relief for family caregivers." },
    {
      name: "Housing and independent living",
      definition: "Housing support and services that help a person live as independently as possible.",
    },
    { name: "Life skills", definition: "Training in daily living, communication, budgeting, travel, or other independence skills." },
    { name: "Vision loss", definition: "Services specifically supporting people who are blind or have low vision." },
  ],
  "domestic-violence": [
    {
      name: "Hotlines",
      definition: "Immediate phone, text, or chat support, safety planning, and connection to local services.",
    },
    {
      name: "Safe shelter",
      definition: "Confidential or protected emergency lodging for survivors and, when allowed, their children.",
    },
    {
      name: "Advocacy and support",
      definition: "Help with safety planning, referrals, accompaniment, and ongoing survivor support.",
    },
    {
      name: "Protective orders",
      definition: "Information or legal help related to court orders intended to protect someone from abuse.",
    },
    {
      name: "Sexual assault services",
      definition: "Crisis response, advocacy, medical accompaniment, and survivor support after sexual violence.",
    },
    { name: "Reporting abuse", definition: "Information about how and where to report suspected abuse or neglect." },
  ],
  education: [
    { name: "GED and diploma", definition: "Adult education or alternative programs leading to a high-school credential." },
    { name: "English and literacy", definition: "English-language learning, reading, writing, and basic literacy support." },
    {
      name: "College",
      definition: "Community college, university, admissions, advising, and student-support resources.",
    },
    { name: "Trade training", definition: "Career and technical education for a trade, certification, or skilled occupation." },
    { name: "Scholarships", definition: "Funds or application help that may reduce education or training costs." },
    { name: "Life skills", definition: "Classes that build practical skills for daily living and self-reliance." },
    { name: "Money skills", definition: "Budgeting, banking, credit, debt, and financial-literacy education." },
    { name: "Parenting and preschool", definition: "Parent education, early-childhood learning, and preschool programs." },
  ],
  employment: [
    {
      name: "Job search help",
      definition: "Resumes, applications, interviewing, job leads, and employment counseling.",
    },
    { name: "Employers hiring", definition: "Current openings or direct connections to employers recruiting workers." },
    {
      name: "Temp agencies/Quick Income",
      definition:
        "Staffing agencies that place workers in temporary, temp-to-hire, or short-term jobs. Quick ways to start generating some income such as plasma centers and apps for day labor opportunities.",
    },
    { name: "Job training", definition: "Training, certification, apprenticeships, or skill-building connected to work." },
    { name: "Starting a business", definition: "Small-business planning, licensing, mentoring, and entrepreneurship support." },
    {
      name: "Financial assistance",
      definition:
        "Work-related help such as fees, tools, work boots, clothing, transportation, or other costs needed to obtain or keep a job.",
    },
  ],
  food: [
    { name: "Food pantries", definition: "Groceries or pantry items for individuals and households to take home." },
    { name: "Meals", definition: "Prepared meals served on site or distributed ready to eat." },
    {
      name: "Mobile Food Pantries",
      definition: "Pop-up mobile pantries that show up one or two times a month in designated locations.",
    },
    {
      name: "Food benefits (SNAP, WIC)",
      definition: "Public benefits that help eligible households purchase food or nutrition items.",
    },
    {
      name: "Home delivery",
      definition: "Food or meals delivered to people who cannot readily travel to a distribution site.",
    },
  ],
  "homeless-services": [
    {
      name: "Emergency shelter",
      definition: "Immediate overnight or short-duration shelter for people who do not have a safe place to stay.",
    },
    {
      name: "Day center",
      definition: "A daytime location offering basic services, connection, and respite without overnight lodging.",
    },
    { name: "Meals", definition: "Prepared food specifically available to people experiencing homelessness." },
    { name: "Showers and laundry", definition: "Facilities for bathing and washing clothing." },
    { name: "Hygiene", definition: "Toiletries, hygiene kits, restrooms, and other personal-care supports." },
    { name: "Clothing", definition: "Clothing distributed as part of homeless services." },
    { name: "Mail and storage", definition: "A mailing address, mail pickup, lockers, or secure short-term storage." },
    {
      name: "Computers and phones",
      definition: "Access to computers, internet, charging, phones, or communication assistance.",
    },
    {
      name: "Housing navigation",
      definition:
        "Help identifying housing options, completing steps, gathering documents, and connecting with coordinated-entry or housing programs.",
    },
    {
      name: "Pet resources",
      definition:
        "Pet food, temporary care, veterinary help, or support locating pet-friendly shelter while a person is homeless.",
    },
  ],
  housing: [
    {
      name: "Emergency sheltering",
      definition:
        "Immediate, crisis-oriented overnight shelter for someone without a safe place to stay. Keep this distinct from transitional housing and ordinary rentals.",
    },
    {
      name: "Short-term stay / transitional housing",
      definition:
        "Time-limited lodging or housing intended to bridge the period between crisis or homelessness and stable long-term housing. Includes programs previously labeled short-term stay or transitional housing.",
    },
    {
      name: "Extended-stay motels",
      definition:
        "Motels or similar lodging designed for stays longer than a typical hotel visit; note whether any agency pays for or refers to the placement.",
    },
    {
      name: "Low-income housing",
      definition:
        "Housing intended for households below specified income limits. Use this broad label rather than separate housing subcategories for seniors, families, disability, or other populations; identify eligibility through For groups and the program description.",
    },
    {
      name: "Rentals / rooms for rent",
      definition:
        "Apartments, houses, rooms, shared housing, and legitimate roommate-search help. Clearly note screening, lease, deposit, and safety considerations.",
    },
    {
      name: "Rent and deposit assistance / rapid rehousing",
      definition:
        "Short- or medium-term financial help with rent, arrears, move-in costs, or deposits. \u201cRapid rehousing\u201d may be included as an alternate term, but the plain-language label should remain visible.",
    },
    {
      name: "Eviction prevention",
      definition:
        "Help keeping current housing through rental assistance, mediation, legal support, case coordination, or other prevention services.",
    },
    {
      name: "Low-Income Housing Tax Credit properties",
      definition:
        "Income-restricted rental properties that reserve qualifying units in exchange for federal tax credits. Each property sets availability, rent, and eligibility within program rules.",
    },
    {
      name: "Homeownership",
      definition:
        "Homebuyer education, down-payment assistance, affordable purchase programs, mortgages, or foreclosure-prevention resources.",
    },
    {
      name: "Home repairs",
      definition:
        "Grants, loans, volunteer labor, weatherization, accessibility modifications, or critical-repair programs for eligible homeowners.",
    },
  ],
  "id-replacement": [
    {
      name: "Birth certificate",
      definition: "Help requesting a certified birth record from the appropriate vital-records office.",
    },
    { name: "State ID or driver license", definition: "Help obtaining or replacing a state identification card or driver license." },
    { name: "Social Security card", definition: "Help requesting an original or replacement Social Security card." },
    {
      name: "Document fees and supporting records",
      definition: "Help paying required fees or gathering the records needed to establish identity.",
    },
  ],
  legal: [
    {
      name: "Free legal help",
      definition: "Legal advice, clinics, representation, or referrals offered without charge or at reduced cost.",
    },
    {
      name: "Immigration",
      definition: "Legal information or representation for immigration status, asylum, citizenship, or related matters.",
    },
    {
      name: "Record clearing",
      definition: "Help with expungement, sealing, pardons, or understanding criminal-record remedies.",
    },
    { name: "Family law", definition: "Legal help involving divorce, custody, support, guardianship, or other family matters." },
    {
      name: "Identity theft",
      definition: "Help responding to stolen identity, fraudulent accounts, or compromised personal information.",
    },
    {
      name: "VITA tax help",
      definition:
        "Free tax-return preparation through the IRS Volunteer Income Tax Assistance program for eligible taxpayers.",
    },
  ],
  medical: [
    {
      name: "Medical clinics",
      definition:
        "Primary, urgent, preventive, or specialty medical care for uninsured or that offer a sliding fee scale based on income.",
    },
    { name: "Dental", definition: "Exams, cleanings, fillings, extractions, dentures, or other oral-health services." },
    { name: "Vision", definition: "Eye exams, glasses, and treatment or referral for eye conditions." },
    { name: "Prescriptions", definition: "Low-cost medicines, prescription assistance, or pharmacy-support programs." },
    { name: "Therapy and rehab", definition: "Physical, occupational, speech, or other rehabilitation services." },
    { name: "Screenings and tests", definition: "Preventive screenings, laboratory work, imaging, or diagnostic testing." },
    {
      name: "Pregnancy and postpartum care",
      definition: "Prenatal, delivery-related, and postpartum medical or support services.",
    },
    {
      name: "Health coverage (Medicaid, CHIP, Marketplace)",
      definition: "Enrollment information or application help for public or Marketplace health insurance.",
    },
  ],
  "mental-health": [
    {
      name: "Crisis and suicide prevention",
      definition: "Immediate crisis assessment, hotlines, mobile response, safety planning, and suicide-prevention services.",
    },
    {
      name: "Counseling and treatment",
      definition: "Individual, family, or group therapy and ongoing behavioral-health treatment.",
    },
    { name: "Inpatient care", definition: "Hospital-based or residential psychiatric care requiring an overnight stay." },
    {
      name: "Support groups",
      definition: "Peer or facilitated groups focused on mental health, shared experience, or recovery.",
    },
    {
      name: "Grief and trauma",
      definition: "Counseling and support for bereavement, traumatic experiences, or traumatic loss.",
    },
  ],
  reentry: [
    {
      name: "Reentry navigation",
      definition: "Help assessing needs, making a release plan, and coordinating referrals before or after release.",
    },
    {
      name: "Release documents and identification",
      definition:
        "Help obtaining birth certificates, Social Security cards, state ID, driver licenses, and other records needed after release.",
    },
    {
      name: "Reentry housing",
      definition:
        "Housing search, transitional placement, sober living, or other housing designed for people leaving incarceration.",
    },
    {
      name: "Employment after incarceration",
      definition:
        "Job readiness, resumes, interview practice, training, and employers open to applicants with criminal records.",
    },
    {
      name: "Parole and legal obligations",
      definition:
        "Support understanding or connecting with parole, probation, required treatment, court, or other post-release obligations.",
    },
    {
      name: "Benefits and health care",
      definition:
        "Help reconnecting to health coverage, medications, medical care, food benefits, and other eligible assistance.",
    },
    {
      name: "Family, community, and faith connections",
      definition: "Support rebuilding healthy relationships and connecting with community, mentoring, or faith-based support.",
    },
    {
      name: "Transportation and basic needs",
      definition: "Release-day or early-reentry help with transportation, phones, clothing, food, and personal necessities.",
    },
  ],
  seniors: [
    {
      name: "Long-term care",
      definition:
        "In-home care, adult day programs, respite, assisted living, nursing care, and related long-term supports.",
    },
    {
      name: "In-home support",
      definition: "Meals, homemaking, personal care, safety checks, and other help that supports living at home.",
    },
    {
      name: "Benefits counseling (Medicare, Social Security)",
      definition: "Help understanding or accessing Medicare, Social Security, and other benefits for older adults.",
    },
    {
      name: "Companionship and social connection",
      definition: "Friendly visiting, senior centers, activities, calls, and programs that reduce isolation.",
    },
  ],
  transportation: [
    { name: "Public transit", definition: "Bus, rail, paratransit, passes, route planning, and reduced-fare programs." },
    { name: "Rides", definition: "Volunteer, agency, medical, or scheduled transportation services." },
    { name: "Car repair", definition: "Low-cost or donated vehicle repair that helps a person maintain transportation." },
    { name: "Gas vouchers", definition: "Limited financial help for fuel, usually tied to an approved need or trip." },
    {
      name: "Reunification Travel",
      definition:
        "Transportation assistance for someone experiencing homelessness to get a Greyhound bus ticket when they have a family member or friend they can live with or a job to go to.",
    },
    { name: "Bicycles", definition: "Free or low-cost bicycles, repair, helmets, or bike-based transportation support." },
  ],
  utilities: [
    { name: "Utility bills", definition: "Payment assistance, arrears help, shutoff prevention, or energy-assistance programs." },
    { name: "Low-cost phones", definition: "Discounted or subsidized phone devices or cellular service." },
    { name: "Low-cost internet", definition: "Discounted home internet, hotspots, or programs that improve digital access." },
  ],
  veterans: [
    { name: "Benefits and claims", definition: "Help identifying, applying for, or appealing veterans benefits and claims." },
    { name: "Health care", definition: "VA or veteran-focused medical, dental, rehabilitation, or related care." },
    {
      name: "Mental health",
      definition: "Veteran-focused counseling, crisis response, trauma care, or substance-use treatment.",
    },
    {
      name: "Housing and homelessness",
      definition: "Veteran-specific shelter, rental assistance, supportive housing, and housing navigation.",
    },
    {
      name: "Peer and family support",
      definition: "Veteran peer mentoring, groups, family support, and connection to the veteran community.",
    },
  ],
};

/**
 * HQ's definition of a subcategory a place lists, looked up in that place's own categories
 * (some names, like "Meals" or "Clothing", appear under two categories).
 */
export function subcategoryInfo(name: string, categories: Category[]): Subcategory | null {
  for (const c of categories) {
    const s = SUBCATEGORIES[c].find((x) => x.name === name);
    if (s) return s;
  }
  return null;
}
