import {IUser} from "@/models/IUser.interface";
import {IExperience} from "@/models/IExperience.interface";
import {IEducation} from "@/models/IEducation.interface";

export interface IResume extends IUser {
  professionalTitle: string,
  professionalTechStack: Array<string>,
  experience: Array<IExperience>,
  education: Array<IEducation>,
  salaryExpected: string,
  yearsOfExperience: string,
  linkedin: string,

}