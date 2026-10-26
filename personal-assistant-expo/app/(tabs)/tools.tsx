import { SymbolView } from 'expo-symbols';
import { useColorScheme, ScrollView, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { tools, categories } from '@/data/tools';
import { theme } from '@/constants/theme';

export default function ToolsScreen() {
  const c = theme[useColorScheme() === 'dark' ? 'dark' : 'light'];
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('الكل');

  const filtered = useMemo(() => tools.filter((tool) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || [tool.title, tool.description, tool.category, ...tool.keywords].some((v) => v.toLowerCase().includes(q));
    return matchesQuery && (category === 'الكل' || tool.category === category);
  }), [query, category]);

  return (
    <View style={[s.root,{backgroundColor:c.background}]}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={[s.title,{color:c.text}]}>الأدوات</Text>
        <Text style={[s.sub,{color:c.muted}]}>ابحث عن الأداة التي تحتاجها بدل تصفح قوائم طويلة.</Text>
        <View style={[s.search,{backgroundColor:c.card,borderColor:c.border}]}>
          <SymbolView name={{android:'search',ios:'magnifyingglass',web:'search'}} tintColor={c.muted} size={21}/>
          <TextInput value={query} onChangeText={setQuery} placeholder="مثال: خصم 20% أو كيلو" placeholderTextColor={c.muted} style={[s.input,{color:c.text}]} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filters}>
          {['الكل',...categories].map((item) => {
            const active = category === item;
            return <Pressable accessibilityRole="button" accessibilityState={{selected:active}} accessibilityLabel={`تصفية الأدوات حسب ${item}`} key={item} onPress={()=>setCategory(item)} style={[s.filter,{backgroundColor:active?c.tint:c.card,borderColor:active?c.tint:c.border}]}>
              <Text style={[s.filterText,{color:active?'#FFF':c.text}]}>{item}</Text>
            </Pressable>;
          })}
        </ScrollView>
        <Text style={[s.count,{color:c.muted}]}>{filtered.length} أدوات</Text>
        {filtered.map((tool) => (
          <Pressable accessibilityRole="button" accessibilityLabel={`فتح أداة ${tool.title}`} key={tool.id} onPress={()=>router.push(`/tool/${tool.id}`)} style={[s.card,{backgroundColor:c.card,borderColor:c.border}]}>
            <View style={[s.icon,{backgroundColor:c.tintSoft}]}>
              <SymbolView name={{android:tool.icon as any,ios:'square.grid.2x2.fill',web:'menu'}} tintColor={c.tint} size={23}/>
            </View>
            <View style={s.copy}>
              <Text style={[s.cat,{color:c.muted}]}>{tool.category}</Text>
              <Text style={[s.itemTitle,{color:c.text}]}>{tool.title}</Text>
              <Text style={[s.desc,{color:c.muted}]}>{tool.description}</Text>
            </View>
            <SymbolView name={{android:'chevron_left',ios:'chevron.left',web:'chevron_left'}} tintColor={c.muted} size={20}/>
          </Pressable>
        ))}
        {filtered.length === 0 && <View style={[s.empty,{backgroundColor:c.card,borderColor:c.border}]}>
          <Text style={[s.emptyTitle,{color:c.text}]}>لم نجد أداة مطابقة</Text>
          <Text style={[s.desc,{color:c.muted}]}>جرّب كلمة أقصر أو اختر تصنيفًا آخر.</Text>
        </View>}
      </ScrollView>
    </View>
  );
}
const s=StyleSheet.create({
root:{flex:1},content:{padding:20,paddingBottom:30},title:{fontSize:28,fontWeight:'800',textAlign:'right'},sub:{fontSize:14,marginTop:5,marginBottom:18,textAlign:'right',lineHeight:21},
search:{height:52,borderWidth:1,borderRadius:16,flexDirection:'row-reverse',alignItems:'center',paddingHorizontal:14},input:{flex:1,fontSize:14,marginLeft:9,textAlign:'right',writingDirection:'rtl'},
filters:{gap:8,paddingVertical:14},filter:{borderWidth:1,borderRadius:20,paddingHorizontal:14,paddingVertical:9},filterText:{fontSize:12,fontWeight:'700'},count:{fontSize:12,textAlign:'right',marginBottom:9},
card:{borderWidth:1,borderRadius:18,padding:13,flexDirection:'row-reverse',alignItems:'center',marginBottom:10,minHeight:88},icon:{width:46,height:46,borderRadius:14,alignItems:'center',justifyContent:'center'},copy:{flex:1,marginHorizontal:12},cat:{fontSize:11,textAlign:'right'},itemTitle:{fontSize:16,fontWeight:'800',marginTop:2,textAlign:'right'},desc:{fontSize:12,marginTop:3,textAlign:'right',writingDirection:'rtl',lineHeight:18},empty:{borderWidth:1,borderRadius:18,padding:25,alignItems:'center',marginTop:12},emptyTitle:{fontSize:16,fontWeight:'800',marginBottom:6}
});