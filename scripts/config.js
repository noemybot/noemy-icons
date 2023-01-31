'use strict';

const path = require('path');

const appRoot = path.resolve(__dirname);

const utils = require('./utils')

let rawConfig = utils.getFile('config.json');
const config = JSON.parse(rawConfig);

// define os temas
const themes = config.types;

// define as pastas e aliases
const folders = Object.entries(config.folders)

themes.forEach(themeName => {
    var theme = {
        iconDefinitions: {},
        folder: '_folder',
        folderExpanded: '_folder_open',
        folderNames: {},
        folderNamesExpanded: {},
    };

    // define a pasta default
    theme.iconDefinitions._folder = {
        iconPath: `./${themeName}/folder_${themeName}.svg`
    }

    theme.iconDefinitions._folder_open = {
        iconPath: `./${themeName}/folder_${themeName}_open.svg`
    }

    // define as pastas personalizadas
    folders.forEach(([iconName, aliases]) => {

        const folderId = `_folder_${iconName}`;
        const openedFolderId = `${folderId}_open`

        theme.iconDefinitions[folderId] = {
            iconPath: `./${themeName}/folder_${themeName}_${iconName}.svg`
        }

        theme.iconDefinitions[openedFolderId] = {
            iconPath: `./${themeName}/folder_${themeName}_${iconName}_open.svg`
        }

        aliases.forEach(alias => {
            theme.folderNames[alias] = folderId
            theme.folderNamesExpanded[alias] = openedFolderId
        })

    })

    utils.write(`dist/${themeName}.json`, JSON.stringify(theme));
    console.log(`arquivo do tema ${themeName} criado`)

    console.log(`copiando ícones ${themeName}`)
    let iconsPath = `./icons/${themeName}/`
    let files = utils.getFiles(iconsPath)

    files.forEach(file => {
        let iconPath = iconsPath + file.name

        console.log(`copiando ${iconPath}`)
        utils.copy(iconPath, `./dist/${themeName}/${file.name}`)
    })
})