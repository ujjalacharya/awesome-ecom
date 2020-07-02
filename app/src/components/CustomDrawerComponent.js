import React from "react";

import { List, Appbar } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import ConstantColors from "../constants/ConstantColors";

const CustomDrawer = () => {
  return (
    <>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.Content
          color={ConstantColors.headerTintColor}
          title={"All Categories"}
        />
      </Appbar.Header>
      <ScrollView
        style={{
          width: "100%",
          backgroundColor: ConstantColors.headerTintColor,
          height: "100%",
        }}
      >
        <List.Section title="Electronic Devices">
          <List.Accordion
            title="Second Level"
            left={(props) => <List.Icon {...props} icon="apps" />}
            expanded={true}
            onPress={() => console.warn("Pressed Accordion")}
          >
            <List.Item
              title="First item"
              onPress={() => console.warn("Pressed Item")}
            />
            <List.Item
              title="Second item"
              onPress={() => console.warn("Pressed Item")}
            />
            <List.Item
              title="Third item"
              onPress={() => console.warn("Pressed Item")}
            />
          </List.Accordion>
        </List.Section>
        <List.Section title="Electronic Accessories">
          <List.Accordion
            title="Second Level"
            left={(props) => <List.Icon {...props} icon="apps" />}
            expanded={true}
            onPress={() => console.warn("Pressed Accordion")}
          >
            <List.Item
              title="First item"
              onPress={() => console.warn("Pressed Item")}
            />
            <List.Item
              title="Second item"
              onPress={() => console.warn("Pressed Item")}
            />
            <List.Item
              title="Third item"
              onPress={() => console.warn("Pressed Item")}
            />
          </List.Accordion>
        </List.Section>
        <List.Section title="TV & Home Appliencess">
          <List.Accordion
            title="Second Level"
            left={(props) => <List.Icon {...props} icon="apps" />}
            expanded={true}
            onPress={() => console.warn("Pressed Accordion")}
          >
            <List.Item
              title="First item"
              onPress={() => console.warn("Pressed Item")}
            />
            <List.Item
              title="Second item"
              onPress={() => console.warn("Pressed Item")}
            />
            <List.Item
              title="Third item"
              onPress={() => console.warn("Pressed Item")}
            />
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </>
  );
};

export default CustomDrawer;
