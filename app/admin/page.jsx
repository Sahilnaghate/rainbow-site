"use client";
// Content Studio — client-editable website content (Phase A).
// Login = any DarakOne ERP user (same Supabase auth).
import { useEffect, useState } from "react";
import { supabase, uploadMedia, invalidate } from "../../lib/cms.js";
import { COLORS, tint, LINKS } from "../../lib/theme.js";
import { TRUST_COUNTERS, CATEGORIES, CUISINES } from "../../lib/data.js";

const card = { background: "#fff", border: `1px solid ${tint(COLORS.ink, 0.12)}`, borderRadius: "16px" };
const input = { border: `1.5px solid ${tint(COLORS.ink, 0.18)}`, background: "#fff", fontSize: "0.92rem", color: COLORS.ink, borderRadius: "10px", padding: "9px 12px", width: "100%" };
const btn = (bg = COLORS.red, color = "#fff") => ({ background: bg, color, borderRadius: "999px", padding: "10px 22px", fontSize: "0.72rem" });

function Login({ onDone }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
    if (error) setErr(error.message); else onDone();
    setBusy(false);
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: COLORS.cream }}>
      <form onSubmit={submit} className="w-full max-w-sm p-8" style={card}>
        <img src="/logo.png" alt="Rainbow Masala" style={{ height: "52px" }} />
        <h1 className="rs-display mt-5" style={{ fontSize: "1.5rem", color: COLORS.ink, fontWeight: 600 }}>Content Studio</h1>
        <p className="rs-body mt-1" style={{ fontSize: "0.85rem", color: COLORS.inkDim }}>Sign in with your DarakOne account to edit the website.</p>
        <div className="mt-6 grid gap-3">
          <input style={input} className="rs-body" type="email" required placeholder="you@darakone.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input style={input} className="rs-body" type="password" required placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} />
        </div>
        {err && <p className="rs-body mt-3" style={{ color: COLORS.red, fontSize: "0.8rem" }}>{err}</p>}
        <button type="submit" disabled={busy} className="rs-btn mt-5 w-full" style={btn()}>{busy ? "Signing in…" : "Sign in"}</button>
      </form>
    </div>
  );
}

/* ---------- Counters tab ---------- */
function CountersTab() {
  const [rows, setRows] = useState(TRUST_COUNTERS);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    supabase.from("site_settings").select("value").eq("key", "trust_counters").maybeSingle()
      .then(({ data }) => { if (Array.isArray(data?.value) && data.value.length) setRows(data.value); });
  }, []);
  const save = async () => {
    setMsg("Saving…");
    const { error } = await supabase.from("site_settings").upsert({ key: "trust_counters", value: rows, updated_at: new Date().toISOString() });
    invalidate("counters");
    setMsg(error ? `Error: ${error.message}` : "Saved ✓ — live within a minute");
  };
  return (
    <div className="p-6" style={card}>
      <p className="rs-body" style={{ fontSize: "0.85rem", color: COLORS.inkDim }}>The four numbers on the homepage hero. Keep values short (e.g. “1,200+”).</p>
      <div className="grid sm:grid-cols-2 gap-4 mt-5">
        {rows.map((r, i) => (
          <div key={i} className="grid gap-2 p-4 rounded-xl" style={{ background: tint(COLORS.mustard, 0.08), border: `1px solid ${tint(COLORS.mustard, 0.3)}` }}>
            <input style={input} className="rs-body" value={r.value} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, value: e.target.value } : x))} placeholder="1,200+" />
            <input style={input} className="rs-body" value={r.label} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} placeholder="Kitchens served" />
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-4">
        <button onClick={save} className="rs-btn" style={btn()}>Save counters</button>
        <span className="rs-body" style={{ fontSize: "0.8rem", color: COLORS.inkDim }}>{msg}</span>
      </div>
    </div>
  );
}

