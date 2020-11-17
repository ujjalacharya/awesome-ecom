import React from "react";

import { List, Appbar } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import Constants from "../constants/Constants";

const CustomDrawer = ({ navigation, customCategories }) => {
  return (
    <>
      <Appbar.Header statusBarHeight={10}>
        <Appbar.Content
          color={Constants.headerTintColor}
          title={"All Categories"}
        />
      </Appbar.Header>
      <ScrollView
        style={{
          width: "100%",
          backgroundColor: Constants.headerTintColor,
          height: "100%",
        }}
      >
        {customCategories?.customCategories.map((mainCat) => {
          return (
            <List.Section title={mainCat.displayName} key={mainCat._id}>
              {mainCat?.childCate.map((childCate) => {
                return (
                  <List.Accordion
                    title={childCate.displayName}
                    left={(props) => <List.Icon {...props} icon="apps" />}
                    expanded={true}
                    onPress={() => navigation.navigate("Detail")}
                    key={childCate._id}
                  >
                    {childCate?.childCate.map((final) => (
                      <List.Item
                        title={final.displayName}
                        onPress={() => navigation.navigate("Detail")}
                        key={final._id}
                      />
                    ))}
                  </List.Accordion>
                );
              })}
            </List.Section>
          );
        })}
      </ScrollView>
    </>
  );
};

export default CustomDrawer;
