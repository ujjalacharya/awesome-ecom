import React, { useState } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Card,
  TextInput,
  Button,
  Divider,
  TouchableRipple,
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import Constants from "../../../constants/Constants";

const FilterModal = (props) => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.showFilterModal}
      onRequestClose={props.handleFilterModalVisibility}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{ height: 40, flexDirection: "row", alignItems: "center" }}
        >
          <View style={{ flex: 0.99, marginLeft: 20 }}>
            <Text style={{ fontSize: 18 }}>Filters</Text>
          </View>
          <View>
            <Button
              icon={() => (
                <AntDesign
                  name="close"
                  size={15}
                  // color={Constants.primaryGreen}
                />
              )}
              onPress={props.handleFilterModalVisibility}
            ></Button>
          </View>
        </View>
        <Card style={styles.cardStyle}>
          <Card.Title title="Brands" />
          <Card.Content style={styles.cardContentStyle}>
            <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row" }}>
              {[0, 0, 0, 0].map((_, i) => (
                <Button
                  style={{ ...styles.filterButton }}
                  key={i}
                  onPress={() => console.warn("brand")}
                >
                  <Text style={{ fontSize: 12, color: "black" }}>Samsung</Text>
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>
        <Divider />
        <Card style={styles.cardStyle}>
          <Card.Title title="Ratings" />
          <Card.Content style={styles.cardContentStyle}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <>
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <TouchableRipple onPress={() => handleRating(star)} key={index}>
                    <AntDesign
                      name={rating > index ? "star" : "staro"}
                      size={20}
                      color={Constants.primaryGreen}
                      style={{ marginRight: 8 }}
                    />
                  </TouchableRipple>
                ))}
                <Text>and Up</Text>
              </>
            </View>
          </Card.Content>
        </Card>
        <Divider />
        <Card style={styles.cardStyle}>
          <Card.Title title="Brands" />
          <Card.Content style={styles.cardContentStyle}>
            <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row" }}>
              {[0, 0, 0, 0].map((_, i) => (
                <Button
                  style={{ ...styles.filterButton }}
                  key={i}
                  onPress={() => console.warn("brand")}
                >
                  <Text style={{ fontSize: 12, color: "black" }}>Samsung</Text>
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>
        <Divider />
        <Card style={styles.cardStyle}>
          <Card.Title title="Price" />
          <Card.Content style={styles.cardContentStyle}>
            <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row" }}>
              {["Min", "Max"].map((item, i) => (
                <TextInput
                  style={{
                    marginRight: 10,
                    height: 40,
                    width: "47%",
                    backgroundColor: "white",
                  }}
                  underlineColor="transparent"
                  mode="outlined"
                  placeholder={item}
                  keyboardType="number-pad"
                />
              ))}
            </View>
          </Card.Content>
        </Card>
        <Divider />
        <Card style={styles.cardStyle}>
          <Card.Title title="Colors" />
          <Card.Content style={styles.cardContentStyle}>
            <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row" }}>
              {[0, 0, 0, 0].map((_, i) => (
                <Button
                  style={{ ...styles.filterButton, backgroundColor: "#deebff" }}
                  key={i}
                  onPress={() => console.warn("colors")}
                >
                  <Text style={{ fontSize: 12, color: "#36f" }}>White</Text>
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>
        <Divider />
        <Card style={styles.cardStyle}>
          <Card.Title title="Sizes" />
          <Card.Content style={styles.cardContentStyle}>
            <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row" }}>
              {[0, 0, 0, 0].map((_, i) => (
                <Button
                  style={{ ...styles.filterButton }}
                  key={i}
                  onPress={() => console.warn("sized")}
                >
                  <Text style={{ fontSize: 12, color: "black" }}>Medium</Text>
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>
        <Divider />
        <View style={{ marginBottom: 50 }}></View>
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
  filterButton: {
    borderWidth: 1,
    // borderColor: "gray",
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
    width: "30%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default FilterModal;
