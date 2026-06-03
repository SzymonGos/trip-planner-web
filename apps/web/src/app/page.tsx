import { Footer } from '@/components/Footer/Footer';
import { FeaturedDestinationsContainer } from '@/features/homepage/FeaturedDestinationsContainer';
import { HeroSectionContainer } from '@/features/homepage/HeroSectionContainer';
import { HowItWorks } from '@/features/homepage/HowItWorks';
import { ProductBenefits } from '@/features/homepage/ProductBenefits';

export const dynamic = 'force-dynamic';

const Home = () => (
  <main>
    <div className="pt-10 bg-gradient-to-b from-zinc-400 to-gray-50 to-80%">
      <HeroSectionContainer />
      <ProductBenefits />
    </div>
    <FeaturedDestinationsContainer />
    <HowItWorks />
    <Footer />
  </main>
);

export default Home;
