import { router } from 'expo-router';
import { useContext, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { WebViewContext } from '../components/webview-provider';
import useLogin from '../../hooks/use-login';

const styles = StyleSheet.create({
  safearea: {
    //MEMO: paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});

const HomeScreen = () => {
  const context = useContext(WebViewContext);
  const { loadLoggedIn, onMessage } = useLogin();
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        ref={ref => {
          if (ref !== null) context?.addWebView(ref);
        }}
        source={{ uri: 'https://m.naver.com' }}
        //MEMO: true를 return하게 되면 이 웹뷰에서 로딩을 해주고 그 외의 사이트들은 로딩을 하지 말라는 명령이 됨.
        onShouldStartLoadWithRequest={request => {
          // console.log(request);
          if (
            request.url.startsWith('https://m.naver.com') ||
            request.mainDocumentURL?.startsWith('https://m.naver.com')
          )
            return true;

          // MEMO: url에 about:blank 이런식의 값이 들어가있을 때도 있으니 https:// 로 시작하는 것만 허용.
          if (request.url !== null && request.url.startsWith('https://')) {
            // MEMO: browser screen으로 이동 시켜버리기.
            router.navigate({
              pathname: 'browser',
              params: { initialUrl: request.url },
            });
            return false;
          }
          return true;
        }}
        // MEMO: 세로 스크롤 스타일 제거
        showsVerticalScrollIndicator={false}
        // MEMO: 가로 스크롤 스타일 제거
        showsHorizontalScrollIndicator={false}
        onLoadEnd={() => {
          loadLoggedIn();
        }}
        onMessage={onMessage}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
