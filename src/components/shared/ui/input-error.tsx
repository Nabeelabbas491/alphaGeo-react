import { ErrorProps } from "../../../data/interfaces/app";

function ErrorMessage(props: ErrorProps) {
    return (<div className='text-xs text-error'>{props.error}</div>);
}

export default ErrorMessage;
