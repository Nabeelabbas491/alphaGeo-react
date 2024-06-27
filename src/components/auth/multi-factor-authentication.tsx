import { useEffect, useRef, useState } from "react";
import Button from "../shared/ui/button";
import OtpInput from 'react-otp-input';
import QRCode from "react-qr-code";
import { MultiFactorAuthProps, ScreenType } from "../../data/interfaces/auth";
import { getUser, saveUserInLocalStorage } from "../../data/utils/auth";
import { User } from "../../data/interfaces/app";
import usePostData from "../../data/custom-hooks/post-fetch";
import { AuthEnum } from "../../data/enums";
import useGetData from "../../data/custom-hooks/get-fetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { ERROR_TOAST_MSG, OTP_LENGTH } from "../../data/utils/app";
import Loading from "../shared/ui/loading";
import React from "react";
import Timer from "./timer";

function MultiFactorAuthentication() {

    const navigate = useNavigate();

    const user = getUser()

    const [screen, setScreen] = useState<ScreenType>((user.totp_mfa_enabled || user.email_mfa_enabled) ? 'mfa-selection' : '');

    const navigateToDashboard = () => {
        navigate("/full-layout")
    }

    const renderContent = () => {
        switch (screen) {
            case '':
                return <MFAInstructions changeScreen={(value: ScreenType) => setScreen(value)} navigateToDashboard={() => navigateToDashboard()} />;
            case 'mfa-selection':
                return <SelectMFAsecurity user={user} changeScreen={(value: ScreenType) => setScreen(value)} navigateToDashboard={() => navigateToDashboard()} />
            case 'email-verification':
                return <EmailVerification user={user} changeScreen={(value: ScreenType) => setScreen(value)} navigateToDashboard={() => navigateToDashboard()} />
            case 'auth-app-verification':
                return <AuthenticatorAppVerification user={user} changeScreen={(value: ScreenType) => setScreen(value)} navigateToDashboard={() => navigateToDashboard()} />
        }
    };

    return (
        <div className='h-full flex flex-col justify-between'>
            {renderContent()}
        </div>
    );
}


function MFAInstructions(props: MultiFactorAuthProps) {
    return (
        <React.Fragment>
            <div>
                <SecurityLabel />
                <p>
                    For enhanced security, we strongly recommend setting up multi-factor authentication (MFA) on your account. MFA is a security process that requires users to verify their identity using multiple independent credentials, enhancing protection against unauthorized access.
                </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-2 mt-6">
                <Button label='Remind Me Later' onClick={() => props.navigateToDashboard && props.navigateToDashboard()} />
                <Button label='Setup MFA' onClick={() => props.changeScreen('mfa-selection')} />
            </div>
        </React.Fragment>
    )
}

