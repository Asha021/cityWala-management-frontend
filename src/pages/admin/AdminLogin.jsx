import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios'

// ─── Sidebar ──────────────────────────────────────────────────────────────────
// function AdminSidebar({ active }) {
//   const { logout } = useAuth()
//   const navigate = useNavigate()
//   const links = [
//     { to: '/admin/dashboard', icon: 'fa-gauge', label: 'Dashboard' },
//     { to: '/admin/users', icon: 'fa-users', label: 'Users' },
//     { to: '/admin/categories', icon: 'fa-th-large', label: 'Categories' },
//     { to: '/admin/banners', icon: 'fa-images', label: 'Banners' },
//     { to: '/admin/matrimonial', icon: 'fa-heart', label: 'Matrimonial' },
//     { to: '/admin/advertise', icon: 'fa-ad', label: 'Advertise' },
//   ]
//   return (
//     <div className="col-lg-2 col-md-3 dashboard-sidebar">
//       <div className="text-center p-3">
//         <i className="fa-solid fa-shield fa-2x text-white mb-2"></i>
//         <h6 className="text-white mb-0" style={{ fontSize: 13 }}>Admin Panel</h6>
//       </div>
//       <hr style={{ borderColor: '#333' }} />
//       <nav>
//         {links.map(l => (
//           <Link key={l.to} to={l.to} className={active === l.to ? 'active' : ''}>
//             <i className={`fa-solid ${l.icon} me-2`}></i>{l.label}
//           </Link>
//         ))}
//         <button
//           onClick={() => { logout(); navigate('/') }}
//           style={{ background: 'none', border: 'none', color: '#aaa', padding: '12px 20px', width: '100%', textAlign: 'left', fontSize: 14 }}
//         >
//           <i className="fa-solid fa-sign-out me-2"></i>Logout
//         </button>
//       </nav>
//     </div>
//   )
// }

