import { useCallback, useContext } from 'react';
import { WebViewContext } from '../app/components/webview-provider';
import { WebViewMessageEvent } from 'react-native-webview';

const useLogin = () => {
  const context = useContext(WebViewContext);

  const loadLoggedIn = useCallback(() => {
    context?.webViewRefs.current.forEach(webView => {
      // webview에다가 document.cookie를 postMessage로 보내달라는 요청.
      // 그러면 여기서 onMessage로 받아볼 수 있게 된다.
      webView.injectJavaScript(`
        (function(){
          window.ReactNativeWebView.postMessage(document.cookie);
        })();
      `);
    });
  }, [context?.webViewRefs]);

  const onMessage = useCallback(
    (event: WebViewMessageEvent) => {
      // console.log('🚀 ~ useLogin ~ event.nativeEvent.data:', event.nativeEvent.data);
      const cookieString = event.nativeEvent.data;
      // 쿠키의 NID_SES 값이 있는지 없는지에 따라 로그인 여부 적용
      context?.setIsLoggedIn(cookieString.includes('NID_SES'));
    },
    [context],
  );

  const logout = useCallback(() => {
    context?.webViewRefs.current.forEach(webView => {
      // NID_SES 초기화
      webView.injectJavaScript(`
        (function(){
          document.cookie = 'NID_SES=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.naver.com';
          window.ReactNativeWebView.postMessage(document.cookie);
        })();
      `);
    });

    context?.setIsLoggedIn(false);

    if (context?.webViewRefs !== null) {
      context?.webViewRefs.current.forEach(webView => {
        webView.reload();
      });
    }
  }, [context]);

  return {
    loadLoggedIn,
    onMessage,
    logout,
    isLoggedIn: context?.isLoggedIn === true,
  };
};

export default useLogin;
