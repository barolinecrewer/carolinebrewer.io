import React from 'react';

/* Interim glyph set: Phosphor (loaded by tokens/icons.css). Names are Phosphor names, e.g. "envelope". */
export const ICONS={mail:'envelope',search:'magnifying-glass',arrow:'arrow-right',arrowUpRight:'arrow-up-right',rss:'rss',phone:'phone',download:'download-simple',menu:'list',plus:'plus',minus:'minus',close:'x',github:'github-logo',linkedin:'linkedin-logo'};

export function Icon({name,weight='regular',size=20,color,accent,label,style,...rest}){
  const ph=ICONS[name]||name;
  const css={fontSize:typeof size==='number'?size+'px':size,color:color||'currentColor',...(accent?{'--icon-accent':accent}:null),...style};
  return React.createElement('i',{className:(weight==='duotone'?'ph-duotone':'ph')+' ph-'+ph+' cb-icon',style:css,role:label?'img':undefined,'aria-label':label,'aria-hidden':label?undefined:true,...rest});
}
