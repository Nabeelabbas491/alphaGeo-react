import { useFormik } from 'formik';
import Button from '../shared/ui/button';
import Input from '../shared/ui/input';
import * as Yup from 'yup'
import ErrorMessage from '../shared/ui/input-error';
import { ERROR_TOAST_MSG, getAllQueryParams, isInValidForm, isInvalidInput } from '../../data/utils/app';
import usePostData from '../../data/custom-hooks/post-fetch';
import { AuthEnum } from '../../data/enums';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useGetParams from '../../data/custom-hooks/get-params';

function RecoverPassword() {



    const params = useGetParams()


    useEffect(() => {
        console.log("ctd...", params)

    }, [])

    const { data, loading, error, postData: recover } = usePostData(AuthEnum.RECOVER_PASSWORD)

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
    })

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: validationSchema,
        onSubmit: async (values) => { await recover(values) },
    })

    useEffect(() => {
        data && toast.success('An email has been sent to you with password reset instructions.')
        error && toast.error(error['response']['data']['message'] || ERROR_TOAST_MSG);
    }, [data, error])

    return (
        <form className='h-full flex flex-col justify-between' onSubmit={formik.handleSubmit}>
            <div>
                <h2 className='text-2lg text-center'>RECOVER PASSWORD</h2>
                <div className='text-xs mt-4'>Please enter your user name and we'll send you instructions on how to reset your password.</div>
                <div className='mt-6'>
                    <div className='text-xs pb-1'>Email</div>
                    <Input
                        type="email"
                        placeholder='Enter your email address'
                        name="email"
                        class={isInvalidInput(formik, 'email') && 'invalid'}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {isInvalidInput(formik, 'email') && (<div className='pt-1'><ErrorMessage error={formik.errors.email} /></div>)}
                </div>
            </div>
            <div className='flex items-center justify-between mt-6'>
                <div>
                    <Button label='Back To Login' navigateTo='login' />
                </div>
                <div>
                    <Button label='Recover' loading={loading} disabled={isInValidForm(formik)} />
                </div>
            </div>
        </form>
    );
}

export default RecoverPassword;
