import React from "react";
import {Badge} from "@mantine/core";
import {TECHS} from "@/common/data/techs";

type OlaTechStackProps = {
  professionalTechStack: Array<string>
}
export const OlaTechStack: React.FC<OlaTechStackProps> = ({professionalTechStack}) => {
  return (
    <>
      {professionalTechStack?.length
        ? professionalTechStack?.map(tech => (
          <Badge size={"md"} variant="gradient" gradient={{from: 'indigo', to: 'cyan'}} key={tech}>
            {TECHS.find((e: any) => e.value === tech)?.label}
          </Badge>
        ))
        : '-'
      }
    </>
  )
}