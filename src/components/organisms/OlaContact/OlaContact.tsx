import {
    ActionIcon,
    Box,
    Button,
    Container,
    createStyles,
    Group,
    rem,
    SimpleGrid,
    Text,
    Textarea,
    TextInput,
    Title,
} from '@mantine/core';
import {IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter} from '@tabler/icons-react';
import {OlaContactIcons} from "@/components/organisms/OlaContact/OlaContactIcons/OlaContactIcons";

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        boxSizing: 'border-box',
        backgroundImage: `linear-gradient(90deg, rgba(34,139,230,1) 50%, rgba(0,212,255,1) 100%)`,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        color: theme.white,
        lineHeight: 1,
    },

    description: {
        color: theme.colors[theme.primaryColor][0],
        maxWidth: rem(300),

        [theme.fn.smallerThan('sm')]: {
            maxWidth: '100%',
        },
    },

    form: {
        backgroundColor: theme.white,
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.lg,
    },

    social: {
        color: theme.white,

        '&:hover': {
            color: theme.colors[theme.primaryColor][1],
        },
    },

    input: {
        backgroundColor: theme.white,
        borderColor: theme.colors.gray[4],
        color: theme.black,

        '&::placeholder': {
            color: theme.colors.gray[5],
        },
    },

    inputLabel: {
        color: theme.black,
    },

    control: {
        backgroundColor: theme.colors[theme.primaryColor][6],
    },
}));

const social = [IconBrandTwitter, IconBrandLinkedin, IconBrandInstagram];

export const OlaContact = () => {
    const {classes} = useStyles();

    const icons = social.map((Icon, index) => (
        <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
            <Icon size="1.4rem" stroke={1.5}/>
        </ActionIcon>
    ));

    return (
        <Box className={classes.wrapper} id={'contact'}>
            <Container size={'lg'} w={'100%'} p={"xl"} py={96}>
                <SimpleGrid cols={2} spacing={50} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                    <div>
                        <Title className={classes.title}>Talk To Our Team!</Title>
                        <Text className={classes.description} mt="sm" mb={30}>
                            Leave your email and we will get back to you within 24 hours
                        </Text>

                        <OlaContactIcons variant="white"/>

                        <Group mt="xl">{icons}</Group>
                    </div>
                    <div className={classes.form}>
                        <TextInput
                            label="Email"
                            placeholder="your@email.com"
                            required
                            classNames={{input: classes.input, label: classes.inputLabel}}
                        />
                        <TextInput
                            label="Name"
                            placeholder="John Doe"
                            mt="md"
                            classNames={{input: classes.input, label: classes.inputLabel}}
                        />
                        <Textarea
                            required
                            label="Your message"
                            placeholder="I want to start hiring"
                            minRows={4}
                            mt="md"
                            classNames={{input: classes.input, label: classes.inputLabel}}
                        />

                        <Group position="right" mt="md">
                            <Button className={classes.control}>Send message</Button>
                        </Group>
                    </div>
                </SimpleGrid>
            </Container>
        </Box>
    );
}