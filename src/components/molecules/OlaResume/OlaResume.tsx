import React, {useState} from "react";
import {IResume} from "@/models/IResume.interface";
import {Avatar, Box, Button, Divider, Flex, FlexProps, List, Text, Title} from "@mantine/core";
import {OlaTechStack} from "@/components/atoms/OlaTechStack/OlaTechStack";
import {IconBarcode, IconBook2, IconBuildingCommunity, IconDownload, IconStars} from "@tabler/icons-react";
import {OlaIconTitle} from "@/components/atoms/OlaIconTitle/OlaIconTitle";
import {useDownload} from "@/hooks/useDownload";

type OlaResumeProps = {
  resume: IResume,
  download?: boolean
} & FlexProps

const NO_DATA = 'No data'

export const OlaResume: React.FC<OlaResumeProps> = ({resume, download = false, ...props}) => {
  const [node, setNode] = useState<HTMLDivElement>()
  const [onDownload] = useDownload(node!, resume?.displayName)

  const setRef = (ref: HTMLDivElement) => setNode(ref)

  return (
    <Flex direction={'column'} {...props}>
      {download && (
        <Box mx={20}>
          <Flex justify={"end"} mb={"xs"}>
            <Button leftIcon={<IconDownload/>} variant={"gradient"} onClick={onDownload}>Download</Button>
          </Flex>
          <Divider/>
        </Box>
      )}
      <Flex ref={setRef} gap={"xs"} direction={"column"} w={'100%'} p={"lg"}>
        <Flex gap={"xl"} justify={"space-between"}>
          <Avatar radius={'100%'} size={96} src={resume?.photoURL}/>
          <Flex direction={"column"} gap={"xs"} align={"center"} justify={"center"}>
            <Title>{resume?.displayName}</Title>
            <Text>{resume?.email}</Text>
            <Text>{resume?.phoneNumber}</Text>
          </Flex>
          <Avatar size={96} src={'/olatim.svg'}/>
        </Flex>
        <Divider/>
        <Flex gap={"xs"} direction={"column"}>
          <OlaIconTitle title={'Professional information'} icon={<IconBarcode/>} mb={'xs'}/>
          <Box>
            <Title size={"large"}>Title</Title>
            <Text>{resume.professionalTitle}</Text>
          </Box>
          {!!resume?.professionalTechStack?.length && (
            <>
              <Divider/>
              <Box>
                <Title size={"large"}>Tech Stack</Title>
                <Flex gap={"sm"} mt={"xs"} wrap={'wrap'}>
                  <OlaTechStack professionalTechStack={resume?.professionalTechStack}/>
                </Flex>
              </Box>
            </>
          )}
          <Divider/>
          <Flex direction={"column"} gap={"xs"}>
            <OlaIconTitle title={'Experiences'} icon={<IconBuildingCommunity/>} mb={'xs'}/>
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
          <Flex gap={"xs"} direction={"column"}>
            <OlaIconTitle title={'Education'} icon={<IconBook2/>}/>
            <List>
              {resume?.education?.map((e, i) => (
                <List.Item key={i}>{e.title || NO_DATA}</List.Item>
              ))}
            </List>
          </Flex>
          <Divider/>
          <Flex direction={"column"} gap={"xs"}>
            <OlaIconTitle title={'Extra information'} icon={<IconStars/>} mb={'xs'}/>
            <Box>
              <Title size={"medium"}>Salary Expected</Title>
              <Text>{resume.salaryExpected || NO_DATA}</Text>
            </Box>
            <Box>
              <Title size={"medium"}>Years of Experience</Title>
              <Text>{resume.yearsOfExperience || NO_DATA}</Text>
            </Box>
            <Box>
              <Title size={"medium"}>Linkedin</Title>
              <Text>{resume.linkedin || NO_DATA}</Text>
            </Box>
          </Flex>

        </Flex>
      </Flex>
    </Flex>
  )
};