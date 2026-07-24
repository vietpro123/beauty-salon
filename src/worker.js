export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // API Route: /api/bookings
    if (url.pathname.startsWith('/api/bookings')) {
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
      };

      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
      }

      try {
        const kv = env.BOOKINGS_KV;

        // GET /api/bookings -> Return list of all bookings
        if (request.method === 'GET') {
          let bookings = [];
          if (kv) {
            const list = await kv.list();
            for (const key of list.keys) {
              const item = await kv.get(key.name);
              if (item) {
                try { bookings.push(JSON.parse(item)); } catch (e) {}
              }
            }
          } else {
            bookings = globalThis.__MEMORY_BOOKINGS__ || [];
          }
          bookings.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
          return new Response(JSON.stringify(bookings), { headers: corsHeaders });
        }

        // POST /api/bookings -> Save new booking
        if (request.method === 'POST') {
          const body = await request.json();
          const newBooking = {
            id: `bkg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            ...body,
            status: body.status || 'pending',
            created_at: new Date().toISOString()
          };

          if (kv) {
            await kv.put(newBooking.id, JSON.stringify(newBooking));
          } else {
            globalThis.__MEMORY_BOOKINGS__ = globalThis.__MEMORY_BOOKINGS__ || [];
            globalThis.__MEMORY_BOOKINGS__.push(newBooking);
          }

          return new Response(JSON.stringify({ success: true, booking: newBooking }), {
            status: 201,
            headers: corsHeaders
          });
        }

        // PUT /api/bookings -> Update booking status
        if (request.method === 'PUT') {
          const body = await request.json();
          if (!body.id) {
            return new Response(JSON.stringify({ error: 'Missing booking ID' }), { status: 400, headers: corsHeaders });
          }

          let existing = null;
          if (kv) {
            const raw = await kv.get(body.id);
            if (raw) existing = JSON.parse(raw);
          } else {
            const list = globalThis.__MEMORY_BOOKINGS__ || [];
            existing = list.find(b => b.id === body.id);
          }

          if (!existing) {
            return new Response(JSON.stringify({ error: 'Booking not found' }), { status: 404, headers: corsHeaders });
          }

          const updated = { ...existing, ...body, updated_at: new Date().toISOString() };
          if (kv) {
            await kv.put(updated.id, JSON.stringify(updated));
          } else {
            const list = globalThis.__MEMORY_BOOKINGS__ || [];
            const idx = list.findIndex(b => b.id === body.id);
            if (idx !== -1) list[idx] = updated;
          }

          return new Response(JSON.stringify({ success: true, booking: updated }), { headers: corsHeaders });
        }

        // DELETE /api/bookings -> Delete booking
        if (request.method === 'DELETE') {
          const urlParams = new URLSearchParams(url.search);
          const id = urlParams.get('id');
          if (!id) {
            return new Response(JSON.stringify({ error: 'Missing booking ID' }), { status: 400, headers: corsHeaders });
          }

          if (kv) {
            await kv.delete(id);
          } else {
            const list = globalThis.__MEMORY_BOOKINGS__ || [];
            globalThis.__MEMORY_BOOKINGS__ = list.filter(b => b.id !== id);
          }

          return new Response(JSON.stringify({ success: true, deletedId: id }), { headers: corsHeaders });
        }
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
      }
    }

    // Serve static assets SPA
    return env.ASSETS.fetch(request);
  }
};
