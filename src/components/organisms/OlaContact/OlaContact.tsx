import {
  Box,
  Button,
  Container,
  createStyles,
  Group,
  rem,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import {OlaContactIcons} from "@/components/organisms/OlaContact/OlaContactIcons/OlaContactIcons";
import {postMessage} from "@/services/messages.service";
import {useState} from "react";
import {useForm} from "@mantine/form";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    boxSizing: 'border-box',
    backgroundImage: theme.fn.linearGradient(45, theme.colors.indigo[5], theme.colors.cyan[5]),
    minHeight: '100vh'
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: rem(300),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  form: {
    width: '100%',
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
  },

  social: {
    color: theme.white,

    '&:hover': {
      color: theme.colors[theme.primaryColor][1],
    },
  },

  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    '&::placeholder': {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));


export const OlaContact = () => {
  const {classes} = useStyles();
  const [sending, setSending] = useState<boolean>(false)
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      message: ''
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      name: (val) => (val.trim().length <= 2 ? `What's your name?` : null),
      message: (val) => (val.trim().length <= 10 ? 'The message should include at least 10 characters' : null),
    },
  });

  const handleSendMessage = async () => {
    if (form.validate().hasErrors) {
      return;
    }

    setSending(true)
    try {
      await postMessage(form.values)
    } finally {
      setSending(false)
    }
  }

  return (
    <Box className={classes.wrapper} id={'contact'} p={"xl"} mih={'calc(100vh - 60px)'}>
      <SimpleGrid cols={2} spacing={50} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
        <Container size={"xl"} px={"xl"}>
          <Title className={classes.title}>Talk to our team!</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            Leave your email and we will get back to you within 24 hours
          </Text>
          <OlaContactIcons variant="white"/>
        </Container>
        <Container size={"xl"} className={classes.form}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            classNames={{input: classes.input, label: classes.inputLabel}}
            {...form.getInputProps('email')}
          />
          <TextInput
            label="Name"
            placeholder="John Doe"
            mt="md"
            classNames={{input: classes.input, label: classes.inputLabel}}
            {...form.getInputProps('name')}
          />
          <Textarea
            label="Your message"
            placeholder="Let's have a virtual coffee!"
            minRows={4}
            mt="md"
            classNames={{input: classes.input, label: classes.inputLabel}}
            {...form.getInputProps('message')}
          />

          <Group position="right" mt="md">
            <Button loading={sending} className={classes.control} onClick={handleSendMessage} variant={"gradient"}>
              Send message
            </Button>
          </Group>
        </Container>
      </SimpleGrid>
    </Box>
  );
}