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
    marginTop: 15,
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: "contain",
    alignItems: "center",
  },
});

export default Logo;
