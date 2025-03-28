import { Heading, HStack, Icon, Text, VStack, Image, Box } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepeticaoSvg from '@assets/repetitions.svg'
import { Button } from "@components/Button";
import { useEffect, useState } from "react";
import { AppError } from "@utils/appError";
import { ToastShowError } from "@components/ToastShowError";
import { api } from "@services/api";
import { ExercicioDTO } from "../interfaces/exercicioDTO";
import { Loading } from "@components/Loading";
import { AppRoutesNavigator } from "@routes/appRoutes";

type RouteParams = {
  exercicioId: string
}

export function Exercicio() {
  const [sendingRegister, setSendingRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [detalhes, setDetalhes] = useState<ExercicioDTO>({} as ExercicioDTO)
  const navigator = useNavigation<AppRoutesNavigator>();

  //recuperar parametro passado na rota
  const route = useRoute()
  const { exercicioId } = route.params as RouteParams

  const handleVoltar = () => {
    navigator.goBack()
  }

  async function buscarDetalhesExercicio() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exercicioId}`);
      setDetalhes(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício';

      ToastShowError('erro', title)
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegistrarExercicio() {
    try {
      setSendingRegister(true);

      await api.post('/history', { exercise_id: exercicioId });

      ToastShowError('sucesso', 'Parabéns! Exercício registrado no seu histórico.')

      navigator.navigate('historico');
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível registrar exercício.';

      ToastShowError('erro', title)
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    buscarDetalhesExercicio()
  }, [exercicioId])

  return (
    <VStack flex={1}>
      <VStack px="$8" bg="$gray600" pt="$12">
        <TouchableOpacity onPress={handleVoltar}>
          <Icon as={ArrowLeft} color="$green500" size="xl" />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt="$4"
          mb="$8"
        >
          <Heading
            color="$gray100"
            fontFamily="$heading"
            fontSize="$lg"
            flexShrink={1}
          >
            {detalhes.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />

            <Text color="$gray200" ml="$1" textTransform="capitalize">
              {detalhes.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? <Loading /> :
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <VStack p="$8">
            <Box rounded="lg" mb={3} overflow="hidden">
              <Image
                source={{ uri: `${api.defaults.baseURL}/exercises/demo/${detalhes.demo}` }}
                alt="Nome do exercício"
                mb="$3"
                resizeMode="cover"
                rounded="$lg"
                w="$full"
                h="$80"
              />
            </Box>

            <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
              <HStack
                alignItems="center"
                justifyContent="space-around"
                mb="$6"
                mt="$5"
              >
                <HStack>
                  <SeriesSvg />
                  <Text color="$gray200" ml="$2">
                    {detalhes.series}
                  </Text>
                </HStack>

                <HStack>
                  <RepeticaoSvg />
                  <Text color="$gray200" ml="$2">
                    {detalhes.repetitions}
                  </Text>
                </HStack>
              </HStack>

              <Button
                titulo="Marcar como realizado"
                isLoading={sendingRegister}
                onPress={handleRegistrarExercicio}
              />
            </Box>
          </VStack>
        </ScrollView>
      }
    </VStack>
  )
}