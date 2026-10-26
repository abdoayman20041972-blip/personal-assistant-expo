import { useColorScheme, ScrollView, StyleSheet, Text, View, Pressable, Switch } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { theme, type ThemeColors } from '@/constants/theme';
import { useSettings } from '@/context/settings';

export default function SettingsScreen() {
  const scheme = useColorScheme();
  const c = theme[scheme === 'dark' ? 'dark' : 'light'];
  const { notifications, haptics, launchScreen, recentTools, toolDescriptions, noteAutoSave, confirmDelete,
    setNotifications, setHaptics, setLaunchScreen, setRecentTools, setToolDescriptions, setNoteAutoSave, setConfirmDelete,
  } = useSettings();

  return (
    <View style={[s.root, { backgroundColor: c.background }]}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={[s.title, { color: c.text }]}>الإعدادات</Text>
        <Text style={[s.sub, { color: c.muted }]}>مكان واحد لكل تفضيلات التطبيق، بدون تكرار أو مسارات متداخلة.</Text>

        <Section title="التجربة" color={c.muted}>
          <ToggleRow icon="notifications" title="الإشعارات" desc="تنبيهات التطبيق والخدمات المتصلة" value={notifications} onChange={setNotifications} c={c} />
          <Divider c={c} />
          <ToggleRow icon="vibration" title="الاهتزاز" desc="استجابة لمسية عند التفاعل" value={haptics} onChange={setHaptics} c={c} />
          <Divider c={c} />
          <ToggleRow icon="hourglass_empty" title="شاشة البداية" desc="عرض شاشة Personal Assistant عند فتح التطبيق" value={launchScreen} onChange={setLaunchScreen} c={c} />
        </Section>

        <Section title="المظهر واللغة" color={c.muted}>
          <InfoRow icon="dark_mode" title="المظهر" desc="سيكون قابلًا للاختيار بين النظام والفاتح والداكن" value="تلقائي" c={c} />
          <Divider c={c} />
          <InfoRow icon="language" title="اللغة" desc="لغة واجهة التطبيق الحالية" value="العربية" c={c} />
          <Divider c={c} />
          <InfoRow icon="format_size" title="حجم النص" desc="ضبط كثافة القراءة في الواجهة" value="افتراضي" c={c} />
        </Section>

        <Section title="الرئيسية والأدوات" color={c.muted}>
          <ToggleRow icon="history" title="الأدوات الأخيرة" desc="عرض الأدوات التي استخدمتها مؤخرًا في الرئيسية" value={recentTools} onChange={setRecentTools} c={c} />
          <Divider c={c} />
          <ToggleRow icon="description" title="وصف الأدوات" desc="إظهار الوصف المختصر داخل بطاقات الأدوات" value={toolDescriptions} onChange={setToolDescriptions} c={c} />
          <Divider c={c} />
          <InfoRow icon="home" title="الصفحة الافتراضية" desc="الشاشة التي تظهر عند فتح التطبيق" value="الرئيسية" c={c} />
        </Section>

        <Section title="الملاحظات" color={c.muted}>
          <ToggleRow icon="save" title="الحفظ التلقائي" desc="حفظ التغييرات أثناء تحرير الملاحظة" value={noteAutoSave} onChange={setNoteAutoSave} c={c} />
          <Divider c={c} />
          <ToggleRow icon="delete" title="تأكيد الحذف" desc="طلب تأكيد قبل حذف ملاحظة نهائيًا" value={confirmDelete} onChange={setConfirmDelete} c={c} />
          <Divider c={c} />
          <InfoRow icon="sort" title="ترتيب الملاحظات" desc="طريقة ترتيب الملاحظات في القائمة" value="آخر تعديل" c={c} />
        </Section>

        <Section title="الخزنة والأمان" color={c.muted}>
          <InfoRow icon="lock" title="القفل التلقائي" desc="قفل الخزنة بعد مغادرة التطبيق" value="سيُحدد لاحقًا" c={c} />
          <Divider c={c} />
          <InfoRow icon="fingerprint" title="البصمة / القياسات الحيوية" desc="فتح الخزنة بطريقة آمنة على الجهاز" value="سيُفعّل مع الخزنة" c={c} />
          <Divider c={c} />
          <InfoRow icon="content_copy" title="الحافظة" desc="مسح الأسرار المنسوخة بعد مدة قصيرة" value="سيُفعّل مع الخزنة" c={c} />
        </Section>

        <Section title="الخدمات والخصوصية" color={c.muted}>
          <InfoRow icon="mail" title="الحسابات المتصلة" desc="إدارة Gmail والتقويم من شاشة الخدمات" value="الخدمات" c={c} />
          <Divider c={c} />
          <InfoRow icon="privacy_tip" title="البيانات والخصوصية" desc="ما الذي يُحفظ محليًا وما الذي يحتاج اتصالًا خارجيًا" value="مدار داخل التطبيق" c={c} />
          <Divider c={c} />
          <InfoRow icon="backup" title="النسخ الاحتياطي" desc="سيُضاف فقط بعد تحديد نموذج تخزين آمن" value="لاحقًا" c={c} />
        </Section>

        <View style={[s.note, { backgroundColor: c.tintSoft }]}>
          <Text style={[s.noteTitle, { color: c.text }]}>قاعدة التنقل</Text>
          <Text style={[s.noteText, { color: c.muted }]}>الإعدادات هي المكان الوحيد للتفضيلات. الخزنة تبقى قسمًا مستقلًا في الشريط السفلي، والخدمات لها شاشة واحدة، ولا توجد أزرار رجوع داخلية.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <View style={s.section}>
      <Text style={[s.groupTitle, { color }]}>{title}</Text>
      <View style={s.card}>{children}</View>
    </View>
  );
}

