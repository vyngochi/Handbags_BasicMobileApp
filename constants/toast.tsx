import { Text, TouchableOpacity } from "react-native";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfigParams,
} from "react-native-toast-message";

// Định nghĩa cấu hình style lại từ component gốc
export const toastConfig = {
  /* Style lại cho loại 'success' */
  success: (props: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 0,
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: "600",
        color: "#000000",
        fontFamily: "Montserrat-Regular",
      }}
      text2Style={{
        fontSize: 13,
        color: "#666666",
        fontFamily: "Montserrat-Regular",
      }}
      renderTrailingIcon={() => {
        const actionText = props.props?.actionText;
        const onActionPress = props.props?.onActionPress;

        if (!onActionPress) return null;

        return (
          <TouchableOpacity
            onPress={() => {
              onActionPress();
              Toast.hide();
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 12,
              paddingVertical: 6,
              backgroundColor: "#F3F4F6",
              borderRadius: 50,
              marginRight: 10,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                color: "#005CAB",
                fontWeight: "bold",
                fontSize: 12,
                fontFamily: "Montserrat-Bold",
              }}
            >
              {actionText || "View"}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  ),

  info: (props: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 0,
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: "600",
        color: "#000000",
        fontFamily: "Montserrat-Regular",
      }}
      text2Style={{
        fontSize: 13,
        color: "#666666",
        fontFamily: "Montserrat-Regular",
      }}
    />
  ),

  /* Style lại cho loại 'error' (nếu có dùng) */
  error: (props: ToastConfigParams<any>) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftWidth: 0, // XÓA MÀU BÊN TRÁI
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: "600",
        color: "#000000",
      }}
      text2Style={{
        fontSize: 13,
        color: "#666666",
      }}
    />
  ),
};
