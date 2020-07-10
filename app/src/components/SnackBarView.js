import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Snackbar } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

const SnackbarView = ({ visible, setVisible, ...props }) => {
  const navigation = useNavigation();
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Button onPress={onToggleSnackBar}>{visible ? "Hide" : "Show"}</Button>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: props.label || "",
          onPress: () => {
            // Do something
            props.link && navigation.navigate(props.link);
          },
        }}
      >
        {props.message || "Something went wrong"}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default SnackbarView;
