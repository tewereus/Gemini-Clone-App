import {
  StatusBar,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// You'll need to create a Context file in app/context/Context.tsx
import { Context } from "../context/Context";

export default function Index() {
  const { width } = useWindowDimensions();
  const {
    onSent,
    recentPrompt,
    showResults,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleCardPress = (promptText) => {
    setInput(promptText);
  };

  const suggestedPrompts = [
    {
      text: "Help me write a story about a magical forest",
      icon: require("../assets/images/compass_icon.png"),
    },
    {
      text: "Explain quantum computing in simple terms",
      icon: require("../assets/images/message_icon.png"),
    },
    {
      text: "Create a workout plan for beginners",
      icon: require("../assets/images/bulb_icon.png"),
    },
    {
      text: "Write a professional email template",
      icon: require("../assets/images/code_icon.png"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View style={styles.nav}>
        <View style={styles.navLeft}>
          <Image
            source={require("../assets/images/gemini_icon.png")}
            style={styles.geminiLogo}
          />
          <Text style={styles.navTitle}>Gemini</Text>
        </View>
        <Image
          source={require("../assets/images/user.jpg")}
          style={styles.userImage}
        />
      </View>

      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {!showResults ? (
          <>
            <View style={styles.greet}>
              <Text style={styles.greetTitle}>
                Hello, what can I help you with?
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardsContainer}
            >
              {suggestedPrompts.map((prompt, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.card}
                  onPress={() => handleCardPress(prompt.text)}
                >
                  <Text style={styles.cardText}>{prompt.text}</Text>
                  <Image source={prompt.icon} style={styles.cardIcon} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        ) : (
          <View style={styles.result}>
            <View style={styles.resultTitle}>
              <Image
                source={require("../assets/images/user.jpg")}
                style={styles.resultUserImage}
              />
              <Text style={styles.resultPrompt}>{recentPrompt}</Text>
            </View>
            <View style={styles.resultData}>
              <Image
                source={require("../assets/images/gemini_icon.png")}
                style={styles.geminiIcon}
              />
              {loading ? (
                <View style={styles.loader}>
                  <View style={styles.loadingDots}>
                    {[0, 1, 2].map((_, i) => (
                      <View key={i} style={styles.dot} />
                    ))}
                  </View>
                </View>
              ) : (
                <Text style={styles.resultText}>{resultData}</Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.mainBottom}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Message Gemini..."
            placeholderTextColor="#666"
            value={input}
            onChangeText={setInput}
            multiline
          />
          <View style={styles.searchIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Image
                source={require("../assets/images/gallery_icon.png")}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Image
                source={require("../assets/images/mic_icon.png")}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sendButton, !input && styles.sendButtonDisabled]}
              onPress={onSent}
              disabled={!input}
            >
              <Image
                source={require("../assets/images/send_icon.png")}
                style={[styles.searchIcon, !input && styles.sendIconDisabled]}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.bottomInfo}>
          Gemini may display inaccurate info, including about people, so
          double-check its responses.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  navLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  geminiLogo: {
    width: 24,
    height: 24,
  },
  navTitle: {
    fontSize: 20,
    color: "#202124",
    fontWeight: "500",
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  greet: {
    marginVertical: 40,
  },
  greetTitle: {
    fontSize: 32,
    color: "#202124",
    fontWeight: "400",
    textAlign: "center",
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 16,
    flexDirection: "row",
  },
  card: {
    width: 280, // Fixed width for horizontal cards
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    maxHeight: 240,
    position: "relative",
    marginRight: 16, // Space between cards
    // Add subtle shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardText: {
    color: "#202124",
    fontSize: 16,
    lineHeight: 24,
    marginRight: 40,
    maxWidth: "90%", // Prevent text from overlapping with icon
  },
  cardIcon: {
    width: 24,
    height: 24,
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  mainBottom: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#ffffff",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#f8f9fa",
    borderRadius: 24,
    padding: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 120,
    color: "#202124",
    paddingRight: 12,
  },
  searchIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  sendButton: {
    padding: 8,
    backgroundColor: "#1a73e8",
    borderRadius: 16,
  },
  sendButtonDisabled: {
    backgroundColor: "#f8f9fa",
  },
  sendIconDisabled: {
    opacity: 0.5,
  },
  bottomInfo: {
    fontSize: 12,
    color: "#5f6368",
    textAlign: "center",
    marginTop: 12,
  },
  result: {
    paddingVertical: 20,
  },
  resultTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  resultUserImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  resultPrompt: {
    fontSize: 16,
    color: "#202124",
    flex: 1,
  },
  resultData: {
    flexDirection: "row",
    gap: 12,
  },
  geminiIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  resultText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: "#202124",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  loadingDots: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1a73e8",
    opacity: 0.6,
  },
});
