import { Input, InputField, FormControl, FormControlErrorText, FormControlError } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type props = ComponentProps<typeof InputField> & {
  readonly?: boolean
  errorMessage?: string | null
  isInvalid?: boolean
}

export function InputText({ readonly = false, errorMessage = null, isInvalid = false, ...rest }: props) {

  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} w='$full'>

      <Input h='$14' borderWidth='$0' borderRadius='$md'
        $focus={{
          borderWidth: 1,
          borderColor: invalid ? '$red500' : "$green500"
        }}
        $invalid={{
          borderWidth: 1,
          borderColor: "$red500"
        }}
        isInvalid={invalid}
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
      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}