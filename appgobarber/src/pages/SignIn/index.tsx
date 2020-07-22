import React, { useRef, useCallback } from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import logoImg from '../../assets/logo.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { 
  Container, 
  Title, 
  ForgotPassword, 
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText
} from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const nativagtion = useNavigation();

  const handleSignIn = useCallback((data: object) => {
    console.log(data);
  }, []);

  return (
    <>
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Faça o seu logon</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />

              <Button onPress={() => {
                formRef.current?.submitForm();
              }} >Entrar</Button>
            </Form>

            <ForgotPassword onPress={() => {}} >
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => nativagtion.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>
          Criar uma conta
        </CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;