import {Avatar, Container, Flex, Paper, Text, Title,} from '@mantine/core';
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {selectAuthUser, selectResume} from "@/store/authSlice";
import {useRouter} from "next/router";
import {OlaRouter} from "@/router/OlaRouter";


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
                <Title my={"xl"}>My Resume</Title>
                <Paper p={"lg"} shadow={"md"}>
                    <Flex gap={"xl"} direction={"column"}>
                        <Flex gap={"xl"}>
                            <Avatar size={96} src={user?.photoURL}></Avatar>
                            <Flex direction={"column"} gap={"xs"}>
                                <Title>{user?.displayName}</Title>
                                <Text>{user?.email}</Text>
                                <Text>{user?.phoneNumber}</Text>
                            </Flex>
                        </Flex>
                        <Flex>
                            {JSON.stringify(user)}
                        </Flex>
                    </Flex>


                </Paper>
            </Container>
        </Flex>
    );
}