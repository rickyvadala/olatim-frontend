import {Badge, Card, Container, createStyles, Flex, Group, rem, SimpleGrid, Text, Title, Timeline} from '@mantine/core';
import type {TablerIconsProps} from '@tabler/icons-react';
import React from "react";

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

export type OlaAboutProps = {
    badge: string,
    title: string,
    subtitle: string,
    features: Array<{ name: string, description: string, icon: React.FC<TablerIconsProps> }>
}

export const OlaAbout = ({badge, title, subtitle, features: _features}: OlaAboutProps) => {
    const {classes, theme} = useStyles();

    const features = _features.map((feature) => (
        <Card key={feature.name} shadow="md" radius="md" className={classes.card} padding="xl">
            <Flex justify={"space-between"} align={'center'}>
                <Text fz="lg" fw={500} className={classes.cardTitle}>
                    {feature.name}
                </Text>
                <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()}/>
            </Flex>

            <Text fz="sm" c="dimmed" mt="sm">
                {feature.description}
            </Text>
        </Card>
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

            <SimpleGrid cols={2} spacing="xl" mt={50} breakpoints={[{maxWidth: 'md', cols: 1}]}>
                {features}
            </SimpleGrid>
        </Container>
    );
}