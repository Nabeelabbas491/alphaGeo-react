import Show from "../../assets/images/auth/show.svg"
import Hide from "../../assets/images/auth/hide.svg"
import Input from "../shared/ui/input";
import { useState } from "react";
import { PasswordInputProps } from "../../data/interfaces/app";

function PasswordInput(props: PasswordInputProps) {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div>
            <div className='flex justify-between items-end pb-1'>
                <span className='text-xs'>{props.label}</span>
                <span className='text-xs flex items-center'>
                    <img className='cursor-pointer' src={showPassword ? Show : Hide} alt="hide-password-icon" ></img>
                    <span className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</span>
                </span>
            </div>
            <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                class={props.class}
            />
        </div>
    );
}

export default PasswordInput;
