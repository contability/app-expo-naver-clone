import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Animated, SafeAreaView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
  navigator: {
    backgroundColor: 'black',
    // MEMO: 기본 값은 column이라 row를 명시해야 함.
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  button: {
    width: 30,
    height: 30,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  naverIconOutline: {
    borderWidth: 1,
    borderColor: 'white',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  naverIconText: {
    color: 'white',
  },
});

const NavigationButton = ({
  iconName,
  disabled,
  onPress,
}: {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  disabled?: boolean;
  onPress?: () => void;
}) => {
  const color = disabled ? 'gray' : 'white';
  return (
    <TouchableOpacity style={styles.button} disabled={disabled} onPress={onPress}>
      <MaterialCommunityIcons name={iconName} size={24} color={color} />
    </TouchableOpacity>
  );
};

const BrowserScreen = () => {
  // MEMO: 해당 페이지로 전달된 searchParams 읽어옴.
  const params = useLocalSearchParams();
  const initialUrl = params.initialUrl as string;

  const [url, setUrl] = useState(initialUrl);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const webViewRef = useRef<WebView>(null);

  const urlTitle = useMemo(() => url.replace('https://', '').split('/')[0], [url]);

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
        ref={webViewRef}
        source={{ uri: initialUrl }}
        // MEMO: 현재 접속해있는 페이지 정보를 가져올 수 있음.
        onNavigationStateChange={event => {
          // console.log('🚀 ~ BrowserScreen ~ event:', event);

          setUrl(event.url);
          setCanGoBack(event.canGoBack);
          setCanGoForward(event.canGoForward);
        }}
        // MEMO: 로딩중일 때
        onLoadProgress={event => {
          // console.log('🚀 ~ BrowserScreen ~ event:', event.nativeEvent.progress);
          progressAnimation.setValue(event.nativeEvent.progress);
        }}
        // MEMO: 로딩 완료
        onLoadEnd={() => {
          // console.log('Load End');
          progressAnimation.setValue(0);
        }}
      />
      <View style={styles.navigator}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.back();
          }}
        >
          <View style={styles.naverIconOutline}>
            <Text style={styles.naverIconText}>N</Text>
          </View>
        </TouchableOpacity>
        <NavigationButton
          iconName="arrow-left"
          disabled={!canGoBack}
          onPress={() => {
            // WebView에 쌓인 히스토리를 참조해서 goBack
            webViewRef.current?.goBack();
          }}
        />
        <NavigationButton
          iconName="arrow-right"
          disabled={!canGoForward}
          onPress={() => {
            // WebView에 쌓인 히스토리를 참조해서 goForward
            webViewRef.current?.goForward();
          }}
        />
        <NavigationButton
          iconName="refresh"
          onPress={() => {
            webViewRef.current?.reload();
          }}
        />
        <NavigationButton
          iconName="share-outline"
          onPress={() => {
            Share.share({
              message: url,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default BrowserScreen;
