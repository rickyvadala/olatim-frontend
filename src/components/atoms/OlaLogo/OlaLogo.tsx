import {createStyles, Flex, Image} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    wrapper: {
        cursor: "pointer"
    },

    text: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Hammersmith One, ${theme.fontFamily}`,
    }
}))

export const OlaLogo = () => {
    const { classes } = useStyles();

    return (
        <Flex gap={8} align={"end"} className={classes.wrapper}>
            <Image src={'/olatim.svg'} alt='Olatim Logo' width={48}/>
            <h1 className={classes.text}>Olatim</h1>
        </Flex>
    )
}