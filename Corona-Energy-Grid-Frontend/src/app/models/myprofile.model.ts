export class MyProfile {
    constructor(obj: MyProfileData = {} as MyProfile) {
        const {
            firstName = "",
            lastName = "",
            email = "",
            phoneNumber = "",
            mobileNumber = "",
            zipCode = "",
            street = "",
            city = "",
            houseNumber = "",
            customerCode = ""
        } = obj;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.mobileNumber = mobileNumber;
        this.zipCode = zipCode;
        this.street = street;
        this.city = city;
        this.houseNumber = houseNumber;
        this.customerCode = customerCode;
    }
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    mobileNumber: string;
    zipCode: string;
    street: string;
    city: string;
    houseNumber: string;
    customerCode: string;
}




export interface MyProfileData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    mobileNumber: string;
    zipCode: string;
    street: string;
    city: string;
    houseNumber: string;
    customerCode: string;
}