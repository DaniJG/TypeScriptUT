/// <reference path="../def/jquery.d.ts" />
var Logging = (function () {
    function Logging() {
    }
    Logging.log = function (message) {
        console.log(message);
    };
    return Logging;
})();
var UserFormProcessor = (function () {
    function UserFormProcessor(userValidator, userService) {
        this.userValidator = userValidator;
        this.userService = userService;
    }
    UserFormProcessor.prototype.processUser = function (user) {
        var _this = this;
        var deferred = $.Deferred();
        this.userValidator.validate(user.name).done(function (isValid) {
            //deferred.reject();
            //Logging.log("user validation failed");
            if (isValid) {
                _this.userService.postUser(user)
                    .done(function () { deferred.resolve(); Logging.log("posted succeeded"); })
                    .fail(function () { deferred.reject(); Logging.log("posted failed"); });
            }
            else {
                Logging.log("user validation failed");
                deferred.reject();
            }
        });
        return deferred.promise();
    };
    return UserFormProcessor;
})();
//# sourceMappingURL=userFormProcessor.js.map