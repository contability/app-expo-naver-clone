import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: 'black',
  },
  urlContainer: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  urlText: {
    color: 'white',
  },
});

const BrowserScreen = () => {
  // MEMO: 해당 페이지로 전달된 searchParams 읽어옴.
  const params = useLocalSearchParams();
  const initialUrl = params.initialUrl as string;

  const [url, setUrl] = useState(initialUrl);
  const urlTitle = useMemo(() => url.replace('https://', '').split('/')[0], [url]);

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.urlContainer}>
        <Text style={styles.urlText}>{urlTitle}</Text>
      </View>
      <WebView
        source={{ uri: initialUrl }}
        // MEMO: 현재 접속해있는 페이지 정보를 가져올 수 있음.
        onNavigationStateChange={event => {
          setUrl(event.url);
        }}
      />
    </SafeAreaView>
  );
};

export default BrowserScreen;
