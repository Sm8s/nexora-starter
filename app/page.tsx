export default function Home() {
  return (
    <div className="grid gap-6">
      <section className="card">
        <h2 className="text-lg font-semibold mb-2">Willkommen bei NEXORA</h2>
        <p>Elegantes Portfolio & Learning Hub. Klicke 5× auf das Logo oben links für den Admin-Bereich.</p>
      </section>
      <section className="card">
        <h3 className="font-medium mb-2">Module (Preview)</h3>
        <ul className="list-disc ml-6 space-y-1">
          <li>CMS: Seiten & Beiträge</li>
          <li>Lernsystem: Aufgaben & Fortschritt</li>
          <li>Medien: Uploads (Supabase Storage)</li>
          <li>Audit-Log & Analytics (Stub)</li>
        </ul>
      </section>
    </div>
  )
}
