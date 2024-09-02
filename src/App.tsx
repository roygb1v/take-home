import { useState } from "react";
import "@mantine/core/styles.css";
import {
  MantineProvider,
  Title,
  Text,
  TextInput,
  Modal,
  Button,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { theme } from "./theme";
import styled from "styled-components";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

const axios = require("axios").default;

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      confirmEmail: "",
    },
    validate: {
      name: (value) =>
        value && value.length > 3
          ? null
          : "Full name should be more than 3 characters.",
      email: (value) => {
        const { email, confirmEmail } = form.getValues();

        if (!value) {
          return "Email cannot be empty.";
        }

        if (email !== confirmEmail) {
          return "Email provided are not the same.";
        }
        return /^\S+@\S+$/.test(value) ? null : "Invalid email.";
      },
      confirmEmail: (value) => {
        const { email, confirmEmail } = form.getValues();

        if (!value) {
          return "Email cannot be empty.";
        }

        if (email !== confirmEmail) {
          return "Email provided are not the same.";
        }
        return /^\S+@\S+$/.test(value) ? null : "Invalid email.";
      },
    },
  });

  const [opened, { open, close }] = useDisclosure(false);
  const handleSubmit = async (values: typeof form.values) => {
    const { email, name } = values;
    const payload = { email, name };
    setIsLoading(true);
    try {
      const { status } = await axios.post(
        "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
        payload,
        {
          "Content-Type": "application/json",
        }
      );

      if (status === 200) {
        form.reset();
        setIsRegistered(true);
      }
    } catch (e) {
      console.log("err", e);
    }
    setIsLoading(false);
  };

  return (
    <MantineProvider theme={theme}>
      <FlexContainer>
        <Header />
        <Body>
          <Title order={1} size="h1" style={{ textAlign: "center" }}>
            A better way <br />
            to enjoy every day.
          </Title>
          <Text size="xl">Be the first to know when we launch.</Text>
          <Modal
            size="lg"
            opened={opened}
            onClose={() => {
              setIsRegistered(false);
              close();
            }}
            centered
            title={<Text>Request an invite</Text>}
          >
            <ModalContent>
              {!isRegistered && (
                <Form onSubmit={form.onSubmit(handleSubmit)}>
                  <Container marginBottom="2rem">
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
                  <Button
                    style={{ background: "#000000", color: "#F9F9F9" }}
                    disabled={isLoading}
                    variant="light"
                    type="submit"
                  >
                    {isLoading ? (
                      <ShortContainer>
                        <Loader size={14} />
                        <Text>Please wait...</Text>
                      </ShortContainer>
                    ) : (
                      <Text fw={500}>Send</Text>
                    )}
                  </Button>
                </Form>
              )}
              {isRegistered && (
                <Container>
                  <Text>All done!</Text>
                  <Text>Thanks</Text>
                  <Text>
                    You will be notified of any changes when we launch. Keep in
                    touch!
                  </Text>
                </Container>
              )}
            </ModalContent>
          </Modal>
          <Button
            style={{ background: "#000000" }}
            size="lg"
            variant="primary"
            onClick={open}
          >
            Request an invite
          </Button>
        </Body>
        <Footer />
      </FlexContainer>
    </MantineProvider>
  );
}

const FlexContainer = styled.div`
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
  marginBottom?: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: ${(props) => props.marginBottom};
`;

const ShortContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
