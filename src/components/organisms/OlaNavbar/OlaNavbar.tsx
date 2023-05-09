import {
    ActionIcon,
    Avatar,
    Box,
    Burger,
    Button,
    Center,
    Collapse,
    createStyles,
    Divider,
    Drawer,
    Flex,
    Group,
    Header,
    HoverCard,
    Menu,
    rem,
    ScrollArea,
    SimpleGrid,
    Text,
    ThemeIcon,
    UnstyledButton,
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {IconChevronDown, IconArrowsLeftRight, IconLogout, IconSettings, IconUser, IconSearch} from '@tabler/icons-react';
import {OlaLogo} from "@/components/atoms/OlaLogo/OlaLogo";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthUser, setAuthUser} from "@/store/authSlice";
import {googleSignOut} from "@/services/auth.service";
import {IUser} from "@/models/IUser.interface";
import {OlaRouter} from "@/router/OlaRouter";
import React from "react";

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

const links = [
    {
        icon: IconArrowsLeftRight,
        title: 'Referral Program',
        description: 'Connect others with top job opportunities and earn a fee.',
        href: OlaRouter.COMMUNITY
    },
    {
        icon: IconSearch,
        title: 'Find a Job',
        description: 'Access remote job opportunities that match your skillset',
        href: OlaRouter.APPLY
    },
];

const OlaNavbarAvatar: React.FC<{ user: IUser }> = ({user}) => {
    const dispatch = useDispatch()

    const handleGoogleSignOut = async () => {
        await googleSignOut()
        dispatch(setAuthUser(undefined))
    }

    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <ActionIcon>
                    <Avatar radius="xl" src={user.photoURL} alt="it's me"/>
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Link href={OlaRouter.PROFILE} style={{textDecoration: "none"}}>
                    <Menu.Item icon={<IconUser size={14}/>}>Profile</Menu.Item>
                </Link>
                <Menu.Item icon={<IconSettings size={14}/>}>Settings</Menu.Item>
                <Menu.Divider/>
                <Menu.Item onClick={handleGoogleSignOut} color="red" icon={<IconLogout size={14}/>}>
                    Sign out
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export const OlaNavbar = () => {
    const [drawerOpened, {toggle: toggleDrawer, close: closeDrawer}] = useDisclosure(false);
    const [linksOpened, {toggle: toggleLinks}] = useDisclosure(false);
    const user: IUser | undefined = useSelector(selectAuthUser)
    const {classes, theme} = useStyles();

    const Links: React.FC = () => (<>
        {links.map((item, i) => (
            <Link href={item.href} key={i}>
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
        ))}
    </>);

    return (
        <Box className={classes.wrapper}>
            <Header height={60} px="md">
                <Group position="apart" sx={{height: '100%'}}>
                    <OlaLogo text={'Olatim'}/>

                    <Group sx={{height: '100%'}} spacing={0} className={classes.hiddenMobile}>
                        <Link href={OlaRouter.ROOT} className={classes.link}>
                            Home
                        </Link>
                        <Link href={OlaRouter.HIRING} className={classes.link}>
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
                                    <Text fw={500}>Olaboard!</Text>
                                </Group>

                                <Divider
                                    my="sm"
                                    mx="-md"
                                    color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                                />

                                <SimpleGrid cols={2} spacing={0}>
                                    <Links/>
                                </SimpleGrid>

                                <div className={classes.dropdownFooter}>
                                    <Group position="apart">
                                        <div>
                                            <Text fw={500} fz="sm">
                                                Resources
                                            </Text>
                                            <Text size="xs" color="dimmed">
                                                Tips & tricks to improve your CV and job search.
                                            </Text>
                                        </div>
                                        <Button variant="default">Soon!</Button>
                                    </Group>
                                </div>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <Link href="#contact" scroll={false} className={classes.link}>
                            Contact
                        </Link>
                    </Group>

                    <Flex gap={"md"} align={"center"}>
                        {user ? <OlaNavbarAvatar user={user}/>
                            :
                            <Group className={classes.hiddenMobile}>
                                <Link href={OlaRouter.AUTH}><Button variant="default">Log in</Button></Link>
                                <Link href={OlaRouter.AUTH}><Button>Sign up</Button></Link>
                            </Group>
                        }
                        <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop}/>
                    </Flex>
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
                    <Link onClick={closeDrawer} href={OlaRouter.ROOT} className={classes.link}>
                        <Text>Home</Text>
                    </Link>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component="span" mr={5}>Services</Box>
                            <IconChevronDown size={16} color={theme.fn.primaryColor()}/>
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}><Links/></Collapse>
                    <Link onClick={closeDrawer} href="#contact" className={classes.link}>
                        <Text>Contact</Text>
                    </Link>

                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}/>

                    <Group position="center" grow pb="xl" px="md">
                        <Link onClick={closeDrawer} href={OlaRouter.ROOT}>
                            <Button w={'100%'} variant="default">Log in</Button>
                        </Link>
                        <Link onClick={closeDrawer} href={OlaRouter.ROOT}>
                            <Button w={'100%'}>Sign up</Button>
                        </Link>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}