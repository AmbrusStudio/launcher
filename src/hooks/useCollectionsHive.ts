import { useImmutableXL2OverallHive } from './useImmutableXL2OverallHive'

export function useCollectionsHive() {
  const { nfts, loading } = useImmutableXL2OverallHive()

  return {
    collections: nfts,
    loading: loading,
  }
}
