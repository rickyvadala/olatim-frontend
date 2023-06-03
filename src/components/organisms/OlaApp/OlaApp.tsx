import {Anchor, Avatar, Container, Flex, Pagination, Table, Text, Title} from "@mantine/core";
import {getResumes} from "@/services/resumes.service";
import {useAppAuthState} from "@/hooks/useAppAuthState";
import React, {useCallback, useEffect, useState} from "react";
import {IResume} from "@/models/IResume.interface";
import {OlaTechStack} from "@/components/atoms/OlaTechStack/OlaTechStack";

export const OlaApp = () => {
  const [user] = useAppAuthState()
  const [resumes, setResumes] = useState<Array<IResume>>([])

  const handleGetResumes = useCallback(async () => {
    if (user?.uid) {
      const response = await getResumes(user.uid)
      setResumes(response)
    }
  }, [user?.uid])

  useEffect(() => {
    void handleGetResumes()
  }, [handleGetResumes])

  return (
    <Container fluid size={"lg"} py={"lg"}>
      <Title mb={"lg"}>Dashboard</Title>
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
          <th>LinkedIn</th>
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
            <td>{resume.linkedin
              ? <Anchor variant={"gradient"} href={resume.linkedin} target={'_blank'}>Open</Anchor>
              : '-'}
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
      <Flex justify={"center"}>
        <Pagination total={10}/>
      </Flex>
    </Container>
  )
}