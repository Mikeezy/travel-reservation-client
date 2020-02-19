export const required = value => (value || typeof value === 'number' ? undefined : 'La valeur de ce champ est requise svp !')

export const requiredEditor2 = value => (value || `${value}`.trim() === '<p></p> ' ? undefined : 'La valeur de ce champ est requise svp !')

export const requiredEditor = (name) => {
    
    return (value,allValues,props) => {
     

        if(!value || allValues[name].trim() === '<p></p>'){

            return 'La valeur de ce champ est requise svp !'

        }

        return undefined
    
    }

}

export const confirmPassword = (name) => {
    
    return (value,allValues,props) => {
    
        if(value !== allValues[name]){

            return 'Les mots de passe ne sont pas identiques, veuillez corriger svp !'

        }

        return undefined
    
    }

}

export const selectRequired = (name) => {
    
    return (value,allValues,props) => {
     

        if(!value || typeof value !== 'string'){

            return 'La valeur de ce champ est requise svp !'

        }

        return undefined
    
    }

}

export const requiredFieldArray = (value,allValues,props) => {
     

        if(!value || typeof value === 'undefined'){

            return 'La valeur d\'un de ces champs est requise svp !'

        }

        return undefined
    
    

}

export const maxLength = max => value =>
    value && value.length > max ? `La valeur de ce champ doit contenir au plus ${max} caractères svp !` : undefined

export const minLength = min => value =>
    value && value.length < min ? `La valeur de ce champ doit contenir au moins ${min} caractères svp !` : undefined

export const number = value =>
    value && isNaN(Number(value)) ? 'La valeur de ce champ doit être un nombre svp !' : undefined

export const minValue = min => value =>
    value && value < min ? `La valeur de ce champ doit avoir au minimum ${min} comme valeur svp !` : undefined

export const maxValue = max => value =>
    value && value > max ? `La valeur de ce champ doit avoir au maximum ${max} comme valeur svp !` : undefined

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? `La valeur de ce champ n'est pas une adresse email invalide!`
    : undefined

export const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'La valeur de ce champ doit contenir que des caractères alphanumériques svp !' : undefined

export const phoneNumber = value =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Ce champ a un numéro de téléphone invalide !' : undefined

    //Exemple
/* const maxLength15 = maxLength(15) */

    //Exemple
/* const minLength2 = minLength(2) */

    //Exemple
/* const minValue13 = minValue(13) */