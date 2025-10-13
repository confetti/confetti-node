export default function (str) {
    return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
// CommonJS export for backward compatibility
module.exports = function (str) {
    return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};
module.exports.default = module.exports;
