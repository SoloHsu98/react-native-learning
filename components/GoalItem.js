import { StyleSheet, Text, View, Pressable } from "react-native";

export default function GoalItem({ goal, onDelete }) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#3c0780" }} // for android, it's not working in ios
        onPress={onDelete.bind(this, goal.id)}
        style={({ pressed }) => pressed && styles.pressedItem} // this is working in ios
      >
        <Text style={styles.goalText}>{goal.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 6,
    borderRadius: 6, // it's not working in ios device so we've to wrap it in View tag
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "white",
    padding: 8,
  },
});
