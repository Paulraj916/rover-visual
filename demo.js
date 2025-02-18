const fs = require('node:fs');

try {
    let data = fs.readFileSync("public/index.html", "utf8");
    console.log(data);
    data = data.replace('\r', '');
    data = data.replace('<body>', `<body><h1>Node.js File System</h1><h1>Node.js File System</h1><h1>Node.js File System</h1><h1>Node.js File System</h1><h1>Node.js File System</h1><h1>Node.js File System</h1><h1>Node.js File System</h1><h1>Node.js File System</h1><h1>Node.js File System</h1><h1>Node.js File System</h1>`);
    fs.writeFileSync("public/index.html", data);
    
    
} catch (err) {
    console.error("Error reading file:", err);
    return null;
}

