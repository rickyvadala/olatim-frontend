import {upperFirst, useToggle} from '@mantine/hooks';
import {useForm} from '@mantine/form';
import {
  Anchor,
  Button,
  Checkbox,
  createStyles,
  Divider,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import {IconBrandGoogle} from "@tabler/icons-react";
import {googleSignIn} from "@/services/auth.service";
import {useRouter} from "next/router";
import {OlaRouter} from "@/router/OlaRouter";

const useStyles = createStyles((theme) => ({
  wrapper: {
    background: theme.fn.linearGradient(45, theme.colors.indigo[5], theme.colors.cyan[5])
  }
}))

export const OlaAuth = () => {
  const {classes} = useStyles();
  const router = useRouter()

  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleGoogleSignIn = async () => {
    await googleSignIn()
    void router.push(OlaRouter.ROOT)
  }

  return (
    <Flex align={"center"} justify={"center"} h={'100vh'} className={classes.wrapper}>
      <Paper radius="md" p="xl" withBorder miw={320} w={'40%'} shadow={'lg'}>
        <Text size="lg" weight={500}>
          Welcome to Olatim, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <Button onClick={handleGoogleSignIn} leftIcon={<IconBrandGoogle/>}>Google</Button>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg"/>

        <form onSubmit={form.onSubmit(() => {
        })}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Flex>
  );
}