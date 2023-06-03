import React from "react";
import {ActionIcon, Avatar, Flex, Menu, Table, Text} from "@mantine/core";
import {OlaTechStack} from "@/components/atoms/OlaTechStack/OlaTechStack";
import {IconBrandLinkedin, IconDotsVertical, IconFileCv} from "@tabler/icons-react";
import {IResume} from "@/models/IResume.interface";

type OlaAppTableProps = {
  resumes: Array<IResume>,
  openResume: (resume: IResume) => void,
  openLinkedin: (resume: IResume) => void,
}
export const OlaAppTable: React.FC<OlaAppTableProps> = ({resumes, openResume, openLinkedin}) => {
  return (
    <Table mb={"lg"} striped highlightOnHover>
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Title</th>
        <th>Tech Stack</th>
        <th>Salary</th>
        <th>Experience</th>
        <th/>
      </tr>
      </thead>
      <tbody>
      {resumes.map((resume, i) => (
        <tr key={resume.uid}>
          <td>
            <Flex align={"center"} gap={"xs"}>
              <Text>{i + 1}</Text><Avatar size={48} src={resume.photoURL}/>
            </Flex>
          </td>
          <td>{resume.displayName}</td>
          <td>{resume.email}</td>
          <td>{resume.professionalTitle}</td>
          <td>
            <Flex gap={"sm"} wrap={'wrap'}>
              <OlaTechStack professionalTechStack={resume?.professionalTechStack}/>
            </Flex>
          </td>
          <td>{resume.salaryExpected}</td>
          <td>{resume.yearsOfExperience ? `${resume.yearsOfExperience} years` : '-'}</td>
          <td>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon>
                  <IconDotsVertical/>
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Actions</Menu.Label>
                <Menu.Item icon={<IconFileCv size={16}/>} onClick={() => openResume(resume)}>
                  Resume
                </Menu.Item>
                <Menu.Item icon={<IconBrandLinkedin size={16}/>}
                           disabled={!resume.linkedin}
                           onClick={() => openLinkedin(resume)}>
                  LinkedIn
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>

  )
}