/* ---------- Gallery tab ---------- */
function GalleryTab() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [msg, setMsg] = useState("");
  const load = () => supabase.from("site_gallery").select("*").order("sort_order").then(({ data }) => setItems(data || []));
  useEffect(() => { load(); }, []);
  const done = (error) => { invalidate("gallery"); setMsg(error ? `Error: ${error.message}` : "Saved ✓"); load(); };

  const addImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMsg("Uploading…");
    try {
      const url = await uploadMedia(file);
      const { error } = await supabase.from("site_gallery").insert({ title: title || file.name, media_type: "image", media_url: url });
      done(error);
      setTitle("");
    } catch (err) { setMsg(`Error: ${err.message}`); }
    e.target.value = "";
  };
  const addVideo = async () => {
    if (!videoUrl.trim()) return;
    const { error } = await supabase.from("site_gallery").insert({ title: title || "Video", media_type: "video", media_url: videoUrl.trim() });
    done(error);
    setTitle(""); setVideoUrl("");
  };
  const remove = async (id) => {
    const { error } = await supabase.from("site_gallery").delete().eq("id", id);
    done(error);
  };

  return (
    <div className="p-6" style={card}>
      <p className="rs-body" style={{ fontSize: "0.85rem", color: COLORS.inkDim }}>Photos and videos shown in the media gallery on the Contact page. Images are auto-compressed. Videos: paste a YouTube/Instagram link.</p>
      <div className="grid sm:grid-cols-3 gap-3 mt-5 items-end">
        <label className="block sm:col-span-1">
          <span className="rs-eyebrow" style={{ fontSize: "0.58rem", color: COLORS.inkDim }}>Title</span>
          <input style={input} className="rs-body mt-1" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Factory floor, 2026" />
        </label>
        <label className="rs-btn text-center cursor-pointer" style={btn(COLORS.red)}>
          Upload photo
          <input type="file" accept="image/*" className="hidden" onChange={addImage} />
        </label>
        <div className="flex gap-2">
          <input style={{ ...input }} className="rs-body" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://youtube.com/…" />
          <button onClick={addVideo} className="rs-btn shrink-0" style={btn(COLORS.mustard, COLORS.ink)}>Add video</button>
        </div>
      </div>
      <p className="rs-body mt-3" style={{ fontSize: "0.8rem", color: COLORS.inkDim }}>{msg}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
        {items.map((g) => (
          <div key={g.id} className="rounded-xl overflow-hidden relative" style={{ border: `1px solid ${tint(COLORS.ink, 0.15)}`, aspectRatio: "1/1", background: tint(COLORS.mustard, 0.08) }}>
            {g.media_type === "image" ? (
              <img src={g.media_url} alt={g.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center">
                <span style={{ fontSize: "1.6rem" }}>▶</span>
                <span className="rs-body mt-1" style={{ fontSize: "0.7rem", color: COLORS.inkDim, wordBreak: "break-all" }}>{g.media_url.slice(0, 40)}…</span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 flex items-center justify-between" style={{ background: "rgba(42,22,12,0.72)" }}>
              <span className="rs-body truncate" style={{ fontSize: "0.68rem", color: "#fff" }}>{g.title}</span>
              <button onClick={() => remove(g.id)} aria-label="Delete" className="rs-body" style={{ color: "#FFB4B4", fontSize: "0.7rem" }}>Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="rs-body col-span-full" style={{ color: COLORS.inkDim, fontSize: "0.85rem" }}>Nothing yet — the site shows product packs until you add media.</p>}
      </div>
    </div>
  );
}

/* ---------- Testimonials tab ---------- */
function TestimonialsTab() {
  const empty = { name: "", role: "", quote: "", video_url: "" };
  const [items, setItems] = useState([]);
  const [f, setF] = useState(empty);
  const [msg, setMsg] = useState("");
  const load = () => supabase.from("site_testimonials").select("*").order("sort_order").then(({ data }) => setItems(data || []));
  useEffect(() => { load(); }, []);
  const done = (error) => { invalidate("testimonials"); setMsg(error ? `Error: ${error.message}` : "Saved ✓"); load(); };
  const add = async () => {
    if (!f.name || !f.quote) return setMsg("Name and quote are required");
    const { error } = await supabase.from("site_testimonials").insert({ ...f, accent: "#D22C2E" });
    done(error); setF(empty);
  };
  const remove = async (id) => done((await supabase.from("site_testimonials").delete().eq("id", id)).error);
  return (
    <div className="p-6" style={card}>
      <p className="rs-body" style={{ fontSize: "0.85rem", color: COLORS.inkDim }}>Chef / hotel / caterer testimonials shown on the homepage and HORECA page. Video link optional (YouTube).</p>
      <div className="grid sm:grid-cols-2 gap-3 mt-5">
        <input style={input} className="rs-body" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Chef name *" />
        <input style={input} className="rs-body" value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })} placeholder="Role — e.g. Executive Chef, Hotel X" />
        <input style={input} className="rs-body sm:col-span-2" value={f.quote} onChange={(e) => setF({ ...f, quote: e.target.value })} placeholder="One-line quote *" />
        <input style={input} className="rs-body sm:col-span-2" value={f.video_url} onChange={(e) => setF({ ...f, video_url: e.target.value })} placeholder="Video URL (optional)" />
      </div>
      <div className="mt-4 flex items-center gap-4">
        <button onClick={add} className="rs-btn" style={btn()}>Add testimonial</button>
        <span className="rs-body" style={{ fontSize: "0.8rem", color: COLORS.inkDim }}>{msg}</span>
      </div>
      <div className="grid gap-3 mt-6">
        {items.map((t) => (
          <div key={t.id} className="flex items-start justify-between gap-4 p-4 rounded-xl" style={{ background: tint(COLORS.mustard, 0.08), border: `1px solid ${tint(COLORS.mustard, 0.3)}` }}>
            <div>
              <p className="rs-body" style={{ fontWeight: 600, fontSize: "0.9rem", color: COLORS.ink }}>{t.name} <span style={{ color: COLORS.inkDim, fontWeight: 400 }}>— {t.role}</span></p>
              <p className="rs-body mt-1" style={{ fontSize: "0.85rem", color: COLORS.inkDim, fontStyle: "italic" }}>“{t.quote}”</p>
            </div>
            <button onClick={() => remove(t.id)} className="rs-body shrink-0" style={{ color: COLORS.red, fontSize: "0.78rem" }}>Delete</button>
          </div>
        ))}
        {items.length === 0 && <p className="rs-body" style={{ color: COLORS.inkDim, fontSize: "0.85rem" }}>None yet — the site shows the placeholder testimonials until you add real ones.</p>}
      </div>
    </div>
  );
}

/* ---------- Products tab ---------- */
function ProductsTab() {
  const empty = { name: "", img: "", category: "Premium Blends", cuisine: "Universal", packs: "", yield_per_kg: "", shelf: "12 mo", note: "", base: "#A9702E", deep: "#5C3A1E", active: true };
  const [items, setItems] = useState([]);
  const [f, setF] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState("");
  const load = () => supabase.from("site_products").select("*").order("sort_order").then(({ data, error }) => { if (error) setMsg(`Load error: ${error.message}`); setItems(data || []); });
  useEffect(() => { load(); }, []);
  const done = (error) => { invalidate("products"); setMsg(error ? `Error: ${error.message}` : "Saved ✓ — live within a minute"); if (!error) { setF(empty); setEditId(null); } load(); };
  const save = async () => {
    if (!f.name) return setMsg("Name is required");
    const row = { ...f, yield_per_kg: f.yield_per_kg === "" ? null : Number(f.yield_per_kg) };
    const { error } = editId
      ? await supabase.from("site_products").update({ ...row, updated_at: new Date().toISOString() }).eq("id", editId)
      : await supabase.from("site_products").insert({ ...row, sort_order: (items.at(-1)?.sort_order || 0) + 10 });
    done(error);
  };
  const edit = (p) => { setEditId(p.id); setF({ ...empty, ...p, yield_per_kg: p.yield_per_kg ?? "" }); setMsg("Editing — change fields and Save"); };
  const remove = async (id) => { if (!confirm("Delete this product?")) return; done((await supabase.from("site_products").delete().eq("id", id)).error); };
  const upload = async (e) => { const file = e.target.files?.[0]; if (!file) return; setMsg("Uploading…"); try { setF({ ...f, img: await uploadMedia(file) }); setMsg("Image ready — Save to apply"); } catch (err) { setMsg(`Error: ${err.message}`); } e.target.value = ""; };
  return (
    <div className="p-6" style={card}>
      <p className="rs-body" style={{ fontSize: "0.85rem", color: COLORS.inkDim }}>The product range shown across the site (grid, marquee, yield guide). No prices — yield only, per client. Leave yield blank for whole spices.</p>
      <div className="grid sm:grid-cols-2 gap-3 mt-5">
        <input style={input} className="rs-body" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Product name *" />
        <select style={input} className="rs-body" value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })}>{CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}</select>
        <select style={input} className="rs-body" value={f.cuisine} onChange={(e) => setF({ ...f, cuisine: e.target.value })}>{CUISINES.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}</select>
        <input style={input} className="rs-body" value={f.packs} onChange={(e) => setF({ ...f, packs: e.target.value })} placeholder="Packs — e.g. 1kg · 5kg · 25kg" />
        <input style={input} className="rs-body" type="number" value={f.yield_per_kg} onChange={(e) => setF({ ...f, yield_per_kg: e.target.value })} placeholder="Yield per kg (plates) — blank for whole spice" />
        <input style={input} className="rs-body" value={f.shelf} onChange={(e) => setF({ ...f, shelf: e.target.value })} placeholder="Shelf life — e.g. 12 mo" />
        <input style={input} className="rs-body sm:col-span-2" value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} placeholder="Short note — e.g. All-purpose gravy depth" />
        <div className="flex items-center gap-3 sm:col-span-2">
          <label className="rs-btn text-center cursor-pointer shrink-0" style={btn(COLORS.red)}>Upload pack photo<input type="file" accept="image/*" className="hidden" onChange={upload} /></label>
          {f.img && <img src={f.img} alt="" style={{ height: 44, width: 44, objectFit: "contain", borderRadius: 8, border: `1px solid ${tint(COLORS.ink, 0.15)}` }} />}
          <label className="rs-body flex items-center gap-2" style={{ fontSize: "0.8rem", color: COLORS.inkDim }}><input type="checkbox" checked={f.active} onChange={(e) => setF({ ...f, active: e.target.checked })} /> Show on site</label>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <button onClick={save} className="rs-btn" style={btn()}>{editId ? "Save changes" : "Add product"}</button>
        {editId && <button onClick={() => { setF(empty); setEditId(null); setMsg(""); }} className="rs-btn" style={btn("transparent", COLORS.inkDim)}>Cancel</button>}
        <span className="rs-body" style={{ fontSize: "0.8rem", color: COLORS.inkDim }}>{msg}</span>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mt-6">
        {items.map((p) => (
          <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: p.active ? "#fff" : tint(COLORS.ink, 0.05), border: `1px solid ${tint(COLORS.ink, 0.12)}` }}>
            {p.img ? <img src={p.img} alt="" style={{ height: 40, width: 40, objectFit: "contain" }} /> : <div style={{ height: 40, width: 40, borderRadius: 8, background: tint(p.base, 0.3) }} />}
            <div className="grow min-w-0">
              <p className="rs-body truncate" style={{ fontWeight: 600, fontSize: "0.85rem", color: COLORS.ink }}>{p.name}{!p.active && <span style={{ color: COLORS.inkDim, fontWeight: 400 }}> · hidden</span>}</p>
              <p className="rs-body truncate" style={{ fontSize: "0.72rem", color: COLORS.inkDim }}>{p.category} · {p.packs || "—"}</p>
            </div>
            <button onClick={() => edit(p)} className="rs-body shrink-0" style={{ color: COLORS.ink, fontSize: "0.74rem" }}>Edit</button>
            <button onClick={() => remove(p.id)} className="rs-body shrink-0" style={{ color: COLORS.red, fontSize: "0.74rem" }}>Delete</button>
          </div>
        ))}
        {items.length === 0 && <p className="rs-body col-span-full" style={{ color: COLORS.inkDim, fontSize: "0.85rem" }}>No products in the database yet — run the Phase B SQL, or the site shows the built-in range until you add products here.</p>}
      </div>
    </div>
  );
}

