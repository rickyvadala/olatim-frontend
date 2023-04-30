import {createStyles, Flex, Image, Title} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    wrapper: {
        cursor: "pointer"
    },

    text: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Hammersmith One, ${theme.fontFamily}`,
        lineHeight: 1
    }
}))

export const OlaLogo = () => {
    const {classes} = useStyles();

    return (
        <Flex gap={8} align={"center"} className={classes.wrapper}>
            <Image src={'/olatim.svg'} alt='Olatim Logo' width={48}/>
            <Title className={classes.text} mt={6}>Olatim</Title>
        </Flex>
    )
}