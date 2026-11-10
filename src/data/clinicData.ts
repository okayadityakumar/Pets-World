export interface ClinicSubService {
  id: string;
  name: string;
  category: string;
}

export interface ClinicCategory {
  id: string;
  departmentNum: string;
  categoryNum: string;
  title: string;
  subtitle: string;
  tag: string;
  itemCount: number;
  summary: string;
  image: string;
  subServices: string[];
}

// Deprecated alias for backwards compatibility
export interface ClinicService {
  id: string;
  title: string;
  category: string;
  highlight: string;
  description: string;
  applicablePets: string[];
}

export const CLINIC_CATEGORIES: ClinicCategory[] = [
  {
    id: "consultation-healthcare",
    departmentNum: "CLINICAL DEPT 01",
    categoryNum: "CLINICAL CATEGORY 01",
    title: "Veterinary Consultation & Healthcare",
    subtitle: "Diagnosis & Daily Care",
    tag: "CLINICAL DEPT 01",
    itemCount: 6,
    summary: "GENERAL HEALTH CHECKUPS · VETERINARY CONSULTATIONS · DISEASE DIAGNOSIS · ALLERGIES & DIGESTIVE CARE",
    image: "/assets/clinic/dept1_consultation.jpg",
    subServices: [
      "General Health Checkups",
      "Veterinary Consultations",
      "Disease Diagnosis and Treatment",
      "Skin and Allergy Treatment",
      "Digestive and Respiratory Problems",
      "Fever and Infection Treatment",
    ],
  },
  {
    id: "vaccination-preventive-care",
    departmentNum: "CLINICAL DEPT 02",
    categoryNum: "CLINICAL CATEGORY 02",
    title: "Vaccination & Preventive Care",
    subtitle: "Immunity & Protection",
    tag: "CLINICAL DEPT 02",
    itemCount: 6,
    summary: "ANTI-RABIES · PUPPY & KITTEN VACCINES · ANNUAL BOOSTERS · DEWORMING · TICK & FLEA PREVENTION",
    image: "/assets/clinic/dept2_vaccination.jpg",
    subServices: [
      "Anti-Rabies Vaccination",
      "Puppy and Kitten Vaccination",
      "Annual Booster Vaccinations",
      "Deworming",
      "Tick and Flea Prevention",
      "Preventive Health Checkups",
    ],
  },
  {
    id: "surgery-medical-procedures",
    departmentNum: "CLINICAL DEPT 03",
    categoryNum: "CLINICAL CATEGORY 03",
    title: "Surgery & Medical Procedures",
    subtitle: "Safe & Sterile Care",
    tag: "CLINICAL DEPT 03",
    itemCount: 6,
    summary: "STERILIZATION & NEUTERING · SPAYING · GENERAL SURGERY · WOUND SUTURING · TUMOUR REMOVAL",
    image: "/assets/clinic/dept3_surgery.jpg",
    subServices: [
      "Sterilization and Neutering",
      "Spaying",
      "General Surgical Procedures",
      "Wound Treatment and Suturing",
      "Tumour Removal",
      "Dental Procedures",
    ],
  },
  {
    id: "diagnostic-laboratory",
    departmentNum: "CLINICAL DEPT 04",
    categoryNum: "CLINICAL CATEGORY 04",
    title: "Diagnostic & Laboratory Services",
    subtitle: "Pathology & Screening",
    tag: "CLINICAL DEPT 04",
    itemCount: 6,
    summary: "BLOOD TESTS (CBC) · URINE & STOOL · DIGITAL X-RAY · ULTRASOUND · MICROSCOPIC PATHOLOGY",
    image: "/assets/clinic/dept4_diagnostic.jpg",
    subServices: [
      "Blood Tests",
      "Urine and Stool Tests",
      "X-Ray",
      "Ultrasound",
      "Microscopic Examination",
      "Diagnostic Screening",
    ],
  },
  {
    id: "pet-grooming-hygiene",
    departmentNum: "CLINICAL DEPT 05",
    categoryNum: "CLINICAL CATEGORY 05",
    title: "Pet Grooming & Hygiene",
    subtitle: "Bathing, Styling & Coat Care",
    tag: "CLINICAL DEPT 05",
    itemCount: 6,
    summary: "BATHING & SHAMPOOING · HAIR TRIMMING · NAIL CLIPPING · EAR CLEANING · TEETH CLEANING · COAT CARE",
    image: "/assets/clinic/dept5_grooming.jpg",
    subServices: [
      "Bathing and Shampooing",
      "Hair Trimming and Styling",
      "Nail Clipping",
      "Ear Cleaning",
      "Teeth Cleaning",
      "Coat Brushing and Maintenance",
    ],
  },
  {
    id: "pet-pharmacy-medication",
    departmentNum: "CLINICAL DEPT 06",
    categoryNum: "CLINICAL CATEGORY 06",
    title: "Pet Pharmacy & Medication",
    subtitle: "Medicines, Supplements & Diets",
    tag: "CLINICAL DEPT 06",
    itemCount: 6,
    summary: "VETERINARY MEDICINES · PRESCRIPTION MEDICATIONS · SUPPLEMENTS & VITAMINS · FLEA MEDS · DIETS",
    image: "/assets/clinic/dept6_pharmacy.jpg",
    subServices: [
      "Veterinary Medicines",
      "Prescription Medications",
      "Supplements and Vitamins",
      "Tick and Flea Medications",
      "Deworming Medicines",
      "Prescription Pet Diets",
    ],
  },
  {
    id: "emergency-critical-care",
    departmentNum: "CLINICAL DEPT 07",
    categoryNum: "CLINICAL CATEGORY 07",
    title: "Emergency & Critical Care",
    subtitle: "Urgent Triage & Recovery",
    tag: "CLINICAL DEPT 07",
    itemCount: 6,
    summary: "EMERGENCY CONSULTATIONS · ACCIDENT & TRAUMA · POISONING MANAGEMENT · IV FLUIDS · HOSPITALIZATION",
    image: "/assets/clinic/dept7_emergency.jpg",
    subServices: [
      "Emergency Consultations",
      "Accident and Injury Treatment",
      "Poisoning Management",
      "IV Fluids and Supportive Care",
      "Hospitalization",
      "Post-Operative Monitoring",
    ],
  },
  {
    id: "additional-specialized-services",
    departmentNum: "CLINICAL DEPT 08",
    categoryNum: "CLINICAL CATEGORY 08",
    title: "Additional & Specialized Services",
    subtitle: "Holistic Pet Support",
    tag: "CLINICAL DEPT 08",
    itemCount: 8,
    summary: "DIET COUNSELLING · MATERNITY CARE · DENTAL CHECKUPS · MICROCHIPPING · BOARDING · HOME VISITS",
    image: "/assets/clinic/dept8_specialized.jpg",
    subServices: [
      "Pet Nutrition and Diet Counselling",
      "Pregnancy Diagnosis and Maternity Care",
      "Dental Checkups",
      "Microchipping and Pet Identification",
      "Pet Boarding",
      "Home Veterinary Visits",
      "Pet Health Certificates",
      "Behavioural Consultations",
    ],
  },
];

// Backwards compatibility alias
export const CLINIC_SERVICES: ClinicService[] = CLINIC_CATEGORIES.map((c) => ({
  id: c.id,
  title: c.title,
  category: c.tag,
  highlight: c.subtitle,
  description: c.summary,
  applicablePets: ["DOG", "CAT", "BIRD", "RABBIT"],
}));
