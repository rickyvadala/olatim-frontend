import {DateValue} from "@mantine/dates/lib/types/DatePickerValue";

export interface IExperience {
    jobTitle: string,
    jobCompany: string,
    jobDates: Array<DateValue>,
    jobDescription: string
}