'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'

// Tangerang center coordinates
const TANGERANG_CENTER = { lat: -6.2182, lng: 106.6629 }

const typeColors = {
  'Open Mic': '#22C55E',
  'Special Show': '#FFD700',
  'Workshop': '#60A5FA',
}

export default function OpenMicMap({ venues, selectedVenue, onSelectVenue }) {
  const mapRef = useRef(null)
  const [apiLoaded, setApiLoaded] = useState(false)
  const [mapInstance, setMapInstance] = useState(null)
  const [markers, setMarkers] = useState([])
  const [userLocation, setUserLocation] = useState(null)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  // Load Google Maps script
  useEffect(() => {
    if (!apiKey) { setApiLoaded(false); return }
    if (window.google?.maps) { setApiLoaded(true); return }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    script.onload = () => setApiLoaded(true)
    document.head.appendChild(script)
    return () => { if (!window.google?.maps) document.head.removeChild(script) }
  }, [apiKey])

  // Initialize map
  useEffect(() => {
    if (!apiLoaded || !mapRef.current) return
    const map = new window.google.maps.Map(mapRef.current, {
      center: TANGERANG_CENTER,
      zoom: 12,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#1a1a1a' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#0a0a0a' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#8a8a8a' }] },
        { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2a2a2a' }] },
        { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#666' }] },
        { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#111' }] },
        { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#1f1f1f' }] },
        { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#666' }] },
        { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#1f1f1f' }] },
        { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#333' }] },
        { featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{ color: '#555' }] },
      ],
      disableDefaultUI: false,
      zoomControl: true,
      streetViewControl: false,
      mapTypeControl: false,
    })
    setMapInstance(map)
  }, [apiLoaded])

  // Add markers when map is ready
  useEffect(() => {
    if (!mapInstance || !apiLoaded) return

    // Clear old markers
    markers.forEach((m) => m.setMap(null))

    const newMarkers = venues.map((venue) => {
      const color = typeColors[venue.type] || '#FFD700'
      const svgIcon = `
        <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30S36 31.5 36 18C36 8.06 27.94 0 18 0z" fill="${color}"/>
          <circle cx="18" cy="18" r="9" fill="#000"/>
          <text x="18" y="23" text-anchor="middle" fill="${color}" font-size="12" font-weight="bold">🎤</text>
        </svg>
      `

      const marker = new window.google.maps.Marker({
        position: { lat: venue.lat, lng: venue.lng },
        map: mapInstance,
        title: venue.name,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgIcon)}`,
          scaledSize: new window.google.maps.Size(36, 48),
          anchor: new window.google.maps.Point(18, 48),
        },
      })

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="background:#1a1a1a;color:#fff;padding:12px;border-radius:10px;min-width:200px;font-family:Inter,sans-serif;">
            <div style="font-weight:bold;font-size:14px;margin-bottom:4px;">${venue.name}</div>
            <div style="color:#aaa;font-size:12px;margin-bottom:8px;">${venue.address}</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <span style="background:rgba(255,215,0,0.15);color:#FFD700;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600;">${venue.type}</span>
            </div>
            <div style="color:#aaa;font-size:11px;margin-top:8px;">${venue.schedule[0]}</div>
            <div style="color:#22C55E;font-size:11px;">${venue.priceRange}</div>
          </div>
        `,
      })

      marker.addListener('click', () => {
        infoWindow.open(mapInstance, marker)
        onSelectVenue(venue)
      })

      return marker
    })

    setMarkers(newMarkers)
  }, [mapInstance, venues, apiLoaded])

  // Pan to selected venue
  useEffect(() => {
    if (!mapInstance || !selectedVenue) return
    mapInstance.panTo({ lat: selectedVenue.lat, lng: selectedVenue.lng })
    mapInstance.setZoom(15)
  }, [selectedVenue, mapInstance])

  // Get user location
  const getUserLocation = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition((pos) => {
      const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude }
      setUserLocation(loc)
      if (mapInstance) {
        mapInstance.panTo(loc)
        mapInstance.setZoom(13)
        new window.google.maps.Marker({
          position: loc,
          map: mapInstance,
          title: 'Lokasi Kamu',
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#3B82F6',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 3,
          },
        })
      }
    })
  }

  // Fallback if no API key
  if (!apiKey) {
    return (
      <div className="w-full h-full bg-brand-card rounded-2xl border border-brand-border flex flex-col items-center justify-center gap-4 p-6">
        <div className="w-16 h-16 bg-brand-yellow/10 rounded-full flex items-center justify-center">
          <MapPin className="w-8 h-8 text-brand-yellow" />
        </div>
        <div className="text-center">
          <h3 className="text-white font-bold mb-2">Google Maps API Key Diperlukan</h3>
          <p className="text-gray-400 text-sm mb-4">
            Tambahkan <code className="text-brand-yellow bg-brand-dark px-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> di file <code className="text-brand-yellow bg-brand-dark px-1 rounded">.env.local</code>
          </p>
          <div className="bg-brand-dark rounded-xl p-4 text-left text-xs font-mono text-gray-300 mb-4">
            # .env.local<br />
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
          </div>
        </div>
        {/* Static venue preview */}
        <div className="w-full grid grid-cols-2 gap-2 mt-2">
          {venues.slice(0, 4).map((v) => (
            <div key={v.id} className="p-3 bg-brand-dark rounded-xl border border-brand-border" onClick={() => onSelectVenue(v)}>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: typeColors[v.type] || '#FFD700' }} />
                <p className="text-white text-xs font-medium truncate">{v.name}</p>
              </div>
              <p className="text-gray-500 text-xs mt-0.5 truncate">{v.area}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
      {/* Get location button */}
      <button
        onClick={getUserLocation}
        className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 bg-brand-dark/90 border border-brand-border text-white text-xs font-semibold rounded-xl hover:bg-brand-card transition-all backdrop-blur-sm"
      >
        <Navigation className="w-4 h-4 text-brand-yellow" />
        Lokasi Saya
      </button>
    </div>
  )
}
