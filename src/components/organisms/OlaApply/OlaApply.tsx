import React, {useEffect, useState} from 'react';
import {
  ActionIcon,
  Avatar,
  Button,
  createStyles,
  Divider,
  Flex,
  Group,
  Highlight,
  Image,
  MultiSelect,
  NumberInput,
  Paper,
  Stepper,
  Textarea,
  TextInput,
  Title
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {
  IconBarcode,
  IconBook2,
  IconBrandGoogle,
  IconBuildingCommunity,
  IconCalendar,
  IconCurrencyDollar,
  IconMinus,
  IconPlus,
  IconStars,
  IconTrash,
  IconUser
} from "@tabler/icons-react";
import {googleSignIn} from "@/services/auth.service";
import {selectResume} from "@/store/dataSlice";
import {useSelector} from "react-redux";
import {OlaLogo} from "@/components/atoms/OlaLogo/OlaLogo";
import {postResume} from "@/services/resumes.service";
import {OlaRouter} from "@/router/OlaRouter";
import Link from "next/link";
import {IResume} from "@/models/IResume.interface";
import {TECHS} from "@/common/data/techs";
import _ from 'lodash';
import {useAppAuthState} from "@/hooks/useAppAuthState";
import google from '@/assets/images/google-logo.svg';
import {OlaIconTitle} from "@/components/atoms/OlaIconTitle/OlaIconTitle";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundImage: theme.fn.linearGradient(45, theme.colors.indigo[5], theme.colors.cyan[5]),
    backgroundColor: 'transparent',
  },
}));

export const OlaApply: React.FC = () => {
  const [active, setActive] = useState(0);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const resume: IResume | undefined = useSelector(selectResume)
  const [user] = useAppAuthState()
  const {classes} = useStyles();

  const form = useForm({
    initialValues: {
      displayName: '',
      email: '',
      professionalTitle: '',
      professionalTechStack: Array.from(''),
      experience: [{title: '', company: '', description: ''}],
      education: [{title: ''}],
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
          'education.0.title': values.education[0].title.trim().length < 1
            ? 'You must include some education'
            : null,
        };
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleGoogleSignIn = () => void googleSignIn()

  const handlePostResume = async () => {
    setSubmitting(true)
    await postResume({...form.values}, user?.uid)
    nextStep()
    setSubmitting(false)
  }

  useEffect(() => {
    if (user) {
      form.setValues({
        displayName: user.displayName || '',
        email: user.email || ''
      })
    }
  }, [user])

  useEffect(() => {
    resume && form.setValues(_.cloneDeep(resume))
  }, [resume])

  return (
    <Flex align={"center"} justify={"center"} mih={'calc(100vh - 60px)'} direction={"column"} p={"xl"}
          className={classes.wrapper}>
      <Paper radius="md" p="xl" withBorder miw={320} shadow={'lg'} w={'100%'} maw={960}>
        <Title align={"center"} weight={500} mb='md' size={"xx-large"}>
          <Highlight highlight={'dream job'} highlightStyles={(theme) => ({
            backgroundImage: theme.fn.linearGradient(45, theme.colors.indigo[5], theme.colors.cyan[5]),
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
              <Button onClick={handleGoogleSignIn}
                      leftIcon={<Image maw={24} mah={24} src={google.src} alt={"Google logo"}/>}
                      variant={"outline"}
              >
                Google
              </Button>
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
            <Flex direction={"column"} gap={"xs"}>
              <OlaIconTitle title={'Personal information'} icon={<IconUser/>}/>

              <TextInput label="Full Name" placeholder="John Doe" {...form.getInputProps('displayName')} />
              <TextInput label="Email" placeholder="hello@olatim.com" {...form.getInputProps('email')} />
            </Flex>

          </Stepper.Step>

          <Stepper.Step label="Second step" description="Professional information">

            <Flex direction={"column"} gap={"xs"}>
              <OlaIconTitle title={'Professional information'} icon={<IconBarcode/>}/>
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
                <OlaIconTitle title={'Experiences'} icon={<IconBuildingCommunity/>} pt={"xs"}/>
                {form.values.experience.map((_: any, i: number) => (
                  <Flex gap={"xs"} direction={"column"} key={i} pos={"relative"}>
                    {i > 0 && (
                      <>
                        <Divider my={"xs"}/>
                        <ActionIcon variant="outline" color={'red'}
                                    pos={"absolute"} top={19} right={0}
                                    onClick={() => form.removeListItem('experience', i)}
                        >
                          <IconTrash size="1rem"/>
                        </ActionIcon>
                      </>
                    )}
                    <Flex gap={"md"}>
                      <TextInput w={'50%'} label="Job Title"
                                 placeholder="Software developer"
                                 {...form.getInputProps(`experience.${i}.title`)} />
                      <TextInput w={'50%'} label="Company"
                                 placeholder="Olatim.com"
                                 {...form.getInputProps(`experience.${i}.company`)} />
                    </Flex>
                    <Textarea w={'100%'}
                              label="Description"
                              placeholder="- Platform development with Vue, etc..."
                              autosize
                              minRows={2}
                              maxRows={4}
                              {...form.getInputProps(`experience.${i}.description`)}
                    />
                  </Flex>
                ))}
                <Divider mt={"xs"}
                         labelPosition="center"
                         label={
                           <Button leftIcon={<IconPlus size="1rem"/>} compact variant={"gradient"}
                                   onClick={() => form.insertListItem('experience', {
                                     title: '',
                                     company: '',
                                     description: ''
                                   })}>
                             Add experience
                           </Button>
                         }/>
              </Flex>
              <Flex direction={"column"} gap={"xs"}>
                <OlaIconTitle title={'Education'} icon={<IconBook2/>}/>
                {form.values.education.map((_: any, i: number) => (
                  <Flex key={i} gap={"xs"}>
                    <TextInput key={i}
                               w={'100%'}
                               placeholder="Software engineering, Online full-stack course, etc"
                               {...form.getInputProps(`education.${i}.title`)}
                    />
                    {!i ?
                      <ActionIcon variant="outline" color={'green'}
                                  onClick={() => form.insertListItem('education', {title: ''})}
                                  size={34} mt={1}
                      >
                        <IconPlus size="1rem"/>
                      </ActionIcon> :
                      <ActionIcon variant="outline" color={'red'}
                                  onClick={() => form.removeListItem('education', i)}
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
            <Flex direction={'column'} gap={"xs"}>
              <OlaIconTitle title={'Extra information'} icon={<IconStars/>}/>
              <Flex gap={"md"}>
                <NumberInput
                  w={'50%'}
                  label="Monthly salary (U$D)"
                  placeholder="2000"
                  step={200}
                  min={0}
                  max={10000}
                  icon={<IconCurrencyDollar size="1rem"/>}
                  {...form.getInputProps('salaryExpected')}
                />
                <NumberInput
                  w={'50%'}
                  label="Years of experience"
                  placeholder="5"
                  min={0}
                  max={100}
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
          {active < 2 && <Button variant={'gradient'} onClick={nextStep}>Next step</Button>}
          {active === 2 && <Button variant={'gradient'} onClick={handlePostResume} loading={submitting}>Submit</Button>}
        </Group>
      </Paper>
    </Flex>
  );
}