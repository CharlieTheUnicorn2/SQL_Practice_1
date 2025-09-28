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

// Challenge Scenarios - 20 Progressive Challenges (Result-Based Validation)
const challenges = [
    // BEGINNER (Challenges 1-5): Basic SELECT and WHERE
    {
        title: "Basic SELECT",
        description: "Select all personnel from the personnel table to see who works at the hospital.",
        solution: "SELECT * FROM personnel", // Reference solution for validation
        hint: "Use SELECT * to select all columns",
        difficulty: "Beginner",
        autoCheck: true
    },
    {
        title: "Specific Columns", 
        description: "Select only the name and department_id from the personnel table.",
        solution: "SELECT name, department_id FROM personnel",
        hint: "List the specific columns you want after SELECT, separated by commas",
        difficulty: "Beginner",
        autoCheck: true,
        specificColumns: ['name', 'department_id'] // Only check these columns
    },
    {
        title: "Filter by Department",
        description: "Select all personnel who work in department_id 1 (Emergency department).",
        solution: "SELECT * FROM personnel WHERE department_id = 1",
        hint: "Use WHERE to filter rows based on conditions",
        difficulty: "Beginner",
        autoCheck: true
    },
    {
        title: "Filter by Salary",
        description: "Select all records from the hr table where salary is greater than 100000.",
        solution: "SELECT * FROM hr WHERE salary > 100000",
        hint: "Use WHERE with comparison operators like >, <, =",
        difficulty: "Beginner",
        autoCheck: true
    },
    {
        title: "Order Results",
        description: "Select all personnel names and department_ids, ordered alphabetically by name.",
        solution: "SELECT name, department_id FROM personnel ORDER BY name",
        hint: "Use ORDER BY to sort results",
        difficulty: "Beginner",
        autoCheck: true,
        specificColumns: ['name', 'department_id']
    },

    // EASY (Challenges 6-10): Basic JOINs and simple functions
    {
        title: "First JOIN Query",
        description: "Show each person's name and their salary by joining the personnel and hr tables.",
        solution: "SELECT p.name, h.salary FROM personnel p JOIN hr h ON p.personnel_id = h.personnel_id",
        hint: "Use JOIN to connect tables. Give tables aliases (p, h) to make it easier",
        difficulty: "Easy",
        autoCheck: true,
        specificColumns: ['name', 'salary']
    },
    {
        title: "JOIN with Filtering", 
        description: "Show names and salaries for personnel earning more than 150000, ordered by salary (highest first).",
        solution: "SELECT p.name, h.salary FROM personnel p JOIN hr h ON p.personnel_id = h.personnel_id WHERE h.salary > 150000 ORDER BY h.salary DESC",
        hint: "Combine JOIN, WHERE, and ORDER BY clauses",
        difficulty: "Easy",
        autoCheck: true,
        specificColumns: ['name', 'salary']
    },
    {
        title: "LIMIT Results",
        description: "Find the top 5 highest-paid personnel. Show names and salaries.",
        solution: "SELECT p.name, h.salary FROM personnel p JOIN hr h ON p.personnel_id = h.personnel_id ORDER BY h.salary DESC LIMIT 5",
        hint: "Use LIMIT after ORDER BY to get just the top results",
        difficulty: "Easy",
        autoCheck: true,
        specificColumns: ['name', 'salary']
    },
    {
        title: "Three Table JOIN",
        description: "Show department names, personnel names, and salaries. You'll need to join departments, personnel, and hr tables.",
        solution: "SELECT d.name as department, p.name as personnel_name, h.salary FROM departments d JOIN personnel p ON d.id = p.department_id JOIN hr h ON p.personnel_id = h.personnel_id",
        hint: "Chain multiple JOINs together. Use aliases to make column names clear",
        difficulty: "Easy",
        autoCheck: true,
        flexibleColumns: true // Column names can vary as long as data is right
    },
    {
        title: "Patient Information",
        description: "Show patient names, their conditions, and their assigned personnel names.",
        solution: "SELECT pat.name as patient_name, pat.condition, per.name as assigned_personnel FROM patients pat JOIN personnel per ON pat.assigned_personnel_id = per.personnel_id",
        hint: "JOIN patients with personnel table",
        difficulty: "Easy",
        autoCheck: true,
        flexibleColumns: true
    },

    // INTERMEDIATE (Challenges 11-15): Aggregate functions and GROUP BY
    {
        title: "Count Function",
        description: "Count how many personnel work at the hospital.",
        solution: "SELECT COUNT(*) as total_personnel FROM personnel",
        hint: "Use COUNT(*) to count all rows",
        difficulty: "Intermediate",
        autoCheck: true,
        flexibleColumns: true
    },
    {
        title: "Average Salary",
        description: "Find the average salary across all hospital personnel.",
        solution: "SELECT AVG(salary) as average_salary FROM hr",
        hint: "Use AVG() function on the salary column",
        difficulty: "Intermediate",
        autoCheck: true,
        flexibleColumns: true
    },
    {
        title: "Group By Department",
        description: "Count how many personnel work in each department. Show department name and count.",
        solution: "SELECT d.name, COUNT(p.personnel_id) as staff_count FROM departments d LEFT JOIN personnel p ON d.id = p.department_id GROUP BY d.id, d.name",
        hint: "Use COUNT() with GROUP BY. LEFT JOIN ensures all departments are shown",
        difficulty: "Intermediate",
        autoCheck: true,
        flexibleColumns: true
    },
    {
        title: "Department Salary Analysis",
        description: "Find the average salary for each department. Show department name and average salary, ordered by average salary (highest first).",
        solution: "SELECT d.name, AVG(h.salary) as avg_salary FROM departments d JOIN personnel p ON d.id = p.department_id JOIN hr h ON p.personnel_id = h.personnel_id GROUP BY d.id, d.name ORDER BY avg_salary DESC",
        hint: "Use AVG() with GROUP BY and multiple JOINs",
        difficulty: "Intermediate",
        autoCheck: true,
        flexibleColumns: true
    },
    {
        title: "Patient Wait Times",
        description: "Find patients with wait times over 60 minutes. Show patient name, condition, wait time, and assigned personnel name.",
        solution: "SELECT pat.name, pat.condition, pat.wait_time, per.name as assigned_personnel FROM patients pat JOIN personnel per ON pat.assigned_personnel_id = per.personnel_id WHERE pat.wait_time > 60",
        hint: "Use WHERE to filter wait times and JOIN to get personnel names",
        difficulty: "Intermediate",
        autoCheck: true,
        flexibleColumns: true
    },

    // INTERMEDIATE-ADVANCED (Challenges 16-20): Subqueries and complex analysis
    {
        title: "Above Average Salaries",
        description: "Find all personnel who earn more than the average salary. Show names and salaries.",
        solution: "SELECT p.name, h.salary FROM personnel p JOIN hr h ON p.personnel_id = h.personnel_id WHERE h.salary > (SELECT AVG(salary) FROM hr)",
        hint: "Use a subquery with AVG() in the WHERE clause",
        difficulty: "Intermediate-Advanced",
        autoCheck: true,
        specificColumns: ['name', 'salary']
    },
    {
        title: "Department Budget Analysis",
        description: "Find departments where the total staff salaries exceed the department budget. Show department name, budget, and total salaries.",
        solution: "SELECT d.name, d.budget, SUM(h.salary) as total_salaries FROM departments d JOIN personnel p ON d.id = p.department_id JOIN hr h ON p.personnel_id = h.personnel_id GROUP BY d.id, d.name, d.budget HAVING SUM(h.salary) > d.budget",
        hint: "Use SUM() with GROUP BY and HAVING to filter groups",
        difficulty: "Intermediate-Advanced",
        autoCheck: true,
        flexibleColumns: true
    },
    {
        title: "Equipment Cost Analysis",
        description: "Find the department with the highest total equipment cost. Show department name and total cost.",
        solution: "SELECT d.name, SUM(e.purchase_cost) as total_equipment_cost FROM departments d JOIN equipment e ON d.id = e.department_id GROUP BY d.id, d.name ORDER BY total_equipment_cost DESC LIMIT 1",
        hint: "Use SUM(), GROUP BY, ORDER BY, and LIMIT",
        difficulty: "Intermediate-Advanced",
        autoCheck: true,
        flexibleColumns: true
    },
    {
        title: "Staff Workload Analysis", 
        description: "Find personnel who are assigned to more than 5 patients. Show personnel name and patient count.",
        solution: "SELECT per.name, COUNT(pat.patient_id) as patient_count FROM personnel per JOIN patients pat ON per.personnel_id = pat.assigned_personnel_id GROUP BY per.personnel_id, per.name HAVING COUNT(pat.patient_id) > 5",
        hint: "Use COUNT() with GROUP BY and HAVING to filter groups",
        difficulty: "Intermediate-Advanced",
        autoCheck: true,
        flexibleColumns: true
    },
    {
        title: "Complex Department Analysis",
        description: "For each department, show: department name, number of staff, average salary, and total equipment cost. Order by total equipment cost (highest first).",
        solution: "SELECT d.name, COUNT(DISTINCT p.personnel_id) as staff_count, AVG(h.salary) as avg_salary, COALESCE(SUM(DISTINCT e.purchase_cost), 0) as total_equipment_cost FROM departments d LEFT JOIN personnel p ON d.id = p.department_id LEFT JOIN hr h ON p.personnel_id = h.personnel_id LEFT JOIN equipment e ON d.id = e.department_id GROUP BY d.id, d.name ORDER BY total_equipment_cost DESC",
        hint: "Use multiple aggregate functions, DISTINCT to avoid double counting, and COALESCE for departments with no equipment",
        difficulty: "Intermediate-Advanced",
        autoCheck: true,
        flexibleColumns: true
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
