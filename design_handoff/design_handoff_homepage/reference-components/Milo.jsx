import React from 'react';

const INK={tomato:'var(--tomato)',cobalt:'var(--cobalt)',yolk:'var(--yolk)',kelly:'var(--kelly)',ink:'var(--v2-ink)',cream:'var(--v2-cream)'};

export function Milo({pose='point',ink='tomato',fill='none',width,label='Milo, a German pointer mix',style,...rest}){
  const inkC=INK[ink]||ink, fillC=fill==='none'?null:(INK[fill]||fill);
  return React.createElement('span',{className:'milo milo--'+pose,role:'img','aria-label':label,style:{width,...style},...rest},
    fillC&&React.createElement('span',{className:'milo-fill',style:{background:fillC}}),
    React.createElement('span',{className:'milo-ink',style:{background:inkC}}));
}
