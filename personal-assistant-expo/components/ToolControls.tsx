import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { theme } from '@/constants/theme';

type Colors = typeof theme.light | typeof theme.dark;

export function ToolField({ label, value, onChange, placeholder, keyboardType, multiline, c }: {
  label: string; value: string; onChange: (value: string) => void; placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad'; multiline?: boolean; c: Colors;
}) {
  return <View>
    <Text style={[s.label,{color:c.muted}]}>{label}</Text>
    <TextInput value={value} onChangeText={onChange} keyboardType={keyboardType ?? 'default'}
      placeholder={placeholder} placeholderTextColor={c.muted} multiline={multiline}
      accessibilityLabel={label}
      style={[s.input,multiline&&s.textArea,{color:c.text,borderColor:c.border}]} />
  </View>;
}

export function ToolChoices({ value, options, onChange, c, label }: {
  value:string; options:{label:string;value:string}[]; onChange:(value:string)=>void; c:Colors; label:string;
}) {
  return <View accessibilityLabel={label} style={s.choices}>
    {options.map((o)=><Pressable key={o.value} onPress={()=>onChange(o.value)}
      accessibilityRole="button" accessibilityState={{selected:value===o.value}} accessibilityLabel={o.label}
      style={[s.choice,{backgroundColor:value===o.value?c.tintSoft:c.background,borderColor:value===o.value?c.tint:c.border}]}>
      <Text style={{color:value===o.value?c.tint:c.text,fontWeight:value===o.value?'800':'500'}}>{o.label}</Text>
    </Pressable>)}
  </View>;
}

export function GenerateButton({ onPress, c }: { onPress:()=>void; c:Colors }) {
  return <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="توليد رقم عشوائي"
    style={[s.primary,{backgroundColor:c.tint}]}>
    <SymbolView name={{android:'casino',ios:'dice',web:'casino'}} tintColor="#FFFFFF" size={19}/>
    <Text style={s.primaryText}>توليد رقم</Text>
  </Pressable>;
}

const s=StyleSheet.create({
 label:{fontSize:12,textAlign:'right',marginBottom:6},
 input:{height:50,borderWidth:1,borderRadius:13,paddingHorizontal:13,textAlign:'right',writingDirection:'rtl',fontSize:15,marginBottom:13},
 textArea:{minHeight:150,textAlignVertical:'top',paddingTop:13},
 choices:{flexDirection:'row-reverse',flexWrap:'wrap',gap:8,marginBottom:12},
 choice:{minHeight:44,borderWidth:1,borderRadius:12,paddingHorizontal:14,alignItems:'center',justifyContent:'center'},
 primary:{height:52,borderRadius:14,alignItems:'center',justifyContent:'center',flexDirection:'row-reverse',gap:8,marginBottom:14},
 primaryText:{color:'#FFFFFF',fontSize:15,fontWeight:'800'},
});