/* ---------- Recipes tab ---------- */
function RecipesTab() {
  const empty = { name: "", img: "", batch: "", uses: "", time: "", base: "#C4471D", deep: "#5C2210" };
  const [items, setItems] = useState([]);
  const [f, setF] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState("");
  const load = () => supabase.from("site_recipes").select("*").order("sort_order").then(({ data, error }) => { if (error) setMsg(`Load error: ${error.message}`); setItems(data || []); });
  useEffect(() => { load(); }, []);
  const done = (error) => { invalidate("recipes"); setMsg(error ? `Error: ${error.message}` : "Saved ✓ — live within a minute"); if (!error) { setF(empty); setEditId(null); } load(); };
  const save = async () => {
    if (!f.name) return setMsg("Name is required");
    const { error } = editId
      ? await supabase.from("site_recipes").update({ ...f, updated_at: new Date().toISOString() }).eq("id", editId)
      : await supabase.from("site_recipes").insert({ ...f, sort_order: (items.at(-1)?.sort_order || 0) + 10 });
    done(error);
  };
  const edit = (r) => { setEditId(r.id); setF({ ...empty, ...r }); setMsg("Editing — change fields and Save"); };
  const remove = async (id) => { if (!confirm("Delete this recipe?")) return; done((await supabase.from("site_recipes").delete().eq("id", id)).error); };
  const upload = async (e) => { const file = e.target.files?.[0]; if (!file) return; setMsg("Uploading…"); try { setF({ ...f, img: await uploadMedia(file) }); setMsg("Image ready — Save to apply"); } catch (err) { setMsg(`Error: ${err.message}`); } e.target.value = ""; };
  return (
    <div className="p-6" style={card}>
      <p className="rs-body" style={{ fontSize: "0.85rem", color: COLORS.inkDim }}>Restaurant-scale recipe cards (Recipes page + homepage). Upload premium plated-dish photos here.</p>
      <div className="grid sm:grid-cols-2 gap-3 mt-5">
        <input style={input} className="rs-body sm:col-span-2" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Recipe name * — e.g. Hotel-style Sambhar Base" />
        <input style={input} className="rs-body" value={f.batch} onChange={(e) => setF({ ...f, batch: e.target.value })} placeholder="Batch — e.g. 10L base · 80 plates" />
        <input style={input} className="rs-body" value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })} placeholder="Time — e.g. 45 min" />
        <input style={input} className="rs-body sm:col-span-2" value={f.uses} onChange={(e) => setF({ ...f, uses: e.target.value })} placeholder="Uses — e.g. Sambhar Masala 320g" />
        <div className="flex items-center gap-3 sm:col-span-2">
          <label className="rs-btn text-center cursor-pointer shrink-0" style={btn(COLORS.red)}>Upload dish photo<input type="file" accept="image/*" className="hidden" onChange={upload} /></label>
          {f.img && <img src={f.img} alt="" style={{ height: 44, width: 60, objectFit: "cover", borderRadius: 8 }} />}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <button onClick={save} className="rs-btn" style={btn()}>{editId ? "Save changes" : "Add recipe"}</button>
        {editId && <button onClick={() => { setF(empty); setEditId(null); setMsg(""); }} className="rs-btn" style={btn("transparent", COLORS.inkDim)}>Cancel</button>}
        <span className="rs-body" style={{ fontSize: "0.8rem", color: COLORS.inkDim }}>{msg}</span>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mt-6">
        {items.map((r) => (
          <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#fff", border: `1px solid ${tint(COLORS.ink, 0.12)}` }}>
            {r.img ? <img src={r.img} alt="" style={{ height: 44, width: 60, objectFit: "cover", borderRadius: 8 }} /> : <div style={{ height: 44, width: 60, borderRadius: 8, background: tint(r.base, 0.3) }} />}
            <div className="grow min-w-0">
              <p className="rs-body truncate" style={{ fontWeight: 600, fontSize: "0.85rem", color: COLORS.ink }}>{r.name}</p>
              <p className="rs-body truncate" style={{ fontSize: "0.72rem", color: COLORS.inkDim }}>{r.batch || "—"}</p>
            </div>
            <button onClick={() => edit(r)} className="rs-body shrink-0" style={{ color: COLORS.ink, fontSize: "0.74rem" }}>Edit</button>
            <button onClick={() => remove(r.id)} className="rs-body shrink-0" style={{ color: COLORS.red, fontSize: "0.74rem" }}>Delete</button>
          </div>
        ))}
        {items.length === 0 && <p className="rs-body col-span-full" style={{ color: COLORS.inkDim, fontSize: "0.85rem" }}>No recipes yet — run the Phase B SQL, or the site shows the built-in recipes.</p>}
      </div>
    </div>
  );
}

