import { useFormik } from "formik";
import Button from "../shared/ui/button";
import PasswordInput from "./password-input";
import * as Yup from 'yup'
import ErrorMessage from "../shared/ui/input-error";
import { ERROR_TOAST_MSG, REQUIRED_PASSWORD_LENGTH, isInValidForm, isInvalidInput } from "../../data/utils/app";
import { AuthEnum } from "../../data/enums";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useJwtPostData from "../../data/custom-hooks/jwt-post-fetch";

function ResetPassword() {

    const { data, loading, error, postData: resetPassword } = useJwtPostData(AuthEnum.PASSWORD_RESET)

    const validationSchema = Yup.object({
        currentPassword: Yup.string()
            .required('Password is required')
            .min(REQUIRED_PASSWORD_LENGTH, `Password must be at least ${REQUIRED_PASSWORD_LENGTH} characters`),
        newPassword: Yup.string()
            .required('New password is required')
            .min(REQUIRED_PASSWORD_LENGTH, `New password must be at least ${REQUIRED_PASSWORD_LENGTH} characters`),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword')], 'New password and confirm password must match')
            .required('Confirm password is required')
    });

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const payLoad = { new_password: values.newPassword, current_password: values.currentPassword }
            await resetPassword(payLoad)
        },
    });

    useEffect(() => {
        console.log("dw", data, error)
        error && toast.error(error['response']['data']['detail'] || ERROR_TOAST_MSG)
    }, [data, error])

    return (
        <form className='h-full flex flex-col justify-between' onSubmit={formik.handleSubmit}>
            <div>
                <h2 className='text-2lg text-center'>RESET PASSWORD</h2>
                {/* old password */}
                <div className='mt-6'>
                    <PasswordInput
                        label='Old Password'
                        placeholder='Enter your old password'
                        name='currentPassword'
                        class={isInvalidInput(formik, 'currentPassword') && 'invalid'}
                        value={formik.values.currentPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {isInvalidInput(formik, 'currentPassword') && <div className='pt-1'><ErrorMessage error={formik.errors.currentPassword} /></div>}
                </div>
                {/* new password */}
                <div className='mt-4'>
                    <PasswordInput
                        label='New Password'
                        placeholder='Enter your new password'
                        name='newPassword'
                        class={isInvalidInput(formik, 'newPassword') && 'invalid'}
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {isInvalidInput(formik, 'newPassword') && <div className='pt-1'><ErrorMessage error={formik.errors.newPassword} /></div>}
                </div>
                {/* confirm password */}
                <div className='mt-4'>
                    <PasswordInput
                        label='Confirm Password'
                        placeholder='Enter your new password again'
                        name='confirmPassword'
                        class={isInvalidInput(formik, 'confirmPassword') && 'invalid'}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {isInvalidInput(formik, 'confirmPassword') && <div className='pt-1'><ErrorMessage error={formik.errors.confirmPassword} /></div>}
                </div>
            </div>
            <div className="mt-6">
                <Button label='Reset Password' loading={loading} disabled={isInValidForm(formik)} />
            </div>
        </form>
    );
}

export default ResetPassword;
