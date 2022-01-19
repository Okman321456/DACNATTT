const password = (value, helpers) => {
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/))
        return helpers.message('password must contain at least 1 letter and 1 number')
    return value
}
const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message('"params id must be a valid mongo id');
    }
    return value;
};

module.exports = {
    password,
    objectId
}