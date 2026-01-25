'use client';

import Image from 'next/image';

export function Cover({ data }: { data?: string }) {
  return (
    data && (
      <Image priority src={data} alt="Album Cover" width={250} height={250} />
    )
  );
}
