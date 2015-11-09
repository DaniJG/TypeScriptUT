var UserFormProcessorBuilder = (function () {
    function UserFormProcessorBuilder() {
    }
    UserFormProcessorBuilder.prototype.WithService = function (userService) {
        this.userService = userService;
        return this;
    };
    UserFormProcessorBuilder.prototype.WithValidator = function (userValidator) {
        this.userValidator = userValidator;
        return this;
    };
    UserFormProcessorBuilder.prototype.Build = function () {
        return new UserFormProcessor(this.userValidator, this.userService);
    };
    return UserFormProcessorBuilder;
})();
var UserBuilder = (function () {
    function UserBuilder() {
    }
    UserBuilder.prototype.WithName = function (name) {
        this.name = name;
        return this;
    };
    UserBuilder.prototype.WithAge = function (age) {
        this.age = age;
        return this;
    };
    UserBuilder.prototype.WithCountry = function (country) {
        this.country = country;
        return this;
    };
    UserBuilder.prototype.Build = function () {
        return { name: this.name, age: this.age, country: this.country };
    };
    return UserBuilder;
})();
//# sourceMappingURL=testObjectBuilder.js.map