import { useLocalSearchParams } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, View } from 'react-native';
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
  loadingBarBackground: {
    height: 3,
    backgroundColor: 'white',
  },
  loadingBar: {
    height: '100%',
    backgroundColor: 'green',
    width: 0,
  },
});

const BrowserScreen = () => {
  // MEMO: 해당 페이지로 전달된 searchParams 읽어옴.
  const params = useLocalSearchParams();
  const initialUrl = params.initialUrl as string;

  const [url, setUrl] = useState(initialUrl);
  const urlTitle = useMemo(() => url.replace('https://', '').split('/')[0], [url]);

  const progressAnimation = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.safearea}>
      {/* 상단 URL 노출 부분 */}
      <View style={styles.urlContainer}>
        <Text style={styles.urlText}>{urlTitle}</Text>
      </View>
      {/* 로딩 바 */}
      <View style={styles.loadingBarBackground}>
        <Animated.View
          style={[
            styles.loadingBar,
            {
              width: progressAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
      <WebView
        source={{ uri: initialUrl }}
        // MEMO: 현재 접속해있는 페이지 정보를 가져올 수 있음.
        onNavigationStateChange={event => {
          setUrl(event.url);
        }}
        // MEMO: 로딩중일 때
        onLoadProgress={event => {
          // console.log('🚀 ~ BrowserScreen ~ event:', event.nativeEvent.progress);
          progressAnimation.setValue(event.nativeEvent.progress);
        }}
        // MEMO: 로딩 완료
        onLoadEnd={() => {
          console.log('Load End');
          progressAnimation.setValue(0);
        }}
      />
    </SafeAreaView>
  );
};

export default BrowserScreen;
