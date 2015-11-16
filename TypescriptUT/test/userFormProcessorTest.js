/// <reference path="../test/testCommon.ts" />
/// <reference path="../src/userFormProcessor.ts" />
var sandbox, userNameValidator, userService, userFormProcessor;
QUnit.module("userFormProcessor", {
    setup: function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(Logging, "log");
        userNameValidator = {
            validate: function (name) { return $.Deferred().resolve(true).promise(); }
        };
        userService = {
            postUser: function (user) { return $.Deferred().resolve().promise(); }
        };
        userFormProcessor = new UserFormProcessorBuilder()
            .WithService(userService)
            .WithValidator(userNameValidator)
            .Build();
    },
    teardown: function () {
        sandbox.restore();
    }
});
test("Processing the user fails and is not posted when name validation fails", function () {
    sinon.stub(userNameValidator, "validate")
        .withArgs("fooName")
        .returns($.Deferred().resolve(false));
    var servicePostSpy = sinon.spy(userService, "postUser");
    var failSpy = sinon.spy();
    var user = new UserBuilder().WithName("fooName").Build();
    userFormProcessor.processUser(user).fail(failSpy);
    sinon.assert.notCalled(servicePostSpy);
    sinon.assert.calledOnce(failSpy);
});
//test("Processing the user will post it after successful validation", () => {
//    sinon.stub(userNameValidator, "validate")
//        .withArgs("fooName")
//        .returns($.Deferred().resolve(true));
//    var servicePostSpy = sinon.spy(userService, "postUser");
//    var doneSpy = sinon.spy();
//    var user = new UserBuilder().WithName("fooName").Build();
//    userFormProcessor.processUser(user).done(doneSpy);
//    sinon.assert.calledWith(servicePostSpy, user);
//    sinon.assert.calledOnce(doneSpy);
//}); 
//# sourceMappingURL=userFormProcessorTest.js.map