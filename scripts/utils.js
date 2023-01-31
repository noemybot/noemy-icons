const fs = require('fs');

function isDir(path) {
    try {
        var stat = fs.lstatSync(path)
        return stat.isDirectory()
    } catch (e) {
        return false;
    }
}

function createDir(path) {
    try {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    } catch (e) {
        return false;
    }
}

function write(path, content) {
    try {
        return fs.writeFileSync(path, content)
    } catch (e) {
        return false;
    }
}

function copy(from, to) {
    try {
        fs.copyFileSync(from, to)
    } catch (e) {
        return false;
    }
}

function getFiles(dir) {
    if (isDir(dir)) {
        return fs.readdirSync(dir, { withFileTypes: true })
    } else {
        return false;
    }
}

function getFile(path) {
    try {
        return fs.readFileSync(path)
    } catch (e) {
        return false;
    }
}

module.exports = {
    isDir,
    createDir,
    write,
    copy,
    getFiles,
    getFile
}