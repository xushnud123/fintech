import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";
import { defaultStyles } from "@/styles/styles";

const CELL_COUNT = 6;

const Phone = () => {
  const { email, password, username, signin } = useLocalSearchParams<{
    email: string;
    password: string;
    username: string;
    signin: string;
  }>();
  const [code, setCode] = useState<any>("");
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  const verifySignUp = async () => {
    try {
      await signUp?.attemptEmailAddressVerification({
        code,
      });
      await setActive!({ session: signUp!.createdSessionId });
    } catch (error: any) {
      Alert.alert("Error", error);
    }
  };
  const verifySignIn = async () => {
    try {
      await signIn?.attemptFirstFactor({
        strategy: "email_code",
        code,
      });
      await setActive!({ session: signIn!.createdSessionId });
    } catch (error: any) {
      if (isClerkAPIResponseError(error)) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (code.length === 6) {
      if (signin === "true") {
        verifySignIn();
      } else {
        verifySignUp();
      }
    }
  }, [code]);
  return (
    <View className={defaultStyles.container}>
      <Text className={defaultStyles.header}>6-digit code</Text>
      <Text className={defaultStyles.descriptionText}>
        Code sent to {email} unless you already have an account
      </Text>
      {
        // @ts-ignore
        <CodeField
          ref={ref}
          {...props}
          value={code}
          onChangeText={setCode}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType='number-pad'
          textContentType='oneTimeCode'
          autoComplete={Platform.select({
            android: "sms-otp",
            default: "one-time-code",
          })}
          testID='my-code-input'
          renderCell={({ index, symbol, isFocused }) => (
            <Fragment key={index}>
              <View
                // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[isFocused && styles.focusCell]}
              >
                <Text style={[styles.cell, isFocused && styles.focusCell]}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
              {index === 2 ? (
                <View
                  key={`separator-${index}`}
                  className='h-[2px] w-[10px] bg-[#98A2B3] self-center'
                />
              ) : null}
            </Fragment>
          )}
        />
      }

      <Link href={"/login"} replace asChild className='mt-6'>
        <TouchableOpacity className=''>
          <Text className={defaultStyles.textLink}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Phone;

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 56,
    height: 56,
    lineHeight: 52,
    fontSize: 32,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#D0D5DD",
    textAlign: "center",
    color: "#1f2d49",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  focusCell: {
    borderColor: "#5BDCC6",
    color: "#026E78",
    shadowColor: "#C8F9E8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  error: {
    borderColor: "#FF9D83",
    color: "#026E78",
  },
});
