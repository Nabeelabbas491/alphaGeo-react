import { User } from "./app";

export type ScreenType = "" | "mfa-selection" | "email-verification" | "auth-app-verification";

export interface MultiFactorAuthProps {
    changeScreen: (event: ScreenType) => void,
    navigateToDashboard?: () => void,
    user?: User
}

export interface TimerProps {
    seconds?: number,
    timeEnd?: () => void
}
