import { useFormik } from 'formik';
import Button from '../shared/ui/button';
import Input from '../shared/ui/input';
import PasswordInput from './password-input';
import * as Yup from 'yup';
import ErrorMessage from '../shared/ui/input-error';
import { Link, useNavigate } from 'react-router-dom';
import { REQUIRED_PASSWORD_LENGTH, ERROR_TOAST_MSG, isInValidForm, isInvalidInput } from '../../data/utils/app';
import usePostData from '../../data/custom-hooks/post-fetch';
import { AuthEnum } from '../../data/enums';
import { toast } from 'react-toastify';
import { saveUserInLocalStorage } from '../../data/utils/auth';
import { useEffect } from 'react';

function Login() {

    const navigate = useNavigate();

    const { data, error, loading, postData: login } = usePostData(AuthEnum.LOGIN);

    useEffect(() => {
        if (data) {
            saveUserInLocalStorage(data?.data?.payload?.user)
            navigate("/mfa")
            toast.success(data.data.message);
        }
        error && toast.error(error['response']['data']['message'] || ERROR_TOAST_MSG)
    }, [data, error])

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(REQUIRED_PASSWORD_LENGTH, `Password must be at least ${REQUIRED_PASSWORD_LENGTH} characters`)
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => { await login(values) }
    });

    return (
        <form className='h-full' onSubmit={formik.handleSubmit}>
            <h2 className='text-2lg text-center'>LOGIN</h2>
            <div className='mt-6'>
                <div className='text-xs pb-1'>Email</div>
                <Input
                    class={isInvalidInput(formik, 'email') && 'invalid'}
                    name="email"
                    placeholder='Email address'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                {isInvalidInput(formik, 'email') && <div className='pt-1'><ErrorMessage error={formik.errors.email} /></div>}
            </div>
            <div className='mt-4 pb-1'>
                <PasswordInput
                    class={isInvalidInput(formik, 'password') && 'invalid'}
                    label='Password'
                    name='password'
                    placeholder='Your password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
            </div>
            <div className={`text-xs ${isInvalidInput(formik, 'password') ? 'flex justify-between' : 'text-right'}`}>
                {isInvalidInput(formik, 'password') && (<ErrorMessage error={formik.errors.password} />)}
                <Link to='/forgot-password'>Forgot Password?</Link>
            </div>
            <div className='mt-6'>
                <Button label='Login' loading={loading} type='submit' disabled={isInValidForm(formik)} />
            </div>
            <div className='text-sm mt-6 font-medium'>
                New to AlphaGeo? <span className='underline text-teal-500'>  <Link to='/trial-setup'> Register to create an account</Link></span>
            </div>
        </form>

    );
}

export default Login;
