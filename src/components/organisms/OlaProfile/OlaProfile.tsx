import {Avatar, Box, Button, Container, Divider, Flex, Paper, Skeleton, Text, Title,} from '@mantine/core';
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {selectAuthUser, selectResume} from "@/store/dataSlice";
import {useRouter} from "next/router";
import Link from "next/link";
import {OlaRouter} from "@/router/OlaRouter";

const NO_DATA = 'No data'
export const OlaProfile = () => {
    const resume = useSelector(selectResume)
    const user = useSelector(selectAuthUser)
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            void router.push(OlaRouter.AUTH)
        }
    })

    return (
        <Flex pt={60} pb={60} mih={'100vh'} style={{background: '#f8f9fa'}}>
            <Container size={'lg'} w={'100%'} px={"xl"} maw={960}>
                <Flex justify={"space-between"} align={"center"}>
                    <Title my={"xl"}>My Resume</Title>
                    <Link href={OlaRouter.APPLY} style={{textDecoration: 'none'}}>
                        <Button variant="filled">{resume ? 'EDIT' : 'ADD'} Resume</Button>
                    </Link>
                </Flex>

                {!resume
                    ? (
                        <Skeleton visible={true} h={'50vh'}>
                            <Flex>
                                <Button variant="outline">Join US!</Button>
                            </Flex>
                        </Skeleton>
                    )
                    : (
                        <Paper p={"lg"} shadow={"md"}>
                            <Flex gap={"xs"} direction={"column"}>
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
                                        <Title size={"large"}>Professional Title</Title>
                                        <Text>{resume.professionalTitle}</Text>
                                    </Box>
                                    <Divider/>
                                    <Box>
                                        <Title size={"large"}>Tech Stack</Title>
                                        {resume?.professionalTechStack?.map(tech => (
                                            <Text key={tech}>{tech}</Text>
                                        ))}
                                    </Box>
                                    <Divider/>
                                    <Flex direction={"column"} gap={"xs"}>
                                        <Title size={"large"}>Experiences</Title>
                                        {!resume?.experience?.length
                                            ? <Text>{NO_DATA}</Text>
                                            : resume?.experience?.map((job, i) => (
                                                <Flex key={i} direction={"column"} gap={"xs"}>
                                                    <Box>
                                                        <Title size={"medium"}>Job Title</Title>
                                                        <Text>{job.jobTitle || NO_DATA}</Text>
                                                    </Box>
                                                    <Box>
                                                        <Title size={"medium"}>Company</Title>
                                                        <Text>{job.jobCompany || NO_DATA}</Text>
                                                    </Box>
                                                    <Box>
                                                        <Title size={"medium"}>Description</Title>
                                                        <Text>{job.jobDescription || NO_DATA}</Text>
                                                    </Box>
                                                    <Divider/>
                                                </Flex>
                                            ))
                                        }
                                    </Flex>
                                    <Box>
                                        <Title size={"large"}>Education</Title>
                                        {resume?.education?.map((e, i) => (
                                            <Text key={i}>{e.educationTitle || NO_DATA}</Text>
                                        ))}
                                    </Box>
                                    <Box>
                                        <Title size={"large"}>Salary Expected</Title>
                                        <Text>{resume.salaryExpected || NO_DATA}</Text>
                                    </Box>
                                    <Box>
                                        <Title size={"large"}>Years of Experience</Title>
                                        <Text>{resume.yearsOfExperience || NO_DATA}</Text>
                                    </Box>
                                    <Box>
                                        <Title size={"large"}>Linkedin</Title>
                                        <Text>{resume.linkedin || NO_DATA}</Text>
                                    </Box>
                                </Flex>
                            </Flex>
                        </Paper>
                    )}
            </Container>
        </Flex>
    );
}