// Data Generation Functions
function generateHospitalData() {
    const firstNames = [
        'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
        'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
        'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Nancy', 'Daniel', 'Lisa',
        'Matthew', 'Betty', 'Anthony', 'Dorothy', 'Mark', 'Sandra', 'Donald', 'Donna',
        'Steven', 'Carol', 'Paul', 'Ruth', 'Andrew', 'Sharon', 'Joshua', 'Michelle',
        'Kenneth', 'Laura', 'Kevin', 'Sarah', 'Brian', 'Kimberly', 'George', 'Deborah',
        'Timothy', 'Dorothy', 'Ronald', 'Amy', 'Edward', 'Angela', 'Jason', 'Helen',
        'Jeffrey', 'Brenda', 'Ryan', 'Emma', 'Jacob', 'Olivia', 'Gary', 'Cynthia'
    ];

    const lastNames = [
        'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
        'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
        'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
        'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
        'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
        'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
        'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker'
    ];

    const ethnicities = [
        'Caucasian', 'Hispanic/Latino', 'African American', 'Asian', 'Native American',
        'Pacific Islander', 'Middle Eastern', 'Mixed Race', 'Other'
    ];

    const roles = [
        'Dr.', 'Nurse', 'Nurse Practitioner', 'Physician Assistant', 'Technician',
        'Administrator', 'Therapist', 'Pharmacist', 'Lab Tech', 'Radiologist'
    ];

    const conditions = [
        'Chest Pain', 'Broken Arm', 'Heart Attack', 'Fever', 'Migraine', 'Surgery Prep',
        'Cut Hand', 'Pneumonia', 'Diabetes', 'Hypertension', 'Back Pain', 'Anxiety',
        'Stroke', 'Kidney Stones', 'Appendicitis', 'Fracture', 'Burn', 'Allergic Reaction',
        'Asthma', 'Cancer Treatment', 'Physical Therapy', 'Blood Work', 'X-Ray',
        'MRI Scan', 'Cardiac Catheterization', 'Routine Checkup', 'Vaccination',
        'Wound Care', 'Mental Health Evaluation', 'Drug Overdose'
    ];

    const insuranceProviders = [
        'Blue Cross Blue Shield', 'Aetna', 'Cigna', 'Humana', 'UnitedHealthcare',
        'Kaiser Permanente', 'Medicare', 'Medicaid', 'Anthem', 'Molina Healthcare'
    ];

    const medicationNames = [
        'Aspirin', 'Ibuprofen', 'Acetaminophen', 'Amoxicillin', 'Lisinopril',
        'Metformin', 'Atorvastatin', 'Albuterol', 'Omeprazole', 'Losartan',
        'Gabapentin', 'Sertraline', 'Hydrochlorothiazide', 'Metoprolol', 'Prednisone',
        'Morphine', 'Insulin', 'Warfarin', 'Clopidogrel', 'Furosemide'
    ];

    // Generate Departments first (15 departments)
    const departments = [
        {id: 1, name: 'Emergency', budget: 2500000, bed_capacity: 50, head_of_department_id: null},
        {id: 2, name: 'Cardiology', budget: 1800000, bed_capacity: 30, head_of_department_id: null},
        {id: 3, name: 'Surgery', budget: 3200000, bed_capacity: 40, head_of_department_id: null},
        {id: 4, name: 'Pediatrics', budget: 1500000, bed_capacity: 35, head_of_department_id: null},
        {id: 5, name: 'Oncology', budget: 2800000, bed_capacity: 25, head_of_department_id: null},
        {id: 6, name: 'Orthopedics', budget: 2000000, bed_capacity: 30, head_of_department_id: null},
        {id: 7, name: 'Neurology', budget: 2200000, bed_capacity: 20, head_of_department_id: null},
        {id: 8, name: 'Psychiatry', budget: 1200000, bed_capacity: 40, head_of_department_id: null},
        {id: 9, name: 'Radiology', budget: 1600000, bed_capacity: 0, head_of_department_id: null},
        {id: 10, name: 'Anesthesiology', budget: 1400000, bed_capacity: 0, head_of_department_id: null},
        {id: 11, name: 'ICU', budget: 3500000, bed_capacity: 45, head_of_department_id: null},
        {id: 12, name: 'Maternity', budget: 1700000, bed_capacity: 30, head_of_department_id: null},
        {id: 13, name: 'Internal Medicine', budget: 1900000, bed_capacity: 35, head_of_department_id: null},
        {id: 14, name: 'Dermatology', budget: 800000, bed_capacity: 10, head_of_department_id: null},
        {id: 15, name: 'Urology', budget: 1300000, bed_capacity: 20, head_of_department_id: null}
    ];

    // Generate Personnel (500 unique staff members)
    const personnel = [];
    const usedNames = new Set();
    
    for (let i = 1; i <= 500; i++) {
        let fullName;
        do {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const role = roles[Math.floor(Math.random() * roles.length)];
            fullName = `${role} ${firstName} ${lastName}`;
        } while (usedNames.has(fullName));
        
        usedNames.add(fullName);
        const departmentId = 1 + Math.floor(Math.random() * 15);
        
        personnel.push({
            personnel_id: i,
            name: fullName,
            department_id: departmentId
        });
    }

    // Assign department heads (one doctor per department)
    departments.forEach(dept => {
        const deptPersonnel = personnel.filter(p => p.department_id === dept.id && p.name.startsWith('Dr.'));
        if (deptPersonnel.length > 0) {
            dept.head_of_department_id = deptPersonnel[0].personnel_id;
        }
    });

    // Generate HR data for all personnel
    const hr = personnel.map(person => {
        let baseSalary;
        const role = person.name.split(' ')[0];
        
        // Set salary ranges based on role
        switch(role) {
            case 'Dr.': baseSalary = 150000 + Math.random() * 200000; break;
            case 'Nurse': baseSalary = 60000 + Math.random() * 40000; break;
            case 'Pharmacist': baseSalary = 90000 + Math.random() * 60000; break;
            case 'Administrator': baseSalary = 70000 + Math.random() * 80000; break;
            case 'Therapist': baseSalary = 65000 + Math.random() * 50000; break;
            default: baseSalary = 45000 + Math.random() * 70000;
        }

        // Generate random hire date between 2018-2024
        const startDate = new Date(2018, 0, 1);
        const endDate = new Date(2024, 11, 31);
        const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
        
        return {
            personnel_id: person.personnel_id,
            department_id: person.department_id,
            salary: Math.round(baseSalary),
            hire_date: randomDate.toISOString().split('T')[0]
        };
    });

    // Generate Patients (2000 patients with unique patient_id)
    const patients = [];
    for (let i = 5001; i <= 7000; i++) { // Start at 5001 to avoid collision with personnel_id
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const fullName = `${firstName} ${lastName}`;
        
        patients.push({
            patient_id: i,
            name: fullName,
            age: 18 + Math.floor(Math.random() * 82), // 18-99
            ethnicity: ethnicities[Math.floor(Math.random() * ethnicities.length)],
            assigned_personnel_id: 1 + Math.floor(Math.random() * 500), // Random personnel
            department_id: 1 + Math.floor(Math.random() * 15), // Random department
            condition: conditions[Math.floor(Math.random() * conditions.length)],
            wait_time: Math.floor(Math.random() * 180), // 0-180 minutes
            admission_date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
                .toISOString().split('T')[0]
        });
    }

    // Generate Insurance records for all patients
    const insurance = patients.map(patient => ({
        patient_id: patient.patient_id,
        insurance_provider: insuranceProviders[Math.floor(Math.random() * insuranceProviders.length)],
        policy_number: `POL${patient.patient_id}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        coverage_percentage: [70, 80, 90, 100][Math.floor(Math.random() * 4)],
        deductible: [500, 1000, 2500, 5000][Math.floor(Math.random() * 4)],
        expiry_date: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
            .toISOString().split('T')[0]
    }));

    // Generate Medications (300 medication records)
    const medications = [];
    for (let i = 1; i <= 300; i++) {
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + Math.floor(Math.random() * 3) + 1); // 1-3 years from now
        
        medications.push({
            medication_id: i,
            name: medicationNames[Math.floor(Math.random() * medicationNames.length)],
            quantity_in_stock: Math.floor(Math.random() * 1000) + 50,
            cost_per_unit: Math.round((Math.random() * 200 + 5) * 100) / 100, // $5-$205
            expiry_date: expiryDate.toISOString().split('T')[0],
            purchased_by_personnel_id: 1 + Math.floor(Math.random() * 500)
        });
    }

    // Generate Procedures (150 different procedures)
    const procedureNames = [
        'Blood Test', 'X-Ray', 'MRI Scan', 'CT Scan', 'Ultrasound', 'ECG', 'Surgery - Appendectomy',
        'Surgery - Heart Bypass', 'Physical Therapy Session', 'Vaccination', 'Dialysis',
        'Chemotherapy', 'Radiation Therapy', 'Endoscopy', 'Colonoscopy', 'Biopsy',
        'Cardiac Catheterization', 'Angioplasty', 'Emergency Treatment', 'Consultation'
    ];
    
    const procedures = [];
    for (let i = 1; i <= 150; i++) {
        procedures.push({
            procedure_id: i,
            name: procedureNames[Math.floor(Math.random() * procedureNames.length)],
            base_cost: Math.floor(Math.random() * 50000) + 100, // $100-$50,100
            duration_minutes: Math.floor(Math.random() * 480) + 15, // 15-480 minutes
            department_id: 1 + Math.floor(Math.random() * 15),
            requires_anesthesia: Math.random() > 0.7 // 30% chance
        });
    }

    // Generate Appointments (1500 appointments)
    const appointments = [];
    for (let i = 1; i <= 1500; i++) {
        const appointmentDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
        const hour = Math.floor(Math.random() * 12) + 8; // 8 AM to 7 PM
        const minute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
        appointmentDate.setHours(hour, minute);

        appointments.push({
            appointment_id: i,
            patient_id: 5001 + Math.floor(Math.random() * 2000), // Random patient
            personnel_id: 1 + Math.floor(Math.random() * 500), // Random personnel
            procedure_id: 1 + Math.floor(Math.random() * 150), // Random procedure
            appointment_datetime: appointmentDate.toISOString().slice(0, 16).replace('T', ' '), // YYYY-MM-DD HH:MM
            status: ['Scheduled', 'Completed', 'Cancelled', 'No-Show'][Math.floor(Math.random() * 4)]
        });
    }

    // Generate Equipment (300 items)
    const equipmentTypes = [
        'MRI Machine', 'CT Scanner', 'X-Ray Machine', 'Ultrasound', 'Defibrillator',
        'Ventilator', 'ECG Machine', 'Dialysis Machine', 'Surgical Robot', 'Anesthesia Machine',
        'Infusion Pump', 'Patient Monitor', 'Wheelchair', 'Hospital Bed', 'Stretcher'
    ];
    
    const manufacturers = ['GE Healthcare', 'Siemens', 'Philips', 'Medtronic', 'Abbott', 'Boston Scientific'];
    const statuses = ['Available', 'In Use', 'Maintenance', 'Out of Order'];

    const equipment = [];
    for (let i = 1; i <= 300; i++) {
        equipment.push({
            equipment_id: i,
            equipment_type: equipmentTypes[Math.floor(Math.random() * equipmentTypes.length)],
            manufacturer: manufacturers[Math.floor(Math.random() * manufacturers.length)],
            department_id: 1 + Math.floor(Math.random() * 15),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            last_maintenance: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
                .toISOString().split('T')[0],
            purchase_cost: 5000 + Math.floor(Math.random() * 500000)
        });
    }

    return { 
        departments, 
        personnel, 
        hr, 
        patients, 
        insurance, 
        medications, 
        procedures, 
        appointments, 
        equipment 
    };
}

// Table Schema Definitions
const tableSchemas = {
    departments: {
        name: 'departments',
        description: 'Hospital departments and organizational structure',
        columns: [
            {name: 'id', type: 'INTEGER', description: 'Unique department identifier'},
            {name: 'name', type: 'TEXT', description: 'Department name'},
            {name: 'budget', type: 'INTEGER', description: 'Annual budget in USD'},
            {name: 'bed_capacity', type: 'INTEGER', description: 'Number of beds available'},
            {name: 'head_of_department_id', type: 'INTEGER', description: 'References personnel.personnel_id'}
        ]
    },
    personnel: {
        name: 'personnel',
        description: 'Hospital staff information',
        columns: [
            {name: 'personnel_id', type: 'INTEGER', description: 'Unique staff identifier'},
            {name: 'name', type: 'TEXT', description: 'Full name of staff member'},
            {name: 'department_id', type: 'INTEGER', description: 'References departments.id'}
        ]
    },
    hr: {
        name: 'hr',
        description: 'Human resources and payroll data',
        columns: [
            {name: 'personnel_id', type: 'INTEGER', description: 'References personnel.personnel_id'},
            {name: 'department_id', type: 'INTEGER', description: 'References departments.id'},
            {name: 'salary', type: 'INTEGER', description: 'Annual salary in USD'},
            {name: 'hire_date', type: 'DATE', description: 'Date of hire'}
        ]
    },
    patients: {
        name: 'patients',
        description: 'Current patients in the system',
        columns: [
            {name: 'patient_id', type: 'INTEGER', description: 'Unique patient identifier'},
            {name: 'name', type: 'TEXT', description: 'Patient full name'},
            {name: 'age', type: 'INTEGER', description: 'Patient age'},
            {name: 'ethnicity', type: 'TEXT', description: 'Patient ethnicity'},
            {name: 'assigned_personnel_id', type: 'INTEGER', description: 'References personnel.personnel_id'},
            {name: 'department_id', type: 'INTEGER', description: 'References departments.id'},
            {name: 'condition', type: 'TEXT', description: 'Medical condition or reason for visit'},
            {name: 'wait_time', type: 'INTEGER', description: 'Wait time in minutes'},
            {name: 'admission_date', type: 'DATE', description: 'Date of admission'}
        ]
    },
    insurance: {
        name: 'insurance',
        description: 'Patient insurance information and coverage',
        columns: [
            {name: 'patient_id', type: 'INTEGER', description: 'References patients.patient_id'},
            {name: 'insurance_provider', type: 'TEXT', description: 'Insurance company name'},
            {name: 'policy_number', type: 'TEXT', description: 'Unique policy identifier'},
            {name: 'coverage_percentage', type: 'INTEGER', description: 'Percentage of costs covered'},
            {name: 'deductible', type: 'INTEGER', description: 'Annual deductible amount in USD'},
            {name: 'expiry_date', type: 'DATE', description: 'Policy expiration date'}
        ]
    },
    medications: {
        name: 'medications',
        description: 'Hospital medication inventory',
        columns: [
            {name: 'medication_id', type: 'INTEGER', description: 'Unique medication identifier'},
            {name: 'name', type: 'TEXT', description: 'Medication name'},
            {name: 'quantity_in_stock', type: 'INTEGER', description: 'Current stock quantity'},
            {name: 'cost_per_unit', type: 'DECIMAL', description: 'Cost per unit in USD'},
            {name: 'expiry_date', type: 'DATE', description: 'Medication expiration date'},
            {name: 'purchased_by_personnel_id', type: 'INTEGER', description: 'References personnel.personnel_id'}
        ]
    },
    procedures: {
        name: 'procedures',
        description: 'Medical procedures and treatments available',
        columns: [
            {name: 'procedure_id', type: 'INTEGER', description: 'Unique procedure identifier'},
            {name: 'name', type: 'TEXT', description: 'Procedure name'},
            {name: 'base_cost', type: 'INTEGER', description: 'Base cost in USD'},
            {name: 'duration_minutes', type: 'INTEGER', description: 'Average duration in minutes'},
            {name: 'department_id', type: 'INTEGER', description: 'References departments.id'},
            {name: 'requires_anesthesia', type: 'BOOLEAN', description: 'Whether procedure requires anesthesia'}
        ]
    },
    appointments: {
        name: 'appointments',
        description: 'Scheduled patient appointments and procedures',
        columns: [
            {name: 'appointment_id', type: 'INTEGER', description: 'Unique appointment identifier'},
            {name: 'patient_id', type: 'INTEGER', description: 'References patients.patient_id'},
            {name: 'personnel_id', type: 'INTEGER', description: 'References personnel.personnel_id'},
            {name: 'procedure_id', type: 'INTEGER', description: 'References procedures.procedure_id'},
            {name: 'appointment_datetime', type: 'DATETIME', description: 'Scheduled date and time'},
            {name: 'status', type: 'TEXT', description: 'Appointment status (Scheduled/Completed/Cancelled/No-Show)'}
        ]
    },
    equipment: {
        name: 'equipment',
        description: 'Hospital equipment and machinery',
        columns: [
            {name: 'equipment_id', type: 'INTEGER', description: 'Unique equipment identifier'},
            {name: 'equipment_type', type: 'TEXT', description: 'Type of equipment'},
            {name: 'manufacturer', type: 'TEXT', description: 'Equipment manufacturer'},
            {name: 'department_id', type: 'INTEGER', description: 'References departments.id'},
            {name: 'status', type: 'TEXT', description: 'Equipment status'},
            {name: 'last_maintenance', type: 'DATE', description: 'Date of last maintenance'},
            {name: 'purchase_cost', type: 'INTEGER', description: 'Original purchase cost in USD'}
        ]
    }
};

// Generate the hospital data
const hospitalData = generateHospitalData();

// Challenge Scenarios
const challenges = [
    // Basic Single-Table Challenges
    {
        title: "Challenge 1: Basic SELECT",
        description: "Select all personnel from the personnel table.",
        solution: "SELECT * FROM personnel",
        hint: "Use SELECT * to select all columns",
        type: "basic",
        autoCheck: true
    },
    {
        title: "Challenge 2: Specific Columns",
        description: "Select only the name and department columns from the personnel table.",
        solution: "SELECT name, department FROM personnel",
        hint: "List the specific columns you want after SELECT",
        type: "basic",
        autoCheck: true
    },
    {
        title: "Challenge 3: Department Filter",
        description: "Select all personnel from the Emergency department.",
        solution: "SELECT * FROM personnel WHERE department = 'Emergency'",
        hint: "Use WHERE to filter rows based on conditions",
        type: "basic",
        autoCheck: true
    },
    
    // Multi-Step Challenges (Manual Submit)
    {
        title: "Challenge 4: Highest Paid Employee",
        description: "Find the name of the person with the highest salary in the hospital. You'll need to use multiple queries to solve this.",
        expectedSteps: [
            "First, find the maximum salary from the hr table",
            "Then, find the personnel_id with that salary",
            "Finally, get the name from the personnel table"
        ],
        hint: "Start by finding the highest salary amount, then work backwards to find who has it.",
        type: "multi-step",
        autoCheck: false,
        validation: "manual"
    },
    {
        title: "Challenge 5: Emergency Department Analysis",
        description: "How many doctors work in the Emergency department and what is their average salary?",
        expectedSteps: [
            "Find personnel in Emergency department with 'Dr.' in their name",
            "Get their personnel_ids",
            "Look up their salaries in the hr table",
            "Count them and calculate average"
        ],
        hint: "Use WHERE clauses to filter by department and job title, then look up salary data.",
        type: "multi-step",
        autoCheck: false,
        validation: "manual"
    },
    {
        title: "Challenge 6: Patient Load by Staff",
        description: "Which staff member is currently assigned the most patients, and how many patients do they have?",
        expectedSteps: [
            "Count patients by assigned_personnel_id",
            "Find the personnel_id with the highest count",
            "Look up the staff member's name"
        ],
        hint: "Group patients by their assigned staff member and count them.",
        type: "multi-step",
        autoCheck: false,
        validation: "manual"
    },
    
    // More Basic Challenges
    {
        title: "Challenge 7: Equipment Status",
        description: "Select all equipment that is currently 'Out of Order'.",
        solution: "SELECT * FROM equipment WHERE status = 'Out of Order'",
        hint: "Filter equipment by status",
        type: "basic",
        autoCheck: true
    },
    {
        title: "Challenge 8: Recent Admissions",
        description: "Select patient names and conditions for patients admitted in 2024, ordered by admission date.",
        solution: "SELECT name, condition FROM patients WHERE admission_date LIKE '2024%' ORDER BY admission_date",
        hint: "Use LIKE to match dates starting with '2024'",
        type: "basic",
        autoCheck: true
    }
];

// Export data for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { hospitalData, tableSchemas, challenges };
} else {
    // For browser environment
    window.hospitalData = hospitalData;
    window.tableSchemas = tableSchemas;
    window.challenges = challenges;
}