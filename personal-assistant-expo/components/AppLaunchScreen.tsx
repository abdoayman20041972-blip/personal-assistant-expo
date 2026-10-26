import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { theme } from '@/constants/theme';

type Props = { onFinish: () => void };

export default function AppLaunchScreen({ onFinish }: Props) {
  const scheme = useColorScheme();
  const c = theme[scheme === 'dark' ? 'dark' : 'light'];
  const progress = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.94)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(progress, { toValue: 1, duration: 650, useNativeDriver: false }),
      Animated.spring(scale, { toValue: 1, damping: 16, stiffness: 140, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: 220, useNativeDriver: true }).start(() => onFinish());
    }, 760);

    return () => clearTimeout(timer);
  }, [onFinish, opacity, progress, scale]);

  return (
    <Animated.View style={[styles.root, { opacity, backgroundColor: c.background }]}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Image source={require('../assets/images/icon.png')} style={styles.icon} resizeMode="contain" accessibilityRole="image" accessibilityLabel="أيقونة Personal Assistant" />
      </Animated.View>
      <Text style={[styles.title, { color: c.text }]}>Personal Assistant</Text>
      <Text style={[styles.subtitle, { color: c.muted }]}>مساحتك الشخصية للأدوات والملاحظات والخدمات</Text>
      <View style={[styles.track, { backgroundColor: c.border }]}>
        <Animated.View
          style={[
            styles.progress,
            {
              backgroundColor: c.tint,
              width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
            },
          ]}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { ...StyleSheet.absoluteFill, zIndex: 100, alignItems: 'center', justifyContent: 'center', padding: 28 },
  icon: { width: 112, height: 112, borderRadius: 28 },
  title: { fontSize: 23, fontWeight: '900', marginTop: 22 },
  subtitle: { fontSize: 12.5, textAlign: 'center', marginTop: 7, maxWidth: 290, lineHeight: 20 },
  track: { width: 150, height: 4, borderRadius: 4, overflow: 'hidden', marginTop: 28 },
  progress: { height: 4, borderRadius: 4 },
});
