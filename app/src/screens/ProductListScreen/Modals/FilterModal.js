import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Skeleton from "../../../components/shared/Skeleton"

const FilterModal = (props) => {
  const dispatch = useDispatch()
  const {getSearchFilter} = useSelector(state => state.listing);

  const [brand, setBrand] = useState(null);
  const [rating, setRating] = useState(null);
  const [warrenty, setWarrenty] = useState(null);
  const [price, setPrice] = useState(null);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);


  const handleBrand = (brand) => {
    setBrand(brand);
  };
  const handleRating = (rate) => {
    setRating(rate);
  };
  const handleWarrenty = (war) => {
    setWarrenty(war);
  };
  const handlePrice = (pr) => {
    setPrice(pr);
  };
  const handleColor = (col) => {
    setColor(col);
  };
  const handleSize = (siz) => {
    setSize(siz);
  };

  const checkedStyle = (index, type) => {
    return index === type
      ? {
          color: Constants.chosenFilterColor,
          backgroundColor: Constants.chosenFilterBackgroundColor,
        }
      : {
          color: "black",
          backgroundColor: "white",
        };
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.showFilterModal}
      onRequestClose={props.handleFilterModalVisibility}
    >
      {
        getSearchFilter ? <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
              {getSearchFilter.brands.map((item, index) => (
                <Button
                  style={{
                    ...styles.filterButton,
                    backgroundColor: checkedStyle(index, brand).backgroundColor,
                  }}
                  key={index}
                  onPress={() => handleBrand(index)}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: checkedStyle(index, brand).color,
                    }}
                  >
                    {item.brandName}
                  </Text>
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
                  <TouchableRipple
                    onPress={() => handleRating(star)}
                    key={index}
                  >
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
                  key={i}
                />
              ))}
            </View>
          </Card.Content>
        </Card>
        <Divider />
        <Card style={styles.cardStyle}>
          <Card.Title title="Warrenties" />
          <Card.Content style={styles.cardContentStyle}>
            <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row" }}>
              {getSearchFilter.warranties.map((item, index) => (
                <Button
                  style={{
                    ...styles.filterButton,
                    backgroundColor: checkedStyle(index, warrenty)
                      .backgroundColor,
                  }}
                  key={index}
                  onPress={() => handleWarrenty(index)}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: checkedStyle(index, warrenty).color,
                    }}
                  >
                    {item}
                  </Text>
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>
        <Divider />
        <Card style={styles.cardStyle}>
          <Card.Title title="Colors" />
          <Card.Content style={styles.cardContentStyle}>
            <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row" }}>
              {getSearchFilter.colors.map((color, index) => (
                <Button
                  style={{
                    ...styles.filterButton,
                    backgroundColor: checkedStyle(index, color).backgroundColor,
                  }}
                  key={index}
                  onPress={() => handleColor(index)}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: checkedStyle(index, color).color,
                    }}
                  >
                    {color}
                  </Text>
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
              {getSearchFilter.sizes.map((size, index) => (
                <Button
                  style={{
                    ...styles.filterButton,
                    backgroundColor: checkedStyle(index, size).backgroundColor,
                  }}
                  key={index}
                  onPress={() => handleSize(index)}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: checkedStyle(index, size).color,
                    }}
                  >
                    {size}
                  </Text>
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>
        <Divider />
        <View style={{ marginBottom: 50 }}></View>
      </ScrollView> : <Skeleton />
      }
      <View style={styles.productFooter}>
        <View
          style={{
            backgroundColor: Constants.headerTintColor,
            height: 50,
            padding: 7,
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Button
              style={{
                flex: 0.48,
                backgroundColor: "red",
                justifyContent: "center",
              }}
              labelStyle={{ color: "white" }}
              onPress={props.handleFilterModalVisibility}
            >
              Cancel
            </Button>
            <View style={{ flex: 0.04 }}></View>
            <Button
              style={{
                flex: 0.48,
                backgroundColor: Constants.primaryGreen,
                justifyContent: "center",
              }}
              labelStyle={{ color: "white" }}
              onPress={getSearchFilter && props.handleFilterModalVisibility}
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
