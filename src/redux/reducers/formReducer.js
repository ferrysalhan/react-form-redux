import { ADD_FORM_FIELDS } from "../actions/storeAction";

const initialState = {
  firstName: "",
  lastName: "", 
  email: "",
  date: "",
  residenceAddress1: "",
  residenceAddress2: "", 
  permanentAddress1: "", 
  permanentAddress2: "",
  filename: "",
  filetype: "",
  file: ""
};

const ReactFormReducer = (state = initialState, action) => {

  console.log("payload", action.payload)
  switch (action.type) {
    case ADD_FORM_FIELDS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default ReactFormReducer;