import {ActionIcon, Avatar, Container, Flex, Menu, Modal, Pagination, Table, Text, Title} from "@mantine/core";
import {getResumes} from "@/services/resumes.service";
import {useAppAuthState} from "@/hooks/useAppAuthState";
import React, {useCallback, useEffect, useState} from "react";
import {IResume} from "@/models/IResume.interface";
import {OlaTechStack} from "@/components/atoms/OlaTechStack/OlaTechStack";
import {IconArrowLeft, IconArrowRight, IconBrandLinkedin, IconDotsVertical, IconFileCv} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {OlaResume} from "@/components/molecules/OlaResume/OlaResume";

export const OlaApp = () => {
  const [user] = useAppAuthState()
  const [resumes, setResumes] = useState<Array<IResume>>([])
  const [resumeSelected, setResumeSelected] = useState<IResume>()
  const [opened, {open, close}] = useDisclosure(false);

  const openResume = (resume: IResume) => {
    setResumeSelected(resume)
    open()
  }

  const prevResume = (resume: IResume) => {
    const index = resumes.findIndex(({uid}) => uid === resume.uid)
    setResumeSelected(resumes[index - 1] || resume)
  }

  const nextResume = (resume: IResume) => {
    const index = resumes.findIndex(({uid}) => uid === resume.uid)
    setResumeSelected(resumes[index + 1] || resume)
  }

  const openLinkedin = ({linkedin}: IResume) => {
    linkedin && window.open(linkedin, '_blank')
  }

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
      <Flex justify={"center"}>
        <Pagination total={10}/>
      </Flex>
      <Modal opened={opened} onClose={close} withCloseButton={false} size={"xl"}>
        <Flex py={"sm"} gap={"xs"}>
          <ActionIcon onClick={() => prevResume(resumeSelected!)}>
            <IconArrowLeft/>
          </ActionIcon>
          <OlaResume resume={resumeSelected!}/>
          <ActionIcon onClick={() => nextResume(resumeSelected!)}>
            <IconArrowRight/>
          </ActionIcon>
        </Flex>
      </Modal>
    </Container>
  )
}