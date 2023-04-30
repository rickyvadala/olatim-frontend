import {
    Box,
    Burger,
    Button,
    Center,
    Collapse,
    createStyles,
    Divider,
    Drawer,
    Group,
    Header,
    HoverCard,
    rem,
    ScrollArea,
    SimpleGrid,
    Text,
    ThemeIcon,
    UnstyledButton,
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {IconChevronDown, IconCode, IconCoin} from '@tabler/icons-react';
import {OlaLogo} from "@/components/atoms/OlaLogo/OlaLogo";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: "fixed",
        width: "100%",
        zIndex: 1
    },

    link: {
        cursor: "pointer",
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan('sm')]: {
            height: rem(42),
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },

    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        }),

        '&:active': theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: `calc(${theme.spacing.md} * -1)`,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
        paddingBottom: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
        }`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));

const mockdata = [
    {
        icon: IconCode,
        title: 'Referrals Program',
        description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
        icon: IconCoin,
        title: 'Find a job',
        description: 'The fluid of Smeargle’s tail secretions changes',
    },
];

export const OlaNavbar = () => {
    const [drawerOpened, {toggle: toggleDrawer, close: closeDrawer}] = useDisclosure(false);
    const [linksOpened, {toggle: toggleLinks}] = useDisclosure(false);
    const {classes, theme} = useStyles();

    const links = mockdata.map((item, i) => (
        <Link href="/munity" key={i}>
            <UnstyledButton className={classes.subLink} key={item.title}>
                <Group noWrap align="flex-start">
                    <ThemeIcon size={34} variant="default" radius="md">
                        <item.icon size={rem(22)} color={theme.fn.primaryColor()}/>
                    </ThemeIcon>
                    <div>
                        <Text size="sm" fw={500}>
                            {item.title}
                        </Text>
                        <Text size="xs" color="dimmed">
                            {item.description}
                        </Text>
                    </div>
                </Group>
            </UnstyledButton>
        </Link>
    ));

    return (
        <Box className={classes.wrapper}>
            <Header height={60} px="md">
                <Group position="apart" sx={{height: '100%'}}>
                    <OlaLogo/>

                    <Group sx={{height: '100%'}} spacing={0} className={classes.hiddenMobile}>
                        <Link href="/" className={classes.link}>
                            Home
                        </Link>
                        <Link href="/hiring" className={classes.link}>
                            I&apos;m Hiring
                        </Link>
                        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <span className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Talent
                                        </Box>
                                        <IconChevronDown size={16} color={theme.fn.primaryColor()}/>
                                    </Center>
                                </span>
                            </HoverCard.Target>

                            <HoverCard.Dropdown sx={{overflow: 'hidden'}}>
                                <Group position="apart" px="md">
                                    <Text fw={500}>Services</Text>
                                </Group>

                                <Divider
                                    my="sm"
                                    mx="-md"
                                    color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                                />

                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>

                                <div className={classes.dropdownFooter}>
                                    <Group position="apart">
                                        <div>
                                            <Text fw={500} fz="sm">
                                                Tools
                                            </Text>
                                            <Text size="xs" color="dimmed">
                                                Their food sources have decreased, and their numbers
                                            </Text>
                                        </div>
                                        <Button variant="default">Get Started</Button>
                                    </Group>
                                </div>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <Link href="#contact" scroll={false} className={classes.link}>
                            Contact
                        </Link>
                    </Group>

                    <Group className={classes.hiddenMobile}>
                        <Link href={'/auth'} scroll={false}><Button variant="default">Log in</Button></Link>
                        <Link href={'/auth'} scroll={false}><Button>Sign up</Button></Link>
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop}/>
                </Group>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                title={<OlaLogo/>}
                padding={'7px 16px'}
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
                    <Divider mb="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}/>
                    <Link onClick={closeDrawer} href="/" className={classes.link}>
                        <Text>Home</Text>
                    </Link>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component="span" mr={5}>Services</Box>
                            <IconChevronDown size={16} color={theme.fn.primaryColor()}/>
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <Link onClick={closeDrawer} href="#contact" className={classes.link}>
                        <Text>Contact</Text>
                    </Link>

                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}/>

                    <Group position="center" grow pb="xl" px="md">
                        <Link onClick={closeDrawer} href={'/auth'}><Button w={'100%'} variant="default">Log in</Button></Link>
                        <Link onClick={closeDrawer} href={'/auth'}><Button w={'100%'}>Sign up</Button></Link>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}