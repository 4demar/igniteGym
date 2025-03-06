import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Cadastro } from '@screens/Cadastro';
import { Login } from '@screens/Login';

type AuthRoutesProps = {
  login: undefined;
  cadastro: undefined;
}

export type AuthRoutesNavigator = NativeStackNavigationProp<AuthRoutesProps>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesProps>();

export function AuthRoutes() {

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='login' component={Login} />
      <Screen name='cadastro' component={Cadastro} />
    </Navigator>
  )
}