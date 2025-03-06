import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '@screens/Home';
import { Perfil } from '@screens/Perfil';
import { Historico } from '@screens/Historico';
import { Exercicio } from '@screens/Exercicio';

import HomeSvg from '@assets/home.svg'
import HistoricoSvg from '@assets/history.svg'
import PerfilSvg from '@assets/profile.svg'
import { gluestackUIConfig } from '../../config/gluestack-ui.config';
import { Platform } from 'react-native';

type AppRoutesProps = {
  home: undefined;
  exercicio: undefined;
  historico: undefined;
  perfil: undefined
}

export type AppRoutesNavigator = BottomTabNavigationProp<AppRoutesProps>;

const Stack = createNativeStackNavigator()

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>();

export function AppRoutes() {

  const { tokens } = gluestackUIConfig
  const iconSize = tokens.space['6']

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tabs">
        {() => (
          <Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarActiveTintColor: tokens.colors.green500,
              tabBarInactiveTintColor: tokens.colors.gray200,
              tabBarStyle: {
                backgroundColor: tokens.colors.gray600,
                borderTopWidth: 0,
                height: Platform.OS === 'android' ? 'auto' : 96,
                paddingBottom: tokens.space['12'],
                paddingTop: tokens.space['4'],
              },
            }}
          >
            <Screen
              name="home"
              component={Home}
              options={{
                tabBarIcon: ({ color }) => (
                  <HomeSvg fill={color} width={iconSize} height={iconSize} />
                ),
              }}
            />
            <Screen
              name="historico"
              component={Historico}
              options={{
                tabBarIcon: ({ color }) => (
                  <HistoricoSvg fill={color} width={iconSize} height={iconSize} />
                ),
              }}
            />
            <Screen
              name="perfil"
              component={Perfil}
              options={{
                tabBarIcon: ({ color }) => (
                  <PerfilSvg fill={color} width={iconSize} height={iconSize} />
                ),
              }}
            />
          </Navigator>
        )}
      </Stack.Screen>

      {/* Rota oculta fora do TabBar */}
      <Stack.Screen name="exercicio" component={Exercicio} />
    </Stack.Navigator>
  )
}