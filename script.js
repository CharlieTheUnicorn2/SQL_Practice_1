// Global variables
let db = null;
let currentChallenge = 0;

// Initialize SQL.js and create database
async function initializeDatabase() {
    try {
        // Initialize SQL.js
        const SQL = await initSqlJs({
            locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });
        
        // Create a new database
        db = new SQL.Database();
        
        // Create all tables
        createTables();
        
        // Insert all the generated data
        insertHospitalData();
        
        // Hide loading, show main content
        document.getElementById('loading').style.display = 'none';
        document.getElementById('main-content').style.display = 'grid';
        
        // Initialize UI
        initializeTables();
        updateChallenge();
        updateNavigationButtons();
        
        console.log('Database initialized successfully!');
        console.log('Try: SELECT COUNT(*) as total_personnel FROM personnel;');
        
    } catch (error) {
        console.error('Failed to initialize database:', error);
        document.getElementById('loading').innerHTML = 'Error loading database. Please refresh the page.';
    }
}

function createTables() {
    // Create departments table
    db.run(`
        CREATE TABLE departments (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            budget INTEGER,
            bed_capacity INTEGER,
            head_of_department_id INTEGER
        )
    `);

    // Create personnel table
    db.run(`
        CREATE TABLE personnel (
            personnel_id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            department_id INTEGER,
            FOREIGN KEY (department_id) REFERENCES departments(id)
        )
    `);

    // Create hr table
    db.run(`
        CREATE TABLE hr (
            personnel_id INTEGER PRIMARY KEY,
            department_id INTEGER,
            salary INTEGER,
            hire_date DATE,
            FOREIGN KEY (personnel_id) REFERENCES personnel(personnel_id),
            FOREIGN KEY (department_id) REFERENCES departments(id)
        )
    `);

    // Create patients table
    db.run(`
        CREATE TABLE patients (
            patient_id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            age INTEGER,
            ethnicity TEXT,
            assigned_personnel_id INTEGER,
            department_id INTEGER,
            condition TEXT,
            wait_time INTEGER,
            admission_date DATE,
            FOREIGN KEY (assigned_personnel_id) REFERENCES personnel(personnel_id),
            FOREIGN KEY (department_id) REFERENCES departments(id)
        )
    `);

    // Create insurance table
    db.run(`
        CREATE TABLE insurance (
            patient_id INTEGER PRIMARY KEY,
            insurance_provider TEXT,
            policy_number TEXT,
            coverage_percentage INTEGER,
            deductible INTEGER,
            expiry_date DATE,
            FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
        )
    `);

    // Create medications table
    db.run(`
        CREATE TABLE medications (
            medication_id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            quantity_in_stock INTEGER,
            cost_per_unit DECIMAL(10,2),
            expiry_date DATE,
            purchased_by_personnel_id INTEGER,
            FOREIGN KEY (purchased_by_personnel_id) REFERENCES personnel(personnel_id)
        )
    `);

    // Create procedures table
    db.run(`
        CREATE TABLE procedures (
            procedure_id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            base_cost INTEGER,
            duration_minutes INTEGER,
            department_id INTEGER,
            requires_anesthesia BOOLEAN,
            FOREIGN KEY (department_id) REFERENCES departments(id)
        )
    `);

    // Create appointments table
    db.run(`
        CREATE TABLE appointments (
            appointment_id INTEGER PRIMARY KEY,
            patient_id INTEGER,
            personnel_id INTEGER,
            procedure_id INTEGER,
            appointment_datetime DATETIME,
            status TEXT,
            FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
            FOREIGN KEY (personnel_id) REFERENCES personnel(personnel_id),
            FOREIGN KEY (procedure_id) REFERENCES procedures(procedure_id)
        )
    `);

    // Create equipment table
    db.run(`
        CREATE TABLE equipment (
            equipment_id INTEGER PRIMARY KEY,
            equipment_type TEXT,
            manufacturer TEXT,
            department_id INTEGER,
            status TEXT,
            last_maintenance DATE,
            purchase_cost INTEGER,
            FOREIGN KEY (department_id) REFERENCES departments(id)
        )
    `);
}