function Divider({ c }: { c: ThemeColors }) {
  return <View style={[s.divider, { backgroundColor: c.border }]} />;
}

function ToggleRow({ icon, title, desc, value, onChange, c }: { icon: string; title: string; desc: string; value: boolean; onChange: (value: boolean) => void; c: ThemeColors }) {
  return (
    <View style={s.row}>
      <View style={[s.icon, { backgroundColor: c.tintSoft }]}><SymbolView name={{ android: icon as any, ios: 'circle.fill', web: icon as any }} tintColor={c.tint} size={20} /></View>
      <View style={s.copy}><Text style={[s.rowTitle, { color: c.text }]}>{title}</Text><Text style={[s.desc, { color: c.muted }]}>{desc}</Text></View>
      <Switch value={value} onValueChange={onChange} trackColor={{ false: c.border, true: c.tint }} />
    </View>
  );
}

function InfoRow({ icon, title, desc, value, c }: { icon: string; title: string; desc: string; value: string; c: ThemeColors }) {
  return (
    <View style={s.row}>
      <View style={[s.icon, { backgroundColor: c.tintSoft }]}><SymbolView name={{ android: icon as any, ios: 'circle.fill', web: icon as any }} tintColor={c.tint} size={20} /></View>
      <View style={s.copy}><Text style={[s.rowTitle, { color: c.text }]}>{title}</Text><Text style={[s.desc, { color: c.muted }]}>{desc}</Text></View>
      <Text style={[s.value, { color: c.muted }]}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '900', textAlign: 'right' },
  sub: { fontSize: 13, lineHeight: 20, marginTop: 5, textAlign: 'right' },
  section: { marginTop: 23 },
  groupTitle: { fontSize: 12, fontWeight: '800', textAlign: 'right', marginBottom: 8 },
  card: { borderRadius: 18, overflow: 'hidden', backgroundColor: 'transparent' },
  row: { minHeight: 76, padding: 13, flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: 'transparent' },
  icon: { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, marginHorizontal: 11 },
  rowTitle: { fontSize: 14.5, fontWeight: '800', textAlign: 'right' },
  desc: { fontSize: 11.5, lineHeight: 18, marginTop: 3, textAlign: 'right', writingDirection: 'rtl' },
  value: { fontSize: 11, fontWeight: '700', maxWidth: 92, textAlign: 'left' },
  divider: { height: 1, marginHorizontal: 13 },
  note: { borderRadius: 17, padding: 16, marginTop: 22 },
  noteTitle: { fontSize: 14, fontWeight: '800', textAlign: 'right' },
  noteText: { fontSize: 12, lineHeight: 20, marginTop: 5, textAlign: 'right', writingDirection: 'rtl' },
});
