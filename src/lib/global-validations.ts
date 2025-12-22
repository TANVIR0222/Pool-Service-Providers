import * as Yup from "yup";

// --------------------- add post -----------------
export const addedValidationSchema = Yup.object().shape({
  service: Yup.string().required("Service is required"),
  zipCode: Yup.string()
    .matches(/^\d{5}(-\d{4})?$/, "Invalid ZIP code")
    .required("ZIP code is required"),
  issue: Yup.string().required("Issue description is required"),
  propertyType: Yup.string().required("Property type is required"),
  address: Yup.string().required("Address is required"),
  budget: Yup.string().when("service", {
    is: (service: any) => service === "Pool Construction",
    then: (schema) =>
      schema.required("Budget is required for Pool Construction"),
    otherwise: (schema) => schema.notRequired(),
  }),
  date: Yup.date().required("Date is required"),
});
