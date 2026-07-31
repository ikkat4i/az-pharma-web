'use client';
import { Award, LockKeyhole, ShieldCheck } from 'lucide-react';
import { useStore } from './StoreProvider';
export function Benefits(){const {t}=useStore();const items=[{icon:ShieldCheck,title:t('certified'),text:t('certifiedText'),tone:'blue'},{icon:LockKeyhole,title:t('secure'),text:t('secureText'),tone:'green'},{icon:Award,title:t('quality'),text:t('qualityText'),tone:'purple'}];return <section id="beneficios" className="benefits section-shell"><div className="benefits-title"><h2>{t('benefitsTitle')}</h2><p>{t('benefitsSub')}</p></div><div className="benefit-grid">{items.map(({icon:Icon,title,text,tone})=><article className="benefit-card" key={title}><div className={`benefit-icon ${tone}`}><Icon/></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>}
