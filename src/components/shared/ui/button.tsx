import { Link } from "react-router-dom";
import Spinner from "./spinner";
import { ButtonProps } from "../../../data/interfaces/app";

function Button(props: ButtonProps) {
    return (
        <button className={`button h-button flex justify-center items-center w-full rounded text-sm p-4 bg-teal-500 ${props.loading ? 'pointer-events-none' : 'cursor-pointer'}`}
            disabled={props.disabled}
            type={props.type}
            onClick={!props.loading ? () => props.onClick && props.onClick() : () => { }}
        >
            {props.loading ? (<Spinner />) : (props.navigateTo ? (<Link to={`/${props.navigateTo}`}>{props.label}</Link>) : props.label)}
        </button>
    );
}

export default Button;
