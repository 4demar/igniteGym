import { CardHistorico } from "@components/CardHistorico";
import { Header } from "@components/Header";
import { ToastShowError } from "@components/ToastShowError";
import { Heading, Text, VStack } from "@gluestack-ui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/appError";
import { useCallback, useState } from "react";
import { SectionList } from "react-native";
import { HistoricoPorDiaDTO } from "../interfaces/historicoDTO";
import { Loading } from "@components/Loading";

type ILista = {
  title: string
  data: string[]
}

export type IDelathes = {
  tipo: string
  nome: string
  duracao: string
}


export function Historico() {
  const [isLoading, setIsLoading] = useState(true);
  const [listaExercicios, setListaExercicios] = useState<HistoricoPorDiaDTO[]>([])

  async function carregarHistorico() {
    try {
      setIsLoading(true);
      const response = await api.get('/history');

      setListaExercicios(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício';

      ToastShowError('erro', title)
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarHistorico()
    }, [])
  )

  return (
    <VStack flex={1}>
      <Header titulo="Histórico de Exercícios" />

      {isLoading ? <Loading /> :
        <SectionList
          sections={listaExercicios}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CardHistorico exercicio={item} />}
          renderSectionHeader={({ section }) => (
            <Heading fontFamily='$heading' color="$gray200" fontSize='$md' mt='$5' mb='$1'>
              {section.title}
            </Heading>
          )}
          style={{ paddingHorizontal: 32 }}
          contentContainerStyle={
            listaExercicios.length === 0 && { flex: 1, justifyContent: 'center' }
          }
          ListEmptyComponent={() => (
            <Text color='$gray100' textAlign="center">
              Não há exercícios registrados.{"\n"}Vamos fazer exercícios hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      }

    </VStack>
  )
}