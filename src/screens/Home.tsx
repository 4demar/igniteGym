import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { GrupoMuscular } from "@components/GrupoMuscular";
import { HomeHeader } from "@components/HomeHeader";
import { Heading, HStack, VStack, Text, useToast } from "@gluestack-ui/themed";
import { CardExercicio } from "@components/CardExercicio";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppRoutesNavigator } from "@routes/appRoutes";
import { api } from '@services/api';
import { AppError } from "@utils/appError";
import { ToastShowError } from "@components/ToastShowError";
import { ExercicioDTO } from "../interfaces/exercicioDTO";
import { Loading } from "@components/Loading";


export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [listaExercicios, setListaExercicios] = useState<ExercicioDTO[]>([])
  const [listaGrupoMuscular, setListaGrupoMuscular] = useState<string[]>([])
  const [grupoSelecionado, setGrupoSelecionado] = useState('antebraço')
  const navigator = useNavigation<AppRoutesNavigator>()

  const handleAbrirExercicio = (id: string) => {
    navigator.navigate('exercicio', { exercicioId: id })
  }

  async function buscarGrupos() {
    try {

      const response = await api.get('/groups');
      setListaGrupoMuscular(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares';

      ToastShowError('erro', title)
    }
  }

  async function buscarExerciciosPorGrupo() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/bygroup/${grupoSelecionado}`);

      setListaExercicios(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os exercícios';

      ToastShowError('erro', title)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarGrupos();
  }, [])

  useFocusEffect(
    useCallback(() => {
      buscarExerciciosPorGrupo()
    }, [grupoSelecionado])
  )

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={listaGrupoMuscular}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GrupoMuscular nome={item} ativo={grupoSelecionado.toLowerCase() === item.toLowerCase()} onPress={() => setGrupoSelecionado(item)} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        style={{ marginVertical: 20, maxHeight: 44, minHeight: 44 }}
      />
      {
        isLoading ? <Loading /> :
          <VStack px='$8' flex={1}>
            <HStack justifyContent="space-between" mb='$5' alignItems="center">
              <Heading color='$gray200' fontSize='$md' fontFamily="$heading">Exercícios</Heading>
              <Text color="$gray200" fontSize='$md' fontFamily="$body">{listaExercicios.length}</Text>
            </HStack>

            <FlatList
              data={listaExercicios}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <CardExercicio exercicio={item} onPress={() => handleAbrirExercicio(item.id)} />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </VStack>
      }
    </VStack>
  )
}