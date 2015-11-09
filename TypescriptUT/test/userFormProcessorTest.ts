/// <reference path="../test/testCommon.ts" />
/// <reference path="../src/userFormProcessor.ts" />

var sandbox: SinonSandbox,
    userNameValidator: UserNameValidator,
    userService: UserService,
    userFormProcessor: UserFormProcessor;

QUnit.module("userFormProcessor", {
    setup: () => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(Logging, "log");
        userNameValidator = <UserNameValidator>{
            validate: (name: string): JQueryPromise<boolean> => { return $.Deferred().resolve(true).promise(); }
        };
        userService = <UserService>{
            postUser: (user: User): JQueryPromise<any> => { return $.Deferred().resolve().promise(); }
        };
        userFormProcessor = new UserFormProcessorBuilder()
            .WithService(userService)
            .WithValidator(userNameValidator)
            .Build();
    },
    teardown: () => {
        sandbox.restore();
    }
});

test("Processing the user fails and is not posted when name validation fails", () => {
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

test("Processing the user will post it afte successful validation", () => {
    sinon.stub(userNameValidator, "validate")
        .withArgs("fooName")
        .returns($.Deferred().resolve(true));
    var servicePostSpy = sinon.spy(userService, "postUser");
    var doneSpy = sinon.spy();
    var user = new UserBuilder().WithName("fooName").Build();

    userFormProcessor.processUser(user).done(doneSpy);

    sinon.assert.calledWith(servicePostSpy, user);
    sinon.assert.calledOnce(doneSpy);
});