import React from "react";
import {Button, Flex, MultiSelect, NumberInput, Paper, Title} from "@mantine/core";
import {TECHS} from "@/common/data/techs";
import {IconCurrencyDollar, IconSearch} from "@tabler/icons-react";
import {useForm} from "@mantine/form";

type OlaAppFiltersProps = {
  applyFilters: (form: any) => void
}
export const OlaAppFilters: React.FC<OlaAppFiltersProps> = ({applyFilters}) => {
  const form = useForm({
    initialValues: {
      professionalTechStack: Array.from(''),
      minSalaryExpected: '',
      maxSalaryExpected: ''
    },
  });

  return (
    <Paper shadow={"xs"} p={"md"} my={"lg"} withBorder={true}>
      <Title size={"large"}>Filters</Title>
      <Flex align={"flex-end"} justify={"space-between"} gap={"sm"}>
        <MultiSelect searchable
                     w={'50%'}
                     data={TECHS}
                     label="Tech stack"
                     placeholder="Pick the ones you have experience with"
                     {...form.getInputProps('professionalTechStack')}
        />
        <Flex align={"flex-end"} gap={"xs"} w={'50%'}>
          <NumberInput
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
            w={'50%'}
            placeholder="2000"
            step={200}
            min={Number(form.values.minSalaryExpected) || 0}
            max={10000}
            icon={<IconCurrencyDollar size="1rem"/>}
            {...form.getInputProps('maxSalaryExpected')}
          />
        </Flex>
        <Button onClick={() => applyFilters(form)} variant={"gradient"} leftIcon={<IconSearch/>}>Apply filters</Button>
      </Flex>
    </Paper>
  )
}