function SelectMFAsecurity(props: MultiFactorAuthProps) {

    const user = props.user as User

    const noMfaSetupEnabled = !user.totp_mfa_enabled && !user.email_mfa_enabled
    const bothMfaSetupEnabled = user.totp_mfa_enabled && user.email_mfa_enabled
    const emailSetupEnabled = !user.totp_mfa_enabled && user.email_mfa_enabled
    const authAppSetupEnabled = user.totp_mfa_enabled && !user.email_mfa_enabled


    const [showAuthAppSetup, setShowAuthAppSetup] = useState<boolean>(noMfaSetupEnabled ? true : user.totp_mfa_enabled);
    const [showEmailSetup, setShowEmailSetup] = useState<boolean>(noMfaSetupEnabled ? true : user.email_mfa_enabled);
    const [showConfigureAnotherSetup, setShowConfigureAnotherSetup] = useState<boolean>((noMfaSetupEnabled || bothMfaSetupEnabled) ? false : true);

    const onConfigureAnotherSetup = () => {
        setShowAuthAppSetup(!showAuthAppSetup)
        setShowEmailSetup(!showEmailSetup)
        setShowConfigureAnotherSetup(!showConfigureAnotherSetup)
    }

    return (
        <React.Fragment>
            <div>
                <SecurityLabel />
                <p className="text-sm text-center">
                    {(emailSetupEnabled || authAppSetupEnabled) ?
                        'Select the saved Multi factor authentications setup to proceed further' : ' Select which modes you wish to setup Multi factor authentications'}
                </p>
            </div>
            <div>
                {showAuthAppSetup &&
                    <div className="mt-4 p-4 border rounded-[10px] cursor-pointer text-sm flex items-center" onClick={() => props.changeScreen('auth-app-verification')}>
                        <i className="fa fa-mobile fa-2x pr-2"></i>
                        <p>Receive verification codes via Authenticator App </p>
                    </div>
                }
                {showEmailSetup &&
                    <div className="mt-4 p-4 border rounded-[10px] cursor-pointer text-sm flex items-center" onClick={() => props.changeScreen('email-verification')}>
                        <i className="fa fa-envelope fa-2x pr-2"></i>
                        <p>Receive verification codes via Email </p>
                    </div>
                }
                {showConfigureAnotherSetup &&
                    <div className="mt-2">
                        <span className="text-xs text-teal-500 underline cursor-pointer" onClick={() => onConfigureAnotherSetup()}>
                            Configure another method
                        </span>
                    </div>
                }
            </div>
            <div className={`mt-6 ${(noMfaSetupEnabled || (!showConfigureAnotherSetup && (authAppSetupEnabled || emailSetupEnabled))) && 'grid grid-cols-2 gap-2'}`}>
                {noMfaSetupEnabled && <Button label='Remind Me Later' onClick={() => props.navigateToDashboard && props.navigateToDashboard()} />}
                {(!showConfigureAnotherSetup && (authAppSetupEnabled || emailSetupEnabled)) && <Button label="Back" onClick={() => onConfigureAnotherSetup()} />}
                <Button label="Back To Login" navigateTo="login" />
            </div>
        </React.Fragment>
    )
}

function AuthenticatorAppVerification(props: MultiFactorAuthProps) {

    const user = props.user as User

    const { data: getQrCodeResponse, error: getQrCodeError, loading: getQrCodeLoading, getData: sendOTP } = useGetData(`${AuthEnum.GET_AUTH_APP_OTP}?user_id=${user.id}`);
    const { data: verifyOtpResponse, error: verifyOtpError, loading: verifyOtpLoading, postData: verify } = usePostData(AuthEnum.VERIFY_AUTH_APP_OTP);

    const [otp, setOtp] = useState<string>('');
    const [qrCode, setQrCode] = useState<string>('');

    // on getting the qr code
    useEffect(() => {
        if (getQrCodeResponse) setQrCode(getQrCodeResponse['data']['payload']['uri'])
        if (getQrCodeError) {
            props.changeScreen('mfa-selection')
            toast.error(ERROR_TOAST_MSG)
        }
    }, [getQrCodeResponse, getQrCodeError])

    // on verifying the OTP
    useEffect(() => {
        if (verifyOtpResponse) {
            saveUserInLocalStorage(verifyOtpResponse['data']['payload']['user'])
            toast.success(verifyOtpResponse['data']['message'])
            props.navigateToDashboard && props.navigateToDashboard()
        } if (verifyOtpError) {
            verifyOtpError && toast.error(verifyOtpError['response']['data']['message'] || ERROR_TOAST_MSG)
        }
    }, [verifyOtpResponse, verifyOtpError])

    const verifyOTP = async () => { await verify({ otp, user_id: user.id }) }

    return (
        <React.Fragment>
            {getQrCodeLoading && <Loading />}
            {!getQrCodeLoading && <React.Fragment>
                <SecurityLabel />
                <div className="text-sm text-center">Enter the OTP from the Authenticator app. We support both Google and Microsoft authenticator apps for this purpose.</div>
                {!user.totp_mfa_enabled && <div className="mt-4 w-full flex justify-center items-center">
                    <div style={{ height: "auto", maxWidth: 150, width: "100%" }}>
                        <QRCode
                            size={56}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={qrCode}
                            viewBox={`0 0 56 56`}
                        />
                    </div>
                </div>}
                <div className="mt-5 flex justify-center">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={OTP_LENGTH}
                        renderSeparator={<span className="mx-2">-</span>}
                        inputType='tel'
                        shouldAutoFocus
                        renderInput={(props) => <input {...props} className="otp-input" />}
                    />
                </div>
                <div className="text-sm text-teal-500 underline mt-4 cursor-pointer" onClick={() => props.changeScreen('mfa-selection')}>
                    Select a different method
                </div>
                <div className="mt-6">
                    <Button label='Verify' disabled={otp.length != OTP_LENGTH} loading={verifyOtpLoading} onClick={() => verifyOTP()} />
                </div>
            </React.Fragment>}
        </React.Fragment>
    )
}

