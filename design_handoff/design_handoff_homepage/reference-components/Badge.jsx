import React from 'react';

const tones={
  sage:{background:'var(--sage)',color:'#fff'},
  gold:{background:'var(--gold)',color:'var(--charcoal)'},
  red:{background:'var(--red)',color:'#fff'},
  slate:{background:'var(--dark-slate)',color:'var(--cream)'},
  outline:{background:'transparent',color:'var(--dark-slate)',boxShadow:'inset 0 0 0 var(--border-medium) var(--dark-slate)'}
};

export function Badge({tone='sage',children,style,...rest}){
  return React.createElement('span',{style:{fontFamily:'var(--font-stamp)',fontSize:'var(--text-xs)',letterSpacing:'var(--tracking-stamp)',textTransform:'uppercase',padding:'8px 16px',borderRadius:'var(--radius-pill)',display:'inline-block',lineHeight:1.2,...tones[tone],...style},...rest},children);
}
