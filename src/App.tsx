"use client";

import { z } from "zod";
import supabase from "./config/supabaseClient";
import {
  FormBody,
  FormContent,
  FormixFormProvider,
  FormDescription,
  FormFlexFields,
  FormFooter,
  FormHeader,
  FormTitle,
  ISchemaFormProps,
  ThemeProvider,

} from "@adimis/react-formix"; // 120.1k (gzipped: 34.2k)
import "@adimis/react-formix/dist/style.css";
import { useEffect } from "react";

interface SignUp {
  username: string;
  email: string;
  address: string;
  phone_number: string;
  password: string;
  gender: string;
  terms: boolean;
  file: File;
  date: Date;
  year: number;
  expertise: string[];
}

const App = () => {
  console.log("supabase", supabase);

  const schemaFormProps: ISchemaFormProps<SignUp> = {
    formLabel: "Example Barebone Form",
    formSlug: "example-barebone-form",
    persistFormResponse: "localStorage",
    devTools: true,
    formDisabled: false,
    enableConditionalRendering: true,
    schema: [
      {
        key: "username",
        label: "Username",
        description: "Enter your desired username.",
        autoComplete: "username",
        type: "text",
        placeholder: "Your username",
        defaultValue: "",
        validations: z
          .string()
          .min(1, "Username is required")
          .max(20, "Username must not exceed 20 characters"),
        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
              color: "black"
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
      {
        key: "email",
        label: "Email",
        description: "Enter your email address.",
        autoComplete: "email",
        type: "email",
        placeholder: "Your email",
        defaultValue: "",
        validations: z
          .string()
          .email("Enter a valid email address")
          .min(1, "Email is required"),
        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
              color: "black"
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
      {
        key: "address",
        label: "Address",
        description: "Enter your full address.",
        autoComplete: "address-line1",
        type: "text",
        placeholder: "Your address",
        defaultValue: "",

        validations: z
          .string()
          .min(10, "Address should be at least 10 characters"),
        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
              color: "black"
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
      {
        key: "phone_number",
        label: "Phone",
        description: "Enter your phone number with country code.",
        autoComplete: "tel",
        type: "tel",
        placeholder: "+1234567890",
        defaultValue: "",
        validations: z
          .string()
          .regex(
            /^\+?(\d[\s.-]?){9,}\d$/,
            "Enter a valid phone number"
          ),
        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
              color: "black"
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
      {
        key: "password",
        label: "Password",
        description: "Enter a strong password.",
        autoComplete: "new-password",
        type: "password",
        placeholder: "Your password",
        defaultValue: "",
        validations: z
          .string()
          .min(8, "Password should be at least 8 characters")
          .max(20, "Password must not exceed 20 characters"),
        displayConditions: [
          {
            dependentField: "email",
            dependentFieldValue: "admin@adimis.in",
            operator: "===",
          },
        ],
        removeValidationConditions: [
          {
            dependentField: "email",
            dependentFieldValue: "admin@adimis.in",
            operator: "!==",
          },
        ],
        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
              color: "black"
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
    ],
    defaultValues: {
      email: "adimis.ai.001@gmail.com",
      phone_number: "919625183597",
    },
    onSubmit: async (values) => {
      console.log(
        "On Submit Example Form Response: ",
        JSON.stringify(values, null, 4)

      )
      const { username, email, address, password, phone_number } = values;
      const { data, error } = await supabase
        .from("adimis_react_form")
        .insert([{ username, email, address, password, phone_number }])
      if (error) {
        console.log("Error: ", error)
      }
      if (data) {
        console.log("Data: ", data)
      }
    }


    ,
    onInvalidSubmit: (values) =>
      console.log(
        "On Submit Invalid Example Form Response: ",
        JSON.stringify(values, null, 4)
      ),
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("adimis_react_form")
        .select();

      if (data) {
        console.log(data)
      }
      if (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <ThemeProvider defaultTheme="dark">
      <FormixFormProvider {...schemaFormProps}>
        <FormBody>
          <FormHeader>
            <FormTitle />
            <FormDescription />
          </FormHeader>
          <FormContent>
            <FormFlexFields fluid columns={2} />
          </FormContent>
          <FormFooter>
            <button type="submit" className="mt-5">
              Submit
            </button>
          </FormFooter>
        </FormBody>
      </FormixFormProvider>
    </ThemeProvider>
  );
};

export default App;
