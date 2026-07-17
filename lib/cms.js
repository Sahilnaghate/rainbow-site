"use client";
// Content Studio client — reads editable content with static fallbacks, so the
// site renders instantly and never breaks if Supabase is unreachable.
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { TRUST_COUNTERS, TESTIMONIALS, PRODUCTS, RECIPES } from "./data.js";

const HERO_SLIDES_FALLBACK = ["/images/hero/garam-masal.jpg", "/images/hero/kitchenking-masala.jpg", "/images/hero/chat-masala.jpg"];
const BESTSELLER_FALLBACK = {
  enabled: true,
  title: "Kitchen King Masala",
  sub: "All-purpose royal depth for every gravy — the blend Indian kitchens reorder most.",
  image: "/images/products/kitchen-king.png",
  video: "/videos/kitchen-king-promo.mp4",
  productHref: "/products",
  whatsappText: "Hi! I want to order Kitchen King Masala.",
};

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const cache = {};
async function fetchOnce(key, fn) {
  if (cache[key]) return cache[key];
  cache[key] = fn();
  return cache[key];
}

export function useCounters() {
  const [counters, setCounters] = useState(TRUST_COUNTERS);
  useEffect(() => {
    fetchOnce("counters", async () => {
      const { data } = await supabase.from("site_settings").select("value").eq("key", "trust_counters").maybeSingle();
      return data?.value;
    }).then((v) => { if (Array.isArray(v) && v.length) setCounters(v); }).catch(() => {});
  }, []);
  return counters;
}

export function useTestimonials() {
  const [items, setItems] = useState(TESTIMONIALS);
  useEffect(() => {
    fetchOnce("testimonials", async () => {
      const { data } = await supabase.from("site_testimonials").select("*").order("sort_order");
      return data;
    }).then((d) => { if (d && d.length) setItems(d); }).catch(() => {});
  }, []);
  return items;
}

export function useGallery() {
  const [items, setItems] = useState(null); // null = loading/fallback decides
  useEffect(() => {
    fetchOnce("gallery", async () => {
      const { data } = await supabase.from("site_gallery").select("*").order("sort_order");
      return data;
    }).then((d) => setItems(d || [])).catch(() => setItems([]));
  }, []);
  return items;
}

// map a site_products DB row → the shape the UI components expect
function mapProduct(r) {
  return {
    id: r.id, name: r.name, img: r.img || null, base: r.base, deep: r.deep,
    category: r.category, cuisine: r.cuisine, packs: r.packs,
    yieldPerKg: r.yield_per_kg ?? null, shelf: r.shelf, note: r.note, threads: !!r.threads,
  };
}

export function useProducts() {
  const [items, setItems] = useState(PRODUCTS);
  useEffect(() => {
    fetchOnce("products", async () => {
      const { data } = await supabase.from("site_products").select("*").eq("active", true).order("sort_order");
      return data;
    }).then((d) => { if (d && d.length) setItems(d.map(mapProduct)); }).catch(() => {});
  }, []);
  return items;
}

export function useRecipes() {
  const [items, setItems] = useState(RECIPES);
  useEffect(() => {
    fetchOnce("recipes", async () => {
      const { data } = await supabase.from("site_recipes").select("*").order("sort_order");
      return data;
    }).then((d) => { if (d && d.length) setItems(d); }).catch(() => {});
  }, []);
  return items;
}

export function useHeroSlides() {
  const [slides, setSlides] = useState(HERO_SLIDES_FALLBACK);
  useEffect(() => {
    fetchOnce("hero_slides", async () => {
      const { data } = await supabase.from("site_settings").select("value").eq("key", "hero_slides").maybeSingle();
      return data?.value;
    }).then((v) => { if (Array.isArray(v) && v.length) setSlides(v); }).catch(() => {});
  }, []);
  return slides;
}

export function useBestSeller() {
  const [cfg, setCfg] = useState(BESTSELLER_FALLBACK);
  useEffect(() => {
    fetchOnce("bestseller_popup", async () => {
      const { data } = await supabase.from("site_settings").select("value").eq("key", "bestseller_popup").maybeSingle();
      return data?.value;
    }).then((v) => { if (v && typeof v === "object") setCfg({ ...BESTSELLER_FALLBACK, ...v }); }).catch(() => {});
  }, []);
  return cfg;
}

/* ---- admin helpers ---- */
export function invalidate(key) { delete cache[key]; }

// Guardrail: resize images client-side (max 1600px, JPEG q0.85) before upload.
export async function resizeImage(file, maxDim = 1600) {
  if (!file.type.startsWith("image/") || file.type === "image/gif") return file;
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, maxDim / Math.max(bmp.width, bmp.height));
  if (scale === 1 && file.size < 800 * 1024) return file;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d").drawImage(bmp, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg", 0.85));
  return new File([blob], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" });
}

export async function uploadMedia(file) {
  const prepared = await resizeImage(file);
  const path = `gallery/${Date.now()}-${prepared.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const { error } = await supabase.storage.from("website").upload(path, prepared, { contentType: prepared.type });
  if (error) throw error;
  const { data } = supabase.storage.from("website").getPublicUrl(path);
  return data.publicUrl;
}
