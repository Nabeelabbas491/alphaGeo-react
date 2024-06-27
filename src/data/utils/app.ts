export const REQUIRED_PASSWORD_LENGTH = 8

export const OTP_LENGTH = 6

export const ERROR_TOAST_MSG = 'Something went wrong.Please try again.'

export const isInValidForm = (formik: any) => {
    return !Object.keys(formik.touched).length || Object.keys(formik.errors).length > 0
}

export const isInvalidInput = (formik: any, name: string): boolean => {
    return formik.touched[name] && formik.errors[name]
}

export const getAllQueryParams = () => {
    const urlParams: any = new URLSearchParams(window.location.search);
    const params = Object.assign({});

    // Iterate over all keys and values in the URLSearchParams object
    for (const [key, value] of urlParams.entries()) {
        params[key] = value;
    }

    return params;
}

