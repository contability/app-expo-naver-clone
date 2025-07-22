import { router } from 'expo-router';
import { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { WebViewContext } from './components/webview-provider';

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
});

const LOGIN_URL = 'https://nid.naver.com/nidlogin.login';

const LoginScreen = () => {
  const context = useContext(WebViewContext);
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{
          uri: LOGIN_URL,
        }}
        onNavigationStateChange={event => {
          // console.log('🚀 ~ LoginScreen ~ event:', event);
          if (event.url === 'https://m.naver.com/') {
            if (context?.webViewRefs !== null) {
              context?.webViewRefs.current.forEach(webView => {
                webView.reload();
              });
            }
            router.back();
          }
        }}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
