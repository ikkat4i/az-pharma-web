'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import { useStore } from './StoreProvider';

export function AuthModal(){
  const {authOpen,setAuthOpen,login,register,t}=useStore();
  const [mode,setMode]=useState<'login'|'register'>('login');
  const [form,setForm]=useState({name:'',phone:'',password:''});
  const [error,setError]=useState('');
  if(!authOpen)return null;
  const submit=(e:React.FormEvent)=>{
    e.preventDefault();
    const result=mode==='login'?login(form.phone,form.password):register({name:form.name,phone:form.phone},form.password);
    if(result)setError(result);else{setError('');setAuthOpen(false)}
  };
  return <div className="modal-backdrop" onMouseDown={()=>setAuthOpen(false)}><div className="auth-modal" onMouseDown={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setAuthOpen(false)} aria-label="Cerrar"><X/></button><div className="auth-logo">AZ<span>+</span>PHARMA</div><h2>{mode==='login'?t('loginTitle'):t('registerTitle')}</h2><form onSubmit={submit}>{mode==='register'&&<label>{t('name')}<input autoComplete="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>}<label>{t('phone')}<input inputMode="tel" autoComplete="tel" placeholder="0973 694377" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label><label>{t('password')}<input type="password" autoComplete={mode==='login'?'current-password':'new-password'} value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>{error&&<p className="auth-error">{error}</p>}<button className="auth-submit" type="submit">{mode==='login'?t('loginButton'):t('registerButton')}</button></form><p className="auth-switch">{mode==='login'?t('noAccount'):t('hasAccount')} <button onClick={()=>{setMode(mode==='login'?'register':'login');setError('')}}>{mode==='login'?t('create'):t('backLogin')}</button></p></div></div>
}
