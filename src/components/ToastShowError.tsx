import { SafeAreaView, Toast, ToastTitle, useToast } from "@gluestack-ui/themed";

export function ToastShowError(titulo: string) {
  const toast = useToast();
  toast.show({
    placement: "top",
    render: () => (
      <SafeAreaView>
        <Toast backgroundColor='$red500' action="error" variant="outline">
          <ToastTitle color="$white">{titulo}</ToastTitle>
        </Toast>
      </SafeAreaView>
    ),
  });
}