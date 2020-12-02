import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View } from "react-native";
import { Card, Button } from "react-native-paper";
import Moment from "moment";
import Constants from "../../constants/Constants";
import { AntDesign } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { getProductReviews } from "../../../redux/actions/productActions";
import Skeleton from "../../components/shared/Skeleton";

const ConcideRating = ({ token, slug }) => {
  const dispatch = useDispatch();

  const { productReviews } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductReviews(slug + "?page=1&perPage=10"));
  }, [dispatch]);

  let conciseReview;

  if (productReviews) {
    conciseReview =
      productReviews.reviews.length > 3
        ? productReviews.reviews.slice(0, 3)
        : productReviews.reviews;
  }

  if (!productReviews) {
    return <Skeleton />;
  }

  return (
    <Card>
      <Card.Title
        title={`Ratings and Reviews (${productReviews?.totalCount})`}
        subtitle="View All"
      />

      {conciseReview.map((data, i) => (
        <Card.Content style={{ marginBottom: 20 }} key={i}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{
                flex: 0.7,
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {data.user.name}
              </Text>
              <Text>{Moment(data.createdAt).startOf("hour").fromNow()}</Text>
            </View>
            <View style={{ flex: 0.3, flexDirection: "row", marginRight: 10 }}>
              {Array.from(Array(data.star)).map((star, i) => (
                <View style={{ flex: 1 }} key={i}>
                  <Button
                    icon={() => (
                      <AntDesign
                        name="star"
                        size={15}
                        color={Constants.primaryGreen}
                      />
                    )}
                  ></Button>
                </View>
              ))}
              {Array.from(Array(5 - data.star)).map((star, i) => (
                <View style={{ flex: 1 }} key={i}>
                  <Button
                    icon={() => (
                      <AntDesign
                        name="staro"
                        size={15}
                        color={Constants.primaryGreen}
                      />
                    )}
                  ></Button>
                </View>
              ))}
            </View>
          </View>
          <View>
            <Text>{data.comment}</Text>
          </View>
        </Card.Content>
      ))}
      <TouchableWithoutFeedback
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          margin: 10,
        }}
        onPress={() => console.warn("View all")}
      >
        {token && (
          <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
            {"Review the product"}
          </Text>
        )}
      </TouchableWithoutFeedback>
    </Card>
  );
};

export default ConcideRating;
