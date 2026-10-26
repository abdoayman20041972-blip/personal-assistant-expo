import { SymbolView } from 'expo-symbols';
import { useRouter } from 'expo-router';
import { useColorScheme, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '@/constants/theme';
import { tools } from '@/data/tools';
import { useRecentTools } from '@/context/recent-tools';

export default function HomeScreen() {
  const router = useRouter();
  const c = theme[useColorScheme() === 'dark' ? 'dark' : 'light'];
  const { recentToolIds } = useRecentTools();
  const recentTools = recentToolIds
    .map((id) => tools.find((tool) => tool.id === id))
    .filter((tool): tool is (typeof tools)[number] => Boolean(tool));
  const displayedRecentTools = recentTools.length ? recentTools : tools.slice(0, 3);

  return (
    <View style={[styles.root,{backgroundColor:c.background}]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerCopy}><Text style={[styles.eyebrow,{color:c.muted}]}>مساحتك اليومية</Text><Text style={[styles.title,{color:c.text}]}>مساعدك الشخصي</Text></View>
          <View style={[styles.avatar,{backgroundColor:c.tintSoft}]}><SymbolView name={{android:'person',ios:'person.fill',web:'person'}} tintColor={c.tint} size={23}/></View>
        </View>

        <Pressable accessibilityRole="button" accessibilityLabel="فتح البحث" onPress={()=>router.push('/search')} style={[styles.search,{backgroundColor:c.card,borderColor:c.border}]}>
          <SymbolView name={{android:'search',ios:'magnifyingglass',web:'search'}} tintColor={c.muted} size={22}/>
          <Text style={[styles.searchText,{color:c.muted}]}>ابحث عن أداة أو ملاحظة...</Text>
          <View style={[styles.searchKey,{backgroundColor:c.tintSoft}]}><Text style={[styles.searchKeyText,{color:c.tint}]}>بحث</Text></View>
        </Pressable>

        <View style={styles.sectionHeader}><Text style={[styles.sectionTitle,{color:c.text}]}>أدواتك الأخيرة</Text></View>
        {displayedRecentTools.map(t=><Pressable accessibilityRole="button" accessibilityLabel={`فتح أداة ${t.title}`} key={t.id} onPress={()=>router.push(`/tool/${t.id}`)} style={[styles.toolRow,{backgroundColor:c.card,borderColor:c.border}]}>
          <View style={[styles.toolIcon,{backgroundColor:c.tintSoft}]}><SymbolView name={{android:t.icon as any,ios:'function',web:'function'}} tintColor={c.tint} size={21}/></View>
          <View style={styles.toolCopy}><Text style={[styles.toolTitle,{color:c.text}]}>{t.title}</Text><Text style={[styles.toolSub,{color:c.muted}]}>{t.description}</Text></View>
          <SymbolView name={{android:'chevron_left',ios:'chevron.left',web:'chevron_left'}} tintColor={c.muted} size={20}/>
        </Pressable>)}

        <Text style={[styles.sectionTitle,{color:c.text,marginTop:22}]}>الخدمات</Text>
        <View style={styles.serviceRow}>
          <View style={[styles.service,{backgroundColor:c.card,borderColor:c.border}]}>
            <View style={[styles.serviceIcon,{backgroundColor:'#EAF2FF'}]}><SymbolView name={{android:'mail',ios:'envelope.fill',web:'email'}} tintColor="#3972D8" size={22}/></View>
            <View style={styles.toolCopy}><Text style={[styles.toolTitle,{color:c.text}]}>Gmail</Text><Text style={[styles.toolSub,{color:c.muted}]}>سيظهر داخل شاشة الخدمات عند تنفيذ التكامل</Text></View>
            <Text style={[styles.link,{color:c.muted}]}>لاحقًا</Text>
          </View>
          <View style={[styles.service,{backgroundColor:c.card,borderColor:c.border}]}>
            <View style={[styles.serviceIcon,{backgroundColor:c.tintSoft}]}><SymbolView name={{android:'calendar_month',ios:'calendar',web:'calendar_month'}} tintColor={c.tint} size={22}/></View>
            <View style={styles.toolCopy}><Text style={[styles.toolTitle,{color:c.text}]}>التقويم</Text><Text style={[styles.toolSub,{color:c.muted}]}>سيضاف داخل شاشة الخدمات نفسها</Text></View>
            <Text style={[styles.link,{color:c.muted}]}>لاحقًا</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles=StyleSheet.create({
root:{flex:1},content:{paddingHorizontal:20,paddingTop:22,paddingBottom:30},header:{flexDirection:'row-reverse',alignItems:'center',justifyContent:'space-between',marginBottom:18},headerCopy:{alignItems:'flex-end'},eyebrow:{fontSize:13,marginBottom:3},title:{fontSize:27,fontWeight:'800'},avatar:{width:44,height:44,borderRadius:22,alignItems:'center',justifyContent:'center'},
search:{height:54,borderWidth:1,borderRadius:16,flexDirection:'row-reverse',alignItems:'center',paddingHorizontal:14,marginBottom:25},searchText:{flex:1,fontSize:14,textAlign:'right',marginHorizontal:10},searchKey:{paddingHorizontal:9,paddingVertical:5,borderRadius:8},searchKeyText:{fontSize:11,fontWeight:'800'},
sectionTitle:{fontSize:17,fontWeight:'800',textAlign:'right'},quickRow:{flexDirection:'row-reverse',gap:10,marginTop:12,marginBottom:25},quickCard:{flex:1,minHeight:105,borderWidth:1,borderRadius:18,padding:13,justifyContent:'space-between'},quickIcon:{width:40,height:40,borderRadius:12,alignItems:'center',justifyContent:'center'},quickLabel:{fontSize:14,fontWeight:'700',textAlign:'right'},
sectionHeader:{flexDirection:'row-reverse',alignItems:'center',justifyContent:'flex-start',marginBottom:12},link:{fontSize:12.5,fontWeight:'700'},toolRow:{minHeight:76,borderWidth:1,borderRadius:16,flexDirection:'row-reverse',alignItems:'center',padding:12,marginBottom:9},toolIcon:{width:44,height:44,borderRadius:13,alignItems:'center',justifyContent:'center'},toolCopy:{flex:1,marginHorizontal:12},toolTitle:{fontSize:15,fontWeight:'700',textAlign:'right'},toolSub:{fontSize:12.5,marginTop:3,textAlign:'right',lineHeight:18},serviceRow:{gap:9},service:{minHeight:76,borderWidth:1,borderRadius:16,flexDirection:'row-reverse',alignItems:'center',padding:12},serviceIcon:{width:44,height:44,borderRadius:13,alignItems:'center',justifyContent:'center'}
});
