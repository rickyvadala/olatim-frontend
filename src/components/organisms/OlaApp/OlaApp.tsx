import {
  ActionIcon,
  Avatar,
  Box, Button,
  Container,
  Flex,
  Menu,
  Modal,
  MultiSelect,
  Pagination,
  Table,
  Text,
  Title
} from "@mantine/core";
import {getResumes} from "@/services/resumes.service";
import {useAppAuthState} from "@/hooks/useAppAuthState";
import React, {useCallback, useEffect, useState} from "react";
import {IResume} from "@/models/IResume.interface";
import {OlaTechStack} from "@/components/atoms/OlaTechStack/OlaTechStack";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBrandLinkedin,
  IconDotsVertical,
  IconFileCv,
  IconSearch
} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {OlaResume} from "@/components/molecules/OlaResume/OlaResume";
import {TECHS} from "@/common/data/techs";
import {OlaAppTable} from "@/components/organisms/OlaApp/OlaAppTable";
import {useForm} from "@mantine/form";

export const OlaApp = () => {
  const [user] = useAppAuthState()
  const [resumes, setResumes] = useState<Array<IResume>>([])
  const [filtered, setFiltered] = useState<Array<IResume>>([])
  const [resumeSelected, setResumeSelected] = useState<IResume>()
  const [opened, {open, close}] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      professionalTechStack: Array.from(''),
    } as IResume,
  });

  const applyFilters = () => {
    const result = resumes.filter(resume => {
      let flag = true
      if (form.values.professionalTechStack.length) {
        flag = resume.professionalTechStack.some(p => form.values.professionalTechStack.includes(p))
      }

      return flag
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
      <Box>
        <Title size={"large"}>Filters</Title>
        <Flex align={"flex-end"} justify={"space-between"} gap={"sm"}>
          <MultiSelect searchable
                       data={TECHS}
                       label="Tech stack"
                       placeholder="Pick the ones you have experience with"
                       {...form.getInputProps('professionalTechStack')}
          />
          <Button onClick={applyFilters} variant={"gradient"} leftIcon={<IconSearch/>}>Apply filters</Button>
        </Flex>
      </Box>
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