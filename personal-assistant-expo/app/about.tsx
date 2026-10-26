import { SymbolView } from 'expo-symbols';
import { useColorScheme, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';

export default function AboutScreen() {
  const c = theme[useColorScheme() === 'dark' ? 'dark' : 'light'];

  return (
    <View style={[s.root, { backgroundColor: c.background }]}>
      <ScrollView contentContainerStyle={s.content}>
        <View style={[s.hero, { backgroundColor: c.card, borderColor: c.border }]}>
          <View style={[s.iconWrap, { backgroundColor: c.tintSoft }]}>
            <SymbolView name={{ android: 'person', ios: 'person.fill', web: 'person' }} tintColor={c.tint} size={34} />
          </View>
          <Text style={[s.title, { color: c.text }]}>Personal Assistant</Text>
          <Text style={[s.sub, { color: c.muted }]}>مساحة شخصية تجمع الأدوات والملاحظات والخزنة الآمنة والخدمات.</Text>
          <Text style={[s.version, { color: c.muted }]}>الإصدار 0.1.0</Text>
        </View>

        <View style={[s.card, { backgroundColor: c.card, borderColor: c.border }]}>
          <Text style={[s.cardTitle, { color: c.text }]}>عن التطبيق</Text>
          <Text style={[s.body, { color: c.muted }]}>التطبيق مبني ليجمع الأدوات اليومية والبيانات الشخصية في تجربة واحدة بسيطة، مع فصل واضح بين المحتوى العادي والبيانات الحساسة.</Text>
        </View>

        <View style={[s.card, { backgroundColor: c.card, borderColor: c.border }]}>
          <Text style={[s.cardTitle, { color: c.text }]}>الخصوصية</Text>
          <Text style={[s.body, { color: c.muted }]}>لن تُضاف أي خدمة خارجية أو صلاحية حساسة إلا عندما يكون لها سبب واضح وتدفق موافقة صريح.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  content: { padding: 20, paddingBottom: 36 },
  hero: { borderWidth: 1, borderRadius: 22, padding: 22, alignItems: 'center' },
  iconWrap: { width: 72, height: 72, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '900', marginTop: 15 },
  sub: { fontSize: 13, lineHeight: 21, textAlign: 'center', marginTop: 7, maxWidth: 310 },
  version: { fontSize: 11.5, marginTop: 12 },
  card: { borderWidth: 1, borderRadius: 18, padding: 17, marginTop: 13 },
  cardTitle: { fontSize: 15, fontWeight: '800', textAlign: 'right' },
  body: { fontSize: 12.5, lineHeight: 21, textAlign: 'right', marginTop: 7, writingDirection: 'rtl' },
});
