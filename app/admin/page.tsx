import Link from 'next/link'

export default function Admin() {
  return (
    <div className="grid gap-6">
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Admin Dashboard (Stub)</h2>
        <p className="opacity-80 mb-4">Hier folgen Module: Pages, Posts, Tasks, Media, Audit, Menu-Builder.</p>
        <div className="flex gap-3 text-sm">
          <Link href="/admin/pages" className="underline">Pages</Link>
          <Link href="/admin/posts" className="underline">Posts</Link>
          <Link href="/admin/tasks" className="underline">Tasks</Link>
        </div>
      </div>
    </div>
  )
}
