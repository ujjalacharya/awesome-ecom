import React from "react";
import { View, Modal, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Paragraph, Button } from "react-native-paper";
import Constants from "../../../constants/Constants";

const FilterModal = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.showFilterModal}
      onRequestClose={props.handleFilterModalVisibility}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* <View style={{height: 5}}>

        </View> */}
        <Card style={styles.cardStyle}>
          <Card.Content style={styles.cardContentStyle}>
            <Paragraph>Latest Product</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.cardStyle}>
          <Card.Content style={styles.cardContentStyle}>
            <Paragraph>Latest Product</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.cardStyle}>
          <Card.Content style={styles.cardContentStyle}>
            <Paragraph>Latest Product</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.cardStyle}>
          <Card.Content style={styles.cardContentStyle}>
            <Paragraph>Latest Product</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.cardStyle}>
          <Card.Content style={styles.cardContentStyle}>
            <Paragraph>Latest Product</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.cardStyle}>
          <Card.Content style={styles.cardContentStyle}>
            <Paragraph>Latest Product</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.cardStyle}>
          <Card.Content style={styles.cardContentStyle}>
            <Paragraph>Oldest Product</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
      <View style={styles.productFooter}>
        <View
          style={{ backgroundColor: Constants.headerTintColor, height: 50 }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Button
              style={{
                flex: 0.5,
                backgroundColor: "red",
                justifyContent: "center",
              }}
              labelStyle={{ color: "white" }}
              onPress={props.handleFilterModalVisibility}
            >
              Cancel
            </Button>
            <Button
              // onPress={() => this.props.navigation.navigate("CheckOut")}
              style={{
                flex: 0.5,
                backgroundColor: Constants.primaryGreen,
                justifyContent: "center",
              }}
              labelStyle={{ color: "white" }}
            >
              Apply Filter
            </Button>
          </View>
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
  productFooter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default FilterModal;
