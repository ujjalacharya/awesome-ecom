import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { Text, View, StyleSheet, Image } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Constants from "../constants/Constants";
import { nameWithTripleDots, SERVER_BASE_URL } from "../../utils/common";
import { getProductDetails } from "../../redux/actions/productActions";

const SingleCard = ({ product }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {token} = useSelector(state => state.authentication)

  return (
    <TouchableWithoutFeedback
      key={product.id}
      style={styles.cardContainer}
      onPress={() => {
        product && dispatch(getProductDetails(product.slug, token));
        navigation.navigate("Detail");
      }}
    >
      <>
        <View style={{ flex: 2 }}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: SERVER_BASE_URL + "/uploads/" + product.images[0].medium,
            }}
          />
        </View>
        <Card style={styles.productDetails}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{nameWithTripleDots(product.name)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.price}>Rs {product.price.$numberDecimal}</Text>
          </View>
        </Card>
        <View style={{ flex: 0.25 }}></View>
      </>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    width: 150,
    borderRadius: 50,
  },
  productDetails: {
    flex: 1,
    paddingLeft: 5,
  },
  tinyLogo: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: Constants.normalScreenDescriptionSize,
  },
  price: {
    fontSize: Constants.normalScreenDescriptionSize,
  },
});

export default SingleCard;
