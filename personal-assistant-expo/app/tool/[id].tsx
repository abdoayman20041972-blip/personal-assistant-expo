import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { SymbolView } from 'expo-symbols';
import { tools } from '@/data/tools';
import { calculateTool } from '@/data/tool-engine';
import { theme } from '@/constants/theme';
import { useRecentTools } from '@/context/recent-tools';
import { ToolField, ToolChoices, GenerateButton } from '@/components/ToolControls';

export default function ToolDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const c = theme[useColorScheme() === 'dark' ? 'dark' : 'light'];
  const tool = tools.find((item) => item.id === id);
  const [values, setValues] = useState<Record<string,string>>({});
  const { recordToolUse } = useRecentTools();
  useEffect(() => { if (tool) recordToolUse(tool.id); }, [tool, recordToolUse]);
  const results = useMemo(() => tool ? calculateTool(tool.id, values) : [], [tool, values]);
  const set = (key:string, value:string) => setValues(v => ({...v,[key]:value}));
  if (!tool) return <View style={[s.center,{backgroundColor:c.background}]}><Text style={{color:c.text}}>الأداة غير موجودة</Text></View>;

  const fields = () => {
    switch (tool.id) {
      case 'discount': return <><ToolField label="السعر الأصلي" value={values.amount??''} onChange={v=>set('amount',v)} placeholder="1000" keyboardType="decimal-pad" c={c}/><ToolField label="نسبة الخصم ٪" value={values.rate??''} onChange={v=>set('rate',v)} placeholder="20" keyboardType="decimal-pad" c={c}/></>;
      case 'room-area': return <View style={s.row}><View style={s.half}><ToolField label="الطول (م)" value={values.length??''} onChange={v=>set('length',v)} placeholder="4" keyboardType="decimal-pad" c={c}/></View><View style={s.half}><ToolField label="العرض (م)" value={values.width??''} onChange={v=>set('width',v)} placeholder="3.5" keyboardType="decimal-pad" c={c}/></View></View>;
      case 'unit-converter': return <><ToolField label="القيمة" value={values.value??''} onChange={v=>set('value',v)} placeholder="5" keyboardType="decimal-pad" c={c}/><Text style={[s.label,{color:c.muted}]}>من</Text><ToolChoices value={values.unit??'kg'} onChange={v=>set('unit',v)} c={c} label="الوحدة الأصلية" options={[{label:'كجم',value:'kg'},{label:'رطل',value:'lb'},{label:'متر',value:'m'},{label:'قدم',value:'ft'},{label:'كم',value:'km'},{label:'ميل',value:'mi'},{label:'سم',value:'cm'},{label:'بوصة',value:'in'},{label:'°C',value:'c'},{label:'°F',value:'f'},{label:'لتر',value:'l'},{label:'جالون',value:'gal'}]}/><Text style={[s.label,{color:c.muted}]}>إلى</Text><ToolChoices value={values.target??'lb'} onChange={v=>set('target',v)} c={c} label="الوحدة المطلوبة" options={[{label:'كجم',value:'kg'},{label:'رطل',value:'lb'},{label:'متر',value:'m'},{label:'قدم',value:'ft'},{label:'كم',value:'km'},{label:'ميل',value:'mi'},{label:'سم',value:'cm'},{label:'بوصة',value:'in'},{label:'°C',value:'c'},{label:'°F',value:'f'},{label:'لتر',value:'l'},{label:'جالون',value:'gal'}]}/></>;
      case 'age': return <><ToolField label="تاريخ الميلاد" value={values.birthDate??''} onChange={v=>set('birthDate',v)} placeholder="DD/MM/YYYY" c={c}/><ToolField label="الحساب حتى" value={values.asOfDate??''} onChange={v=>set('asOfDate',v)} placeholder="اتركه فارغًا لحساب اليوم" c={c}/></>;
      case 'fuel': return <><ToolField label="المسافة (كم)" value={values.distance??''} onChange={v=>set('distance',v)} placeholder="250" keyboardType="decimal-pad" c={c}/><ToolField label="الاستهلاك (لتر/100 كم)" value={values.consumption??''} onChange={v=>set('consumption',v)} placeholder="8" keyboardType="decimal-pad" c={c}/><ToolField label="سعر اللتر" value={values.fuelPrice??''} onChange={v=>set('fuelPrice',v)} placeholder="20" keyboardType="decimal-pad" c={c}/><ToolField label="عدد الأشخاص" value={values.passengers??''} onChange={v=>set('passengers',v)} placeholder="4" keyboardType="numeric" c={c}/></>;
      case 'random': return <><View style={s.row}><View style={s.half}><ToolField label="من" value={values.min??''} onChange={v=>set('min',v)} placeholder="1" keyboardType="numeric" c={c}/></View><View style={s.half}><ToolField label="إلى" value={values.max??''} onChange={v=>set('max',v)} placeholder="100" keyboardType="numeric" c={c}/></View></View><GenerateButton onPress={()=>set('_run',String(Date.now()))} c={c}/></>;
      case 'text-tools': return <><ToolField label="النص" value={values.text??''} onChange={v=>set('text',v)} placeholder="اكتب أو الصق النص هنا" multiline c={c}/><Text style={[s.label,{color:c.muted}]}>العملية</Text><ToolChoices value={values.operation??'count'} onChange={v=>set('operation',v)} c={c} label="عملية النص" options={[{label:'عدد',value:'count'},{label:'تنظيف',value:'clean'},{label:'أحرف كبيرة',value:'upper'},{label:'أحرف صغيرة',value:'lower'}]}/></>;
      case 'scientific': return <><Text style={[s.label,{color:c.muted}]}>نوع الحساب</Text><ToolChoices value={values.operation??'molarity'} onChange={v=>set('operation',v)} c={c} label="نوع الحساب العلمي" options={[{label:'مولارية',value:'molarity'},{label:'كثافة',value:'density'},{label:'pH',value:'ph'}]}/>{values.operation!=='ph'&&<ToolField label={values.operation==='density'?'الكتلة':'عدد المولات'} value={values.a??''} onChange={v=>set('a',v)} placeholder="0.5" keyboardType="decimal-pad" c={c}/>} {values.operation!=='ph'&&<ToolField label="الحجم" value={values.b??''} onChange={v=>set('b',v)} placeholder="2" keyboardType="decimal-pad" c={c}/>} {values.operation==='ph'&&<ToolField label="تركيز +H" value={values.a??''} onChange={v=>set('a',v)} placeholder="0.001" keyboardType="decimal-pad" c={c}/>}</>;
      default: return null;
    }
  };

  return <View style={[s.root,{backgroundColor:c.background}]}><ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
    <View style={[s.hero,{backgroundColor:c.card,borderColor:c.border}]}><View style={[s.icon,{backgroundColor:c.tintSoft}]}><SymbolView name={{android:tool.icon as any,ios:'function',web:'function'}} tintColor={c.tint} size={25}/></View><Text style={[s.category,{color:c.muted}]}>{tool.category}</Text><Text style={[s.title,{color:c.text}]}>{tool.title}</Text><Text style={[s.description,{color:c.muted}]}>{tool.description}</Text></View>
    <View style={[s.panel,{backgroundColor:c.card,borderColor:c.border}]}><Text style={[s.panelTitle,{color:c.text}]}>أدخل القيم</Text>{fields()}<View style={[s.result,{backgroundColor:c.tintSoft}]}>{results.length?results.map(r=><View key={r.label} style={s.resultItem}><Text style={[s.resultLabel,{color:c.muted}]}>{r.label}</Text><Text style={[s.resultValue,{color:r.tone==='success'?c.success:r.tone==='danger'?c.danger:c.text}]}>{r.value}</Text></View>):<Text style={[s.resultLabel,{color:c.muted}]}>أدخل القيم لعرض النتيجة</Text>}</View></View>
  </ScrollView></View>;
}

