import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";
import BackgroundImg from "@assets/background.png";
import Logo from '@assets/logo.svg'
import { InputText } from '@components/InputText';
import { Button } from "@components/Button";

import { useNavigation } from "@react-navigation/native";
import { AuthRoutesNavigator } from "@routes/authRoutes";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { AppError } from "@utils/appError";
import { ToastShow } from "@components/ToastShow";

type FormData = {
  email: string;
  senha: string;
}

export function Login() {
  const [isLoading, setIsLoading] = useState(false)

  const { Login } = useAuth();
  const navigation = useNavigation<AuthRoutesNavigator>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

  const handleNovoCadastro = () => {
    navigation.navigate('cadastro')
  }

  async function handleLogin(data: FormData) {
    try {
      setIsLoading(true);
      await Login(data.email, data.senha);

    }
    catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'
      ToastShow('erro', title)
    }
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

          <Center gap='$2'>
            <Heading color="$gray100" fontSize="$xl" mb={6} fontFamily="$heading">Acesse a conta</Heading>
            <Controller
              control={control}
              name="email"
              rules={{ required: 'Informe o e-mail' }}
              render={({ field: { onChange } }) => (
                <InputText
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="senha"
              rules={{ required: 'Informe a senha' }}
              render={({ field: { onChange } }) => (
                <InputText
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.senha?.message}
                />
              )}
            />
            <Button
              titulo="Acessar"
              onPress={handleSubmit(handleLogin)}
              isLoading={isLoading}
            />
          </Center>

          <Center flex={1} justifyContent="flex-end" mt='$4'>
            <Text color='$gray100' fontSize='$sm' fontFamily="$body" mb='$3'>Ainda não tem acesso?</Text>
            <Button titulo='Criar conta' variant='outline' onPress={handleNovoCadastro} />
          </Center>

        </VStack>
      </VStack>
    </ScrollView>
  )
}