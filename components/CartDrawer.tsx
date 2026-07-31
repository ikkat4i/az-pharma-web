'use client';
import Image from 'next/image';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useStore } from './StoreProvider';
const WHATSAPP_NUMBER=(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||'595973694377').replace(/\D/g,'');
export function CartDrawer(){const {cart,cartOpen,setCartOpen,removeFromCart,changeQuantity,clearCart,t,user,createOrder,formatPrice,currency,lang}=useStore();if(!cartOpen)return null;const checkout=()=>{
  if(!cart.length)return;
  const order=createOrder();
  const copy={
    es:{
      greeting:'Hola AZ+PHARMA, quiero realizar este pedido',
      consult:'Consultar precio',
      customer:'Cliente',
      phone:'Teléfono',
      currency:'Moneda visualizada',
      note:'Los precios convertidos son referenciales. ¿Podrían confirmarme disponibilidad, receta y total final?'
    },
    pt:{
      greeting:'Olá AZ+PHARMA, gostaria de fazer este pedido',
      consult:'Consultar preço',
      customer:'Cliente',
      phone:'Telefone',
      currency:'Moeda exibida',
      note:'Os preços convertidos são referenciais. Poderiam confirmar a disponibilidade, a receita e o valor total final?'
    },
    en:{
      greeting:'Hello AZ+PHARMA, I would like to place this order',
      consult:'Ask for price',
      customer:'Customer',
      phone:'Phone',
      currency:'Displayed currency',
      note:'Converted prices are for reference only. Could you please confirm availability, prescription requirements, and the final total?'
    }
  }[lang];
  const lines=cart.map(item=>`• ${item.product.name} x${item.quantity} — ${item.product.priceUSD!==null?formatPrice(item.product.priceUSD*item.quantity):copy.consult}`).join('\n');
  const customer=user?`\n${copy.customer}: ${user.name}\n${copy.phone}: ${user.phone}`:'';
  const msg=`${copy.greeting}${order?` (${order.id})`:''}:\n\n${lines}${customer}\n\n${copy.currency}: ${currency}. ${copy.note}`;
  clearCart();
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,'_blank','noopener,noreferrer')
};return <div className="drawer-backdrop" onMouseDown={()=>setCartOpen(false)}><aside className="cart-drawer" onMouseDown={e=>e.stopPropagation()}><div className="drawer-head"><h2><ShoppingBag/>{t('cart')}</h2><button onClick={()=>setCartOpen(false)}><X/></button></div>{cart.length===0?<div className="empty-cart"><ShoppingBag/><p>{t('empty')}</p></div>:<><div className="cart-list">{cart.map(({product,quantity})=><article className="cart-row" key={product.id}><div className="cart-thumb"><Image src={product.image} alt={product.name} fill sizes="80px" quality={100} unoptimized /></div><div className="cart-info"><strong>{product.name}</strong><small>{product.laboratory}</small><div className="qty"><button onClick={()=>changeQuantity(product.id,-1)}><Minus/></button><span>{quantity}</span><button onClick={()=>changeQuantity(product.id,1)}><Plus/></button></div></div><button className="remove" onClick={()=>removeFromCart(product.id)}><Trash2/></button></article>)}</div><div className="drawer-actions"><button className="whatsapp-checkout" onClick={checkout}>{t('checkout')}</button><button className="clear-cart" onClick={clearCart}>{t('clear')}</button></div></>}</aside></div>}
