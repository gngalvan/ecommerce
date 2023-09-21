export const generateUserErrorInfo=(user)=>{
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * first_name:needs to be a string, received ${user.first_name}
    * last_name:needs to be a string, received ${user.last_name}
    * email:needs to be a string, received ${user.email}`
}


export const generateProductsPropertieInvalid= async (propertie)=>{
    return `properties was expected: "title", "description", "price","code","stock","category","status" and "thumbnails" and received:
    ${propertie}`
}

export const generateProductsPropertieNotReceived= async (propertie)=>{
    return `properties was expected: "title", "description", "price","code","stock","category","status" and "thumbnails" and NOT received:
    ${propertie}`
}


export const generateUserExistError=(email)=>{
    return `This email user ${email} already exist`
}