/* ---------- Hero slides tab ---------- */
function HeroTab() {
  const [slides, setSlides] = useState([]);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    supabase.from("site_settings").select("value").eq("key", "hero_slides").maybeSingle()
      .then(({ data }) => { if (Array.isArray(data?.value)) setSlides(data.value); });
  }, []);
  const persist = async (next) => {
    setSlides(next);
    const { error } = await supabase.from("site_settings").upsert({ key: "hero_slides", value: next, updated_at: new Date().toISOString() });
    invalidate("hero_slides");
    setMsg(error ? `Error: ${error.message}` : "Saved ✓ — live within a minute");
  };
  const upload = async (e) => { const file = e.target.files?.[0]; if (!file) return; setMsg("Uploading…"); try { const url = await uploadMedia(file); persist([...slides, url]); } catch (err) { setMsg(`Error: ${err.message}`); } e.target.value = ""; };
  const removeAt = (i) => persist(slides.filter((_, j) => j !== i));
  const move = (i, dir) => { const j = i + dir; if (j < 0 || j >= slides.length) return; const next = [...slides]; [next[i], next[j]] = [next[j], next[i]]; persist(next); };
  return (
    <div className="p-6" style={card}>
      <p className="rs-body" style={{ fontSize: "0.85rem", color: COLORS.inkDim }}>The rotating photos in the homepage hero. First image shows first. Landscape food shots work best.</p>
      <div className="mt-5"><label className="rs-btn text-center cursor-pointer" style={btn(COLORS.red)}>Upload hero image<input type="file" accept="image/*" className="hidden" onChange={upload} /></label>
        <span className="rs-body ml-4" style={{ fontSize: "0.8rem", color: COLORS.inkDim }}>{msg}</span></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {slides.map((src, i) => (
          <div key={src + i} className="rounded-xl overflow-hidden relative" style={{ border: `1px solid ${tint(COLORS.ink, 0.15)}`, aspectRatio: "16/10" }}>
            <img src={src} alt="" className="w-full h-full object-cover" />
            <span className="absolute top-2 left-2 rs-eyebrow px-2 py-1 rounded" style={{ fontSize: "0.55rem", background: "rgba(42,22,12,0.7)", color: "#fff" }}>{i === 0 ? "First" : `#${i + 1}`}</span>
            <div className="absolute bottom-0 inset-x-0 flex justify-between p-2" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.5), transparent)" }}>
              <div className="flex gap-1">
                <button onClick={() => move(i, -1)} className="rs-btn px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.85)", color: COLORS.ink, fontSize: "0.7rem" }}>↑</button>
                <button onClick={() => move(i, 1)} className="rs-btn px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.85)", color: COLORS.ink, fontSize: "0.7rem" }}>↓</button>
              </div>
              <button onClick={() => removeAt(i)} className="rs-btn px-2 py-1 rounded" style={{ background: COLORS.red, color: "#fff", fontSize: "0.7rem" }}>Remove</button>
            </div>
          </div>
        ))}
        {slides.length === 0 && <p className="rs-body col-span-full" style={{ color: COLORS.inkDim, fontSize: "0.85rem" }}>No slides set — run the Phase B SQL, or the site shows the built-in hero images.</p>}
      </div>
    </div>
  );
}

