import { useEffect, useRef, useState } from "react";
import OtpInput from 'react-otp-input';
import { ERROR_TOAST_MSG, OTP_LENGTH } from "../../data/utils/app";
import usePostData from "../../data/custom-hooks/post-fetch";
import { AuthEnum } from "../../data/enums";
import Timer from "./timer";
import { getUser, saveUserInLocalStorage } from "../../data/utils/auth";
import Spinner from "../shared/ui/spinner";
import { toast } from "react-toastify";
import axios from "axios";
import { environment } from "../../environments/environment.dev";
import { useNavigate } from "react-router";
import Button from "../shared/ui/button";


function AccountVerification() {

    const navigate = useNavigate();

    const user = getUser()

    const timerRef = useRef<any>(null)

    const [otp, setOtp] = useState<string>('');
    const [disableResendOtpBtn, setDisableResendOtpBtn] = useState<boolean>(false);
    const [showTimer, setShowTimer] = useState<boolean>(false);

    const { data: sendOtpResponse, loading: sendOtpLoading, error: sendOtpError, postData: sendOtp } = usePostData(AuthEnum.RESEND_TRIAL_ACCOUNT_VERIFY_OTP)

    const resendOtp = async () => { await sendOtp({ user_id: user.id }) }

    useEffect(() => { resendOtp() }, [])

    // send OTP to the user
    useEffect(() => {
        if (sendOtpResponse) {
            timerRef.current?.resetTimer()
            toast.success("A new OTP has been send to the registered email. Please enter the OTP to proceed further.")
            setDisableResendOtpBtn(true)
            setShowTimer(true)
        }
        sendOtpError && toast.error(ERROR_TOAST_MSG)
    }, [sendOtpResponse, sendOtpError])


    useEffect(() => { if (otp.length == OTP_LENGTH) verifyOtp() }, [otp])

    const verifyOtp = async () => {
        try {
            const payLoad = { user_id: user.id, code: otp }
            const response = await axios.post(`${environment.BACKEND_URL}${AuthEnum.VERIFY_OTP_TRIAL_ACCOUNT}`, payLoad)
            if (response) {
                saveUserInLocalStorage(response?.data?.payload?.user)
                toast.success(response?.data?.message)
                navigate('/full-layout')
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message || ERROR_TOAST_MSG)
        }
    }

    return (
        <div className="h-full flex flex-col justify-between">
            <div>
                <h2 className='text-2lg text-center'>VERIFY YOUR EMAIL </h2>
                <div className="text-sm text-center mt-4">
                    In order to activate your account, please enter the verification code sent to your registered email.
                </div>
                <div className="mt-6 flex flex-col justify-center items-center">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={OTP_LENGTH}
                        renderSeparator={<span className="mx-2">-</span>}
                        inputType='tel'
                        shouldAutoFocus
                        renderInput={(props) => <input {...props} className="otp-input" />}
                    />
                    {showTimer &&
                        <div className="text-sm text-center mt-4">
                            Didn't receive code? Wait for ( <Timer seconds={60} ref={timerRef} timeEnd={() => setDisableResendOtpBtn(false)} />s )
                        </div>
                    }
                </div>
            </div>
            <div className='mt-6'>
                <Button label='Resend code' onClick={() => resendOtp()} loading={sendOtpLoading} disabled={disableResendOtpBtn} />
            </div>
        </div>
    );
}

export default AccountVerification;
