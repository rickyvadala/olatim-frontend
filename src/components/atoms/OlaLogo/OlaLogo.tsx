import {createStyles, Flex, Image, Title} from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
    wrapper: {
        cursor: "default"
    },

    text: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Hammersmith One, ${theme.fontFamily}`,
        lineHeight: 1
    }
}))

type OlaLogoProps = {
    text?: string
}

export const OlaLogo: React.FC<OlaLogoProps> = ({text}) => {
    const {classes} = useStyles();

    return (
        <Flex gap={8} align={"center"} className={classes.wrapper}>
            <Image src={'/olatim.svg'} alt='Olatim Logo' width={48}/>
            {text && <Title className={classes.text} mt={6}>{text}</Title>}
        </Flex>
    )
}