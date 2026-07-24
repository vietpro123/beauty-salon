import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  XCircle, 
  Trash2, 
  RefreshCw, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Scissors, 
  Sparkles,
  Lock,
  LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FALLBACK_SERVICES, FALLBACK_STYLISTS } from "@/lib/fallbackData";

export default function Admin() {
  const [pinInput, setPinInput] = useState("");
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem("admin_authenticated") === "true"
  );
  const [pinError, setPinError] = useState(false);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === "123456" || pinInput === "admin") {
      sessionStorage.setItem("admin_authenticated", "true");
      setAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    setAuthenticated(false);
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchBookings();
    }
  }, [authenticated]);

  const updateStatus = async (id, status) => {
    setActionLoadingId(id);
    try {
      const res = await fetch("/api/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking record?")) return;
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/bookings?id=${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setBookings(prev => prev.filter(b => b.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete booking:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const getServiceName = (slug) => {
    const s = FALLBACK_SERVICES.find(item => item.slug === slug);
    return s ? s.name : slug;
  };

  const getStylistName = (slug) => {
    if (!slug) return "No preference";
    const st = FALLBACK_STYLISTS.find(item => item.slug === slug);
    return st ? st.name : slug;
  };

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = filterStatus === "all" || b.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      !q || 
      (b.client_name && b.client_name.toLowerCase().includes(q)) ||
      (b.client_email && b.client_email.toLowerCase().includes(q)) ||
      (b.client_phone && b.client_phone.toLowerCase().includes(q)) ||
      (b.service_slug && b.service_slug.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    cancelled: bookings.filter(b => b.status === "cancelled").length
  };

  // PIN Login Screen
  if (!authenticated) {
    return (
      <section className="min-h-screen pt-36 pb-20 flex items-center justify-center prism-gradient px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass border border-foreground/10 p-8 md:p-12 rounded-sm max-w-md w-full text-center"
        >
          <div className="h-12 w-12 rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-6">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="font-serif text-3xl mb-2">Salon Admin Access</h1>
          <p className="text-sm text-foreground/60 mb-8">Enter manager passcode to access booking management</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter passcode (default: 123456)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full bg-background/80 border border-foreground/20 px-4 py-3 text-center text-lg tracking-widest rounded-sm focus:outline-none focus:border-foreground"
              />
              {pinError && (
                <p className="text-xs text-red-500 mt-2">Incorrect passcode. Try: 123456</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-foreground text-background py-3 text-[11px] uppercase tracking-editorial hover:bg-secondary transition"
            >
              Unlock Dashboard
            </button>
          </form>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-28 md:pt-36 pb-24 bg-background px-3 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-foreground/10">
          <div>
            <div className="text-[11px] uppercase tracking-editorial text-foreground/50 mb-1">
              Maison Luminaire — Cloud Manager
            </div>
            <h1 className="font-serif text-4xl md:text-5xl">Booking Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchBookings}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text.xs uppercase tracking-editorial hover:bg-foreground/5 transition disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full bg-foreground/10 px-4 py-2 text-xs uppercase tracking-editorial hover:bg-foreground hover:text-background transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              Exit
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="glass border border-foreground/10 p-5 rounded-sm">
            <div className="text-[10px] uppercase tracking-editorial text-foreground/50">Total Requests</div>
            <div className="font-serif text-3xl md:text-4xl mt-2">{stats.total}</div>
          </div>
          <div className="glass border border-amber-500/30 bg-amber-500/5 p-5 rounded-sm">
            <div className="text-[10px] uppercase tracking-editorial text-amber-700">Pending Review</div>
            <div className="font-serif text-3xl md:text-4xl mt-2 text-amber-700">{stats.pending}</div>
          </div>
          <div className="glass border border-emerald-500/30 bg-emerald-500/5 p-5 rounded-sm">
            <div className="text-[10px] uppercase tracking-editorial text-emerald-700">Confirmed</div>
            <div className="font-serif text-3xl md:text-4xl mt-2 text-emerald-700">{stats.confirmed}</div>
          </div>
          <div className="glass border border-rose-500/30 bg-rose-500/5 p-5 rounded-sm">
            <div className="text-[10px] uppercase tracking-editorial text-rose-700">Cancelled</div>
            <div className="font-serif text-3xl md:text-4xl mt-2 text-rose-700">{stats.cancelled}</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: `All (${stats.total})` },
              { id: "pending", label: `Pending (${stats.pending})` },
              { id: "confirmed", label: `Confirmed (${stats.confirmed})` },
              { id: "cancelled", label: `Cancelled (${stats.cancelled})` },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setFilterStatus(t.id)}
                className={`text-[11px] uppercase tracking-editorial rounded-full px-4 py-2 border transition ${
                  filterStatus === t.id
                    ? "bg-foreground text-background border-foreground"
                    : "border-foreground/20 hover:border-foreground/60"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
            <input
              type="text"
              placeholder="Search by client or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-foreground/20 pl-9 pr-4 py-2 text-xs rounded-full focus:outline-none focus:border-foreground"
            />
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-foreground/20 rounded-sm">
            <Calendar className="h-10 w-10 text-foreground/30 mx-auto mb-4" />
            <h3 className="font-serif text-2xl mb-2">No bookings found</h3>
            <p className="text-xs text-foreground/60">
              {bookings.length === 0 
                ? "No client appointments have been submitted yet." 
                : "No appointments match your current filter or search criteria."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((b) => (
              <motion.div
                key={b.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`glass border p-6 rounded-sm transition-colors ${
                  b.status === "confirmed" 
                    ? "border-emerald-500/40 bg-emerald-500/5" 
                    : b.status === "cancelled"
                    ? "border-rose-500/20 opacity-70"
                    : "border-amber-500/40 bg-amber-500/5"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Client Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`inline-block text-[10px] uppercase tracking-editorial px-2.5 py-0.5 rounded-full font-medium ${
                        b.status === "confirmed"
                          ? "bg-emerald-500/20 text-emerald-800"
                          : b.status === "cancelled"
                          ? "bg-rose-500/20 text-rose-800"
                          : "bg-amber-500/20 text-amber-800"
                      }`}>
                        ● {b.status || "pending"}
                      </span>
                      <span className="text-[10px] uppercase tracking-editorial text-foreground/40">
                        Submitted: {b.created_at ? new Date(b.created_at).toLocaleString() : "Recently"}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl flex items-center gap-2">
                      <User className="h-4 w-4 text-foreground/50 inline" />
                      {b.client_name || "Unnamed Client"}
                    </h3>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-6 text-xs text-foreground/75">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-foreground/40" />
                        <a href={`mailto:${b.client_email}`} className="hover:underline">{b.client_email || "N/A"}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-foreground/40" />
                        <a href={`tel:${b.client_phone}`} className="hover:underline">{b.client_phone || "N/A"}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Scissors className="h-3.5 w-3.5 text-foreground/40" />
                        <span>{getServiceName(b.service_slug)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-foreground/40" />
                        <span>Date: <strong>{b.requested_date || "N/A"}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-foreground/40" />
                        <span>Time: <strong>{b.requested_time || "N/A"}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-foreground/40" />
                        <span>Stylist: <strong>{getStylistName(b.stylist_slug)}</strong></span>
                      </div>
                    </div>

                    {b.notes && (
                      <div className="mt-3 text-xs bg-background/60 p-3 rounded border border-foreground/10 text-foreground/80">
                        <strong className="text-foreground/50">Client Notes:</strong> {b.notes}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-foreground/10">
                    {b.status !== "confirmed" && (
                      <button
                        onClick={() => updateStatus(b.id, "confirmed")}
                        disabled={actionLoadingId === b.id}
                        className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 text-white px-4 py-2 text-[11px] uppercase tracking-editorial hover:bg-emerald-700 transition disabled:opacity-50"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        Confirm
                      </button>
                    )}
                    {b.status !== "cancelled" && (
                      <button
                        onClick={() => updateStatus(b.id, "cancelled")}
                        disabled={actionLoadingId === b.id}
                        className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 text-white px-4 py-2 text-[11px] uppercase tracking-editorial hover:bg-amber-700 transition disabled:opacity-50"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={() => deleteBooking(b.id)}
                      disabled={actionLoadingId === b.id}
                      aria-label="Delete"
                      className="p-2 rounded-full border border-foreground/20 text-foreground/60 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
