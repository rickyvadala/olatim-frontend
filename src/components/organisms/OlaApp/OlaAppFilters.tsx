import React from "react";
import {ActionIcon, Button, Collapse, Flex, MultiSelect, NumberInput, Paper, TextInput, Title} from "@mantine/core";
import {TECHS} from "@/common/data/techs";
import {IconChevronDown, IconChevronUp, IconCurrencyDollar, IconSearch} from "@tabler/icons-react";
import {useForm} from "@mantine/form";
import {useDisclosure} from "@mantine/hooks";

type OlaAppFiltersProps = {
  applyFilters: (form: any) => void
}
export const OlaAppFilters: React.FC<OlaAppFiltersProps> = ({applyFilters}) => {
  const [opened, { toggle }] = useDisclosure(true);

  const form = useForm({
    initialValues: {
      professionalTechStack: Array.from(''),
      minSalaryExpected: '',
      maxSalaryExpected: '',
      professionalTitle: '',
    },
  });

  return (

    <Paper shadow={"xs"} p={"md"} my={"lg"} withBorder={true}>
      <Flex justify={"space-between"} align={"center"}>
        <Title size={"large"}>Filters</Title>
        <ActionIcon onClick={toggle}>
          {opened ? <IconChevronUp/> : <IconChevronDown/>}
        </ActionIcon>
      </Flex>

      <Collapse in={opened}>
        <Flex align={"flex-end"} justify={"space-between"} gap={'2%'} wrap={"wrap"}>
          <MultiSelect searchable
                       miw={256}
                       w={'49%'}
                       data={TECHS}
                       label="Tech stack"
                       placeholder="Pick the ones you have experience with"
                       {...form.getInputProps('professionalTechStack')}
          />
          <Flex align={"flex-end"} gap={"xs"} w={'49%'}>
            <NumberInput
              miw={128}
              w={'50%'}
              label="Monthly salary (U$D)"
              placeholder="0"
              step={200}
              min={0}
              max={Number(form.values.maxSalaryExpected) || 10000}
              icon={<IconCurrencyDollar size="1rem"/>}
              {...form.getInputProps('minSalaryExpected')}
            />
            <NumberInput
              miw={128}
              w={'50%'}
              placeholder="2000"
              step={200}
              min={Number(form.values.minSalaryExpected) || 0}
              max={10000}
              icon={<IconCurrencyDollar size="1rem"/>}
              {...form.getInputProps('maxSalaryExpected')}
            />
          </Flex>
          <TextInput
            miw={256}
            w={'49%'}
            label="Professional Title"
            placeholder="Full stack"
            {...form.getInputProps('professionalTitle')}
          />
          <Button onClick={() => applyFilters(form)} variant={"gradient"} leftIcon={<IconSearch/>}>Apply filters</Button>
        </Flex>
      </Collapse>
    </Paper>
  )
}