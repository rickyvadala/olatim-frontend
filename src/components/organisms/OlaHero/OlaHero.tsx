import {Button, Container, createStyles, Flex, Group, Image, List, rem, Text, ThemeIcon, Title,} from '@mantine/core';
import {IconCheck} from '@tabler/icons-react';
import image from '@/assets/images/lady-hero.svg';
import Link from "next/link";


const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: `calc(${theme.spacing.xl} * 4)`,
        paddingBottom: `calc(${theme.spacing.xl} * 4)`,
    },

    content: {
        maxWidth: rem(480),
        marginRight: `calc(${theme.spacing.xl} * 3)`,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(44),
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan('xs')]: {
            fontSize: rem(28),
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    image: {
        flex: 1,

        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    highlight: {
        position: 'relative',
        backgroundColor: theme.fn.variant({variant: 'light', color: theme.primaryColor}).background,
        borderRadius: theme.radius.sm,
        padding: `${rem(4)} ${rem(12)}`,
    },
}));

export type OlaHeroProps = {
    title: string,
    subtitle: string,
    items: Array<{ name: string, description: string }>,
    buttons: Array<{label: string, href: string}>
}

export const OlaHero = ({title, subtitle, items, buttons}: OlaHeroProps) => {
    const {classes} = useStyles();

    return (
        <Flex pt={60} pb={60} mih={'100vh'} align={'center'} style={{background: '#f8f9fa'}}>
            <Container size={'lg'} w={'100%'} px={"xl"}>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            {/*Team <span className={classes.highlight}>growth</span> powered by Latam Talent*/}
                            {title}
                        </Title>
                        <Text color="dimmed" mt="md">
                            {subtitle}
                        </Text>

                        <List
                            mt={30}
                            spacing="sm"
                            size="sm"
                            icon={
                                <ThemeIcon size={20} radius="xl">
                                    <IconCheck size={rem(12)} stroke={1.5}/>
                                </ThemeIcon>
                            }
                        >
                            {items.map(({name, description}, i) => (
                                <List.Item key={i}>
                                    <b>{name}</b>{description}
                                </List.Item>
                            ))}
                        </List>

                        <Group mt={30}>
                            {buttons.map(({label, href}, i) => (
                                <Link href={href} key={i}>
                                    <Button radius="xl" size="md"
                                            className={classes.control}
                                            variant={i ? 'default' : 'filled'}
                                    >
                                        {label}
                                    </Button>
                                </Link>
                            ))}
                        </Group>
                    </div>
                    <Image src={image.src} className={classes.image} alt={''}/>
                </div>
            </Container>
        </Flex>
    );
}