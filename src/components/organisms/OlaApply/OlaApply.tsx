import React, {useEffect, useState} from 'react';
import {
    ActionIcon,
    Avatar,
    Button,
    Divider,
    Flex,
    Group,
    Highlight,
    MultiSelect,
    NumberInput,
    Paper,
    Stepper,
    Text,
    Textarea,
    TextInput,
    Title
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {IconBrandGoogle, IconCalendar, IconCurrencyDollar, IconMinus, IconPlus, IconTrash} from "@tabler/icons-react";
import {googleSignIn} from "@/services/auth.service";
import {selectAuthUser, setAuthUser} from "@/store/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {IUser} from "@/models/IUser.interface";
import {OlaLogo} from "@/components/atoms/OlaLogo/OlaLogo";
import {YearPickerInput} from "@mantine/dates";
import {postResume} from "@/services/resumes.service";
import {OlaRouter} from "@/router/OlaRouter";
import Link from "next/link";

const data = [
    {value: 'react', label: 'React'},
    {value: 'ng', label: 'Angular'},
    {value: 'svelte', label: 'Svelte'},
    {value: 'vue', label: 'Vue'},
    {value: 'riot', label: 'Riot'},
    {value: 'next', label: 'Next.js'},
    {value: 'blitz', label: 'Blitz.js'},
];

export const OlaApply: React.FC = () => {
    const [active, setActive] = useState(0);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const dispatch = useDispatch()
    const user: IUser | undefined = useSelector(selectAuthUser)

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            professionalTitle: '',
            professionalTechStack: '',
            experience: [{jobTitle: '', jobCompany: '', jobDates: [undefined, undefined], jobDescription: ''}],
            education: [{educationTitle: ''}],
            salaryExpected: '',
            yearsOfExperience: '',
            linkedin: '',
        },

        validate: (values) => {
            if (active === 0) {
                return {
                    name: values.name.trim().length < 2 ? 'Name must include at least 2 characters' : null,
                    email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
                };
            }

            if (active === 1) {
                return {
                    professionalTitle: values.name.trim().length < 2 ? 'Name must include at least 2 characters' : null,
                };
            }

            return {};
        },
    });


    useEffect(() => {
        if (user) {
            form.setValues({
                name: user.displayName || '',
                email: user.email || ''
            })
        }
    }, [user])

    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            return current < 3 ? current + 1 : current;
        });

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const handleGoogleSignIn = async () => {
        const {email, photoURL, displayName, uid, phoneNumber} = await googleSignIn()
        dispatch(setAuthUser({email, photoURL, displayName, uid, phoneNumber}))
    }

    const handlePostResume = async () => {
        setSubmitting(true)
        await postResume(form.values)
        nextStep()
        setSubmitting(false)
    }

    const experience = form.getInputProps('experience').value
    const education = form.getInputProps('education').value
    const handleAddExperience = () => {
        form.setValues({
            experience: [
                ...form.getInputProps('experience').value,
                {jobTitle: '', jobCompany: '', jobDescription: ''}
            ]
        })
    }

    const handleRemoveExperience = (index: number) => {
        form.setValues({
            experience: experience.filter((e: any, i: number) => i !== index)
        })
    }

    const handleAddEducation = () => {
        form.setValues({
            education: [
                ...form.getInputProps('education').value,
                {educationTitle: ''}
            ]
        })
    }

    const handleRemoveEducation = (index: number) => {
        form.setValues({
            education: education.filter((e: any, i: number) => i !== index)
        })
    }

    const AddExperience: React.FC<{ showButton: boolean }> = ({showButton}) => (
        <Divider my={"xs"} labelPosition="center"
                 label={showButton ?
                     <Button leftIcon={<IconPlus size="1rem"/>} compact onClick={handleAddExperience}>
                         Add experience
                     </Button> : ''
                 }/>
    )

    console.log(active)
    return (
        <Flex align={"center"} justify={"center"} mih={'100vh'} direction={"column"}
              p={"xl"} py={96}
              style={{background: 'linear-gradient(90deg, rgba(34,139,230,1) 50%, rgba(0,212,255,1) 100%)'}}>
            <Paper radius="md" p="xl" withBorder miw={320} shadow={'lg'} w={'100%'} maw={960}>
                <Title align={"center"} weight={500} mb='md' size={"x-large"}>
                    <Highlight highlight={'dream job'} highlightStyles={(theme) => ({
                        backgroundImage: theme.fn.linearGradient(45, theme.colors.cyan[5], theme.colors.indigo[5]),
                        fontWeight: 700,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    })}>
                        Apply for you next dream job!
                    </Highlight>
                </Title>

                {!user ?
                    <>
                        <Group grow my="md">
                            <Button onClick={handleGoogleSignIn} leftIcon={<IconBrandGoogle/>}>Google</Button>
                        </Group>
                        <Divider label="Or just complete the form" labelPosition="center" my="lg"/>
                    </> :
                    <Flex align={"center"} gap='sm' direction={"column"} mb={"lg"}>
                        <Text weight={500}>Welcome {user.displayName}</Text>
                        <Flex justify={"center"} align={"center"} gap={16}>
                            <OlaLogo/>
                            <Avatar size={42} src={user?.photoURL} radius={"xl"}/>
                        </Flex>
                    </Flex>
                }


                <Stepper active={active} breakpoint="sm">
                    <Stepper.Step label="First step" description="Personal information">
                        <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
                        <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
                    </Stepper.Step>

                    <Stepper.Step label="Second step" description="Professional information">
                        <Flex direction={"column"} gap={"md"}>
                            <TextInput label="Professional Title"
                                       placeholder="Full stack developer"
                                       {...form.getInputProps('professionalTitle')}
                            />
                            <MultiSelect searchable
                                         data={data}
                                         label="Tech stack"
                                         placeholder="Pick the ones you have experience with"
                                         {...form.getInputProps('professionalTechStack')}
                            />
                            <Flex direction={"column"} gap={"xs"}>
                                <Text weight={500}>Experience</Text>
                                {!experience.length && <AddExperience showButton={true}/>}
                                {experience.map((_: any, i: number) => (
                                    <Flex gap={"xs"} direction={"column"} key={i} pos={"relative"}>
                                        <ActionIcon variant="outline" color={'red'}
                                                    pos={"absolute"} top={-11} right={0}
                                                    onClick={() => handleRemoveExperience(i)}
                                        >
                                            <IconTrash size="1rem"/>
                                        </ActionIcon>
                                        <Flex gap={"md"}>
                                            <TextInput w={'calc(100%/3)'} label="Job Title"
                                                       placeholder="Senior frontend developer"
                                                       {...form.getInputProps(`experience.${i}.jobTitle`)} />
                                            <TextInput w={'calc(100%/3)'} label="Company"
                                                       placeholder="Olatim.com"
                                                       {...form.getInputProps(`experience.${i}.jobCompany`)} />
                                            <YearPickerInput
                                                w={'calc(100%/3)'}
                                                type="range"
                                                label="Dates"
                                                placeholder="Dates range"
                                                {...form.getInputProps(`experience.${i}.jobDates`)}
                                            />
                                        </Flex>
                                        <Textarea w={'100%'}
                                                  label="Description"
                                                  placeholder="- Platform development with Vue, etc..."
                                                  autosize
                                                  minRows={2}
                                                  maxRows={4}
                                                  {...form.getInputProps(`experience.${i}.jobDescription`)}
                                        />
                                        <AddExperience showButton={experience.length - 1 === i}/>
                                    </Flex>
                                ))}
                            </Flex>
                            <Flex direction={"column"} gap={"xs"}>
                                <Text weight={500}>Education</Text>
                                {education.map((_: any, i: number) => (
                                    <Flex key={i} justify={"space-between"} align={"end"} gap={"xs"}>
                                        <TextInput key={i}
                                                   w={'100%'}
                                                   placeholder="Software engineering, Online full-stack course, etc"
                                                   {...form.getInputProps(`education.${i}.educationTitle`)}
                                        />
                                        {!i ?
                                            <ActionIcon my={4} variant="outline" color={'green'}
                                                        onClick={handleAddEducation}
                                            >
                                                <IconPlus size="1rem"/>
                                            </ActionIcon> :
                                            <ActionIcon my={4} variant="outline" color={'red'}
                                                        onClick={() => handleRemoveEducation(i)}
                                            >
                                                <IconMinus size="1rem"/>
                                            </ActionIcon>
                                        }
                                    </Flex>

                                ))}
                            </Flex>
                        </Flex>
                    </Stepper.Step>

                    <Stepper.Step label="Final step" description="Extra information (optional)">
                        <Flex direction={'column'} gap={"md"}>
                            <Flex gap={"md"}>
                                <NumberInput
                                    w={'50%'}
                                    label="Monthly salary expectations (U$D)"
                                    placeholder="2000"
                                    min={0}
                                    icon={<IconCurrencyDollar size="1rem"/>}
                                    {...form.getInputProps('salaryExpected')}
                                />
                                <NumberInput
                                    w={'50%'}
                                    label="Years of experience"
                                    placeholder="5"
                                    min={0}
                                    icon={<IconCalendar size="1rem"/>}
                                    {...form.getInputProps('yearsOfExperience')}
                                />
                            </Flex>
                            <TextInput label="LinkedIn"
                                       placeholder="https://www.linkedin.com/in/olatim"
                                       {...form.getInputProps('linkedin')}
                            />

                        </Flex>
                    </Stepper.Step>
                    <Stepper.Completed>
                        <Flex direction={"column"} align={"center"}>
                            <Title size={"larger"} my={'md'}>
                                Completed!
                            </Title>
                            <Flex gap={"md"}>
                                <Link href={OlaRouter.ROOT}>
                                    <Button>Home</Button>
                                </Link>
                                <Link href={OlaRouter.ROOT}>
                                    <Button variant={"outline"}>Profile</Button>
                                </Link>
                            </Flex>
                        </Flex>
                    </Stepper.Completed>
                </Stepper>

                <Group position="right" mt="xl">
                    {(active === 1 || active === 2) && (<Button variant="default" onClick={prevStep}>Back</Button>)}
                    {active < 2 && <Button onClick={nextStep}>Next step</Button>}
                    {active === 2 && <Button onClick={handlePostResume} loading={submitting}>Submit</Button>}
                </Group>
            </Paper>
        </Flex>
    );
}