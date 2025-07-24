import { createContext, MutableRefObject, ReactNode, useCallback, useRef, useState } from 'react';
import WebView from 'react-native-webview';

interface WebViewContextType {
  webViewRefs: MutableRefObject<WebView[]>;
  addWebView: (webView: WebView) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const WebViewContext = createContext<WebViewContextType | undefined>(undefined);

const WebViewProvider = ({ children }: { children: ReactNode }) => {
  const webViewRefs = useRef<WebView[]>([]);

  const addWebView = useCallback((webView: WebView) => {
    webViewRefs.current.push(webView);
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <WebViewContext.Provider
      value={{
        webViewRefs,
        addWebView,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </WebViewContext.Provider>
  );
};

export { WebViewProvider, WebViewContext };
