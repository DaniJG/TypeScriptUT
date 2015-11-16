/// <reference path="../def/jquery.d.ts" />

interface User {
    name: string;
    age: number;
    country: string;
}

interface UserNameValidator {
    validate(name: string): JQueryPromise<boolean>;
}

interface UserService {
    postUser(user: User): JQueryPromise<any>;
}

class Logging {
    public static log(message: string) {
        console.log(message);
    }
}

class UserFormProcessor {

    constructor(private userValidator: UserNameValidator, private userService: UserService)
    { }

    processUser(user: User): JQueryPromise<any>
    {
        var deferred = $.Deferred<any>();
        this.userValidator.validate(user.name).done((isValid: boolean) => {
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
    }
}