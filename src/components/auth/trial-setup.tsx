import { useFormik } from 'formik';
import Button from '../shared/ui/button';
import Input from '../shared/ui/input';
import * as Yup from 'yup';
import ErrorMessage from '../shared/ui/input-error';
import { ERROR_TOAST_MSG, REQUIRED_PASSWORD_LENGTH, isInValidForm, isInvalidInput } from '../../data/utils/app';
import PasswordInput from './password-input';
import { Link, useNavigate } from 'react-router-dom';
import usePostData from '../../data/custom-hooks/post-fetch';
import { AuthEnum } from '../../data/enums';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { saveUserInLocalStorage } from '../../data/utils/auth';

function TrialSetup() {

    const navigate = useNavigate();

    const { data, loading, error, postData: register } = usePostData(AuthEnum.TRIAL_ACCOUNT)

    useEffect(() => {
        if (data) {
            toast.success("You're registered successfully. In order to activate your account, please verify the code sent to your registered email")
            saveUserInLocalStorage(data?.data.payload.user)
            navigate('/account-verification')
        }
        error && toast.error(error['response']['data']['message'] || ERROR_TOAST_MSG)
    }, [data, error])


    const validationSchema = Yup.object({
        first_name: Yup.string()
            .required('First name is required'),
        last_name: Yup.string()
            .required('Last name is required'),
        company: Yup.string()
            .required('Company is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(REQUIRED_PASSWORD_LENGTH, `Password must be at least ${REQUIRED_PASSWORD_LENGTH} characters`),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm password is required'),
        isConditionsSelected: Yup.boolean()
            .oneOf([true], 'You must accept the terms and conditions')
            .required('You must accept the terms and conditions'),
    });

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            company: '',
            email: '',
            password: '',
            confirmPassword: '',
            isConditionsSelected: false,
            acl: 100
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => { await register(values) },
    });

    return (
        <form className='h-full' onSubmit={formik.handleSubmit}>
            <h2 className='text-2lg text-center'>CREATE AN INSTITUTIONAL ACCOUNT</h2>
            <div className='mt-6'>
                <div className='grid lg:grid-cols-2 gap-2'>
                    <div>
                        <div className='text-xs pb-1'>First Name</div>
                        <Input
                            name="first_name"
                            placeholder='Your first name'
                            class={isInvalidInput(formik, 'first_name') && 'invalid'}
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {isInvalidInput(formik, 'first_name') && <div className='pt-1'><ErrorMessage error={formik.errors.first_name} /></div>}
                    </div >
                    <div className='md:mt-4 lg:mt-0'>
                        <div className='text-xs pb-1'>Last Name</div>
                        <Input
                            name="last_name"
                            placeholder='Your Last name'
                            class={isInvalidInput(formik, 'last_name') && 'invalid'}
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {isInvalidInput(formik, 'last_name') && <div className='pt-1'><ErrorMessage error={formik.errors.last_name} /></div>}
                    </div>
                </div>
                <div className='grid lg:grid-cols-2 gap-2 mt-4'>
                    <div className='md:mt-4 lg:mt-0'>
                        <div className='text-xs pb-1'>Company Name</div>
                        <Input
                            name="company"
                            placeholder='Your company name'
                            class={isInvalidInput(formik, 'company') && 'invalid'}
                            value={formik.values.company}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {isInvalidInput(formik, 'company') && <div className='pt-1'><ErrorMessage error={formik.errors.company} /></div>}
                    </div>
                    <div className='md:mt-4 lg:mt-0'>
                        <div className='text-xs pb-1'>Business Email</div>
                        <Input
                            name="email"
                            placeholder='Your email address'
                            class={isInvalidInput(formik, 'email') && 'invalid'}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {isInvalidInput(formik, 'email') && <div className='pt-1'><ErrorMessage error={formik.errors.email} /></div>}
                    </div>
                </div>
                <div className='mt-4'>
                    <PasswordInput
                        label='Password'
                        placeholder='Enter your password'
                        name='password'
                        class={isInvalidInput(formik, 'password') && 'invalid'}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {isInvalidInput(formik, 'password') && <div className='pt-1'><ErrorMessage error={formik.errors.password} /></div>}
                </div>
                <div className='mt-4'>
                    <PasswordInput
                        label='Confirm Password'
                        placeholder='Enter your password again'
                        name='confirmPassword'
                        class={isInvalidInput(formik, 'confirmPassword') && 'invalid'}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {isInvalidInput(formik, 'confirmPassword') && <div className='pt-1'><ErrorMessage error={formik.errors.confirmPassword} /></div>}
                </div>
                <div className='mt-6 flex items-start'>
                    <input
                        type='checkbox'
                        name="isConditionsSelected"
                        checked={formik.values.isConditionsSelected}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <div className='text-xs ml-1'> I agree to the Terms of Service</div>
                </div>
            </div>
            <div className='mt-6'>
                <Button label='Create Account' type='submit' loading={loading} disabled={isInValidForm(formik)} />
            </div>
            <div className='text-sm mt-6 font-medium text-center'>
                Already have an institutional account?
                <span className='underline text-teal-500 ml-1'>
                    <Link to='/login'>Login</Link>
                </span>
            </div>
        </form>
    );
}

export default TrialSetup;
