import {ActionIcon, Container, Flex, Modal, Pagination, Title} from "@mantine/core";
import {getResumes} from "@/services/resumes.service";
import {useAppAuthState} from "@/hooks/useAppAuthState";
import React, {useCallback, useEffect, useState} from "react";
import {IResume} from "@/models/IResume.interface";
import {IconArrowLeft, IconArrowRight} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {OlaResume} from "@/components/molecules/OlaResume/OlaResume";
import {OlaAppTable} from "@/components/organisms/OlaApp/OlaAppTable";
import {OlaAppFilters} from "@/components/organisms/OlaApp/OlaAppFilters";

export const OlaApp: React.FC = () => {
  const [user] = useAppAuthState()
  const [resumes, setResumes] = useState<Array<IResume>>([])
  const [filtered, setFiltered] = useState<Array<IResume>>([])
  const [resumeSelected, setResumeSelected] = useState<IResume>()
  const [opened, {open, close}] = useDisclosure(false);

  const applyFilters = (form: any) => {
    const result = resumes.filter(resume => {
      if (form.values.professionalTechStack.length) {
        const flag = resume.professionalTechStack.some(p => form.values.professionalTechStack.includes(p))
        if (!flag) return false;
      }

      if (form.values.minSalaryExpected) {
        const flag = Number(resume.salaryExpected) >= form.values.minSalaryExpected
        if (!flag) return false;
      }

      if (form.values.maxSalaryExpected) {
        const flag = Number(resume.salaryExpected) <= form.values.maxSalaryExpected
        if (!flag) return false;
      }

      return true;
    })

    setFiltered(result)
  }

  const openResume = (resume: IResume) => {
    setResumeSelected(resume)
    open()
  }

  const prevResume = (resume: IResume) => {
    const index = filtered.findIndex(({uid}) => uid === resume.uid)
    setResumeSelected(filtered[index - 1] || resume)
  }

  const nextResume = (resume: IResume) => {
    const index = filtered.findIndex(({uid}) => uid === resume.uid)
    setResumeSelected(filtered[index + 1] || resume)
  }

  const openLinkedin = ({linkedin}: IResume) => {
    linkedin && window.open(linkedin, '_blank')
  }

  const handleGetResumes = useCallback(async () => {
    if (user?.uid) {
      const response = await getResumes(user.uid)
      setResumes(response)
      setFiltered(response)
    }
  }, [user?.uid])

  useEffect(() => {
    void handleGetResumes()
  }, [handleGetResumes])

  return (
    <Container fluid size={"lg"} py={"lg"}>
      <Title mb={"lg"}>Dashboard</Title>
      <OlaAppFilters applyFilters={applyFilters}/>
      <OlaAppTable resumes={filtered} openResume={openResume} openLinkedin={openLinkedin}/>
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