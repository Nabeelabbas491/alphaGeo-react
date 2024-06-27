import { useFormik } from "formik";
import Button from "../shared/ui/button";
import PasswordInput from "./password-input";
import * as Yup from 'yup'
import ErrorMessage from "../shared/ui/input-error";
import { REQUIRED_PASSWORD_LENGTH, isInValidForm, isInvalidInput } from "../../data/utils/app";
import usePostData from "../../data/custom-hooks/post-fetch";
import { AuthEnum } from "../../data/enums";
import { useParams } from "react-router-dom";

function ResetPassword() {

    const { data, loading, error, postData: confirm } = usePostData(AuthEnum.CONFIRM_PASSWORD)

    const validationSchema = Yup.object({
        password: Yup.string()
            .required('New password is required')
            .min(REQUIRED_PASSWORD_LENGTH, `New password must be at least ${REQUIRED_PASSWORD_LENGTH} characters`),
        repeatPassword: Yup.string()
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
        onSubmit: values => {
            const body = { new_password: values.currentPassword, current_password: values.newPassword }
            console.log("on submit", body)
        },
    });

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
                <Button label='Reset Password' disabled={isInValidForm(formik)} />
            </div>
        </form>
    );
}

export default ResetPassword;
