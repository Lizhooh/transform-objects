
/**
 * @param {Object} data
 * @param {Object} schema
 * @return {Object}
 */
function transformObjects(data, schema) {
    const keys = Object.keys(data);
    const obj = {};
    try {
        keys.forEach(key => {
            if (key in schema === false) {
                obj[key] = data[key];
                return;
            }

            if (Array.isArray(schema[key]) && Array.isArray(data[key])) {
                if (schema[key].length === 1) {
                    obj[key] = data[key].map(item => transformObjects(item, schema[key][0]));
                }
                else if (schema[key].length === 2) {
                    obj[schema[key][0]] = data[key].map(item => transformObjects(item, schema[key][1]));
                }
            }
            else if (typeof data[key] === 'object' && typeof schema[key] === 'object') {
                // $$key
                if ('$key' in schema[key]) {
                    obj[schema[key]['$key']] = transformObjects(data[key], schema[key]);
                }
                else {
                    obj[key] = transformObjects(data[key], schema[key]);
                }
            }
            else {
                obj[schema[key]] = data[key];
            }
        });
    }
    catch (err) {
        console.log(err);
    }

    return obj;
}

module.exports = transformObjects;

