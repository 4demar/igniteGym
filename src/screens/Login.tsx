import { VStack, Image, Center, Text, Heading, ScrollView, Icon } from "@gluestack-ui/themed";
import BackgroundImg from "@assets/background.png";
import Logo from '@assets/logo.svg'
import { InputText } from '@components/InputText';
import { Button } from "@components/Button";

import { useNavigation } from "@react-navigation/native";
import { AuthRoutesNavigator } from "@routes/authRoutes";
import { useState } from "react";

export function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const navigator = useNavigation<AuthRoutesNavigator>()

  const handleNovoCadastro = () => {
    navigator.navigate('cadastro')
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
            <Heading color='$gray100'>Acesse a conta</Heading>
            <InputText placeholder="E-mail" keyboardType="email-address" autoCapitalize="none"
              value={email} onChangeText={setEmail}
            />
            <InputText placeholder="Senha" secureTextEntry
              value={senha} onChangeText={setSenha}
            />
            <Button titulo='Acessar' />
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