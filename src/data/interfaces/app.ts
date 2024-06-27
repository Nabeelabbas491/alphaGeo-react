export interface User {
    api_access: boolean
    company: string
    email_mfa_enabled: boolean
    full_name: string
    id: number
    is_approved: boolean
    is_staff: boolean
    roles: Array<number>
    token: string
    token_created: boolean
    totp_mfa_enabled: boolean
    username: string
}

export interface ButtonProps {
    type?: "submit" | "reset" | "button",
    label?: string,
    disabled?: boolean,
    navigateTo?: string,
    loading?: boolean,
    onClick?: () => void;
}

export interface InputProps {
    class?: string | boolean;
    type?: string;
    placeholder?: string;
    name?: string;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export interface PasswordInputProps extends InputProps {
    label?: string
    name?: string
}

export interface ErrorProps {
    error: string | undefined
}