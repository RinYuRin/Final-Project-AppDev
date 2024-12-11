import React from "react";
import {StyleSheet, View,Text,TouchableOpacity,Image,   ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

export default function AboutUs() {
  const navigation = useNavigation();

  const [loaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={require("../assets/pictures/logo3 1.png")}
          style={styles.logo}
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.title}>Who We Are</Text>
          <Text style={styles.text}>
            At CoinChum, we believe that teaching children about saving money is
            essential for their future financial well-being. Our coin savings
            boxes are designed to be both fun and educational, encouraging kids
            to develop good financial habits from a young age. Made from durable
            materials and featuring engaging designs, our savings boxes offer a
            simple and rewarding way for children to watch their coins
            accumulate, developing a sense of accomplishment and responsibility.
            While we encourage children to engage with our app, we strongly
            emphasize that all app usage should be under the guidance and
            supervision of a guardian.
          </Text>
        </View>

        {/* Meet the Team Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Meet the Team Behind CoinChum</Text>

          <Text style={styles.text}>
            <Text style={styles.highlight}>EUGENIO, ANNE CHRISTINE:</Text> Project Manager - A Project Manager plans, organizes, and oversees a project to ensure it’s completed on time, within budget, and meets goals.
          </Text>

          <Text style={styles.text}>
            <Text style={styles.highlight}>EUGENIO, ANNE CHRISTINE & ALMEDA, BRYAN:</Text> UI/UX Developer – Responsible for designing and developing visually appealing user interfaces (UI) while ensuring an intuitive and seamless user experience (UX) in digital platforms such as websites and applications.
          </Text>

          <Text style={styles.text}>
            <Text style={styles.highlight}>LORENZO, JOHN CEDRIC:</Text> Front-end Developer – A front-end developer is a programmer who focuses on creating the part of a website or application that users see and interact with. They ensure the design looks good, works smoothly, and provides a user-friendly experience.
          </Text>

          <Text style={styles.text}>
            <Text style={styles.highlight}>OCAMPO, ALDRIN:</Text> Back-end Developer – Software professional responsible for the server-side functionality of a website or application. They focus on managing databases, server infrastructure, and application logic, ensuring efficient data processing and seamless integration with front-end systems.
          </Text>

          <Text style={styles.text}>
            <Text style={styles.highlight}>RAPISORA, ART:</Text> Database Administrator – An IT professional responsible for managing, maintaining, and securing an organization’s databases. They ensure data is stored efficiently, remains accessible, and is protected against unauthorized access or loss. Additionally, they optimize database performance and troubleshoot any issues that arise.
          </Text>

          <Text style={styles.text}>
            <Text style={styles.highlight}>ALMEDA, BRYAN & OCAMPO, ALDRIN:</Text> Assurance Specialist – A professional responsible for ensuring that products, services, or processes meet established quality standards and regulatory requirements. They perform audits, tests, and evaluations to identify potential issues and ensure compliance, helping organizations maintain high quality and consistency.
          </Text>

          <Text style={styles.text}>
            <Text style={styles.highlight}>ALCANTARA, JOHN STEVEN:</Text> Release Manager – A Release Manager is a person who oversees the process of launching new software or updates. They make sure everything is tested, ready, and released on time, while working with different teams to ensure the release goes smoothly and without problems.
          </Text>

          <Text style={styles.text}>
            <Text style={styles.highlight}>BALONTONG, HONEY LEI & LUMAGOD, MARY ROSE:</Text> User Insights Specialist – A User Insights Specialist analyzes user behavior and feedback to improve products and services, focusing on the needs of target audiences and content. Their work helps enhance user experience and create better solutions.
          </Text>
        </View>
      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCE3C2",
  },
  header: {
    alignItems: "center",
    backgroundColor: "#E2B82D",
    paddingVertical: 20,
    width: "100%",
    height: 230,
  },
  logo: {
    width: 170,
    height: 240,
    top: 20,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#FFA000",
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#555555",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 15,
  },
  highlight: {
    fontFamily: "Poppins-Bold",
    color: "#555555",
  },
  backButton: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    elevation: 5,
    left: 20,
    borderColor: "#FFA000",
    borderWidth: 3,
    padding: 5,
    width: 90,
  },
  backButtonText: {
    color: "#FFA000",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
});
