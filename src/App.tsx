import { useState } from "react";
import "@mantine/core/styles.css";
import {
  MantineProvider,
  Title,
  Text,
  TextProps,
  TextInput,
  Modal,
  Button,
  Loader,
  Space,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { theme } from "./theme";
import styled from "styled-components";
import { NavigationHeader } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export default function App() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const validateEmail = (value: string) => {
    const { email, confirmEmail } = form.getValues();

    if (!value) {
      return "Email cannot be empty.";
    }

    if (email !== confirmEmail) {
      return "Email provided are not the same.";
    }
    return /^\S+@\S+$/.test(value) ? null : "Invalid email.";
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      confirmEmail: "",
    },
    validate: {
      name: (value) =>
        value && value.length >= 3
          ? null
          : "Full name should be at least 3 characters.",
      email: validateEmail,
      confirmEmail: validateEmail,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const { email, name } = values;
    const payload = { email, name };
    setIsLoading(true);
    setError(null);
    try {
      const { status } = await axios.post(
        "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
        payload,
        config
      );

      if (status === 200) {
        form.reset();
        setIsRegistered(true);
        setError(null);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.errorMessage);
      }
    }
    setIsLoading(false);
  };

  return (
    <MantineProvider theme={theme}>
      <Wrapper>
        <NavigationHeader />
        <Body>
          <Container direction="column" alignItems="center" gap="1rem">
            <CenteredTitle order={1} size="h1">
              A better way <br />
              to enjoy every day.
            </CenteredTitle>
            <Text size="xl" c="dimmed">
              Be the first to know when we launch.
            </Text>
          </Container>

          <Modal
            size="lg"
            opened={opened}
            onClose={() => {
              setIsRegistered(false);
              close();
            }}
            centered
          >
            <ModalContent>
              {!isRegistered && (
                <Form onSubmit={form.onSubmit(handleSubmit)}>
                  <Container direction="column" gap="1rem" marginBottom="2rem">
                    <CenteredTitle order={2}>Request an invite</CenteredTitle>
                    <SmallDivider size="md" />
                    <Space h="lg" />
                    <TextInput
                      label="Full name"
                      placeholder="Your name here..."
                      key={form.key("name")}
                      {...form.getInputProps("name")}
                    />
                    <TextInput
                      label="Email"
                      placeholder="Your email here..."
                      key={form.key("email")}
                      {...form.getInputProps("email")}
                    />
                    <TextInput
                      label="Confirm email"
                      placeholder="Your email here..."
                      key={form.key("confirmEmail")}
                      {...form.getInputProps("confirmEmail")}
                    />
                  </Container>
                  <Button disabled={isLoading} variant="filled" type="submit">
                    {isLoading ? (
                      <Container alignItems="center" gap="0.5rem">
                        <Loader size={14} />
                        <Text>Please wait...</Text>
                      </Container>
                    ) : (
                      <Text fw={700}>Send</Text>
                    )}
                  </Button>
                  {error && (
                    <Text style={{ textAlign: "center", color: "red" }}>
                      {error}
                    </Text>
                  )}
                </Form>
              )}
              {isRegistered && (
                <Container direction="column" gap="2rem" alignItems="center">
                  <Container direction="column" gap="1rem" alignItems="center">
                    <Title order={2}>All done!</Title>
                    <SmallDivider size="md" />
                  </Container>
                  <CenteredText>
                    You will be one of the first to experience Broccoli & Co.
                    when we launch.
                  </CenteredText>
                </Container>
              )}
            </ModalContent>
          </Modal>
          <Button size="lg" variant="filled" onClick={open}>
            Request an invite
          </Button>
        </Body>
        <Footer />
      </Wrapper>
    </MantineProvider>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Body = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface ContainerProps {
  direction?: string;
  marginBottom?: string;
  alignItems?: string;
  justifyContent?: string;
  gap?: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  gap: ${(props) => props.gap};
  margin-bottom: ${(props) => props.marginBottom};
`;

const CenteredTitle = styled(Title)`
  text-align: center;
`;

interface CenteredTextProps extends TextProps {
  width?: string;
}

const CenteredText = styled(Text)<CenteredTextProps>`
  text-align: center;
  width: ${(props) => props.width};
`;

const SmallDivider = styled(Divider)`
  width: 4rem;
  margin: auto;
  border-radius: 1rem;
`;
