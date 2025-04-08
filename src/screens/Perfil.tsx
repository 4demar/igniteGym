import { Button } from "@components/Button";
import { FotoUsuario } from "@components/FotoUsuario";
import { InputText } from "@components/InputText";
import { Center, VStack, Text, Heading, useToast } from "@gluestack-ui/themed";
import { ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useState } from "react";
import { Header } from "@components/Header";
import { ToastMessage } from "@components/ToastMessage";
import { Controller, Resolver, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { ToastShow } from "@components/ToastShow";
import { AppError } from "@utils/appError";
import FotoDefaultUser from '@assets/userPhotoDefault.png'

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  password: string | null;
  old_password: string;
  confirm_password?: string | null | undefined;
}

const profileSchema = yup.object({
  name: yup
    .string()
    .required('Informe o nome'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.')
    .nullable()
    .transform((value) => !!value ? value : null),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
    .when('password', {
      is: (Field: any) => Field,
      then: (schema) => schema
        .nullable()
        .required('Informe a confirmação da senha.')
        .transform((value) => !!value ? value : null)
    }),
})

export function Perfil() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const toast = useToast()
  const { user, UpdateUserProfile } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: {
      name: user.nome,
      email: user.email
    }
    //resolver: yupResolver(profileSchema)
  });

  const handleSelecionarImagem = async () => {
    setPhotoIsLoading(true);
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
      if (infoImagem.size && (infoImagem.size / 1024 / 1024) > 2) {
        return ToastShow('erro', 'Imagem muito grande!')
      }


      const fileExtension = uriImagem.split('.').pop();

      const photoFile = {
        name: `${user.nome}.${fileExtension}`.toLowerCase(),
        uri: uriImagem,
        type: `${imagemSelecionada.assets[0].type}/${fileExtension}`
      } as any;

      const userPhotoUploadForm = new FormData();

      userPhotoUploadForm.append('avatar', photoFile);

      const avatarUpdtedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const userUpdated = user;

      userUpdated.avatar = avatarUpdtedResponse.data.avatar;

      await UpdateUserProfile(userUpdated);

      ToastShow('sucesso', 'Foto atualizada')

    }
    catch (erro) {
      console.log(erro)

    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      const userUpdated = user;
      userUpdated.nome = data.name;

      await api.put('/users', data);

      await UpdateUserProfile(userUpdated);
      ToastShow('sucesso', 'Perfil atualizado com sucesso!')

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.';

      ToastShow('erro', title)
    } finally {
      setIsUpdating(false);
    }
  }


  return (
    <VStack flex={1}>
      <Header titulo="Perfil" />



      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt='$6' px='$10'>
          {/* {photoIsLoading ?
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
            : */}
          <FotoUsuario
            source={
              user.avatar
                ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                : FotoDefaultUser
            }
            alt='foto do usuario'
            size='xl'
          />
          {/* } */}
          <TouchableOpacity onPress={handleSelecionarImagem}>
            <Text color='$green500' fontFamily="$heading" fontSize='$md' mt='$2' mb='$8'>
              Alterar foto
            </Text>
          </TouchableOpacity>
          <Center w='$full' gap='$2'>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <InputText
                  bg="gray.600"
                  placeholder='Nome'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <InputText
                  bg="gray.600"
                  placeholder="E-mail"
                  onChangeText={onChange}
                  value={value}
                  readOnly
                />
              )}
            />
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

            <Controller
              control={control}
              name="old_password"
              render={({ field: { onChange } }) => (
                <InputText
                  bg="gray.600"
                  placeholder="Senha antiga"
                  secureTextEntry
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <InputText
                  bg="gray.600"
                  placeholder="Nova senha"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { onChange } }) => (
                <InputText
                  bg="gray.600"
                  placeholder="Confirme a nova senha"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.confirm_password?.message}
                />
              )}
            />

            <Button
              titulo="Atualizar"
              mt={4}
              onPress={handleSubmit(handleProfileUpdate)}
              isLoading={isUpdating}
            />
          </Center>
        </Center>

      </ScrollView>
    </VStack>
  )
}