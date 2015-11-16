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
        var deferred = $.Deferred();
        this.userValidator.validate(user.name).done(function (isValid) {
            deferred.reject();
            //if (isValid) {
            //    this.userService.postUser(user)
            //        .done(() => { deferred.resolve(); Logging.log("post succeeded"); })
            //        .fail(() => { deferred.reject(); Logging.log("post failed"); });
            //} else {
            //    Logging.log("user validation failed");
            //    deferred.reject();
            //}
        });
        return deferred.promise();
    };
    return UserFormProcessor;
})();
//# sourceMappingURL=userFormProcessor.js.map