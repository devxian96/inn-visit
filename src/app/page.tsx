import type { NextPage, Metadata } from 'next';
import { Home } from '@/components/templates';
import packageInfo from '@/package.json';

export const metadata: Metadata = {
    title: `inN 방문기 ${packageInfo.version}`,
    description: `${packageInfo.description}`,
};

const HomePage: NextPage = () => {
    return <Home />;
};

export default HomePage;
