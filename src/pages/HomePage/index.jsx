import React from 'react';
import FormPage from "../../components/FormValidation";
import { Provider } from "react-redux";
import store from "../../store";

const Index = () => {
    return (
        <Provider store={store}>

            <FormPage />

        </Provider>

    )
}

export default Index;