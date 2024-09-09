import React, { useState } from "react";
import {
  Title,
  Text,
  TextProps,
  TextInput,
  Modal,
  Space,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import styled from "styled-components";
import Content from "../Content/Content";
import GenericButton from "../GenericButton/GenericButton";
import SuccessModal from "../SuccessModal/SuccessModal";
import axios from "axios";
import * as EmailValidator from "email-validator";

const MIN_NAME_CHARS = 3;
const MAX_NAME_CHARS = 140;

export default function Body() {
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

    const isEmailValid = EmailValidator.validate(email);
    if (!isEmailValid) {
      return "Email is not valid.";
    }

    return null;
  };

  const validateName = (value: string) => {
    if (value.length < MIN_NAME_CHARS) {
      return "Full name should be at least 3 characters.";
    }

    if (value.length > MAX_NAME_CHARS) {
      return "Full name is too long. Please limit to 140 characters.";
    }

    return null;
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      confirmEmail: "",
    },
    validate: {
      name: validateName,
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
        payload
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
    <Wrapper>
      <Content />

      <Modal
        size="lg"
        centered
        opened={opened}
        onClose={() => {
          setIsRegistered(false);
          close();
        }}
      >
        <ModalContent>
          {!isRegistered && (
            <Form onSubmit={form.onSubmit(handleSubmit)}>
              <Container direction="column" $gap="1rem" $marginBottom="2rem">
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
              <GenericButton
                isLoading={isLoading}
                loadingText="Please wait..."
                actionText="Send"
              />
              {error && <CenteredText $color="red">{error}</CenteredText>}
            </Form>
          )}
          {isRegistered && <SuccessModal />}
        </ModalContent>
      </Modal>
      <GenericButton
        size="lg"
        variant="filled"
        onClick={open}
        actionText="Request an invite"
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface ContainerProps {
  direction?: string;
  $marginBottom?: string;
  $alignItems?: string;
  justifyContent?: string;
  $gap?: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  align-items: ${(props) => props.$alignItems};
  justify-content: ${(props) => props.justifyContent};
  gap: ${(props) => props.$gap};
  margin-bottom: ${(props) => props.$marginBottom};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CenteredTitle = styled(Title)`
  text-align: center;
`;

interface CenteredTextProps extends TextProps {
  children: React.ReactNode;
  $color?: string;
}

const CenteredText = styled(Text)<CenteredTextProps>`
  text-align: center;
  color: ${(props) => props.$color};
`;

const SmallDivider = styled(Divider)`
  width: 4rem;
  margin: auto;
  border-radius: 1rem;
`;
