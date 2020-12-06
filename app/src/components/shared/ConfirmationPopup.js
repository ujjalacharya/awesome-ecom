import React from "react";
import { Portal, Dialog, Button, Paragraph } from "react-native-paper";

const ConfirmationPopup = ({ visible, hideDialog, handleOK, message }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Are you sure?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{message.message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={handleOK}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default React.memo(ConfirmationPopup);
