import { createStore } from "redux";
import formValidationReducer from "./redux/reducers/formReducer";

const store = createStore(formValidationReducer);

export default store;