/* ---------- Best-seller popup tab ---------- */
function PopupTab() {
  const empty = { enabled: true, title: "", sub: "", image: "", video: "", productHref: "/products", whatsappText: "" };
  const [f, setF] = useState(empty);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    supabase.from("site_settings").select("value").eq("key", "bestseller_popup").maybeSingle()
      .then(({ data }) => { if (data?.value && typeof data.value === "object") setF({ ...empty, ...data.value }); });
  }, []);
  const save = async () => {
    const { error } = await supabase.from("site_settings").upsert({ key: "bestseller_popup", value: f, updated_at: new Date().toISOString() });
    invalidate("bestseller_popup");
    setMsg(error ? `Error: ${error.message}` : "Saved ✓ — live within a minute");
  };
  const upImg = async (e) => { const file = e.target.files?.[0]; if (!file) return; setMsg("Uploading…"); try { setF({ ...f, image: await uploadMedia(file) }); setMsg("Image ready — Save to apply"); } catch (err) { setMsg(`Error: ${err.message}`); } e.target.value = ""; };
  const upVid = async (e) => { const file = e.target.files?.[0]; if (!file) return; setMsg("Uploading video…"); try { setF({ ...f, video: await uploadMedia(file) }); setMsg("Video ready — Save to apply"); } catch (err) { setMsg(`Error: ${err.message}`); } e.target.value = ""; };
  return (
    <div className="p-6" style={card}>
      <p className="rs-body" style={{ fontSize: "0.85rem", color: COLORS.inkDim }}>The best-seller popup shown when the site opens. Add a square video (plays automatically) or a product photo.</p>
      <label className="rs-body flex items-center gap-2 mt-4" style={{ fontSize: "0.88rem", color: COLORS.ink }}><input type="checkbox" checked={f.enabled} onChange={(e) => setF({ ...f, enabled: e.target.checked })} /> Show the popup</label>
      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <input style={input} className="rs-body sm:col-span-2" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="Product title — e.g. Kitchen King Masala" />
        <input style={input} className="rs-body sm:col-span-2" value={f.sub} onChange={(e) => setF({ ...f, sub: e.target.value })} placeholder="One-line description" />
        <input style={input} className="rs-body" value={f.productHref} onChange={(e) => setF({ ...f, productHref: e.target.value })} placeholder="'View product' link — e.g. /products" />
        <input style={input} className="rs-body" value={f.whatsappText} onChange={(e) => setF({ ...f, whatsappText: e.target.value })} placeholder="WhatsApp message text" />
      </div>
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <label className="rs-btn text-center cursor-pointer" style={btn(COLORS.red)}>Upload photo<input type="file" accept="image/*" className="hidden" onChange={upImg} /></label>
        {f.image && <img src={f.image} alt="" style={{ height: 44, width: 44, objectFit: "contain", borderRadius: 8 }} />}
        <label className="rs-btn text-center cursor-pointer" style={btn(COLORS.mustard, COLORS.ink)}>Upload video (square)<input type="file" accept="video/*" className="hidden" onChange={upVid} /></label>
        {f.video && <span className="rs-body" style={{ fontSize: "0.72rem", color: COLORS.inkDim }}>video set ✓</span>}
      </div>
      <div className="mt-5 flex items-center gap-4">
        <button onClick={save} className="rs-btn" style={btn()}>Save popup</button>
        <span className="rs-body" style={{ fontSize: "0.8rem", color: COLORS.inkDim }}>{msg}</span>
      </div>
    </div>
  );
}

