'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { DEFAULTS, mergeContact } from '@/lib/contact';

export default function Admin() {
  const [session, setSession] = useState(undefined);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);
  if (session === undefined) return <section className="sec narrow"><p className="muted">Loading…</p></section>;
  return session ? <Dashboard /> : <Login />;
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const go = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setErr(error ? 'Email or password is incorrect.' : '');
  };
  return (
    <section className="sec narrow">
      <h1>Admin login</h1>
      <form className="stack" onSubmit={go}>
        <label>Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        {err && <p className="err">{err}</p>}
        <button className="btn">Log in</button>
      </form>
    </section>
  );
}

function Dashboard() {
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [c, setC] = useState(DEFAULTS);

  const load = async () => {
    const { data } = await supabase.from('gallery').select('*').order('uploaded_at', { ascending: false });
    setPhotos(data || []);
  };
  useEffect(() => {
    load();
    supabase.from('contact_info').select('*').eq('id', 1).maybeSingle().then(({ data }) => setC(mergeContact(data)));
  }, []);

  const upload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const form = e.target;
    setMsg('Uploading…');
    const path = `${Date.now()}-${file.name.replace(/[^\w.-]/g, '_')}`;
    const up = await supabase.storage.from('gallery').upload(path, file);
    if (up.error) return setMsg(`Upload failed: ${up.error.message}`);
    const { data: pub } = supabase.storage.from('gallery').getPublicUrl(path);
    const ins = await supabase.from('gallery').insert({ title, image_url: pub.publicUrl, storage_path: path });
    if (ins.error) return setMsg(`Save failed: ${ins.error.message}`);
    setTitle(''); setFile(null); form.reset(); setMsg('Photo uploaded.'); load();
  };
  const remove = async (p) => {
    if (!confirm(`Delete "${p.title}"?`)) return;
    if (p.storage_path) await supabase.storage.from('gallery').remove([p.storage_path]);
    await supabase.from('gallery').delete().eq('id', p.id);
    load();
  };
  const saveContact = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('contact_info').upsert({ ...c, id: 1, updated_at: new Date().toISOString() });
    setMsg(error ? `Save failed: ${error.message}` : 'Contact details saved.');
  };
  const cf = (k, label) => <label key={k}>{label}<input value={c[k] || ''} onChange={(e) => setC({ ...c, [k]: e.target.value })} /></label>;

  return (
    <section className="sec">
      <div className="row spread"><h1>Admin</h1><button className="btn ghost sm" onClick={() => supabase.auth.signOut()}>Log out</button></div>
      {msg && <p className="note">{msg}</p>}
      <div className="two">
        <div>
          <h2>Upload a photo</h2>
          <form className="stack" onSubmit={upload}>
            <label>Title<input required value={title} onChange={(e) => setTitle(e.target.value)} /></label>
            <label>Photo<input required type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} /></label>
            <button className="btn">Upload photo</button>
          </form>
        </div>
        <div>
          <h2>Contact details</h2>
          <form className="stack" onSubmit={saveContact}>
            {cf('phone', 'Phone')}{cf('whatsapp', 'WhatsApp number (digits with country code)')}{cf('email', 'Email')}
            {cf('address', 'Address')}{cf('location', 'Plus code / location')}{cf('map_url', 'Google Maps link')}{cf('hours', 'Opening hours')}{cf('instagram', 'Instagram link (full URL)')}
            <button className="btn">Save contact details</button>
          </form>
        </div>
      </div>
      <h2>Gallery photos</h2>
      <div className="photos">
        {photos.map((p) => (
          <figure key={p.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image_url} alt={p.title} />
            <figcaption>{p.title} <button className="link" onClick={() => remove(p)}>Delete</button></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
