import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View } from "react-native";
import { Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Moment from "moment"
import Constants from "../../constants/Constants";

import { useNavigation } from "@react-navigation/native";
import Skeleton from "../../components/shared/Skeleton";
import { getQandA } from "../../../redux/actions/productActions";

const ConciseQnA = ({ viewAll, token, slug }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { productQA } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getQandA(slug + "?page=1&perPage=3"));
  }, [dispatch]);

  if (!productQA) {
    return <Skeleton />;
  }

  return (
    <Card>
      {!viewAll && (
        <Card.Title
          title={`Q & A (${productQA.totalCount})`}
          subtitle="View All"
        />
      )}

      {productQA.QnA.qna.map((data, i) => (
        <Card.Content
          style={{ marginBottom: 20, paddingTop: viewAll ? 20 : 0 }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 0.1, flexDirection: "row", marginRight: 10 }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="comment-question"
                  size={20}
                  color={Constants.tintColor}
                />
              </View>
            </View>
            <View
              style={{
                flex: 0.9,
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Text>{data.question}</Text>
              <Text style={{ fontSize: 12, color: "gray" }}>
                {data.answerby.name + ", " + Moment(data.questionedDate).startOf("hour").fromNow()}

              </Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 0.1, flexDirection: "row", marginRight: 10 }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="comment-text"
                  size={20}
                  color={Constants.tintColor}
                />
              </View>
            </View>
            <View
              style={{
                flex: 0.9,
                justifyContent: "center",
                // marginBottom: 10,
              }}
            >
              <Text>{data.answer}</Text>
              <Text style={{ fontSize: 12, color: "gray" }}>
                {data.answerby.name + ", " + Moment(data.answeredDate).startOf("hour").fromNow()}
              </Text>
            </View>
          </View>
        </Card.Content>
      ))}
      {!viewAll && (
        <TouchableWithoutFeedback
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
          onPress={() =>
            navigation.navigate("QnA", {
              askQuestion: true,
            })
          }
        >
          {token && (
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              {"Ask Question"}
            </Text>
          )}
        </TouchableWithoutFeedback>
      )}
    </Card>
  );
};

export default ConciseQnA;