export function AdminSidebar({ active }) {
  const menus = [
    {
      name: "Dashboard",
      link: "/admin/dashboard",
      icon: "fa-gauge-high"
    },
    {
      name: "Users",
      link: "/admin/users",
      icon: "fa-users"
    },
    // {
    //   name: "Partners",
    //   link: "/admin/partners",
    //   icon: "fa-handshake"
    // },
    {
      name: "Partners",
      icon: "fa-handshake",
      children: [
        { name: "All Partners", link: "/admin/partners" },
        { name: "Requests", link: "/admin/partners/requests" },
        // { name: "Payouts", link: "/admin/partners/payouts" }
      ]
    },
    // {
    //   name: "Categories",
    //   link: "/admin/categories",
    //   icon: "fa-table-cells-large"
    // },
    {
      name: "Categories",
      icon: "fa-table-cells-large",
      children: [
        { name: "All Categories", link: "/admin/categories" },
        { name: "Add Category", link: "/admin/categories/add" },
        { name: "Category Tree", link: "/admin/categories/tree" }
      ]
    },
    // {
    //   name: "Subcategories",
    //   link: "/admin/subcategories",
    //   icon: "fa-layer-group"
    // },
    {
      name: "Subcategories",
      icon: "fa-layer-group",
      children: [
        {
          name: "All Subcategories",
          link: "/admin/subcategories",
          icon: "fa-list"
        },
        {
          name: "Add Subcategory",
          link: "/admin/subcategories/add",
          icon: "fa-plus"
        }
      ]
    },
    // {
    //   name: "Banners",
    //   link: "/admin/banners",
    //   icon: "fa-images"
    // },
    // {
    //   name: "Advertise",
    //   link: "/admin/advertise",
    //   icon: "fa-bullhorn"
    // },
    // {
    //   name: "Matrimonial",
    //   link: "/admin/matrimonial",
    //   icon: "fa-heart"
    // }
  ];

  return (
    <div
      className="col-lg-2 col-md-3 p-0 bg-red-700"
      style={{
        minHeight: "100vh",
        background: "#0f172a"
      }}
    >
      {/* Logo */}
      <div className="text-center py-4 border-bottom border-secondary">
        <i
          className="fa-solid fa-shield-halved fa-2x text-white mb-2"
        ></i>

        <h6 className="text-white mb-0 fw-bold">
          Admin Panel
        </h6>
      </div>

      {/* Menu */}
      <ul className="list-unstyled m-0 p-0">

        {menus.map((item) => (
          <li key={item.name}>

            {/* Normal Menu */}
            {!item.children ? (
              <Link
                to={item.link}
                className="d-flex align-items-center gap-2 px-4 py-3 text-decoration-none"
                style={{
                  color:
                    active === item.link
                      ? "#fff"
                      : "#cbd5e1",

                  background:
                    active === item.link
                      ? "#1e293b"
                      : "transparent",

                  borderLeft:
                    active === item.link
                      ? "4px solid #1075be"
                      : "4px solid transparent",

                  transition: "0.3s"
                }}
              >
                <i className={`fa-solid ${item.icon}`}></i>
                <span>{item.name}</span>
              </Link>
            ) : (
              <>
                {/* Parent Menu */}
                <div
                  className="d-flex align-items-center justify-content-between px-4 py-3"
                  style={{
                    color: "#cbd5e1",
                    cursor: "pointer"
                  }}
                  data-bs-toggle="collapse"
                  data-bs-target={`#menu-${item.name}`}
                >
                  <div className="d-flex align-items-center gap-2">
                    <i className={`fa-solid ${item.icon}`}></i>
                    <span>{item.name}</span>
                  </div>

                  <i className="fa-solid fa-angle-down"></i>
                </div>

                {/* Child Menu */}
                <div
                  className="collapse"
                  id={`menu-${item.name}`}
                >
                  {item.children.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.link}
                      className="d-flex align-items-center gap-2 px-5 py-2 text-decoration-none"
                      style={{
                        color:
                          active === sub.link
                            ? "#fff"
                            : "#94a3b8",
                         background:
                          active === sub.link
                            ? "#1e293b"
                            : "transparent",

                        fontSize: "14px"
                      }}
                    >
                      <i className={`fa-solid ${sub.icon}`}></i>
                      <span>{sub.name}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </li>
        ))}

        {/* Logout */}
        <li>
          <Link
            to="/admin/login"
            className="d-flex align-items-center gap-2 px-4 py-3 text-decoration-none text-danger"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </Link>
        </li>

      </ul>
    </div>
  );
}
// ─── Admin Login ───────────────────────────────────────────────────────────────
export function AdminLogin() {
  const { adminLogin } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      await adminLogin(form.email, form.password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin credentials')
    } finally { setLoading(false) }
  }

  return (
    <div className="auth-wrapper" style={{ background: '#1a1a2e' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-5">
            <div className="card auth-card p-4">
              <div className="text-center mb-4">
                <i className="fa-solid fa-shield fa-3x mb-3" style={{ color: '#1075be' }}></i>
                <h4 className="fw-bold">Admin Login</h4>
                <p className="text-muted" style={{ fontSize: 13 }}>CityWala Admin Panel</p>
              </div>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="email" placeholder="Email"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  <label>Admin Email</label>
                </div>
                <div className="form-floating mb-4">
                  <input type="password" className="form-control" id="password" placeholder="Password"
                    value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                  <label>Password</label>
                </div>
                <button className="btn btn-primary w-100 py-2" disabled={loading}>
                  {loading ? 'Logging in...' : 'Admin Login'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
export function AdminDashboard() {
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // FIX: backend returns { stats: { users, partners, matrimonial_profiles, categories, banners, advertises } }
    API.get('/admin/dashboard')
      .then(r => setStats(r.data.stats || {}))
      .catch(() => { })
      .finally(() => setLoading(false))
  }, [])

  const cards = [
    { label: 'Total Users', val: stats.users ?? 0, icon: 'fa-users', color: '#1075be', link: '/admin/users' },
    { label: 'Partners', val: stats.partners ?? 0, icon: 'fa-handshake', color: '#f46f26', link: '/admin/users' },
    { label: 'Matrimonial', val: stats.matrimonial_profiles ?? 0, icon: 'fa-heart', color: '#e91e63', link: '/admin/matrimonial' },
    { label: 'Categories', val: stats.categories ?? 0, icon: 'fa-th-large', color: '#f59e0b', link: '/admin/categories' },
    { label: 'Banners', val: stats.banners ?? 0, icon: 'fa-images', color: '#10b981', link: '/admin/banners' },
    { label: 'Advertises', val: stats.advertises ?? 0, icon: 'fa-ad', color: '#8b5cf6', link: '/admin/advertise' },
  ]

  return (
    <div style={{ minHeight: '80vh', background: '#f5f5f5' }}>
      <div className="row g-0">
        <AdminSidebar active="/admin/dashboard" />
        <div className="col-lg-10 col-md-9 p-4">
          <h4 className="fw-bold mb-4">Admin Dashboard</h4>

          {loading ? (
            <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
          ) : (
            <div className="row g-3 mb-4">
              {cards.map(c => (
                <div key={c.label} className="col-md-4 col-6">
                  <Link to={c.link} style={{ textDecoration: 'none' }}>
                    <div className="stat-card d-flex align-items-center gap-3 p-3"
                      style={{ background: `linear-gradient(135deg,${c.color},${c.color}99)`, borderRadius: 12, color: '#fff' }}>
                      <i className={`fa-solid ${c.icon} fa-2x`}></i>
                      <div>
                        <div style={{ fontSize: 26, fontWeight: 700 }}>{c.val}</div>
                        <div style={{ fontSize: 13, opacity: 0.85 }}>{c.label}</div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="row g-3">
            {[
              { title: 'Manage Categories', icon: 'fa-th-large', link: '/admin/categories', color: '#1075be' },
              { title: 'Manage Banners', icon: 'fa-images', link: '/admin/banners', color: '#f46f26' },
              { title: 'Manage Advertise', icon: 'fa-ad', link: '/admin/advertise', color: '#f59e0b' },
              { title: 'View Users', icon: 'fa-users', link: '/admin/users', color: '#10b981' },
              { title: 'Matrimonial', icon: 'fa-heart', link: '/admin/matrimonial', color: '#e91e63' },
            ].map(q => (
              <div key={q.title} className="col-md-4 col-6">
                <Link to={q.link} className="card p-3 text-center text-decoration-none h-100" style={{ border: `2px solid ${q.color}30` }}>
                  <i className={`fa-solid ${q.icon} fa-2x mb-2`} style={{ color: q.color }}></i>
                  <p className="mb-0 fw-semibold" style={{ fontSize: 13 }}>{q.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Admin Users ──────────────────────────────────────────────────────────────
export function AdminUsers() {
  const [users, setUsers] = useState([])
  const [partners, setPartners] = useState([])
  const [tab, setTab] = useState('users')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      API.get('/admin/users'),
      // FIX: correct endpoint is /partner/all
      API.get('/partner/all'),
    ])
      .then(([u, p]) => {
        // FIX: backend returns { users: [] } and { partners: [] }
        setUsers(u.data.users || u.data || [])
        setPartners(p.data.partners || p.data || [])
      })
      .catch(() => { })
      .finally(() => setLoading(false))
  }, [])

  const list = tab === 'users' ? users : partners

  return (
    <div style={{ minHeight: '80vh', background: '#f5f5f5' }}>
      <div className="row g-0">
        <AdminSidebar active="/admin/users" />
        <div className="col-lg-10 col-md-9 p-4">
          <h4 className="fw-bold mb-4">User Management</h4>
          <div className="card p-3">
            <div className="d-flex gap-2 mb-3">
              <button className={`btn btn-sm ${tab === 'users' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTab('users')}>
                Customers ({users.length})
              </button>
              <button className={`btn btn-sm ${tab === 'partners' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTab('partners')}>
                Partners ({partners.length})
              </button>
            </div>
            {loading ? <div className="text-center py-3"><div className="spinner-border text-primary"></div></div> : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Mobile</th><th>Joined</th></tr></thead>
                  <tbody>
                    {list.map((u, i) => (
                      <tr key={u._id}>
                        <td>{i + 1}</td>
                        <td className="fw-semibold">{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.mobile || '—'}</td>
                        <td style={{ fontSize: 12 }}>{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                      </tr>
                    ))}
                    {list.length === 0 && <tr><td colSpan={5} className="text-center text-muted py-4">No records found</td></tr>}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Admin Categories (nested: unlimited depth via parentId) ─────────────────
function catIdStr(id) {
  if (id == null) return ''
  return typeof id === 'object' && id.toString ? id.toString() : String(id)
}

function buildChildrenByParent(categories) {
  const map = new Map()
  for (const c of categories) {
    const pid = c.parentId ? catIdStr(c.parentId) : ''
    if (!map.has(pid)) map.set(pid, [])
    map.get(pid).push(c)
  }
  for (const [, arr] of map) arr.sort((a, b) => a.name.localeCompare(b.name))
  return map
}

/** Depth-first list: root → children → … (works for 20+ levels). */
function flattenCategoryTree(categories) {
  const byParent = buildChildrenByParent(categories)
  const out = []
  function walk(parentKey, depth) {
    for (const c of byParent.get(parentKey) || []) {
      out.push({ cat: c, depth })
      walk(catIdStr(c._id), depth + 1)
    }
  }
  walk('', 0)
  return out
}

/** When editing `rootId`, cannot choose self or any descendant as parent (avoids cycles). */
function getSelfAndDescendantIds(categories, rootId) {
  if (!rootId) return new Set()
  const byParent = buildChildrenByParent(categories)
  const blocked = new Set()
  function add(id) {
    blocked.add(catIdStr(id))
    for (const c of byParent.get(catIdStr(id)) || []) add(c._id)
  }
  add(rootId)
  return blocked
}

function getCategoryPath(categories, cat) {
  const byId = new Map(categories.map((c) => [catIdStr(c._id), c]))
  const parts = []
  let cur = cat
  const guard = new Set()
  while (cur && !guard.has(catIdStr(cur._id))) {
    guard.add(catIdStr(cur._id))
    parts.unshift(cur.name)
    cur = cur.parentId ? byId.get(catIdStr(cur.parentId)) : null
  }
  return parts.join(' › ')
}

// add categories page
export function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({
    name: '',
    slug: '',
    parentId: '',
    image: '',
    status: true,
  })
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const loadCats = () => {
    setLoading(true)
    return API.get('/categories')
      .then((r) => setCategories(r.data.categories || r.data || []))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    loadCats()
  }, [])

  const blockedParentIds = useMemo(
    () => getSelfAndDescendantIds(categories, editId),
    [categories, editId]
  )

  const parentSelectRows = useMemo(() => {
    return flattenCategoryTree(categories).filter(
      ({ cat }) => !blockedParentIds.has(catIdStr(cat._id))
    )
  }, [categories, blockedParentIds])

  const tableRows = useMemo(() => flattenCategoryTree(categories), [categories])

  const openEdit = (cat) => {
    setEditId(cat._id)
    setForm({
      name: cat.name,
      slug: cat.slug || '',
      parentId: cat.parentId ? catIdStr(cat.parentId) : '',
      image: typeof cat.image === 'string' ? cat.image : '',
      status: cat.status !== false,
    })
  }

  const cancelEdit = () => {
    setEditId(null)
    setForm({ name: '', slug: '', parentId: '', image: '', status: true })
  }

  const appendFormToFd = (fd) => {
    fd.append('name', form.name.trim())
    if (form.slug && form.slug.trim()) fd.append('slug', form.slug.trim())
    const pid = form.parentId && String(form.parentId).trim()
    fd.append('parentId', pid || '')
    if (form.image && String(form.image).trim()) fd.append('image', String(form.image).trim())
    fd.append('status', form.status ? 'true' : 'false')
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const data = new FormData()
      appendFormToFd(data)
      await API.post('/categories', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      cancelEdit()
      loadCats()
    } catch (err) {
      alert(err.response?.data?.message || 'Error')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    if (!editId) return
    setSaving(true)
    try {
      const data = new FormData()
      appendFormToFd(data)
      await API.put(`/categories/${editId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      cancelEdit()
      loadCats()
    } catch (err) {
      alert(err.response?.data?.message || 'Error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return
    try {
      await API.delete(`/categories/${id}`)
      if (editId && catIdStr(editId) === catIdStr(id)) cancelEdit()
      loadCats()
    } catch (err) {
      alert(err.response?.data?.message || 'Error')
    }
  }

  const genrateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/, "")
  }

  return (
    <div style={{ minHeight: '80vh', background: '#f5f5f5' }}>
      <div className="row g-0">
        <AdminSidebar active="/admin/categories" />
        <div className="col-lg-10 col-md-9 p-4">
          <h4 className="fw-bold mb-4">Category Management</h4>
          {/* <p className="text-muted small mb-3">
            Parent choose karke kitni bhi depth bana sakte ho (sub, sub-sub, …). Naya level = koi bhi existing
            category ko parent select karo.
          </p> */}
          <div className="row g-3">
            <div className="col-md-4">
              <div className="card p-3">
                <h6 className="fw-bold mb-3">{editId ? 'Edit category' : 'Add category'}</h6>

                <form onSubmit={editId ? handleEdit : handleAdd}>
                  <input
                    className="form-control mb-2"
                    placeholder="Category name"
                    value={form.name}
                    onChange={(e)=>{
                      const name = e.target.value;
                      setForm(prev => ({
                        ...prev,
                        name,
                        slug: genrateSlug(name),
                      }))
                    }}
                    required
                  />

                  <input
                    className="form-control mb-2"
                    placeholder="Slug (optional — auto if empty)"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  />

                  <label className="form-label small text-muted mb-0">Parent (khaali = root)</label>
                  <select
                    className="form-control mb-2"
                    value={form.parentId}
                    onChange={(e) => setForm({ ...form, parentId: e.target.value })}
                  >
                    <option value="">— Root (no parent) —</option>
                    {parentSelectRows.map(({ cat, depth }) => (
                      // <option key={cat._id} value={catIdStr(cat._id)}>
                      //   {'— '.repeat(depth)}
                      //   {depth > 0 ? ' ' : ''}
                      //   {cat.name}
                      // </option>
                      <option key={cat._id} value={catIdStr(cat._id)}>
                        {depth > 0 ? "↳ ".repeat(depth) : ""} {cat.name}
                      </option>
                    ))}
                  </select>

                  {/* <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Image URL (optional)"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                  /> */}

                  <input
                    type="file"
                    className="form-control mb-2"
                    onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                    required
                  />

                  {/* Preview */}
                  {form.image && typeof form.image !== "string" && (
                    <img
                      src={URL.createObjectURL(form.image)}
                      alt="preview"
                      width={60}
                      className="mb-2 rounded"
                      required
                    />
                  )}

                  {/* Existing image (edit mode) */}
                  {form.image && typeof form.image === "string" && (
                    <img src={form.image} alt="" width={60} className="mb-2 rounded" />
                  )}

                  <select
                    className="form-control mb-2"
                    value={form.status ? 'true' : 'false'}
                    onChange={(e) => setForm({ ...form, status: e.target.value === 'true' })}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>

                  <button type="submit" className="btn btn-primary w-100 mb-2" disabled={saving}>
                    {saving ? 'Saving…' : editId ? 'Update category' : 'Add category'}
                  </button>
                  {editId && (
                    <button type="button" className="btn btn-outline-secondary w-100" onClick={cancelEdit}>
                      Cancel edit
                    </button>
                  )}
                </form>
              </div>
            </div>
           <div className="md:w-8/12 max-h-screen overflow-x-scroll">
              <div className="card p-3">
                <h6 className="fw-bold mb-3">All categories ({categories.length})</h6>
                {loading ? (
                  <div className="text-center py-3">
                    <div className="spinner-border text-primary"></div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tree</th>
                          <th>Full path</th>
                          <th>Image</th>
                          <th>Status</th>
                          <th>Slug</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows.map(({ cat: c, depth }, i) => (
                          <tr key={c._id}>
                            <td>{i + 1}</td>
                            <td className="fw-semibold" style={{ paddingLeft: 8 + depth * 12 }}>
                              {/* {depth > 0 ? '↳ ' : ''} */}
                              <span className="me-1 text-muted">
                                {depth === 0 ? "📁" : "└─"}
                              </span>
                              {c.name}
                              {/* {c.name} */}
                            </td>
                            {/* <td className="small text-muted">{getCategoryPath(categories, c)}</td> */}
                            <td className="small">
                              <span className="badge bg-light text-dark">
                                {getCategoryPath(categories, c)}
                              </span>
                            </td>
                            <td>{c.image ? <img src={c.image} alt="" width={50} /> : '—'}</td>
                            <td>{c.status ? 'Active' : 'Inactive'}</td>
                            <td>
                              <code>{c.slug}</code>
                            </td>
                            <td>
                              <button
                                type="button"
                                onClick={() => handleDelete(c._id)}
                                className="btn btn-danger btn-sm"
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                className="btn btn-warning btn-sm ms-1"
                                onClick={() => openEdit(c)}
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Admin Banners ────────────────────────────────────────────────────────────
export function AdminBanners() {
  const [banners, setBanners] = useState([])
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'

  // FIX: use /banners/all for admin (includes inactive)
  const loadBanners = () => API.get('/banners/all').then(r => setBanners(r.data || [])).catch(() => API.get('/banners').then(r => setBanners(r.data || [])))
  useEffect(() => { loadBanners() }, [])

  const handleAdd = async (e) => {
    e.preventDefault(); setSaving(true)
    const fd = new FormData()
    fd.append('title', title)
    if (file) fd.append('image', file)
    try {
      await API.post('/banners', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      setTitle(''); setFile(null); loadBanners()
    } catch (err) { alert(err.response?.data?.message || 'Error') }
    finally { setSaving(false) }
  }

  // FIX: build correct image URL
  const imgUrl = (path) => path ? `${BASE}/${path}` : ''

  return (
    <div style={{ minHeight: '80vh', background: '#f5f5f5' }}>
      <div className="row g-0">
        <AdminSidebar active="/admin/banners" />
        <div className="col-lg-10 col-md-9 p-4">
          <h4 className="fw-bold mb-4">Banner Management</h4>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="card p-3">
                <h6 className="fw-bold mb-3">Add Banner</h6>
                <form onSubmit={handleAdd}>
                  <input className="form-control mb-2" placeholder="Banner Title" value={title} onChange={e => setTitle(e.target.value)} />
                  <input type="file" className="form-control mb-3" accept="image/*" onChange={e => setFile(e.target.files[0])} />
                  <button className="btn btn-primary w-100" disabled={saving}>{saving ? 'Uploading...' : 'Add Banner'}</button>
                </form>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card p-3">
                <h6 className="fw-bold mb-3">All Banners ({banners.length})</h6>
                <div className="row g-2">
                  {banners.map(b => (
                    <div key={b._id} className="col-6">
                      <div style={{ borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
                        <img src={imgUrl(b.image)} alt={b.title} style={{ width: '100%', height: 100, objectFit: 'cover' }}
                          onError={e => e.target.style.display = 'none'} />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', padding: '4px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#fff', fontSize: 12 }}>{b.title}</span>
                          <button onClick={async () => { await API.delete(`/banners/${b._id}`); loadBanners() }}
                            style={{ background: '#dc3545', border: 'none', color: '#fff', borderRadius: 4, padding: '2px 6px', fontSize: 11 }}>Del</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {banners.length === 0 && <p className="text-muted text-center">No banners yet</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Admin Matrimonial ────────────────────────────────────────────────────────
export function AdminMatrimonial() {
  const [profiles, setProfiles] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  // FIX: admin endpoint is /admin/matrimonial, returns { profiles, total }
  useEffect(() => {
    API.get('/admin/matrimonial')
      .then(r => {
        setProfiles(r.data.profiles || [])
        setTotal(r.data.total || 0)
      })
      .catch(() => { })
      .finally(() => setLoading(false))
  }, [])

  const toggleStatus = async (id) => {
    await API.patch(`/admin/matrimonial/${id}/toggle`)
    setProfiles(prev => prev.map(p => p._id === id ? { ...p, is_active: !p.is_active } : p))
  }

  return (
    <div style={{ minHeight: '80vh', background: '#f5f5f5' }}>
      <div className="row g-0">
        <AdminSidebar active="/admin/matrimonial" />
        <div className="col-lg-10 col-md-9 p-4">
          <h4 className="fw-bold mb-4">Matrimonial Profiles <span className="badge bg-primary ms-2">{total}</span></h4>
          <div className="card p-3">
            {loading ? <div className="text-center py-3"><div className="spinner-border text-primary"></div></div> : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr><th>#</th><th>Name</th><th>Age</th><th>Gender</th><th>City</th><th>Partner</th><th>Status</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {profiles.map((p, i) => (
                      <tr key={p._id}>
                        <td>{i + 1}</td>
                        <td className="fw-semibold">{p.name}</td>
                        <td>{p.age} yrs</td>
                        <td><span className={`badge ${p.gender === 'female' ? 'bg-danger' : 'bg-primary'}`}>{p.gender}</span></td>
                        <td>{p.city}</td>
                        <td style={{ fontSize: 12 }}>{p.partner_id?.name || '—'}</td>
                        <td>
                          <span className={`badge ${p.is_active ? 'bg-success' : 'bg-secondary'}`}>
                            {p.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="d-flex gap-1">
                          <Link to={`/matrimonial/profile/${p._id}`} className="btn btn-outline-primary btn-sm">View</Link>
                          <button onClick={() => toggleStatus(p._id)} className={`btn btn-sm ${p.is_active ? 'btn-outline-warning' : 'btn-outline-success'}`}>
                            {p.is_active ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {profiles.length === 0 && <tr><td colSpan={8} className="text-center text-muted py-4">No profiles found</td></tr>}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Admin Advertise ──────────────────────────────────────────────────────────
export function AdminAdvertise() {
  const [ads, setAds] = useState([])
  const [form, setForm] = useState({ advertise_name: '' })
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'

  const loadAds = () => API.get('/advertise').then(r => setAds(r.data || []))
  useEffect(() => { loadAds() }, [])

  const handleAdd = async (e) => {
    e.preventDefault(); setSaving(true)
    const fd = new FormData()
    fd.append('advertise_name', form.advertise_name)
    if (file) fd.append('image', file)
    try {
      await API.post('/advertise', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      setForm({ advertise_name: '' }); setFile(null); loadAds()
    } catch (err) { alert(err.response?.data?.message || 'Error') }
    finally { setSaving(false) }
  }

  return (
    <div style={{ minHeight: '80vh', background: '#f5f5f5' }}>
      <div className="row g-0">
        <AdminSidebar active="/admin/advertise" />
        <div className="col-lg-10 col-md-9 p-4">
          <h4 className="fw-bold mb-4">Advertise Management</h4>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="card p-3">
                <h6 className="fw-bold mb-3">Add Advertise</h6>
                <form onSubmit={handleAdd}>
                  <input className="form-control mb-2" placeholder="Ad Name" value={form.advertise_name}
                    onChange={e => setForm({ advertise_name: e.target.value })} required />
                  <input type="file" className="form-control mb-3" accept="image/*" onChange={e => setFile(e.target.files[0])} />
                  <button className="btn btn-primary w-100" disabled={saving}>{saving ? 'Uploading...' : 'Add Ad'}</button>
                </form>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card p-3">
                <h6 className="fw-bold mb-3">All Ads ({ads.length})</h6>
                <div className="row g-2">
                  {ads.map(ad => (
                    <div key={ad._id} className="col-6">
                      <div style={{ borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
                        <img src={`${BASE}/${ad.image}`} alt={ad.advertise_name}
                          style={{ width: '100%', height: 100, objectFit: 'cover' }}
                          onError={e => e.target.style.display = 'none'} />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', padding: '4px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#fff', fontSize: 12 }}>{ad.advertise_name}</span>
                          <button onClick={async () => { await API.delete(`/advertise/${ad._id}`); loadAds() }}
                            style={{ background: '#dc3545', border: 'none', color: '#fff', borderRadius: 4, padding: '2px 6px', fontSize: 11 }}>Del</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {ads.length === 0 && <p className="text-muted text-center">No ads yet</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
