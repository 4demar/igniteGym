import { VStack, Image, Center, Text, Heading } from "@gluestack-ui/themed";
import BackgroundImg from "@assets/background.png";
import Logo from '@assets/logo.svg'
import { InputText } from '@components/InputText';
import { Button } from "@components/Button";

export function Login() {

  return (
    <VStack flex={1} bg='$gray700'>
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
          <InputText placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
          <InputText placeholder="Senha" secureTextEntry />
          <Button titulo='Acessar' />
        </Center>
      </VStack>
    </VStack>
  )
}