const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize SQLite Database
const db = new sqlite3.Database('./linkzo.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('✅ Connected to SQLite database');
        initializeTables();
    }
});

// Create tables if they don't exist
function initializeTables() {
    // Companies table
    db.run(`CREATE TABLE IF NOT EXISTS companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_name TEXT NOT NULL,
        email TEXT NOT NULL,
        service_required TEXT NOT NULL,
        budget_range TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) console.error('Error creating companies table:', err);
        else console.log('✅ Companies table ready');
    });

    // Creators table
    db.run(`CREATE TABLE IF NOT EXISTS creators (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        instagram TEXT,
        youtube TEXT,
        tiktok TEXT,
        twitter TEXT,
        niche TEXT NOT NULL,
        audience_size TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) console.error('Error creating creators table:', err);
        else console.log('✅ Creators table ready');
    });
}

// Serve main website
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes

// Submit company order
app.post('/api/company-order', (req, res) => {
    const { company_name, email, service_required, budget_range } = req.body;
    
    // Validation
    if (!company_name || !email || !service_required || !budget_range) {
        return res.status(400).json({ 
            success: false, 
            message: 'All fields are required' 
        });
    }

    const query = `INSERT INTO companies (company_name, email, service_required, budget_range) 
                   VALUES (?, ?, ?, ?)`;
    
    db.run(query, [company_name, email, service_required, budget_range], function(err) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Database error occurred' 
            });
        }
        
        res.json({ 
            success: true, 
            message: 'Order submitted successfully!',
            orderId: this.lastID
        });
    });
});

// Submit creator registration
app.post('/api/creator-register', (req, res) => {
    const { name, email, instagram, youtube, tiktok, twitter, niche, audience_size } = req.body;
    
    // Validation
    if (!name || !email || !niche || !audience_size) {
        return res.status(400).json({ 
            success: false, 
            message: 'Name, email, niche, and audience size are required' 
        });
    }

    const query = `INSERT INTO creators (name, email, instagram, youtube, tiktok, twitter, niche, audience_size) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [name, email, instagram || '', youtube || '', tiktok || '', twitter || '', niche, audience_size], function(err) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Database error occurred' 
            });
        }
        
        res.json({ 
            success: true, 
            message: 'Registration successful!',
            creatorId: this.lastID
        });
    });
});

// Admin API Routes

// Get all companies
app.get('/api/admin/companies', (req, res) => {
    const query = `SELECT * FROM companies ORDER BY created_at DESC`;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Database error occurred' 
            });
        }
        
        res.json({ 
            success: true, 
            data: rows 
        });
    });
});

// Get all creators
app.get('/api/admin/creators', (req, res) => {
    const query = `SELECT * FROM creators ORDER BY created_at DESC`;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Database error occurred' 
            });
        }
        
        res.json({ 
            success: true, 
            data: rows 
        });
    });
});

// Admin panel route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Get dashboard stats
app.get('/api/admin/stats', (req, res) => {
    const companiesQuery = `SELECT COUNT(*) as count FROM companies`;
    const creatorsQuery = `SELECT COUNT(*) as count FROM creators`;
    
    db.get(companiesQuery, [], (err, companiesResult) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        
        db.get(creatorsQuery, [], (err, creatorsResult) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Database error' });
            }
            
            res.json({
                success: true,
                data: {
                    totalCompanies: companiesResult.count,
                    totalCreators: creatorsResult.count
                }
            });
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Linkzo server running on http://localhost:${PORT}`);
    console.log(`📊 Admin panel available at http://localhost:${PORT}/admin`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🔄 Shutting down server...');
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('✅ Database connection closed');
        }
        process.exit(0);
    });
});
