import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./with-spinner-styles";

const WithSpinner = WrappedComponent => {
    const Spinner = ({ isLoading, ...ortherProps}) => {
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer/>
            </SpinnerOverlay>
        ) : (
            <WrappedComponent { ...ortherProps }/>
        );
    };
    return Spinner;
};

export default WithSpinner;