import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import { CAT_BY_ID } from '../data/categories'
import type { Place } from '../data/types'
import type { LatLng } from '../utils'

interface Props {
  places: Place[]
  route?: Place[]
  routeColor?: string
  focusId?: string | null
  selectedId?: string | null
  userPos?: LatLng | null
  onSelect?: (p: Place) => void
  className?: string
}

function pinIcon(p: Place, opts: { n?: number; active?: boolean }) {
  const c = CAT_BY_ID[p.cat].color
  return L.divIcon({
    className: 'pin-wrap',
    html: `<div class="pin ${opts.active ? 'pin--on' : ''}" style="--c:${c}"><span>${
      opts.n ? opts.n : p.emoji
    }</span></div>`,
    iconSize: [38, 46],
    iconAnchor: [19, 44],
  })
}

export function MapView({
  places, route, routeColor = '#E0526F', focusId, selectedId, userPos, onSelect, className,
}: Props) {
  const el = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)
  const layer = useRef<L.LayerGroup | null>(null)
  const userLayer = useRef<L.LayerGroup | null>(null)
  const onSelectRef = useRef(onSelect)
  useEffect(() => {
    onSelectRef.current = onSelect
  })

  // init
  useEffect(() => {
    if (!el.current || map.current) return
    const m = L.map(el.current, { zoomControl: false, attributionControl: true }).setView(
      [41.02, 28.99],
      11,
    )
    L.control.zoom({ position: 'bottomright' }).addTo(m)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
      attribution: '© OpenStreetMap contributors © CARTO',
    }).addTo(m)
    layer.current = L.layerGroup().addTo(m)
    userLayer.current = L.layerGroup().addTo(m)
    map.current = m
    const ro = new ResizeObserver(() => m.invalidateSize())
    ro.observe(el.current)
    return () => {
      ro.disconnect()
      m.remove()
      map.current = null
    }
  }, [])

  // markers + route
  useEffect(() => {
    const m = map.current
    const g = layer.current
    if (!m || !g) return
    g.clearLayers()
    if (route && route.length > 1) {
      L.polyline(
        route.map((p) => [p.lat, p.lng] as [number, number]),
        { color: routeColor, weight: 5, opacity: 0.85, dashArray: '2 10', lineCap: 'round' },
      ).addTo(g)
    }
    places.forEach((p) => {
      const n = route ? route.findIndex((r) => r.id === p.id) + 1 : 0
      L.marker([p.lat, p.lng], {
        icon: pinIcon(p, { n: n || undefined, active: p.id === selectedId }),
        riseOnHover: true,
      })
        .on('click', () => onSelectRef.current?.(p))
        .addTo(g)
    })
    if (route && route.length) {
      m.fitBounds(L.latLngBounds(route.map((p) => [p.lat, p.lng] as [number, number])), {
        padding: [40, 40],
        maxZoom: 16,
      })
    }
  }, [places, route, routeColor, selectedId])

  // focus
  useEffect(() => {
    const m = map.current
    if (!m || !focusId) return
    const p = places.find((x) => x.id === focusId)
    if (p) m.flyTo([p.lat, p.lng], 15, { duration: 1.1 })
  }, [focusId, places])

  // user location
  useEffect(() => {
    const g = userLayer.current
    if (!g) return
    g.clearLayers()
    if (userPos) {
      L.marker([userPos.lat, userPos.lng], {
        icon: L.divIcon({
          className: 'pin-wrap',
          html: '<div class="me"><i></i></div>',
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        }),
        interactive: false,
      }).addTo(g)
    }
  }, [userPos])

  return <div ref={el} className={`map ${className ?? ''}`} />
}
