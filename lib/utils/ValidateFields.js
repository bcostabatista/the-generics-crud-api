export const validateFields = (receivedFields, requiredFields) => {
    for(let rf of requiredFields) {
        //You could add any validation you need here
        if(!receivedFields[rf]) return `The field ${rf} is required`
    }
}