const TABS = [["counters", "Counters"], ["products", "Products"], ["recipes", "Recipes"], ["gallery", "Gallery"], ["hero", "Hero slides"], ["popup", "Best-seller"], ["testimonials", "Testimonials"]];

export default function AdminPage() {
  const [authed, setAuthed] = useState(null);
  const [tab, setTab] = useState("gallery");
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setAuthed(!!data.session));
  }, []);
  if (authed === null) return <div className="min-h-screen flex items-center justify-center rs-body" style={{ background: COLORS.cream, color: COLORS.inkDim }}>Loading…</div>;
  if (!authed) return <Login onDone={() => setAuthed(true)} />;
  return (
    <div className="min-h-screen px-4 sm:px-8 pt-28 pb-10" style={{ background: COLORS.cream }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Rainbow Masala" style={{ height: "44px" }} />
            <div>
              <h1 className="rs-display" style={{ fontSize: "1.4rem", color: COLORS.ink, fontWeight: 600 }}>Content Studio</h1>
              <p className="rs-body" style={{ fontSize: "0.75rem", color: COLORS.inkDim }}>Changes appear on the website within a minute.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <a href="/" className="rs-btn" style={btn("transparent", COLORS.inkDim)}>View site →</a>
            <a href={LINKS.erp} target="_blank" rel="noreferrer" className="rs-btn" style={btn(COLORS.mustard, COLORS.ink)}>Open ERP</a>
            <button onClick={async () => { await supabase.auth.signOut(); setAuthed(false); }} className="rs-btn" style={{ ...btn("transparent", COLORS.red), border: `2px solid ${COLORS.red}` }}>Sign out</button>
          </div>
        </div>
        <div className="flex gap-2 mt-8">
          {TABS.map(([k, label]) => (
            <button key={k} onClick={() => setTab(k)} className="rs-btn" style={{ ...btn(tab === k ? COLORS.red : "transparent", tab === k ? "#fff" : COLORS.inkDim), border: tab === k ? "none" : `1.5px solid ${tint(COLORS.ink, 0.2)}` }}>{label}</button>
          ))}
        </div>
        <div className="mt-5">
          {tab === "counters" && <CountersTab />}
          {tab === "products" && <ProductsTab />}
          {tab === "recipes" && <RecipesTab />}
          {tab === "gallery" && <GalleryTab />}
          {tab === "hero" && <HeroTab />}
          {tab === "popup" && <PopupTab />}
          {tab === "testimonials" && <TestimonialsTab />}
        </div>
      </div>
    </div>
  );
}
