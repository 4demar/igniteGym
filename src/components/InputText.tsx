import { Input, InputField } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type props = ComponentProps<typeof InputField> & {
  readonly?: boolean
}

export function InputText({ readonly = false, ...rest }: props) {

  return (
    <Input h='$14' borderWidth='$0' borderRadius='$md'
      $focus={{
        borderWidth: 1,
        borderColor: "$green500"
      }}
      isReadOnly={readonly}
      opacity={readonly ? 0.5 : 1}
    >
      <InputField
        px='$4'
        bg='$gray700'
        color='$white'
        fontFamily="$body"
        placeholderTextColor='$gray300'
        {...rest} />
    </Input>
  )
}