function EmailVerification(props: MultiFactorAuthProps) {

    const timerRef = useRef<any>(null);

    const user = props.user as User

    const { data: getOtpResponse, error: getOtpError, loading: getOtpLoading, getData: sendOTP } = useGetData(`${AuthEnum.GET_EMAIL_OTP}?user_id=${user.id}`);
    const { data: verifyOtpResponse, error: verifyOtpError, loading: verifyOtpLoading, postData: verify } = usePostData(AuthEnum.VERIFY_EMAIL_OTP);

    const [otp, setOtp] = useState<string>('');
    const [isOTPexpired, setIsOTPexpired] = useState<boolean>(false);

    // on sending the OTP to the user
    useEffect(() => {
        if (getOtpResponse) {
            timerRef.current?.resetTimer()
            setIsOTPexpired(false)
            toast.success(getOtpResponse['data']['message'])
        }

        if (getOtpError) {
            props.changeScreen('mfa-selection')
            toast.error(ERROR_TOAST_MSG)
        }

    }, [getOtpResponse, getOtpError]);

    // on verifying the OTP
    useEffect(() => {
        if (verifyOtpResponse) {
            saveUserInLocalStorage(verifyOtpResponse['data']['payload']['user'])
            toast.success(verifyOtpResponse['data']['message'])
            props.navigateToDashboard && props.navigateToDashboard()
        }
        verifyOtpError && toast.error(verifyOtpError['response']['data']['message'] || ERROR_TOAST_MSG)
    }, [verifyOtpResponse, verifyOtpError])


    const verifyOTP = async () => { await verify({ otp, user_id: user.id }) }

    return (
        <React.Fragment>
            {getOtpLoading && <Loading />}
            {!getOtpLoading && <React.Fragment>
                <SecurityLabel />
                <div>
                    <div className="text-sm text-center">OTP code sent to your registered email</div>
                    <div className="text-sm text-center">({user.username})</div>
                    {isOTPexpired ?
                        <div className="text-sm text-center mt-4 flex items-center justify-center">
                            Code expired, get another code
                            <div className="w-1/3 ml-2">
                                <Button label="Re-send OTP" loading={getOtpLoading} onClick={() => sendOTP()} />
                            </div>
                        </div>
                        : <div className="text-sm text-center mt-4">
                            Code expires in <Timer seconds={300} ref={timerRef} timeEnd={() => setIsOTPexpired(true)} />
                        </div>
                    }
                    <div className="mt-4 flex justify-center">
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={OTP_LENGTH}
                            renderSeparator={<span className="mx-2">-</span>}
                            inputType='tel'
                            shouldAutoFocus
                            renderInput={(props) => <input {...props} className="otp-input" />}
                        />
                    </div>
                    <div className="text-sm text-teal-500 underline mt-4 cursor-pointer" onClick={() => props.changeScreen('mfa-selection')}>
                        Select a different method
                    </div>
                </div>
                <div className="mt-6">
                    <Button label='Verify' loading={verifyOtpLoading} disabled={otp.length != OTP_LENGTH} onClick={() => verifyOTP()} />
                </div>
            </React.Fragment>}
        </React.Fragment >
    )
}

function SecurityLabel() {
    return <React.Fragment>
        <h2 className='text-2lg text-center mb-3'>SECURITY</h2>
    </React.Fragment>
}

export default MultiFactorAuthentication;
