export enum AuthEnum {
    LOGIN = 'auth/login/',
    GET_EMAIL_OTP = 'auth/mfa/email/setup',
    VERIFY_EMAIL_OTP = 'auth/mfa/email/verify/',
    GET_AUTH_APP_OTP = 'auth/mfa/totp/setup',
    VERIFY_AUTH_APP_OTP = 'auth/mfa/totp/verify/',
    TRIAL_ACCOUNT = 'auth/cp_trial/',
    VERIFY_OTP_TRIAL_ACCOUNT = 'auth/verify_code/',
    RESEND_TRIAL_ACCOUNT_VERIFY_OTP = 'auth/renew_code/',
    RECOVER_PASSWORD = 'auth/password_reset/',
    CONFIRM_PASSWORD = 'auth/password_reset_confirm/',
    PASSWORD_RESET = 'auth/password_update/'
}