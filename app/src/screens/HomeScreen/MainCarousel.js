import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Image, StyleSheet } from "react-native";

import Swiper from "react-native-swiper";
import Constants from "../../constants/Constants";
import { getBannerImages } from "../../../redux/actions/otherActions";
import { SERVER_BASE_URL } from "../../../utils/common";

const MainCarousel = () => {
  const dispatch = useDispatch();
  const bannerImages = useSelector(({ other }) => other.getBannerImages);

  useEffect(() => {
    dispatch(getBannerImages());
  }, [dispatch]);

  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={true}
      autoplay={true}
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.activeDot} />}
      showsButtons={false}
    >
      {bannerImages
        ? bannerImages?.banners.map((banner) => (
            <View style={styles.slide1} key={banner._id}>
              <Image
                style={styles.image}
                source={{
                  uri: SERVER_BASE_URL + "/uploads/" + banner.bannerPhoto,
                }}
              />
            </View>
          ))
        : [0, 0, 0, 0, 0, 0, 0].map((_, i) => <View key={i}></View>)}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    height: "100%",
  },
  slide1: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    height: null,
    width: null,
  },

  dot: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 5,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: Constants.tintColor,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});

export default MainCarousel;
