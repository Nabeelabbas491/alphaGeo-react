import { InputProps } from "../../../data/interfaces/app";

function Input(props: InputProps) {
    return (
        <input
            className={`custom-input ${props.class && props.class}`}
            type={props.type}
            placeholder={props.placeholder}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
        >
        </input>
    );
}

export default Input;
