import React from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Card, Paragraph, Divider } from "react-native-paper";

const FilterModal = (props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.showFilterModal}
      onRequestClose={props.handleFilterModalVisibility}
    >
      <View style={styles.centeredView}>
        <View style={{ flex: 4, backgroundColor: "rgba(0,0,0,0.5)" }}></View>
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
    position: "absolute",
    bottom: 0,
    height: 250,
    width: "100%",
    // margin: 20,
    backgroundColor: "rgba(0,0,0,0.5)", //transparent background
    borderRadius: 20,
    // padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardStyle: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  cardContentStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  openButton: {
    position: "absolute",
    right: 15,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default FilterModal;
