import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";
import BackgroundImg from "@assets/background.png";
import Logo from '@assets/logo.svg'
import { InputText } from '@components/InputText';
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm, Controller } from "react-hook-form";

type FormDataProps = {
  nome: string
  email: string
  senha: string
  confirmarSenha: string
}

const signUpSchema = yup.object({
  nome: yup.string().required('informe o nome'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  senha: yup.string().required('informe a senha')
    .min(6, 'A senha deve ter pelo menos 6 digitos'),
  confirmarSenha: yup.string().required('confirme a senha')
    .min(6, 'A senha deve ter pelo menos 6 digitos')
    .oneOf([yup.ref('senha'), ''], 'A confirmação da senha não confere')
});

export function Cadastro() {

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  const navigator = useNavigation()

  const handleVoltar = () => {
    navigator.goBack()
  }

  async function handleCriarConta({ nome, email, senha }: FormDataProps) {
    const response = await fetch('http://192.168.0.10:3333/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: nome, email: email, password: senha })
    })
    const data = await response.json()
    console.log(data)
  }


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1}>
        <Image
          w='$full'
          h={624}
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas Treinando"
          position="absolute"
        />
        <VStack flex={1} px='$10' pb='$16'>

          <Center my='$24'>
            <Logo />
            <Text color='$gray100'>
              Treine sua mente e seu corpo
            </Text>
          </Center>

          <Center gap='$2' flex={1}>
            <Heading color='$gray100'>Crie sua conta</Heading>

            <Controller
              control={control}
              name='nome'
              render={({ field: { onChange, value } }) => (
                <InputText placeholder="Nome"
                  value={value} onChangeText={onChange}
                  errorMessage={errors.nome?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, value } }) => (
                <InputText placeholder="E-mail" keyboardType="email-address" autoCapitalize="none"
                  value={value} onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='senha'
              render={({ field: { onChange, value } }) => (
                <InputText placeholder="Senha" secureTextEntry
                  value={value} onChangeText={onChange}
                  errorMessage={errors.senha?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='confirmarSenha'
              render={({ field: { onChange, value } }) => (
                <InputText placeholder="Confirmar Senha" secureTextEntry
                  value={value} onChangeText={onChange}
                  errorMessage={errors.confirmarSenha?.message}
                  onSubmitEditing={handleSubmit(handleCriarConta)}
                  returnKeyType="send"
                />
              )}
            />


            <Button titulo='Criar e acessar' onPress={handleSubmit(handleCriarConta)} />



          </Center>
          <Button titulo='Voltar' variant='outline' mt='$12' onPress={handleVoltar} />
        </VStack>
      </VStack>
    </ScrollView>
  )
}