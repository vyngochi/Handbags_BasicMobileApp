import { useFonts } from "expo-font";
export const useLoadFonts = () => {
  const [loaded, error] = useFonts({
    "Montserrat-Thin": require("./../assets/fonts/Montserrat-VariableFont_wght.ttf"),
    "Montserrat-Bold": require("./../assets/fonts/static/Montserrat-Bold.ttf"),
    "Montserrat-Regular": require("./../assets/fonts/static/Montserrat-Regular.ttf"),
    "Montserrat-Italic": require("./../assets/fonts/static/Montserrat-Italic.ttf"),
  });

  return { loaded, error };
};
