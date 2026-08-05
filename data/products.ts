export type Product = {
  id: number;
  slug: string;
  laboratory: string;
  name: string;
  detail: string;
  presentation: string;
  benefit: string;
  usage: string;
  origin: string;
  image: string;
  badge?: string;
  badgeTone?: 'blue' | 'green' | 'gold';
  priceUSD: number | null;
  stock: number;
  prescription: boolean;
};

export const products: Product[] = [
  { id:2, slug:'tirzepatida-tg-10mg', laboratory:'Indufar C.I.S.A.', name:'Tirzepatida TG 10mg', detail:'4 vial de 0,5 ml — 60 mg', presentation:'4 vial de 0,5 ml, 60 mg', benefit:'Control metabólico intermedio; contribuye a regular glucosa, apetito y peso.', usage:'Aplicación subcutánea semanal. Preparar con material estéril, no reutilizar agujas y observar que la solución sea clara y sin partículas. Verificar QR, lote, vencimiento y registro sanitario.', origin:'Paraguay', image:'/images/products/tg10.png', badge:'Más vendido', badgeTone:'blue', priceUSD:null, stock:10, prescription:true },

{ id:3, slug:'tirzepatida-tg-12-5mg', laboratory:'Indufar C.I.S.A.', name:'Tirzepatida TG 12,5mg', detail:'4 vial de 0,5 ml — 50 mg total', presentation:'4 vial de 0,5 ml, 50 mg total', benefit:'Dosis de escalamiento; apoyo al control glucémico y reducción del apetito.', usage:'Aplicación subcutánea semanal bajo supervisión médica. Mantener cadena de frío entre 2 °C y 8 °C; no congelar. No compartir jeringas ni viales.', origin:'Paraguay', image:'/images/products/tg12-5.png?v=2', priceUSD:null, stock:8, prescription:true },

{ id:4, slug:'tirzepatida-tg-15mg', laboratory:'Indufar C.I.S.A.', name:'Tirzepatida TG 15mg', detail:'4 vial de 0,5 ml — 60 mg', presentation:'4 vial de 0,5 ml, 60 mg', benefit:'Dosis alta de la línea; control glucémico, apetito y manejo de peso según indicación profesional.', usage:'Aplicación subcutánea semanal. Verificar especialmente autenticidad del envase, QR, lote y registro sanitario. Comprar solo en establecimientos habilitados.', origin:'Paraguay', image:'/images/products/tg15.png', badge:'Premium', badgeTone:'gold', priceUSD:81.5, stock:7, prescription:true },

{ id:6, slug:'tirzepatida-lipoless-15mg-caja', laboratory:'Éticos C.E.I.S.A.', name:'Tirzepatida Lipoless 15mg — Caja', detail:'4 vial de 0,5 ml — 60 mg total', presentation:'4 vial de 0,5 ml, 60 mg total', benefit:'Control de glucosa y regulación del apetito.', usage:'Aplicación subcutánea semanal, rotando zonas de aplicación. Debe usarse como parte de un tratamiento médico, no como producto libre de automedicación.', origin:'Paraguay', image:'/images/products/lipoless-box.png', priceUSD:78, stock:11, prescription:true },

{ id:7, slug:'tirzepatida-tirzedral-15mg', laboratory:'Laboratorios Catedral', name:'Tirzepatida Tirzedral 15mg', detail:'4 vial de 0,5 ml — 60 mg', presentation:'4 vial de 0,5 ml, 60 mg', benefit:'Control metabólico del apetito, la glucosa y el peso corporal.', usage:'Inyección subcutánea siguiendo indicación médica. La información del producto remarca la administración subcutánea y la supervisión profesional.', origin:'Paraguay', image:'/images/products/tirzedral.png', priceUSD:85, stock:6, prescription:true },

{ id:8, slug:'tirzepatida-gluconex-15mg', laboratory:'Lasca', name:'Tirzepatida Gluconex 15mg', detail:'4 vial de 1 ml — 60 mg', presentation:'4 vial de 1 ml, 60 mg', benefit:'Apoyo al manejo de diabetes tipo 2 y al control de peso.', usage:'Uso subcutáneo semanal bajo control médico. Verificar siempre lote, vencimiento, cadena de frío y registro sanitario antes de usar.', origin:'Paraguay', image:'/images/products/gluconex.png', priceUSD:79, stock:10, prescription:true },

{ id:11, slug:'tirzepatida-tirzec-15mg-vials', laboratory:'Quimfa S.A.', name:'Tirzepatida Tirzec 15mg — Vial', detail:'4 vial de 0,5 ml — 60 mg', presentation:'4 vial de 0,5 ml, 60 mg', benefit:'Control metabólico y reducción del apetito.', usage:'Aplicación subcutánea semanal, rotando el sitio de inyección. No mezclar con otros inyectables salvo indicación médica expresa.', origin:'Paraguay', image:'/images/products/tirzec-vials.png', priceUSD:83, stock:8, prescription:true },

{ id:13, slug:'tirzepatida-lipoland-15mg-pack', laboratory:'Landerlan', name:'Tirzepatida Lipoland 15mg — Pack', detail:'4 vial de 0,5 ml — 60 mg', presentation:'4 vial de 0,5 ml, 60 mg', benefit:'Apoyo al control glucémico y del peso.', usage:'Aplicación subcutánea semanal bajo supervisión médica. No reutilizar agujas ni compartir dispositivos o viales.', origin:'Paraguay', image:'/images/products/lipoland-pack.png', priceUSD:null, stock:9, prescription:true },
];

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);
