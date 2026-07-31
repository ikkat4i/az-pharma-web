import { AuthModal } from '@/components/AuthModal';
import { Benefits } from '@/components/Benefits';
import { CartDrawer } from '@/components/CartDrawer';
import { Catalog } from '@/components/Catalog';
import { Featured } from '@/components/Featured';
import { Footer } from '@/components/Footer';
import { AccountSection } from '@/components/AccountSection';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
export default function Home(){return <><Navbar/><main><Hero/><Featured/><Catalog/><Benefits/><AccountSection/></main><Footer/><CartDrawer/><AuthModal/></>}
