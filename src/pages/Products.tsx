import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Products;