function insertHospitalData() {
    // Insert departments
    const deptStmt = db.prepare(`
        INSERT INTO departments (id, name, budget, bed_capacity, head_of_department_id) 
        VALUES (?, ?, ?, ?, ?)
    `);
    hospitalData.departments.forEach(dept => {
        deptStmt.run([dept.id, dept.name, dept.budget, dept.bed_capacity, dept.head_of_department_id]);
    });
    deptStmt.free();

    // Insert personnel
    const personnelStmt = db.prepare(`
        INSERT INTO personnel (personnel_id, name, department_id) 
        VALUES (?, ?, ?)
    `);
    hospitalData.personnel.forEach(person => {
        personnelStmt.run([person.personnel_id, person.name, person.department_id]);
    });
    personnelStmt.free();

    // Insert HR data
    const hrStmt = db.prepare(`
        INSERT INTO hr (personnel_id, department_id, salary, hire_date) 
        VALUES (?, ?, ?, ?)
    `);
    hospitalData.hr.forEach(hr => {
        hrStmt.run([hr.personnel_id, hr.department_id, hr.salary, hr.hire_date]);
    });
    hrStmt.free();

    // Insert patients
    const patientsStmt = db.prepare(`
        INSERT INTO patients (patient_id, name, age, ethnicity, assigned_personnel_id, department_id, condition, wait_time, admission_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    hospitalData.patients.forEach(patient => {
        patientsStmt.run([
            patient.patient_id, patient.name, patient.age, patient.ethnicity,
            patient.assigned_personnel_id, patient.department_id, patient.condition,
            patient.wait_time, patient.admission_date
        ]);
    });
    patientsStmt.free();

    // Insert insurance
    const insuranceStmt = db.prepare(`
        INSERT INTO insurance (patient_id, insurance_provider, policy_number, coverage_percentage, deductible, expiry_date) 
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    hospitalData.insurance.forEach(ins => {
        insuranceStmt.run([ins.patient_id, ins.insurance_provider, ins.policy_number, ins.coverage_percentage, ins.deductible, ins.expiry_date]);
    });
    insuranceStmt.free();

    // Insert medications
    const medicationsStmt = db.prepare(`
        INSERT INTO medications (medication_id, name, quantity_in_stock, cost_per_unit, expiry_date, purchased_by_personnel_id) 
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    hospitalData.medications.forEach(med => {
        medicationsStmt.run([med.medication_id, med.name, med.quantity_in_stock, med.cost_per_unit, med.expiry_date, med.purchased_by_personnel_id]);
    });
    medicationsStmt.free();

    // Insert procedures
    const proceduresStmt = db.prepare(`
        INSERT INTO procedures (procedure_id, name, base_cost, duration_minutes, department_id, requires_anesthesia) 
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    hospitalData.procedures.forEach(proc => {
        proceduresStmt.run([proc.procedure_id, proc.name, proc.base_cost, proc.duration_minutes, proc.department_id, proc.requires_anesthesia]);
    });
    proceduresStmt.free();

    // Insert appointments
    const appointmentsStmt = db.prepare(`
        INSERT INTO appointments (appointment_id, patient_id, personnel_id, procedure_id, appointment_datetime, status) 
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    hospitalData.appointments.forEach(appt => {
        appointmentsStmt.run([appt.appointment_id, appt.patient_id, appt.personnel_id, appt.procedure_id, appt.appointment_datetime, appt.status]);
    });
    appointmentsStmt.free();

    // Insert equipment
    const equipmentStmt = db.prepare(`
        INSERT INTO equipment (equipment_id, equipment_type, manufacturer, department_id, status, last_maintenance, purchase_cost) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    hospitalData.equipment.forEach(equip => {
        equipmentStmt.run([equip.equipment_id, equip.equipment_type, equip.manufacturer, equip.department_id, equip.status, equip.last_maintenance, equip.purchase_cost]);
    });
    equipmentStmt.free();
}

function executeQuery() {
    const query = document.getElementById('sql-query').value.trim();
    const resultContainer = document.getElementById('query-result');
    
    if (!query) {
        resultContainer.innerHTML = '<div class="error">Please enter a SQL query.</div>';
        return;
    }

    if (!db) {
        resultContainer.innerHTML = '<div class="error">Database not initialized. Please refresh the page.</div>';
        return;
    }

    try {
        // Execute the SQL query
        const results = db.exec(query);
        
        if (results.length === 0) {
            resultContainer.innerHTML = '<p style="color: #6c757d;">Query executed successfully. No results returned.</p>';
            return;
        }

        // Display results
        displayResults(results);
        
        // Check if it matches expected solution for basic challenges
        const challenge = challenges[currentChallenge];
        if (challenge.autoCheck && challenge.solution) {
            checkSolution(query, challenge.solution);
        }
        
    } catch (error) {
        resultContainer.innerHTML = `<div class="error">SQL Error: ${error.message}</div>`;
    }
}

function displayResults(results) {
    const resultContainer = document.getElementById('query-result');
    let html = '';
    
    results.forEach((result, index) => {
        if (index > 0) html += '<br>';
        
        if (result.columns.length === 0) {
            html += '<p style="color: #6c757d;">Query executed successfully.</p>';
            return;
        }

        const totalRows = result.values.length;
        
        // Create table - NO MORE AUTOMATIC LIMITING
        html += '<table><thead><tr>';
        result.columns.forEach(col => {
            html += `<th>${col}</th>`;
        });
        html += '</tr></thead><tbody>';

        result.values.forEach(row => {
            html += '<tr>';
            row.forEach(cell => {
                html += `<td>${cell !== null ? cell : 'NULL'}</td>`;
            });
            html += '</tr>';
        });

        html += '</tbody></table>';
        
        // Show row count
        html += `<p style="margin-top: 15px; color: #6c757d; font-style: italic;">Returned ${totalRows} row(s)</p>`;
    });
    
    resultContainer.innerHTML = html;
}

function checkSolution(userQuery, expectedSolution) {
    // Normalize queries for comparison (remove extra whitespace, make lowercase)
    const normalizeQuery = (query) => {
        return query.replace(/\s+/g, ' ').trim().toLowerCase();
    };

    if (normalizeQuery(userQuery) === normalizeQuery(expectedSolution)) {
        const resultContainer = document.getElementById('query-result');
        setTimeout(() => {
            resultContainer.innerHTML += '<div class="success">Excellent! Your query is correct!</div>';
        }, 100);
    }
}

function clearQuery() {
    document.getElementById('sql-query').value = '';
    document.getElementById('query-result').innerHTML = '<p style="color: #6c757d; font-style: italic;">Enter and execute a query to see results...</p>';
}

function nextChallenge() {
    if (currentChallenge < challenges.length - 1) {
        currentChallenge++;
        updateChallenge();
        clearQuery();
        updateNavigationButtons();
    }
}

function previousChallenge() {
    if (currentChallenge > 0) {
        currentChallenge--;
        updateChallenge();
        clearQuery();
        updateNavigationButtons();
    }
}

function updateChallenge() {
    const challenge = challenges[currentChallenge];
    document.getElementById('problem-title').textContent = challenge.title;
    document.getElementById('problem-description').textContent = challenge.description;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Disable previous button on first challenge
    prevBtn.disabled = currentChallenge === 0;
    prevBtn.style.opacity = currentChallenge === 0 ? '0.5' : '1';
    
    // Disable next button on last challenge
    nextBtn.disabled = currentChallenge === challenges.length - 1;
    nextBtn.style.opacity = currentChallenge === challenges.length - 1 ? '0.5' : '1';
    
    // Update button text to show progress
    prevBtn.textContent = `Previous Challenge`;
    nextBtn.textContent = `Next Challenge`;
    
    // Show challenge progress
    const progressText = `Challenge ${currentChallenge + 1} of ${challenges.length}`;
    document.getElementById('problem-title').textContent = `${challenge.title} (${progressText})`;
}

function initializeTables() {
    const container = document.getElementById('tables-container');
    
    Object.values(tableSchemas).forEach(schema => {
        const tableDiv = document.createElement('div');
        tableDiv.className = 'table-schema';
        
        tableDiv.innerHTML = `
            <div class="table-header" onclick="toggleTable('${schema.name}')">
                <div>
                    <div class="table-name">${schema.name}</div>
                    <div class="table-description">${schema.description}</div>
                </div>
                <span class="expand-icon" id="icon-${schema.name}">▼</span>
            </div>
            <div class="table-columns" id="columns-${schema.name}">
                ${schema.columns.map(col => `
                    <div class="column-item">
                        <span class="column-name">${col.name}</span>
                        <span class="column-type">${col.type}</span>
                        <span class="column-description">${col.description}</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.appendChild(tableDiv);
    });
}

function toggleTable(tableName) {
    const columns = document.getElementById(`columns-${tableName}`);
    const icon = document.getElementById(`icon-${tableName}`);
    
    if (columns.classList.contains('expanded')) {
        columns.classList.remove('expanded');
        icon.classList.remove('expanded');
    } else {
        columns.classList.add('expanded');
        icon.classList.add('expanded');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeDatabase();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Focus on textarea when main content is visible
        const mainContent = document.getElementById('main-content');
        if (mainContent.style.display !== 'none' && e.target.tagName !== 'TEXTAREA') {
            const textarea = document.getElementById('sql-query');
            if (e.key.length === 1 || e.key === 'Backspace') {
                textarea.focus();
                if (e.key.length === 1) {
                    textarea.value += e.key;
                }
            }
        }
    });
    
    // Execute query on Ctrl/Cmd + Enter
    document.getElementById('sql-query').addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            executeQuery();
        }
    });
});
