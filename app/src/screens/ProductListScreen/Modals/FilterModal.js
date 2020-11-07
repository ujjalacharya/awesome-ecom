import React from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Card, Paragraph, Divider } from "react-native-paper";

const FilterModal = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.showFilterModal}
      onRequestClose={props.handleFilterModalVisibility}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Card style={styles.cardStyle}>
            <Card.Content style={styles.cardContentStyle}>
              <Paragraph>Highest Price</Paragraph>
            </Card.Content>
          </Card>
          <Divider />
          <Card style={styles.cardStyle}>
            <Card.Content style={styles.cardContentStyle}>
              <Paragraph>Lowest Price</Paragraph>
            </Card.Content>
          </Card>
          <Divider />
          <Card style={styles.cardStyle}>
            <Card.Content style={styles.cardContentStyle}>
              <Paragraph>Latest Product</Paragraph>
            </Card.Content>
          </Card>
          <Divider />
          <Card style={styles.cardStyle}>
            <Card.Content style={styles.cardContentStyle}>
              <Paragraph>Oldest Product</Paragraph>
            </Card.Content>
          </Card>
          <Divider />
          <Card
            style={{ ...styles.cardStyle, marginTop: 10 }}
            onPress={props.handleFilterModalVisibility}
          >
            <Card.Content style={styles.cardContentStyle}>
              <Paragraph style={{ fontWeight: "bold", color: "red" }}>
                Cancel
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    flex: 1,
  },
});

export default FilterModal;
