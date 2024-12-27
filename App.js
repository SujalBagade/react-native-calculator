import React, { useState } from "react";
import { StyleSheet, Text, View, Vibration } from "react-native";
import { Button } from "react-native-paper";
import { evaluate } from "mathjs";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonPress = (value) => {
    Vibration.vibrate(50);

    if (value === "=") {
      try {
        setResult(evaluate(input).toString());
      } catch {
        setResult("Error");
      }
    }
    else if (value === "C") {
      setInput("");
      setResult("");
    }
    else if (value === "⌫") {
      setInput(input.slice(0, -1));
    }
    else if (value === "√") {
      setInput(input + "sqrt(");
    }
    else if (["sin", "cos", "tan"].includes(value)) {
      setInput(input + `${value}(`);
    }
    else if (value === "log") {
      setInput(input + "log(");
    }
    else if (value === "X") {  
      setInput(input + "*");
    }
    else {
      setInput(input + value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.input}>{input}</Text>
        <Text style={styles.result}>{result}</Text>
      </View>

      <View style={styles.buttons}>
        {["sin", "cos", "tan", "log"].map((item) => (
          <Button
            key={item}
            mode="contained"
            onPress={() => handleButtonPress(`${item}(`)}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            {item}
          </Button>
        ))}
        {["π", "e", "^", "√"].map((item) => (
          <Button
            key={item}
            mode="contained"
            onPress={() =>
              handleButtonPress(item === "π" ? Math.PI.toString() : item)
            }
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            {item}
          </Button>
        ))}
        {["C", "(", ")", "/"].map((item) => (
          <Button
            key={item}
            mode="contained"
            onPress={() => handleButtonPress(item)}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            {item}
          </Button>
        ))}
        {["7", "8", "9", "X"].map((item) => (
          <Button
            key={item}
            mode="contained"
            onPress={() => handleButtonPress(item)}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            {item}
          </Button>
        ))}
        {["4", "5", "6", "-"].map((item) => (
          <Button
            key={item}
            mode="contained"
            onPress={() => handleButtonPress(item)}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            {item}
          </Button>
        ))}
        {["1", "2", "3", "+"].map((item) => (
          <Button
            key={item}
            mode="contained"
            onPress={() => handleButtonPress(item)}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            {item}
          </Button>
        ))}
        {["0", ".", "⌫"].map((item) => (
          <Button
            key={item}
            mode="contained"
            onPress={() => handleButtonPress(item)}
            style={[
              styles.button,
              item === "⌫" ? styles.backspaceButton : null,
            ]}
            labelStyle={styles.buttonText}
          >
            {item}
          </Button>
        ))}
        <Button
          mode="contained"
          onPress={() => handleButtonPress("=")}
          style={[styles.button, styles.equalsButton]}
          labelStyle={styles.buttonText}
        >
          =
        </Button>
      </View>

      <Text style={styles.footer}>Calc by Sujal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 17,
    color: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#121212",
  },
  display: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 20,
    backgroundColor: "#1e1e1e",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  input: {
    fontSize: 40,
    color: "#fff",
  },
  result: {
    fontSize: 24,
    color: "#76ff03",
    marginTop: 10,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  button: {
    width: "22%",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#282828",
    borderColor: "#444",
    borderWidth: 1,
  },
  equalsButton: {
    backgroundColor: "#6ffc03",
  },
  backspaceButton: {
    backgroundColor: "#f44336",
  },
  footer: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    backgroundColor: "#1e1e1e",
    color: "#fff",
  },
});
