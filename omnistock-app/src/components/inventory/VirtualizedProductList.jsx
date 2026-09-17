import { useState, useEffect } from "react";
import { FixedSizeList } from "react-window";
import ProductCard from "@/components/inventory/ProductCard";

/**
 * Virtualized product list for Inventory page (GEOHOT-03).
 * Uses react-window FixedSizeList to render only visible rows,
 * supporting 50K+ SKUs without freezing the browser tab.
 * Each row renders a responsive grid of ProductCard components.
 */

function getColumnCount(width) {
  if (width >= 1280) return 4;
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

const ROW_HEIGHT = 290;

export default function VirtualizedProductList({ products, onEdit, onDelete, height = 600 }) {
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const updateColumns = () => setColumns(getColumnCount(window.innerWidth));
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const rowCount = Math.ceil(products.length / columns);

  const Row = ({ index, style }) => {
    const start = index * columns;
    const rowProducts = products.slice(start, start + columns);

    return (
      <div style={{
        ...style,
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: '1rem',
        padding: '0 1rem',
      }}>
        {rowProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => onEdit(product)}
            onDelete={() => onDelete(product.id)}
          />
        ))}
      </div>
    );
  };

  return (
    <FixedSizeList
      height={height}
      width="100%"
      itemCount={rowCount}
      itemSize={ROW_HEIGHT}
      overscanCount={3}
    >
      {Row}
    </FixedSizeList>
  );
}
