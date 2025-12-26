#!/usr/bin/env node

// ENV Var Confessional - Where environment variables come to confess their sins
// Usage: node env-confessional.js

const fs = require('fs');
const path = require('path');

// The sacred scriptures of expected environment variables
const EXPECTED_ENV = {
    // Database sins
    'DATABASE_URL': 'string',
    'DB_PASSWORD': 'string',
    
    // API confessionals
    'API_KEY': 'string',
    'API_SECRET': 'string',
    
    // Feature flag felonies
    'ENABLE_FEATURE_X': 'boolean',
    'DEBUG_MODE': 'boolean',
    
    // Numeric naughtiness
    'PORT': 'number',
    'TIMEOUT': 'number'
};

// The holy inquisition begins
function interrogateEnvVars() {
    console.log('\n🔍 ENVIRONMENT VARIABLE INQUISITION 🔍');
    console.log('Confess your sins, variables!\n');
    
    let sinsFound = 0;
    const confessions = [];
    
    for (const [varName, expectedType] of Object.entries(EXPECTED_ENV)) {
        const value = process.env[varName];
        
        if (value === undefined) {
            confessions.push(`❌ ${varName}: ABSENT! (Expected: ${expectedType})`);
            sinsFound++;
            continue;
        }
        
        // Type checking - the judgment phase
        let typeCorrect = false;
        switch (expectedType) {
            case 'string':
                typeCorrect = typeof value === 'string';
                break;
            case 'number':
                typeCorrect = !isNaN(Number(value));
                break;
            case 'boolean':
                typeCorrect = value === 'true' || value === 'false' || value === '0' || value === '1';
                break;
        }
        
        if (!typeCorrect) {
            confessions.push(`⚠️  ${varName}: TYPE SIN! Got "${value}" (Expected: ${expectedType})`);
            sinsFound++;
        } else {
            confessions.push(`✅ ${varName}: Virtuous! (${expectedType}: ${value})`);
        }
    }
    
    // Display the confessions
    confessions.forEach(confession => console.log(confession));
    
    // Final judgment
    console.log('\n' + '='.repeat(50));
    if (sinsFound === 0) {
        console.log('🎉 ALL VARIABLES ARE PURE! Go forth and deploy!');
        process.exit(0);
    } else {
        console.log(`💀 ${sinsFound} SIN(S) FOUND! Repent before deploying!`);
        process.exit(1);
    }
}

// Check if we should load from .env file (optional confession booth)
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
    require('dotenv').config(); // The only external dependency - the priest
    console.log('📖 Reading confessions from .env file...');
}

// Begin the inquisition!
interrogateEnvVars();
