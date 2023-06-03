import React from "react";
import {IResume} from "@/models/IResume.interface";
import {Avatar, Box, Divider, Flex, List, Text, Title} from "@mantine/core";
import {OlaTechStack} from "@/components/atoms/OlaTechStack/OlaTechStack";

type OlaResumeProps = {
  resume: IResume
}

const NO_DATA = 'No data'
export const OlaResume: React.FC<OlaResumeProps> = ({resume}) => {
  return (
    <Flex gap={"xs"} direction={"column"} w={'100%'}>
      <Flex gap={"xl"}>
        <Avatar size={96} src={resume?.photoURL}></Avatar>
        <Flex direction={"column"} gap={"xs"}>
          <Title>{resume?.displayName}</Title>
          <Text>{resume?.email}</Text>
          <Text>{resume?.phoneNumber}</Text>
        </Flex>
      </Flex>
      <Flex gap={"xs"} direction={"column"}>
        <Divider/>
        <Box>
          <Title lh={1} size={"large"}>Professional Title</Title>
          <Text>{resume.professionalTitle}</Text>
        </Box>
        {!!resume?.professionalTechStack?.length && (
          <>
            <Divider/>
            <Box>
              <Title lh={1} size={"large"}>Tech Stack</Title>
              <Flex gap={"sm"} mt={"xs"} wrap={'wrap'}>
                <OlaTechStack professionalTechStack={resume?.professionalTechStack}/>
              </Flex>
            </Box>
          </>
        )}
        <Divider/>
        <Flex direction={"column"} gap={"xs"}>
          <Title lh={1} size={"large"}>Experiences</Title>
          {!resume?.experience?.length
            ? <Text>{NO_DATA}</Text>
            : resume?.experience?.map((job, i) => (
              <Flex key={i} direction={"column"} gap={"xs"}>
                <Box>
                  <Title size={"medium"}>Job Title</Title>
                  <Text>{job.title || NO_DATA}</Text>
                </Box>
                <Box>
                  <Title size={"medium"}>Company</Title>
                  <Text>{job.company || NO_DATA}</Text>
                </Box>
                <Box>
                  <Title size={"medium"}>Description</Title>
                  <Text>{job.description || NO_DATA}</Text>
                </Box>
                <Divider/>
              </Flex>
            ))
          }
        </Flex>
        <Box>
          <Title size={"large"}>Education</Title>
          <List>
            {resume?.education?.map((e, i) => (
              <List.Item key={i}>{e.title || NO_DATA}</List.Item>
            ))}
          </List>
        </Box>
        <Divider/>
        <Box>
          <Title lh={1} size={"large"}>Salary Expected</Title>
          <Text>{resume.salaryExpected || NO_DATA}</Text>
        </Box>
        <Box>
          <Title lh={1} size={"large"}>Years of Experience</Title>
          <Text>{resume.yearsOfExperience || NO_DATA}</Text>
        </Box>
        <Box>
          <Title lh={1} size={"large"}>Linkedin</Title>
          <Text>{resume.linkedin || NO_DATA}</Text>
        </Box>
      </Flex>
    </Flex>
  )
}