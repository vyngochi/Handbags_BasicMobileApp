import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react-native";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface Props {
  input: string;
  setInput: (v: string) => void;
  handleChatInput: () => void;
}
export default function ChatInput({ input, setInput, handleChatInput }: Props) {
  return (
    <View className="flex-row items-center p-4">
      <View className="relative flex-row items-center w-full">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask me about luxury fashion..."
          className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-full font-regular"
        />

        <TouchableOpacity
          onPress={handleChatInput}
          disabled={!input}
          className="absolute ml-3 right-1"
        >
          <Text
            className={cn(
              "p-1.5 bg-blue-700 rounded-full",
              !input ? "bg-gray-400" : "",
            )}
          >
            <ArrowUp color={"white"} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
