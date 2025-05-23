// File: src/app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

interface Accommodation {
  id: number;
  region: string;
  name: string;
  imageUrl: string;
  price: number;
}

const allAccommodations: Accommodation[] = [
  { id: 1, region: '서울', name: '한강뷰 스위트', imageUrl: 'https://picsum.photos/seed/seoul1/300/200', price: 120000 },
  { id: 2, region: '부산', name: '해운대 오션블리스', imageUrl: 'https://picsum.photos/seed/busan1/300/200', price: 95000 },
  { id: 3, region: '제주', name: '성산일출봉 리조트', imageUrl: 'https://picsum.photos/seed/jeju1/300/200', price: 140000 },
  { id: 4, region: '강원', name: '설악산 뷰 펜션', imageUrl: 'https://picsum.photos/seed/gangwon1/300/200', price: 88000 },
  { id: 5, region: '경기', name: '수원 한옥 스테이', imageUrl: 'https://picsum.photos/seed/gyeonggi1/300/200', price: 83000 },
];

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });

export default function HomePage() {
  const router = useRouter();
  const [dest, setDest] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [randomList, setRandomList] = useState<Accommodation[]>([]);

  useEffect(() => {
    const shuffled = [...allAccommodations].sort(() => Math.random() - 0.5);
    setRandomList(shuffled.slice(0, 3));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dest) return;
    router.push(`/search?region=${encodeURIComponent(dest)}`);
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold">Find cancellation alerts</h1>

      {/* 검색 바 */}
      <form onSubmit={handleSearch} className="bg-white rounded-lg shadow p-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Enter destination"
          value={dest}
          onChange={e => setDest(e.target.value)}
          className="flex-grow min-w-[150px] border rounded px-3 py-2"
        />
        <input
          type="date"
          value={checkIn}
          onChange={e => setCheckIn(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="date"
          value={checkOut}
          onChange={e => setCheckOut(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          disabled={!dest}
          className={`px-4 py-2 rounded text-white ${dest ? 'bg-teal-500' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Search
        </button>
      </form>

      {/* 필터 + 지도 */}
      <div className="flex flex-wrap gap-6">
        <aside className="w-full md:w-1/4 bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-2">Filters</h2>
          <label className="block mb-2">Price range:</label>
          <input type="range" min={0} max={200000} className="w-full mb-4" />
          <p className="font-medium mb-2">Property type:</p>
          <label className="block"><input type="checkbox" className="mr-2"/>Hotel</label>
          <label className="block"><input type="checkbox" className="mr-2"/>Apartment</label>
          <label className="block"><input type="checkbox" className="mr-2"/>Resort</label>
        </aside>
        <div className="flex-1 h-64 rounded-lg overflow-hidden">
          <MapContainer center={[37.5665, 126.9780]} zoom={10} scrollWheelZoom={false} className="h-full w-full">
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
      </div>

      {/* 랜덤 숙소 3개 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {randomList.map(a => (
          <div key={a.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img src={a.imageUrl} alt={a.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">{a.name}</h3>
              <p className="text-gray-500 mb-2">{a.region}</p>
              <button className="w-full bg-red-400 text-white py-2 rounded">Cancellation Alert</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
