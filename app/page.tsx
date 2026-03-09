import TopSearchBar from "./components/TopSearchBar";
import HeroBannerSlider from "./components/HeroBannerSlider";
import CollectionRow from "./components/CollectionRow";
import CircularStoryRow from "./components/CircularStoryRow";
import TrendingReelsRow from "./components/TrendingReelsRow";
import ProductRow from "./components/ProductRow";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white pb-24">
      {/* TOP SEARCH BAR */}
      <TopSearchBar />

      {/* HERO BANNERS */}
      <HeroBannerSlider />

      {/* COLLECTION BANNERS */}
      <CollectionRow />

      {/* GAP + STORIES (INLINE ARROW INSIDE COMPONENT) */}
      <div className="mt-10">
        <CircularStoryRow />
      </div>

      {/* TRENDING REELS */}
      <div className="mt-10">
        <TrendingReelsRow />
      </div>

      {/* PRODUCT SECTIONS (AMAZON STYLE) */}
      <ProductRow title="Trending Products" />
      <ProductRow title="New Arrivals" />
    </main>
  );
}
