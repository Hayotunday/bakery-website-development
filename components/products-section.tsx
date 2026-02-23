"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "White Velvet Dream",
    description: "Madagascar vanilla bean",
    price: 85,
    image: "/imgs/cake-assets-1.jpeg",
  },
  {
    id: "2",
    name: "Signature Croissant",
    description: "Double-buttered layers",
    price: 12,
    image: "/imgs/cake-assets-8.jpeg",
  },
  {
    id: "3",
    name: "Midnight Cocoa",
    description: "70% dark silk ganache",
    price: 75,
    image: "/imgs/cake-assets-9.jpeg",
  },
  {
    id: "4",
    name: "Summer Berry Tart",
    description: "Wild harvested berries",
    price: 45,
    image: "/imgs/cake-assets-12.jpeg",
  },
];

export default function ProductsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (imageUrl: string) => {
    document.body.style.overflow = "hidden";
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    setSelectedImage(null);
  };

  return (
    <section id="products" className="py-24 bg-secondary/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-accent font-bold tracking-widest uppercase text-sm mb-2">
              Signature Series
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-primary">
              Perfectly White Classics
            </h3>
          </div>
          <Link
            href="/gallery"
            className="text-primary font-black flex items-center gap-2 hover:text-accent transition-colors uppercase text-sm tracking-widest w-fit"
          >
            <span className="mr-0.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full">
              Full Collection
            </span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5 shadow-xl bg-white border border-primary/5 cursor-pointer"
                onClick={() => openModal(product.image)}
              >
                <Image
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  src={product.image || "/placeholder.svg"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            className="absolute top-4 right-4 text-white z-[110] bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors"
            onClick={closeModal}
            aria-label="Close image view"
          >
            <X size={24} />
          </button>
          <div
            className="relative max-w-4xl max-h-fit w-fit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
          >
            <Image
              src={selectedImage}
              alt="Enlarged product view"
              width={1200}
              height={1200}
              className="object-contain w-full h-full rounded-lg shadow-2xl"
              style={{ maxHeight: "90vh" }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
