import React from "react";
import { View, Text } from "react-native";
import SkeletonContent from "react-native-skeleton-content";

const Skeleton = () => {
  return (
    <SkeletonContent
      containerStyle={{ flex: 1, width: 300 }}
      isLoading={true}
      layout={[
        { width: 300, height: 30, margin: 6 },
        { width: 260, height: 30, margin: 6 },
        { width: 220, height: 30, margin: 6 },
        { width: 180, height: 30, marginTop: 6 },
      ]}
      animationDirection="horizontalLeft"
    >
      <Text>Your content</Text>
      <Text>Other content</Text>
    </SkeletonContent>
  );
};

export default Skeleton;
