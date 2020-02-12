export class user {
    firstName: string;
    lastName: string;
    clientNr: number;
    email: string;
    password: string;
    street: string;
    houseNr: number;
    zipCode: string;

    constructor(firstName, lastName, clientNr, email, password, street, houseNr, zipCode){
        this.firstName = firstName;
        this.lastName = lastName;
        this.clientNr = clientNr;
        this.email = email;
        this.password = password;
        this.street = street;
        this.houseNr = houseNr;
        this.zipCode = zipCode;
    }
  }