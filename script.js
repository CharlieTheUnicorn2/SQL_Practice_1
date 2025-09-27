let currentChallenge = 0;// Use data from data.js file
const tables = hospitalData;

function updateChallenge() {
    const challenge = challenges[currentChallenge];
    document.getElementById('problem-title').textContent = challenge.title;
    document.getElementById('problem-description').textContent = challenge.description;
}

function executeQuery() {
    const query = document.getElementById('sql-query').value.trim().toLowerCase();
    const resultContainer = document.getElementById('query-result');
    
    if (!query) {
        resultContainer.innerHTML = '<div class="error">Please enter a SQL query.</div>';
        return;
    }

    try {
        const result = parseAndExecuteSQL(query);
        displayResult(result);
        
        // Check if query matches expected solution
        const expectedSolution = challenges[currentChallenge].solution.toLowerCase();
        if (normalizeQuery(query) === normalizeQuery(expectedSolution)) {
            setTimeout(() => {
                resultContainer.innerHTML += '<div class="success">Excellent! Your query is correct!</div>';
            }, 100);
        }
    } catch (error) {
        resultContainer.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

function normalizeQuery(query) {
    return query.replace(/\s+/g, ' ').trim();
}

function parseAndExecuteSQL(query) {
    // Simple SQL parser for basic SELECT statements
    const selectMatch = query.match(/select\s+(.*?)\s+from\s+(\w+)(?:\s+where\s+(.+?))?(?:\s+order\s+by\s+(.+?))?(?:\s*;?\s*)?$/i);
    
    if (!selectMatch) {
        throw new Error('Invalid SQL syntax. Please use: SELECT columns FROM table [WHERE condition] [ORDER BY column]');
    }

    const [, columns, tableName, whereClause, orderClause] = selectMatch;
    
    if (!tables[tableName]) {
        throw new Error(`Table '${tableName}' does not exist`);
    }

    let result = [...tables[tableName]];

    // Apply WHERE clause
    if (whereClause) {
        result = applyWhereClause(result, whereClause.trim());
    }

    // Apply ORDER BY clause
    if (orderClause) {
        result = applyOrderBy(result, orderClause.trim());
    }

    // Select specific columns
    if (columns.trim() !== '*') {
        const selectedColumns = columns.split(',').map(col => col.trim());
        result = result.map(row => {
            const newRow = {};
            selectedColumns.forEach(col => {
                if (row.hasOwnProperty(col)) {
                    newRow[col] = row[col];
                } else {
                    throw new Error(`Column '${col}' does not exist`);
                }
            });
            return newRow;
        });
    }

    return result;
}

function applyWhereClause(data, whereClause) {
    // Simple WHERE clause parser
    const conditionMatch = whereClause.match(/(\w+)\s*(=|>|<|>=|<=|!=)\s*(.+)/);
    
    if (!conditionMatch) {
        throw new Error('Invalid WHERE clause syntax');
    }

    const [, column, operator, value] = conditionMatch;
    const cleanValue = value.replace(/['"`]/g, '');

    return data.filter(row => {
        const rowValue = row[column];
        const compareValue = isNaN(cleanValue) ? cleanValue : Number(cleanValue);
        const actualValue = isNaN(rowValue) ? rowValue : Number(rowValue);

        switch (operator) {
            case '=': return actualValue == compareValue;
            case '>': return actualValue > compareValue;
            case '<': return actualValue < compareValue;
            case '>=': return actualValue >= compareValue;
            case '<=': return actualValue <= compareValue;
            case '!=': return actualValue != compareValue;
            default: return false;
        }
    });
}

function applyOrderBy(data, orderClause) {
    const parts = orderClause.split(/\s+/);
    const column = parts[0];
    const direction = parts[1] && parts[1].toLowerCase() === 'desc' ? 'desc' : 'asc';

    return [...data].sort((a, b) => {
        const aVal = isNaN(a[column]) ? a[column] : Number(a[column]);
        const bVal = isNaN(b[column]) ? b[column] : Number(b[column]);

        if (direction === 'desc') {
            return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        } else {
            return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        }
    });
}

function displayResult(data) {
    const resultContainer = document.getElementById('query-result');
    
    if (data.length === 0) {
        resultContainer.innerHTML = '<p style="color: #6c757d;">No results found.</p>';
        return;
    }

    const columns = Object.keys(data[0]);
    let html = '<table><thead><tr>';
    
    columns.forEach(col => {
        html += `<th>${col}</th>`;
    });
    html += '</tr></thead><tbody>';

    data.forEach(row => {
        html += '<tr>';
        columns.forEach(col => {
            html += `<td>${row[col]}</td>`;
        });
        html += '</tr>';
    });

    html += '</tbody></table>';
    html += `<p style="margin-top: 15px; color: #6c757d; font-style: italic;">Returned ${data.length} row(s)</p>`;
    
    resultContainer.innerHTML = html;
}

function clearQuery() {
    document.getElementById('sql-query').value = '';
    document.getElementById('query-result').innerHTML = '<p style="color: #6c757d; font-style: italic;">Enter and execute a query to see results...</p>';
}

function nextChallenge() {
    currentChallenge = (currentChallenge + 1) % challenges.length;
    updateChallenge();
    clearQuery();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeTables();
    updateChallenge();
    
    // Add keyboard shortcuts
    document.getElementById('sql-query').addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            executeQuery();
        }
    });
});

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