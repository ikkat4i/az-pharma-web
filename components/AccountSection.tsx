'use client';
import { ShoppingCart, UserRound } from 'lucide-react';
import { useStore } from './StoreProvider';

export function AccountSection(){
  const {user,cartCount,t,setAuthOpen}=useStore();
  return <section id="dashboard" className="account-section"><div className="account-inner"><div><span className="account-kicker">AZ+PHARMA</span><h2>{t('accountTitle')}</h2>{user?<p>{t('welcome')}, <strong>{user.name}</strong>.</p>:<p>{t('accountGuest')}</p>}</div>{user?<div className="account-cards"><article><UserRound/><div><small>{t('accountPhone')}</small><strong>+{user.phone}</strong></div></article><article><ShoppingCart/><div><small>{t('accountCart')}</small><strong>{cartCount}</strong></div></article></div>:<button className="primary-btn" onClick={()=>setAuthOpen(true)}>{t('accountButton')}</button>}</div></section>
}
