import type { NextPage, Metadata } from 'next';
import packageInfo from '@/package.json';

export const metadata: Metadata = {
    title: `inN 방문기 ${packageInfo.version}`,
    description: `${packageInfo.description}`,
};

const HomePage: NextPage = () => {
    return <div>test</div>;
};

export default HomePage;
