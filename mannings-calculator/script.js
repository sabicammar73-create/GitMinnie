// Manning's Equation Calculator - JavaScript
// Professional open-channel flow analysis tool

/**
 * Switch between calculator tabs
 * @param {string} tabName - Name of the tab to switch to
 */
function switchTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    document.getElementById(tabName).classList.add('active');

    // Add active class to clicked button
    event.target.closest('.tab-btn').classList.add('active');
}

/**
 * Calculate Discharge (Q) using Manning's Equation
 * Q = (1/n) * A * R^(2/3) * S^(1/2)
 */
function calculateDischarge() {
    const n = parseFloat(document.getElementById('q-manning').value);
    const area = parseFloat(document.getElementById('q-area').value);
    const hydraulicRadius = parseFloat(document.getElementById('q-hydraulic').value);
    let slope = parseFloat(document.getElementById('q-slope').value);

    // Validation
    if (!validateInputs(n, area, hydraulicRadius, slope)) {
        showError('Please enter valid positive numbers for all fields');
        return;
    }

    // Convert slope if entered as percentage
    if (slope > 1) {
        slope = slope / 100;
    }

    // Manning's Equation: Q = (1/n) * A * R^(2/3) * S^(1/2)
    const raisedToPower = Math.pow(hydraulicRadius, 2/3);
    const sqrtSlope = Math.sqrt(slope);
    const discharge = (1 / n) * area * raisedToPower * sqrtSlope;

    // Convert to liters per second (1 m³/s = 1000 L/s)
    const dischargeLps = discharge * 1000;

    // Display results
    document.getElementById('q-output').textContent = discharge.toFixed(4);
    document.getElementById('q-output-lps').textContent = dischargeLps.toFixed(2);
    document.getElementById('q-result').classList.remove('hidden');

    // Log calculation details
    console.log('Discharge Calculation:', {
        n: n,
        area: area,
        hydraulicRadius: hydraulicRadius,
        slope: slope,
        discharge: discharge,
        dischargeLps: dischargeLps
    });
}

/**
 * Calculate Velocity (V) using Manning's Equation
 * V = (1/n) * R^(2/3) * S^(1/2)
 */
function calculateVelocity() {
    const n = parseFloat(document.getElementById('v-manning').value);
    const hydraulicRadius = parseFloat(document.getElementById('v-hydraulic').value);
    let slope = parseFloat(document.getElementById('v-slope').value);

    // Validation
    if (!validateInputs(n, hydraulicRadius, slope)) {
        showError('Please enter valid positive numbers for all fields');
        return;
    }

    // Convert slope if entered as percentage
    if (slope > 1) {
        slope = slope / 100;
    }

    // Manning's Equation: V = (1/n) * R^(2/3) * S^(1/2)
    const raisedToPower = Math.pow(hydraulicRadius, 2/3);
    const sqrtSlope = Math.sqrt(slope);
    const velocity = (1 / n) * raisedToPower * sqrtSlope;

    // Determine flow status
    let flowStatus = 'Normal';
    let statusColor = '#10b981';

    if (velocity < 0.3) {
        flowStatus = '⚠️ Very Slow (Risk of Sedimentation)';
        statusColor = '#f59e0b';
    } else if (velocity < 1.0) {
        flowStatus = '✓ Acceptable';
        statusColor = '#10b981';
    } else if (velocity < 2.0) {
        flowStatus = '✓ Good';
        statusColor = '#10b981';
    } else {
        flowStatus = '⚠️ High Velocity (Erosion Risk)';
        statusColor = '#ef4444';
    }

    // Display results
    document.getElementById('v-output').textContent = velocity.toFixed(4);
    document.getElementById('v-status').textContent = flowStatus;
    document.getElementById('v-status').style.color = statusColor;
    document.getElementById('v-result').classList.remove('hidden');

    console.log('Velocity Calculation:', {
        n: n,
        hydraulicRadius: hydraulicRadius,
        slope: slope,
        velocity: velocity,
        flowStatus: flowStatus
    });
}

/**
 * Calculate Manning's Roughness Coefficient (n)
 * n = (1/V) * R^(2/3) * S^(1/2)
 */
function calculateManning() {
    const velocity = parseFloat(document.getElementById('n-velocity').value);
    const hydraulicRadius = parseFloat(document.getElementById('n-hydraulic').value);
    let slope = parseFloat(document.getElementById('n-slope').value);

    // Validation
    if (!validateInputs(velocity, hydraulicRadius, slope)) {
        showError('Please enter valid positive numbers for all fields');
        return;
    }

    // Convert slope if entered as percentage
    if (slope > 1) {
        slope = slope / 100;
    }

    // Manning's Coefficient: n = (1/V) * R^(2/3) * S^(1/2)
    const raisedToPower = Math.pow(hydraulicRadius, 2/3);
    const sqrtSlope = Math.sqrt(slope);
    const manningN = (1 / velocity) * raisedToPower * sqrtSlope;

    // Determine surface type based on Manning's n value
    let surfaceType = determineSurfaceType(manningN);

    // Display results
    document.getElementById('n-output').textContent = manningN.toFixed(5);
    document.getElementById('n-surface').textContent = surfaceType;
    document.getElementById('n-result').classList.remove('hidden');

    console.log('Manning\'s n Calculation:', {
        velocity: velocity,
        hydraulicRadius: hydraulicRadius,
        slope: slope,
        manningN: manningN,
        surfaceType: surfaceType
    });
}

