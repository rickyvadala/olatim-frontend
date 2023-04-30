import {Badge, Card, Container, createStyles, Flex, Group, rem, SimpleGrid, Text, Title,} from '@mantine/core';
import {IconDevices2, IconUserCheck, IconPigMoney, IconDirectionSign} from '@tabler/icons-react';

const mockdata = [
    {
        title: 'Skills & Experience',
        description:
            'All of our professionals are pre-screened by our recruiting team, to asses not only their technical knowledge but their soft skills.',
        icon: IconUserCheck,
    },
    {
        title: 'Risk Free',
        description:
            'Dont make any payments until we find the type of profile that fits your needs.',
        icon: IconDirectionSign,
    },
    {
        title: 'Nearshore Global Teams',
        description:
            'We help you to build and grow your remote team, by taking advantage of top talent in Latam.',
        icon: IconDevices2,
    },
    {
        title: 'One-time-fee',
        description:
            'We are a community of tech talent connecting people with remote job opportunities. Make direct hires and pay once.',
        icon: IconPigMoney,
    },
];

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

export const OlaFeatures = () => {
    const {classes, theme} = useStyles();
    const features = mockdata.map((feature) => (
        <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
            <Flex justify={"space-between"} align={'center'}>
                <Text fz="lg" fw={500} className={classes.cardTitle}>
                    {feature.title}
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
                Olatim Community
                </Badge>
            </Group>

            <Title order={2} className={classes.title} ta="center" mt="sm">
                Hire without frictions
            </Title>

            <Text c="dimmed" className={classes.description} ta="center" mt="md">
            Olatim is your best recruiting partner and team builder. We tap into our network of quality professionals to help you find the perfect fit.
            </Text>

            <SimpleGrid cols={2} spacing="xl" mt={50} breakpoints={[{maxWidth: 'md', cols: 1}]}>
                {features}
            </SimpleGrid>
        </Container>
    );
}