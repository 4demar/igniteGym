import { Heading, HStack, Icon, Text, VStack, Image, Box } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepeticaoSvg from '@assets/repetitions.svg'
import { Button } from "@components/Button";

type RouteParams = {
  nomeExercicio: string
}

export function Exercicio() {
  const navigator = useNavigation()
  const route = useRoute()
  const { nomeExercicio } = route.params as RouteParams

  const handleVoltar = () => {
    navigator.goBack()
  }

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
            {nomeExercicio}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />

            <Text color="$gray200" ml="$1" textTransform="capitalize">
              grupoMuscular
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <VStack p="$8">
          <Image
            source={{ uri: 'https://www.hola.com/horizon/original_aspect_ratio/4d8ac4079c2e-ejercicios-triceps5-a.jpg' }}
            alt="Exercício"
            mb="$3"
            resizeMode="cover"
            rounded="$lg"
            w="$full"
            h="$80"
          />

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
                  serieExercicio
                </Text>
              </HStack>

              <HStack>
                <RepeticaoSvg />
                <Text color="$gray200" ml="$2">
                  repeticoesExercicio
                </Text>
              </HStack>
            </HStack>

            <Button titulo="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}