/**
 * Determine channel surface type based on Manning's n coefficient
 * @param {number} n - Manning's roughness coefficient
 * @returns {string} - Description of surface type
 */
function determineSurfaceType(n) {
    if (n <= 0.013) return '🔷 Concrete - Good Condition';
    if (n <= 0.015) return '🔷 Concrete - Standard';
    if (n <= 0.017) return '🔷 Brick - Glazed';
    if (n <= 0.020) return '🟫 Earth - Straight & Uniform';
    if (n <= 0.025) return '🟫 Gravel - Clean / Earth - Good';
    if (n <= 0.035) return '🌱 Natural Channel - Clean';
    if (n <= 0.050) return '🪨 Rock - Unfinished / Natural Channel - With Vegetation';
    if (n <= 0.070) return '🌿 Natural Channel - Dense Vegetation';
    return '🌾 Floodplain - Heavy Vegetation';
}

/**
 * Validate calculator inputs
 * @param {...number} inputs - Input values to validate
 * @returns {boolean} - True if all inputs are valid
 */
function validateInputs(...inputs) {
    for (let input of inputs) {
        if (isNaN(input) || input <= 0) {
            return false;
        }
    }
    return true;
}

/**
 * Show error message to user
 * @param {string} message - Error message to display
 */
function showError(message) {
    alert('⚠️ Input Error:\n\n' + message);
}

/**
 * Clear results for a specific calculation
 * @param {string} type - Type of calculation (q, v, or n)
 */
function clearResults(type) {
    const resultId = type + '-result';
    document.getElementById(resultId).classList.add('hidden');

    // Clear input fields
    if (type === 'q') {
        document.getElementById('q-manning').value = '0.03';
        document.getElementById('q-area').value = '0.0';
        document.getElementById('q-hydraulic').value = '0.0';
        document.getElementById('q-slope').value = '0.001';
    } else if (type === 'v') {
        document.getElementById('v-manning').value = '0.03';
        document.getElementById('v-hydraulic').value = '0.0';
        document.getElementById('v-slope').value = '0.001';
    } else if (type === 'n') {
        document.getElementById('n-velocity').value = '0.0';
        document.getElementById('n-hydraulic').value = '0.0';
        document.getElementById('n-slope').value = '0.001';
    }
}

/**
 * Keyboard support for quick calculations
 */
document.addEventListener('keypress', function(event) {
    // Enter key
    if (event.key === 'Enter') {
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab.id === 'discharge') {
            calculateDischarge();
        } else if (activeTab.id === 'velocity') {
            calculateVelocity();
        } else if (activeTab.id === 'manning') {
            calculateManning();
        }
    }
});

/**
 * Format numbers for better readability
 * @param {number} num - Number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted number string
 */
function formatNumber(num, decimals = 4) {
    return parseFloat(num).toFixed(decimals);
}

/**
 * Initialize calculator on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Manning\'s Equation Calculator initialized');
    
    // Set focus on first input field
    document.getElementById('q-manning').focus();

    // Add helpful tooltips on input fields
    addTooltips();
});

/**
 * Add tooltips for input fields
 */
function addTooltips() {
    const tooltips = {
        'q-manning': 'Typical values range from 0.015 (smooth concrete) to 0.05 (rough natural channels)',
        'q-area': 'Cross-sectional area of the water flow (width × depth for rectangular channels)',
        'q-hydraulic': 'R = Area / Wetted Perimeter (the perimeter in contact with water)',
        'q-slope': 'Gradient of the channel bottom (vertical drop / horizontal distance)',
    };

    // Add title attributes for tooltips
    for (const [id, tooltip] of Object.entries(tooltips)) {
        const element = document.getElementById(id);
        if (element) {
            element.title = tooltip;
        }
    }
}

/**
 * Export calculation results
 * @param {string} type - Type of calculation
 */
function exportResults(type) {
    let resultText = '';

    if (type === 'q') {
        const n = document.getElementById('q-manning').value;
        const area = document.getElementById('q-area').value;
        const hydraulic = document.getElementById('q-hydraulic').value;
        const slope = document.getElementById('q-slope').value;
        const output = document.getElementById('q-output').textContent;
        const lps = document.getElementById('q-output-lps').textContent;

        resultText = `Manning's Equation - Discharge Calculation\n`;
        resultText += `========================================\n\n`;
        resultText += `Inputs:\n`;
        resultText += `  Manning's n: ${n}\n`;
        resultText += `  Area: ${area} m²\n`;
        resultText += `  Hydraulic Radius: ${hydraulic} m\n`;
        resultText += `  Slope: ${slope} m/m\n\n`;
        resultText += `Results:\n`;
        resultText += `  Discharge: ${output} m³/s (${lps} L/s)\n`;
    }

    console.log(resultText);
    return resultText;
}
