import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
});

const BrowserScreen = () => {
  // MEMO: 해당 페이지로 전달된 searchParams 읽어옴.
  const params = useLocalSearchParams();
  const initialUrl = params.initialUrl as string;
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView source={{ uri: initialUrl }} />
    </SafeAreaView>
  );
};

export default BrowserScreen;
