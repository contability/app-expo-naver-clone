import { router } from 'expo-router';
import { useCallback, useContext, useRef, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { WebViewContext } from '../components/webview-provider';

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
});

const SHOPPING_HOME_URL = 'https://shopping.naver.com';

const ShoppingScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const webViewRef = useRef<WebView>(null);

  const context = useContext(WebViewContext);

  const handleRefresh = useCallback(() => {
    if (webViewRef.current) {
      setRefreshing(true);
      webViewRef.current.reload();
    }
  }, []);
  return (
    <SafeAreaView style={styles.safearea}>
      {/* ScrollView에는 2개의 스타일이 있음. */}
      <ScrollView
        // 컨테이너의 스타일
        // style={{ backgroundColor: 'red' }}
        // 컨테이너 안의 콘텐츠의 스타일
        contentContainerStyle={{
          flex: 1,
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        <WebView
          ref={ref => {
            if (ref !== null) {
              webViewRef.current = ref;
              context?.addWebView(ref);
            }
          }}
          source={{
            uri: SHOPPING_HOME_URL,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onShouldStartLoadWithRequest={request => {
            // 네이버 쇼핑 도메인 내부 URL은 WebView에서 처리
            if (request.url.startsWith(SHOPPING_HOME_URL) || request.mainDocumentURL?.startsWith(SHOPPING_HOME_URL))
              return true;

            // 외부 URL(https://)은 browser 화면으로 라우팅
            if (request.url !== null && request.url.startsWith('https://')) {
              router.navigate({
                pathname: 'browser',
                params: { initialUrl: request.url },
              });
              return false;
            }

            // 그 외 URL은 WebView에서 처리
            return true;
          }}
          // 웹뷰 로딩이 끝나면 실행될 함수 (only 성공했을 때만.)
          onLoad={() => {
            setRefreshing(false);
          }}
          // 밑에 2개는 기본 로딩 UI를 빈 프라그먼트로 제거하는 props
          renderLoading={() => <></>}
          startInLoadingState={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShoppingScreen;
