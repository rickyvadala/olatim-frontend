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
import {selectAuthUser, selectResume, setAuthUser} from "@/store/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {IUser} from "@/models/IUser.interface";
import {OlaLogo} from "@/components/atoms/OlaLogo/OlaLogo";
import {YearPickerInput} from "@mantine/dates";
import {postResume} from "@/services/resumes.service";
import {OlaRouter} from "@/router/OlaRouter";
import Link from "next/link";
import {IResume} from "@/models/IResume.interface";
import {TECHS} from "@/common/data/techs";

export const OlaApply: React.FC = () => {
    const [active, setActive] = useState(0);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const dispatch = useDispatch()
    const user: IUser | undefined = useSelector(selectAuthUser)
    const resume: IResume | undefined = useSelector(selectResume)

    const form = useForm({
        initialValues: {
            displayName: '',
            email: '',
            professionalTitle: '',
            professionalTechStack: [''],
            experience: [{jobTitle: '', jobCompany: '', jobDates: [null, null], jobDescription: ''}],
            education: [{educationTitle: ''}],
            salaryExpected: '',
            yearsOfExperience: '',
            linkedin: '',
        } as IResume,

        validate: (values) => {
            if (active === 0) {
                return {
                    displayName: (values.displayName || '').trim().length < 2 ? 'Name must include at least 2 characters' : null,
                    email: /^\S+@\S+$/.test(values.email || '') ? null : 'Invalid email',
                };
            }

            if (active === 1) {
                return {
                    professionalTitle: values.professionalTitle.trim().length < 1
                        ? 'You must include your professional title'
                        : null,
                    'education.0.educationTitle': values.education[0].educationTitle.trim().length < 1
                        ? 'You must include some education'
                        : null,
                };
            }

            return {};
        },
    });

    const experience = form.getInputProps('experience').value
    const education = form.getInputProps('education').value

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
        // const data: IResume = {
        //     ...form.values,
        //     experience: form.values.experience.map(job => ({
        //         ...job,
        //         jobDates: [
        //             job.jobDates[0]?.toString() || null,
        //             job.jobDates[1]?.toString() || null
        //         ]
        //     })) as Array<IExperience>
        // }
        await postResume(form.values, form.values.email!)
        nextStep()
        setSubmitting(false)
    }

    const handleAddExperience = () => {
        form.setValues({
            experience: [
                ...experience,
                {jobTitle: '', jobCompany: '', jobDescription: '', jobDates: [null, null]}
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
                ...education,
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
        <Divider my={"xs"}
                 labelPosition="center"
                 label={showButton ?
                     <Button leftIcon={<IconPlus size="1rem"/>} compact onClick={handleAddExperience}>
                         Add experience
                     </Button> : ''
                 }/>
    )

    useEffect(() => {
        if (user) {
            form.setValues({
                displayName: user.displayName || '',
                email: user.email || ''
            })
        }
    }, [user])

    useEffect(() => {
        if (resume) {
            form.setValues({...resume})
        }
    }, [resume])

    return (
        <Flex align={"center"} justify={"center"} mih={'100vh'} direction={"column"}
              p={"xl"} py={96}
              style={{background: 'linear-gradient(90deg, rgba(34,139,230,1) 50%, rgba(0,212,255,1) 100%)'}}>
            <Paper radius="md" p="xl" withBorder miw={320} shadow={'lg'} w={'100%'} maw={960}>
                <Title align={"center"} weight={500} mb='md' size={"xx-large"}>
                    <Highlight highlight={'dream job'} highlightStyles={(theme) => ({
                        backgroundImage: theme.fn.linearGradient(45, theme.colors.cyan[5], theme.colors.indigo[5]),
                        fontWeight: 700,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    })}>
                        Apply for you next dream job!
                    </Highlight>
                </Title>
                <Divider label={!user ? 'Sign In' : `Welcome ${user.displayName}!`} labelPosition="center" my="lg"/>
                {!user ?
                    <>
                        <Group grow my="md">
                            <Button onClick={handleGoogleSignIn} leftIcon={<IconBrandGoogle/>}>Google</Button>
                        </Group>
                    </> :
                    <Flex align={"center"} gap='sm' direction={"column"} mb={"lg"}>
                        <Flex justify={"center"} align={"center"} gap={16}>
                            <OlaLogo/>
                            <Avatar size={42} src={user?.photoURL} radius={"xl"}/>
                        </Flex>
                    </Flex>
                }
                <Divider label="Complete the form" labelPosition="center" my="lg"/>


                <Stepper active={active} breakpoint="sm">
                    <Stepper.Step label="First step" description="Personal information">
                        <TextInput label="Name" placeholder="Name" {...form.getInputProps('displayName')} />
                        <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
                    </Stepper.Step>

                    <Stepper.Step label="Second step" description="Professional information">
                        <Flex direction={"column"} gap={"md"}>
                            <TextInput label="Professional Title"
                                       placeholder="Full stack developer"
                                       {...form.getInputProps('professionalTitle')}
                            />
                            <MultiSelect searchable
                                         data={TECHS}
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
                                                clearable
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
                                    <Flex key={i} gap={"xs"}>
                                        <TextInput key={i}
                                                   w={'100%'}
                                                   placeholder="Software engineering, Online full-stack course, etc"
                                                   {...form.getInputProps(`education.${i}.educationTitle`)}
                                        />
                                        {!i ?
                                            <ActionIcon variant="outline" color={'green'}
                                                        onClick={handleAddEducation}
                                                        size={34} mt={1}
                                            >
                                                <IconPlus size="1rem"/>
                                            </ActionIcon> :
                                            <ActionIcon variant="outline" color={'red'}
                                                        onClick={() => handleRemoveEducation(i)}
                                                        size={34} mt={1}
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
                                    <Button variant={"outline"}>Home</Button>
                                </Link>
                                {user
                                    ? <Link href={OlaRouter.PROFILE}><Button>Profile</Button></Link>
                                    : (
                                        <Button onClick={handleGoogleSignIn} leftIcon={<IconBrandGoogle/>}>
                                            Sign in
                                        </Button>
                                    )
                                }
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