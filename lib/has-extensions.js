module.exports = function (file, extensions) {
    return extensions.filter(function (ext) {
        return file.indexOf(ext) === file.length - ext.length;
    }).length !== 0;
};
