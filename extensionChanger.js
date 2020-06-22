// Options
const RECORDING_FOLDER = process.argv[2] || "Altre registrazioni ancora";
const ORIGINAL_EXT = "mkv";
const DESTINATION_EXT = "avi";
const APPEND_INSTEAD_OF_REPLACE = true;

// Program - don't change this unless you know what you're doing
const fs = require("fs");
const path = require("path");

const FOLDER_PATH = path.join(__dirname, RECORDING_FOLDER);

let renamedCounter = 0;
let replaceableCounter = 0;

const readFolder = () => {
    if (!fs.existsSync(FOLDER_PATH)) {
        return console.log(`The directory "${RECORDING_FOLDER}" doesn't exist`);
    }
    fs.readdir(FOLDER_PATH, (err, files) => {
        if (err) throw err;
        countReplaceableFiles(files);
        if (files.length <= 0)
            return console.log(`The directory "${RECORDING_FOLDER}" is empty`);
        readFiles(files);
    });
};

const countReplaceableFiles = files => {
    for (fileName of files) {
        if (fileName.toLowerCase().endsWith(`.${ORIGINAL_EXT.toLowerCase()}`)) {
            replaceableCounter++;
        }
    }
};

const readFiles = files => {
    let hasMkvFile = false;
    for (fileName of files) {
        if (fileName.toLowerCase().endsWith(`.${ORIGINAL_EXT.toLowerCase()}`)) {
            if (!hasMkvFile) hasMkvFile = true;
            const filePath = path.join(FOLDER_PATH, fileName);
            renameFile(filePath, fileName);
        }
    }
    if (!hasMkvFile) return console.log(`No .${ORIGINAL_EXT} file found`);
};

const renameFile = (originalPath, originalName) => {
    let newName;
    if (APPEND_INSTEAD_OF_REPLACE) {
        newName = `${originalName}.${DESTINATION_EXT.toLowerCase()}`;
    } else {
        // Replace only last occurrence
        const originalExtRegex = new RegExp(ORIGINAL_EXT.toLowerCase() + "$");
        newName = originalName.replace(
            originalExtRegex,
            DESTINATION_EXT.toLowerCase()
        );
    }
    const newPath = path.join(FOLDER_PATH, newName);
    fs.rename(originalPath, newPath, err => {
        if (err) throw err;
        outputProgress(originalName, newName);
    });
};

const outputProgress = (originalName, newName) => {
    renamedCounter++;
    const percentage = Math.floor((renamedCounter / replaceableCounter) * 100);
    console.log(
        `Renamed "${originalName}" to "${newName}" (total: ${renamedCounter}/${replaceableCounter}, ${percentage}%)`
    );
};

readFolder(FOLDER_PATH);
