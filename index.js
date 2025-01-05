const cluster = require('cluster');
const os = require('os');
const express = require('express');
const cors = require('cors');

const PORT = 8080;

if (cluster.isMaster) {
    // Get the number of available CPU cores
    const numCPUs = os.cpus().length;

    console.log(`Master process ${process.pid} is running`);
    console.log(`Forking ${numCPUs} workers...`);

    // Fork a worker for each CPU core
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Restart workers on exit
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Spawning a new worker...`);
        cluster.fork();
    });

} else {
    // Worker processes
    const app = express();
    const user = require('./Router/UserRouter');
    const property = require('./Router/PropertyQuery');
    const admin = require('./Router/AdminRouter');
    // Required Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    
    // Health Check Route
    app.get('/', (req, res) => {
        res.send("<h1>Welcome to LandLord Tenant app</h1>");
    });

    app.use('/user',user);
    app.use('/property',property);
    app.use('/admin',admin);

    // Start the server
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} running on http://localhost:${PORT}`);
    });
}