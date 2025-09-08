'use client';
import Image from 'next/image';

export default function Cover({ data }: { data?: string }) {
  return (
    data && (
      <Image priority src={data} alt="Album Cover" width={250} height={250} />
    )
  );
}
