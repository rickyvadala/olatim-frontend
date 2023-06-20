import React from "react";
import {Flex, FlexProps, Title} from "@mantine/core";

type OlaIconTitleProps = FlexProps & {
  title: string,
  icon: JSX.Element
}

export const OlaIconTitle: React.FC<OlaIconTitleProps> = ({icon, title, ...props}) => {
  return (
    <Flex gap={"xs"} align={"center"} {...props}>
      {icon}
      <Title size={"x-large"}>{title}</Title>
    </Flex>
  )
}