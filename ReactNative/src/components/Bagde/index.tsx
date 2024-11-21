import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export function BadgesFood({ title, itemsCount, amount }) {
  return (
    <View style={styles.badgeContainer}>
      <View style={[styles.badge, { backgroundColor: "#E40C0C" }]}>
        <Image
          style={{ width: 44, height: 50 }}
          source={require("../../../assets/batataFrita.png")}
        />
      </View>
      <View>
        <Text style={styles.badgeText}>{title}</Text>
        <Text style={styles.badgeSubtitle}>{itemsCount} Items</Text>
      </View>
      <View>
        <Text style={styles.badgeAmount}>R${amount}</Text>
      </View>
    </View>
  );
}

export function BadgesOuthers({ title, itemsCount, amount }) {
  return (
    <View style={styles.badgeContainer}>
      <View style={[styles.badge, { backgroundColor: "#7B61FF" }]}>
        <Image
          style={{ width: 44, height: 50, objectFit: "contain" }}
          source={require("../../../assets/carta.png")}
        />
      </View>
      <View>
        <Text style={styles.badgeText}>{title}</Text>
        <Text style={styles.badgeSubtitle}>{itemsCount} Items</Text>
      </View>
      <View>
        <Text style={styles.badgeAmount}>R${amount}</Text>
      </View>
    </View>
  );
}

export function BadgesLocation({ title, itemsCount, amount }) {
  return (
    <View style={styles.badgeContainer}>
      <View style={[styles.badge, { backgroundColor: "#0004FF" }]}>
        <Image
          style={{ width: 44, height: 50 }}
          source={require("../../../assets/casinha.png")}
        />
      </View>
      <View style={{ marginLeft: 8 }}>
        <Text style={styles.badgeText}>{title}</Text>
        <Text style={styles.badgeSubtitle}>{itemsCount} Items</Text>
      </View>
      <View>
        <Text style={styles.badgeAmount}>R${amount}</Text>
      </View>
    </View>
  );
}

export function BadgesServices({ title, itemsCount, amount }) {
  return (
    <View className="flex " style={styles.badgeContainer}>
      <View style={[styles.badge, { backgroundColor: "#350482" }]}>
        <Image
          style={{ width: 44, height: 50 }}
          source={require("../../../assets/garcom.png")}
        />
      </View>
      <View>
        <Text style={styles.badgeText}>{title}</Text>
        <Text style={styles.badgeSubtitle}>{itemsCount} Items</Text>
      </View>
      <View>
        <Text style={styles.badgeAmount}>R${amount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
    marginBottom: 8,
    width: 343,
    height: 56,
  },
  badge: {
    width: 57,
    height: 54,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontFamily: "Poppins",
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  badgeSubtitle: {
    fontFamily: "Poppins",
    color: "#909090",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  badgeAmount: {
    fontFamily: "Poppins",
    color: "#909090",
    fontWeight: "bold",
    fontSize: 18,
  },
  container: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginTop: 10,
  },
});
