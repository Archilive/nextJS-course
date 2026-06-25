import { unstable_cache } from "next/cache";

export type PrimeStats = {
  limit: number;
  count: number;
  largest: number;
  duration: number;
};

export function computePrimes(limit: number) {
  const sieve = new Array<boolean>(limit + 1).fill(true);
  sieve[0] = false;
  sieve[1] = false;

  for (let factor = 2; factor * factor <= limit; factor += 1) {
    if (!sieve[factor]) {
      continue;
    }

    for (let multiple = factor * factor; multiple <= limit; multiple += factor) {
      sieve[multiple] = false;
    }
  }

  const primes: number[] = [];

  for (let value = 2; value <= limit; value += 1) {
    if (sieve[value]) {
      primes.push(value);
    }
  }

  return primes;
}

export async function getPrimeStats(limit: number): Promise<PrimeStats> {
  const start = performance.now();
  const primes = computePrimes(limit);

  return {
    limit,
    count: primes.length,
    largest: primes.at(-1) ?? 0,
    duration: Math.round(performance.now() - start),
  };
}

export const getCachedPrimeStats = unstable_cache(
  async (limit: number) => getPrimeStats(limit),
  ["prime-stats"],
  {
    revalidate: 3600,
  },
);
