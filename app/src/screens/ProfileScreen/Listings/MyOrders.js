import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, FlatList, Text } from "react-native";
import FlatListScreen from "../../../components/FlatListScreen";
import OrderCard from "./OrderCard";
import { getOrders } from "../../../../redux/actions/orderActions";

const MyOrders = (props) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.authentication);

  const { myOrders } = useSelector((state) => ({
    myOrders: state.order.getOrders,
  }));

  useEffect(() => {
    dispatch(getOrders(`page=${page}`, token));
  }, [page]);

  useEffect(() => {
    // dispatch(getOrders(`page=${page}`, token));
  }, []);



  const Item = ({ product, item }) => (
    <OrderCard product={product} item={item} type="myorders" {...props} />
  );

  const renderItem = ({ item }) => (
    <Item product={item.product} item={item} key={item._id} type="myorders" />
  );

  const _handleLoadMore = () => {
    setPage(page+1)
  }

  return (
    <FlatListScreen title="My Orders">
      <FlatList
        data={myOrders.orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={_handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
      />
    </FlatListScreen>
  );
};

export default MyOrders;
