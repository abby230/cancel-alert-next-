// File: src/app/search/SearchClient.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Accommodation {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

// 지역별 숙소 데이터
const data: Record<string, Accommodation[]> = {
  서울: [
    { id: 1, name: '한강뷰 스위트', imageUrl: 'https://picsum.photos/seed/seoul1/300/200', price: 120000 },
    { id: 2, name: '명동 로프트 아파트', imageUrl: 'https://picsum.photos/seed/seoul2/300/200', price: 98000 },
    { id: 3, name: '북촌 전통 가옥', imageUrl: 'https://picsum.photos/seed/seoul3/300/200', price: 135000 },
    { id: 4, name: '홍대 아트리움', imageUrl: 'https://picsum.photos/seed/seoul4/300/200', price: 89000 },
    { id: 5, name: '이태원 모던 하우스', imageUrl: 'https://picsum.photos/seed/seoul5/300/200', price: 110000 },
  ],
  부산: [
    { id: 6, name: '해운대 오션블리스', imageUrl: 'https://picsum.photos/seed/busan1/300/200', price: 95000 },
    { id: 7, name: '광안리 선셋 빌라', imageUrl: 'https://picsum.photos/seed/busan2/300/200', price: 87000 },
    { id: 8, name: '부산 시티게이트 호텔', imageUrl: 'https://picsum.photos/seed/busan3/300/200', price: 99000 },
    { id: 9, name: '감천문화마을 홈', imageUrl: 'https://picsum.photos/seed/busan4/300/200', price: 76000 },
    { id: 10, name: '달맞이길 뷰 하우스', imageUrl: 'https://picsum.photos/seed/busan5/300/200', price: 104000 },
  ],
  제주: [
    { id: 11, name: '성산일출봉 리조트', imageUrl: 'https://picsum.photos/seed/jeju1/300/200', price: 140000 },
    { id: 12, name: '한림 자연 펜션', imageUrl: 'https://picsum.photos/seed/jeju2/300/200', price: 98000 },
    { id: 13, name: '협재 오션프론트', imageUrl: 'https://picsum.photos/seed/jeju3/300/200', price: 150000 },
    { id: 14, name: '서귀포 힐링 별장', imageUrl: 'https://picsum.photos/seed/jeju4/300/200', price: 125000 },
    { id: 15, name: '제주 올레길 게스트하우스', imageUrl: 'https://picsum.photos/seed/jeju5/300/200', price: 89000 },
  ],
  강원: [
    { id: 16, name: '설악산 뷰 펜션', imageUrl: 'https://picsum.photos/seed/gangwon1/300/200', price: 88000 },
    { id: 17, name: '평창 스키 캐빈', imageUrl: 'https://picsum.photos/seed/gangwon2/300/200', price: 102000 },
    { id: 18, name: '강릉 커피로드 홈', imageUrl: 'https://picsum.photos/seed/gangwon3/300/200', price: 79000 },
    { id: 19, name: '춘천 호수뷰 빌라', imageUrl: 'https://picsum.photos/seed/gangwon4/300/200', price: 95000 },
    { id: 20, name: '속초 씨사이드 하우스', imageUrl: 'https://picsum.photos/seed/gangwon5/300/200', price: 88000 },
  ],
  경기: [
    { id: 21, name: '수원 한옥 스테이', imageUrl: 'https://picsum.photos/seed/gyeonggi1/300/200', price: 83000 },
    { id: 22, name: '파주 출판도시 게스트하우스', imageUrl: 'https://picsum.photos/seed/gyeonggi2/300/200', price: 78000 },
    { id: 23, name: '양평 리버사이드 빌라', imageUrl: 'https://picsum.photos/seed/gyeonggi3/300/200', price: 92000 },
    { id: 24, name: '남양주 숲속 힐링하우스', imageUrl: 'https://picsum.photos/seed/gyeonggi4/300/200', price: 86000 },
    { id: 25, name: '용인 테마파크 리조트', imageUrl: 'https://picsum.photos/seed/gyeonggi5/300/200', price: 99000 },
  ],
};

const regionCoords: Record<string, [number, number]> = {
  서울: [37.5665, 126.9780],
  부산: [35.1796, 129.0756],
  제주: [33.4996, 126.5312],
  강원: [37.8228, 128.1555],
  경기: [37.4138, 127.5183],
};

function Recenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (map && typeof map.setView === 'function') {
      map.setView(center, 10);
    }
  }, [center, map]);
  return null;
}

export default function SearchClient() {
  const params = useSearchParams();
  const regions = Object.keys(data);
  const initial = params.get('region') ?? regions[0];
  const [selected, setSelected] = useState<string>(initial);
  const center = regionCoords[selected];

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">숙소 검색</h2>
      <nav className="flex space-x-4">
        {regions.map(region => (
          <button
            key={region}
            onClick={() => setSelected(region)}
            className={`px-4 py-2 rounded ${selected === region ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {region}
          </button>
        ))}
      </nav>
      <div className="h-64 w-full rounded-lg overflow-hidden">
        <MapContainer center={center} zoom={10} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer attribution="© OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Recenter center={center} />
          {data[selected].map(a => (
            <Marker key={a.id} position={center}>
              <Popup>
                {a.name}<br />₩{a.price.toLocaleString()}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <ul className="space-y-4">
        {data[selected].map(a => (
          <li key={a.id} className="flex items-center border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <img src={a.imageUrl} alt={a.name} className="object-cover w-48 h-32" />
            <div className="p-4">
              <h4 className="text-lg font-semibold truncate">{a.name}</h4>
              <p className="text-gray-700 mb-1">₩{a.price.toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
