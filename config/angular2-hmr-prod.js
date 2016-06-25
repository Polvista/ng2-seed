exports.HmrState = function() {
    return function decoratorFactory(target, decoratedPropertyName, descriptor) {
        return descriptor;
    }
};