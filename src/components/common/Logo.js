import { View, Image, StyleSheet } from "react-native";
import React from "react";

const Logo = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require("../../../assets/images/logo.png")}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  logo: {
    width: 300,
    height: 180,
    resizeMode: "contain",
    alignItems: "center",
  },
});

export default Logo;
