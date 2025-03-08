import { Button } from "@components/Button";
import { FotoUsuario } from "@components/FotoUsuario";
import { InputText } from "@components/InputText";
import { Center, VStack, Text, Heading } from "@gluestack-ui/themed";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useState } from "react";

export function Perfil() {
  const [imagemUsuario, setImagemUsuario] = useState('http://github.com/4demar.png')

  const handleSelecionarImagem = async () => {
    try {
      const imagemSelecionada = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true, //habilitado para editar
        aspect: [4, 4],
        quality: 1,
      })

      if (imagemSelecionada.canceled) return
      const uriImagem = imagemSelecionada.assets[0].uri
      //hack para pegar o tamanho da imagem
      const infoImagem = (await FileSystem.getInfoAsync(uriImagem) as { size: number })

      //conta para verificar se é maior de 5mb
      if (infoImagem.size && (infoImagem.size / 1024 / 1024) > 5)
        Alert.alert('Imagem selecionada', 'Imagem deve ser menor que 5 mb')
      setImagemUsuario(uriImagem);
    }
    catch (erro) {
      console.log(erro)
    }
  }

  return (
    <VStack flex={1}>
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt='$16' px='$10'>
          <FotoUsuario
            source={{ uri: imagemUsuario }}
            alt='foto do usuario'
            size="xl"
          />
          <TouchableOpacity onPress={handleSelecionarImagem}>
            <Text color='$green500' fontFamily="$heading" fontSize='$md' mt='$2' mb='$8'>
              Alterar foto
            </Text>
          </TouchableOpacity>
          <Center w='$full' gap='$2'>
            <InputText placeholder='Nome' bg='$gray600' />
            <InputText value='junioor.aguia@gmail.com' bg='$gray600' readOnly />
          </Center>

          <Heading
            alignSelf="flex-start"
            fontFamily="$heading"
            color="$gray200"
            fontSize="$md"
            mt="$8"
            mb="$2"
          >
            Alterar senha
          </Heading>
          <Center w="$full" gap="$2">

            <InputText placeholder="Senha antiga" bg="$gray600" secureTextEntry />
            <InputText placeholder="Nova senha" bg="$gray600" secureTextEntry />
            <InputText placeholder="Confirmar senha" bg="$gray600" secureTextEntry />

            <Button titulo="Atualizar" />
          </Center>
        </Center>

      </ScrollView>
    </VStack>
  )
}