import supabase from "../../config/supabaseClient";
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
    FormField,
    FieldItem,
    FieldLabel,

} from "@adimis/react-formix";
import { any, z } from "zod";
import Gender from "../../types/enum";
import { SignUp } from "../../types/types";
import "@adimis/react-formix/dist/style.css";
import { handleSupaBaseDataSubmit } from "../../utilis/supaBase.utilis";
import { TextField, MenuItem, Select, InputLabel } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const gender = ["Male", "Female", "Other"];
const year = [2020, 2021, 2022, 2023, 2024]

const yearSchema = z.number().int().min(2020, { message: "Year must be no earlier than 2020" }).max(2024, { message: "Year must be no later than 2024" });


const Home = () => {
    const handleInputRender = ({ formDisabled }: any, formItem: any, formMethods: any, submitButtonLoading: boolean | undefined) => {
        return (
            <div className="flex  justify-between items-center w-full">
                <div className="mr-2 justify-center">{formItem.label}</div>
                <div className="flex-grow">
                    <TextField
                        id={formItem.key}
                        disabled={formDisabled || submitButtonLoading}
                        {...formMethods.register(formItem.key)}
                        className="w-full"
                    />
                </div>
            </div>
        )

    }

    const handleSelectFieldRender = ({ formDisabled }: any, formItem: any, formMethods: any, submitButtonLoading: boolean | undefined) => {
        const handleChange = (event: any) => {
            console.log("event.target.value", event.target.value);
            formMethods.setValue(formItem.key, event.target.value);
        };

        return (
            <div className="flex justify-center items-center w-full">
                <div className="mr-2 justify-center">{formItem.label}</div>

                <Select
                    id={formItem.key}
                    disabled={formDisabled || submitButtonLoading}
                    value={formMethods.watch(formItem.key)} // Use formMethods to get the current value
                    label={formItem.label}
                    onChange={handleChange}
                    className="w-full"
                    {...formMethods.register(formItem.key)}
                >
                    {formItem.key === "gender" ? gender.map((each) => {
                        return (

                            <MenuItem value={each} key={each}>{each}</MenuItem>

                        )
                    }) : year.map((each) => {
                        return (
                            <MenuItem value={each} key={each}>{each}</MenuItem>
                        )
                    })
                    }
                </Select>

            </div>
        );
    };

    const handleDatePickerRender = ({ formDisabled }: any, formItem: any, formMethods: any, submitButtonLoading: boolean | undefined) => {
        if (!formItem || !formMethods || !formMethods.register) {
            console.error("Invalid formItem or formMethods:", { formItem, formMethods });
            return null;
        }
        const registerProps = formMethods.register(formItem.key);

        if (!registerProps) {
            console.error("Register props are undefined for key:", formItem.key);
            return null;
        }
        return (
            <div className="flex justify-center items-center w-full">
                <div className="mr-2 justify-center">{formItem.label}</div>

                <LocalizationProvider dateAdapter={AdapterDayjs} key={formItem.key}>
                    <DatePicker {...registerProps} className="w-full flex-grow" disabled={formDisabled || submitButtonLoading} />
                </LocalizationProvider>
            </div>

        )
    }


    const handleFileChange = (event: any, formMethods: any) => {
        console.log(event.target.files[0]);
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            formMethods.setValue("file", file);
        }
    }

    const handleFileRender = ({ formDisabled }: any, formItem: any, formMethods: any, submitButtonLoading: boolean | undefined) => {
        return (
            <div className="flex  justify-between items-start w-full">
                <label className="flex items-center w-full">
                    <div className="mr-2">{formItem.label}</div>
                    <div className="flex-grow">
                        <TextField
                            type="file"
                            id={formItem.key}
                            disabled={formDisabled || submitButtonLoading}
                            onChange={(event) => handleFileChange(event, formMethods)}
                            className="w-full"
                        // {...formMethods.register(formItem.key)}
                        />
                    </div>
                </label>
            </div>
        )
    }

    const schemaFormProps: ISchemaFormProps<SignUp> = {
        formLabel: "User Log-In Form",
        formSlug: "example-barebone-form",
        //persistFormResponse: "localStorage",
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
                    handleInputRender(formDisabled, formItem, formMethods, submitButtonLoading)
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
                    handleInputRender(formDisabled, formItem, formMethods, submitButtonLoading)
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
                    handleInputRender(formDisabled, formItem, formMethods, submitButtonLoading)
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
                    handleInputRender(formDisabled, formItem, formMethods, submitButtonLoading)

                ),
            },
            {
                key: "gender",
                label: "Gender",
                description: "Select your gender.",
                type: "select",
                defaultValue: "",
                validations: z.enum([Gender.Male, Gender.Female, Gender.Other], {
                    invalid_type_error: 'Gender must be one of Male, Female, or Other'
                }),
                render: ({
                    formDisabled,
                    formItem,
                    formMethods,
                    submitButtonLoading,
                }) => (
                    handleSelectFieldRender(formDisabled, formItem, formMethods, submitButtonLoading)

                ),

            },
            {
                key: "file",
                label: "Choose file to upload",
                type: "file",
                validations: z.any(),
                render: ({
                    formDisabled,
                    formItem,
                    formMethods,
                    submitButtonLoading,
                }) => (
                    handleFileRender(formDisabled, formItem, formMethods, submitButtonLoading)
                )
            },
            {
                key: "date",
                label: "Date",
                description: "Enter Your Graduation Date",
                type: "date",
                defaultValue: "",
                validations: z.date(),
                render: ({ formDisabled,
                    formItem,
                    formMethods,
                    submitButtonLoading, }) => (
                    handleDatePickerRender(formDisabled, formItem, formMethods, submitButtonLoading)
                )

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
                    handleInputRender(formDisabled, formItem, formMethods, submitButtonLoading)
                ),
            },
            {
                key: "year",
                label: "Year",
                description: "Select your graduation year.",
                type: "select",
                defaultValue: "",
                validations: yearSchema,
                render: ({
                    formDisabled,
                    formItem,
                    formMethods,
                    submitButtonLoading,
                }) => (
                    handleSelectFieldRender(formDisabled, formItem, formMethods, submitButtonLoading)

                ),

            }
        ],
        defaultValues: {
            email: "adimis.ai.001@gmail.com",
            phone_number: "919625183597",
        },
        onSubmit: async (values) => {
            handleSupaBaseDataSubmit(values);
        },
        onInvalidSubmit: (values) =>
            console.log(
                "On Submit Invalid Example Form Response: ",
                JSON.stringify(values, null, 4)
            ),
    };

    return (
        <ThemeProvider>
            <FormixFormProvider {...schemaFormProps}>
                <FormBody>
                    <FormHeader className="text-center">
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

}

export default Home;