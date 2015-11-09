class UserFormProcessorBuilder {
    private userService: UserService;
    private userValidator: UserNameValidator;

    public WithService(userService: UserService): UserFormProcessorBuilder {
        this.userService = userService;
        return this;
    }

    public WithValidator(userValidator: UserNameValidator): UserFormProcessorBuilder {
        this.userValidator = userValidator;
        return this;
    }

    public Build(): UserFormProcessor {
        return new UserFormProcessor(this.userValidator, this.userService);
    }
}

class UserBuilder {
    private name: string;
    private age: number;
    private country: string;

    public WithName(name: string): UserBuilder {
        this.name = name;
        return this;
    }

    public WithAge(age: number): UserBuilder {
        this.age = age;
        return this;
    }

    public WithCountry(country: string): UserBuilder {
        this.country = country;
        return this;
    }

    public Build(): User {
        return {name: this.name, age: this.age, country: this.country};
    }
}