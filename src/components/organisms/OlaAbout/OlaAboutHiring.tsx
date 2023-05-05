import {Badge, Card, Container, createStyles, Flex, Group, rem, SimpleGrid, Text, Title, Timeline, Box} from '@mantine/core';
import type {TablerIconsProps} from '@tabler/icons-react';
import React from "react";
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots } from '@tabler/icons-react';


const useStyles = createStyles((theme) => ({

    title: {
        fontSize: rem(34),
        fontWeight: 900,

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(24),
        },
    },

    description: {
        maxWidth: 600,
        margin: 'auto',

        '&::after': {
            content: '""',
            display: 'block',
            backgroundColor: theme.fn.primaryColor(),
            width: rem(45),
            height: rem(2),
            marginTop: theme.spacing.sm,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    card: {
        border: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
        }`,
    },

    cardTitle: {
        '&::after': {
            content: '""',
            display: 'block',
            backgroundColor: theme.fn.primaryColor(),
            width: rem(45),
            height: rem(2),
            marginTop: theme.spacing.sm,
        },
    },
}));

export type OlaAboutProps1 = {
    badge: string,
    title: string,
    subtitle: string,
    features: Array<{ name: string, description: string, icon: React.FC<TablerIconsProps> }>
}

export const OlaAboutHiring = ({badge, title, subtitle, features: _features}: OlaAboutProps1) => {
    const {classes, theme} = useStyles();

     const features = _features.map((feature) => (
        <Timeline color={'yellow'} active={4} bulletSize={30} lineWidth={2} radius="md">
        <Timeline.Item bullet={<IconGitBranch size={12} />} title={feature.name}>
          <Text 
            color="dimmed" 
            size="sm"
            >
            {feature.description} 
            </Text><Text size="xs" mt={4}>&nbsp;</Text>
        </Timeline.Item>
  
        <Timeline.Item bullet={<IconGitCommit size={12} />} title="Get Pre-screened profiles">
          <Text 
            color="dimmed" 
            size="sm"
            >
            Review qualified candidates that match your goals.
            </Text><Text size="xs" mt={4}>&nbsp;</Text>
        </Timeline.Item>
  
        <Timeline.Item bullet={<IconGitPullRequest size={12} />} title="Interviews & Meet Ups">
          <Text 
          color="dimmed" 
          size="sm"
          >
          Carry out your recruitment process. Get our help if needed!
          </Text><Text size="xs" mt={4}>&nbsp;</Text>
        </Timeline.Item>
  
        <Timeline.Item  bullet={<IconMessageDots size={12} />} title="Hire & Keep Building">
          <Text 
          color="dimmed" 
          size="sm"
          >
          Our goal is get you here as fast as possible.
          </Text>
        </Timeline.Item>
      </Timeline>
    ));

    return (
        <Container size="lg" my="xl" px={"xl"} id={'about'} py={96}>
            <Group position="center">
                <Badge variant="filled" size="lg">
                    {badge}
                </Badge>
            </Group>

            <Title order={2} className={classes.title} ta="center" mt="sm">
                {title}
            </Title>

            <Text c="dimmed" className={classes.description} ta="center" mt="md">
                {subtitle}
            </Text>

            <Group position="center">
                <SimpleGrid cols={1} spacing="xl" mt={50} breakpoints={[{maxWidth: 'md', cols: 1}]}>
                {features}
                </SimpleGrid>
            </Group>
        </Container>
    );
}