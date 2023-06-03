import {Button, Container, Flex, Paper, Skeleton, Title,} from '@mantine/core';
import React from "react";
import {useSelector} from "react-redux";
import {selectResume} from "@/store/dataSlice";
import Link from "next/link";
import {OlaRouter} from "@/router/OlaRouter";
import {OlaResume} from "@/components/molecules/OlaResume/OlaResume";

export const OlaProfile = () => {
  const resume = useSelector(selectResume)

  return (
    <Flex py={'xl'} mih={'100vh'} style={{background: '#f8f9fa'}}>
      <Container size={'lg'} w={'100%'} px={"xl"} maw={960}>
        <Flex justify={"space-between"} align={"center"}>
          <Title my={"xl"}>My Resume</Title>
          <Link href={OlaRouter.APPLY} style={{textDecoration: 'none'}}>
            <Button variant="gradient">{resume ? 'EDIT' : 'ADD'} Resume</Button>
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
              <OlaResume resume={resume}/>
            </Paper>
          )
        }
      </Container>
    </Flex>
  );
}