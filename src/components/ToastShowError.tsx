import { SafeAreaView, Toast, ToastTitle, useToast } from "@gluestack-ui/themed";

export function ToastShowError(tipo: string, titulo: string) {

  const colorToast = tipo === 'sucesso' ? '$green500' : '$red500'

  const toast = useToast();
  toast.show({
    placement: "top",
    render: () => (
      <SafeAreaView>
        <Toast backgroundColor={colorToast} action="error" variant="outline">
          <ToastTitle color="$white">{titulo}</ToastTitle>
        </Toast>
      </SafeAreaView>
    ),
  });
}