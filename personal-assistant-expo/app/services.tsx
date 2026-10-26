import { SymbolView } from 'expo-symbols';
import { useColorScheme, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';

export default function ServicesScreen() {
  const c = theme[useColorScheme() === 'dark' ? 'dark' : 'light'];

  return (
    <View style={[s.root, { backgroundColor: c.background }]}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={[s.title, { color: c.text }]}>الخدمات</Text>
        <Text style={[s.sub, { color: c.muted }]}>الخدمات الخارجية التي يمكن للمساعد الاتصال بها.</Text>

        <View style={[s.card, { backgroundColor: c.card, borderColor: c.border }]}>
          <View style={[s.icon, { backgroundColor: '#EAF2FF' }]}>
            <SymbolView name={{ android: 'mail', ios: 'envelope.fill', web: 'email' }} tintColor="#3972D8" size={24} />
          </View>
          <View style={s.copy}>
            <Text style={[s.name, { color: c.text }]}>Gmail</Text>
            <Text style={[s.desc, { color: c.muted }]}>قراءة البريد والبحث فيه وتحديد الرسائل التي تحتاج إلى انتباهك.</Text>
          </View>
          <Text style={[s.badge, { color: c.muted, backgroundColor: c.border }]}>قريبًا</Text>
        </View>

        <View style={[s.card, { backgroundColor: c.card, borderColor: c.border }]}>
          <View style={[s.icon, { backgroundColor: c.tintSoft }]}>
            <SymbolView name={{ android: 'calendar_month', ios: 'calendar', web: 'calendar_month' }} tintColor={c.tint} size={24} />
          </View>
          <View style={s.copy}>
            <Text style={[s.name, { color: c.text }]}>التقويم</Text>
            <Text style={[s.desc, { color: c.muted }]}>المواعيد والتنبيهات والتكامل مع Google Calendar.</Text>
          </View>
          <Text style={[s.badge, { color: c.muted, backgroundColor: c.border }]}>لاحقًا</Text>
        </View>

        <View style={[s.note, { backgroundColor: c.tintSoft }]}>
          <Text style={[s.noteTitle, { color: c.text }]}>مبدأ الخدمات</Text>
          <Text style={[s.desc, { color: c.muted }]}>كل خدمة سيكون لها مكان واحد واضح هنا، ولن تتكرر روابطها في شاشات أخرى.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  content: { padding: 20, paddingBottom: 36 },
  title: { fontSize: 28, fontWeight: '900', textAlign: 'right' },
  sub: { fontSize: 14, lineHeight: 21, marginTop: 5, textAlign: 'right' },
  card: { minHeight: 92, borderWidth: 1, borderRadius: 18, padding: 13, flexDirection: 'row-reverse', alignItems: 'center', marginTop: 13 },
  icon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, marginHorizontal: 12 },
  name: { fontSize: 16, fontWeight: '800', textAlign: 'right' },
  desc: { fontSize: 12, lineHeight: 19, marginTop: 4, textAlign: 'right', writingDirection: 'rtl' },
  badge: { fontSize: 10.5, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8 },
  note: { borderRadius: 17, padding: 16, marginTop: 18 },
  noteTitle: { fontSize: 14, fontWeight: '800', textAlign: 'right', marginBottom: 4 },
});
