import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";
import BackgroundImg from "@assets/background.png";
import Logo from '@assets/logo.svg'
import { InputText } from '@components/InputText';
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export function Cadastro() {
  const navigator = useNavigation()

  const handleVoltar = () => {
    navigator.goBack()
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
            <InputText placeholder="Nome" />
            <InputText placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
            <InputText placeholder="Senha" secureTextEntry />
            <InputText placeholder="Confirmar Senha" secureTextEntry />
            <Button titulo='Criar e acessar' />
          </Center>
          <Button titulo='Voltar' variant='outline' mt='$12' onPress={handleVoltar} />
        </VStack>
      </VStack>
    </ScrollView>
  )
}