const s=StyleSheet.create({
 root:{flex:1},content:{padding:20,paddingBottom:35},center:{flex:1,alignItems:'center',justifyContent:'center'},
 hero:{borderWidth:1,borderRadius:20,padding:18,alignItems:'flex-end'},icon:{width:50,height:50,borderRadius:15,alignItems:'center',justifyContent:'center',marginBottom:12},category:{fontSize:11},title:{fontSize:25,fontWeight:'800',marginTop:2},description:{fontSize:13,lineHeight:21,textAlign:'right',marginTop:6},
 panel:{borderWidth:1,borderRadius:20,padding:17,marginTop:13},panelTitle:{fontSize:17,fontWeight:'800',textAlign:'right',marginBottom:16},label:{fontSize:12,textAlign:'right',marginBottom:6},row:{flexDirection:'row-reverse',gap:10},half:{flex:1},input:{height:50,borderWidth:1,borderRadius:13,paddingHorizontal:13,textAlign:'right',writingDirection:'rtl',fontSize:15,marginBottom:13},textArea:{minHeight:150,textAlignVertical:'top',paddingTop:13},result:{borderRadius:16,padding:16,marginTop:5},resultItem:{alignItems:'center',marginBottom:10},resultLabel:{fontSize:12},resultValue:{fontSize:24,fontWeight:'900',marginTop:4}
});