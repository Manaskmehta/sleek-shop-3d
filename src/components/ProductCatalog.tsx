import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { products as allProducts, Product } from "@/data/products";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type FiltersState = {
  categories: Set<string>;
  sizes: Set<string>;
  colors: Set<string>;
  price: [number, number];
};

const ProductCatalog = () => {
  const categories = useMemo(
    () => Array.from(new Set(allProducts.map((p) => p.category))).sort(),
    []
  );
  const sizes = useMemo(
    () => Array.from(new Set(allProducts.flatMap((p) => p.sizes))).sort(),
    []
  );
  const colors = useMemo(
    () => Array.from(new Set(allProducts.flatMap((p) => p.colors))).sort(),
    []
  );
  const minPrice = useMemo(() => Math.min(...allProducts.map((p) => p.price)), []);
  const maxPrice = useMemo(() => Math.max(...allProducts.map((p) => p.price)), []);

  const [filters, setFilters] = useState<FiltersState>({
    categories: new Set<string>(),
    sizes: new Set<string>(),
    colors: new Set<string>(),
    price: [minPrice, maxPrice],
  });

  const toggleSetValue = (set: Set<string>, value: string) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p: Product) => {
      const inCategory =
        filters.categories.size === 0 || filters.categories.has(p.category);
      const inSizes =
        filters.sizes.size === 0 || p.sizes.some((s) => filters.sizes.has(s));
      const inColors =
        filters.colors.size === 0 || p.colors.some((c) => filters.colors.has(c));
      const inPrice = p.price >= filters.price[0] && p.price <= filters.price[1];
      return inCategory && inSizes && inColors && inPrice;
    });
  }, [filters]);

  const clearFilters = () =>
    setFilters({
      categories: new Set(),
      sizes: new Set(),
      colors: new Set(),
      price: [minPrice, maxPrice],
    });

  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold tracking-tight">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear
                  </Button>
                </div>
                <div className="h-px bg-border" />
              </div>

              {/* Category */}
              <div>
                <h4 className="text-sm font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={filters.categories.has(cat)}
                        onCheckedChange={() =>
                          setFilters((f) => ({
                            ...f,
                            categories: toggleSetValue(f.categories, cat),
                          }))
                        }
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h4 className="text-sm font-medium mb-3">Size</h4>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((s) => (
                    <label
                      key={s}
                      className="flex items-center gap-2 text-sm col-span-1"
                    >
                      <Checkbox
                        checked={filters.sizes.has(s)}
                        onCheckedChange={() =>
                          setFilters((f) => ({
                            ...f,
                            sizes: toggleSetValue(f.sizes, s),
                          }))
                        }
                      />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <h4 className="text-sm font-medium mb-3">Color</h4>
                <div className="space-y-2">
                  {colors.map((c) => (
                    <label key={c} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={filters.colors.has(c)}
                        onCheckedChange={() =>
                          setFilters((f) => ({
                            ...f,
                            colors: toggleSetValue(f.colors, c),
                          }))
                        }
                      />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="text-sm font-medium mb-3">Price</h4>
                <div className="px-1">
                  <Slider
                    value={[filters.price[0], filters.price[1]]}
                    min={minPrice}
                    max={maxPrice}
                    step={1}
                    onValueChange={(val) =>
                      setFilters((f) => ({ ...f, price: [val[0], val[1]] as [number, number] }))
                    }
                  />
                  <div className="mt-2 text-xs text-muted-foreground">
                    ${filters.price[0].toFixed(0)} - ${filters.price[1].toFixed(0)}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">All Products</h2>
              <div className="text-sm text-muted-foreground">{filteredProducts.length} items</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.images[0]}
                  category={product.category}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;


