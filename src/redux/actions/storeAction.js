export const ADD_FORM_FIELDS = "ADD_FORM_FIELDS";

export const setFormData = (formData) => (
  {
  type: ADD_FORM_FIELDS, 
  payload: formData, 
});
