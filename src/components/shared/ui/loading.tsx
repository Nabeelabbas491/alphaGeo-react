import Spinner from "./spinner";

function Loading() {
    return (
        <div className="flex items-center justify-center items-center h-full w-100">
            <Spinner />
            <span className="ml-2 text-sm text-center">Loading ....</span>
        </div>
    );
}

export default Loading;
