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

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    boxSizing: 'border-box',
    backgroundImage: `linear-gradient(90deg, rgba(34,139,230,1) 50%, rgba(0,212,255,1) 100%)`,
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

  return (
    <Box className={classes.wrapper} id={'contact'}>
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
            required
            classNames={{input: classes.input, label: classes.inputLabel}}
          />
          <TextInput
            label="Name"
            placeholder="John Doe"
            mt="md"
            classNames={{input: classes.input, label: classes.inputLabel}}
          />
          <Textarea
            required
            label="Your message"
            placeholder="I want to start hiring"
            minRows={4}
            mt="md"
            classNames={{input: classes.input, label: classes.inputLabel}}
          />

          <Group position="right" mt="md">
            <Button className={classes.control} onClick={() => console.log('send')}>
              Send message
            </Button>
          </Group>
        </Container>
      </SimpleGrid>
    </Box>
  );
}