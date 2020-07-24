import React, { useRef, useCallback} from 'react';
import { 
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  View, 
  ScrollView,
  Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import logoImg from '../../assets/logo.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import getValidationErrors from '../../utils/getValidationErrors';

import { 
  Container, 
  Title, 
  BackToSingInButton,
  BackToSingInButtonText
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().required('E-mail é obrigatório').email('Digite um e-mail válido.'),
        password: Yup.string().min(6, 'No mínimo 6 digitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // await api.post('/users', data);

      // history.push('/');

      Alert.alert(
        'Cadastro realizado!', 
        'Você já pode fazer logon no GoBarber!' 
      );

    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);
        
        return;
      }

      Alert.alert(
        'Erro na autenticação', 
        'Você já pode fazer logon no GoBarber!'
      );
    }
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
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input 
                name="name" 
                icon="user" 
                placeholder="Nome" 
                autoCapitalize="words"
              />
              <Input 
                name="email" 
                icon="mail" 
                placeholder="E-mail" 
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
              />
              <Input 
                name="password" 
                icon="lock" 
                placeholder="Senha" 
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button 
                onPress={
                  () => formRef.current?.submitForm()
                }>Entrar</Button>
            </Form>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSingInButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSingInButtonText>
          Voltar para logon
        </BackToSingInButtonText>
      </BackToSingInButton>
    </>
  );
};

export default SignUp;