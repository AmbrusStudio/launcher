type AssetItemProps = {
  src: string
  onItemClick: React.MouseEventHandler<HTMLDivElement>
}

function AssetItem(props: AssetItemProps) {
  const { src, onItemClick } = props
  return (
    <div className="min-w-240px h-240px" onClick={onItemClick}>
      <img
        className="w-full h-full rounded-12px object-cover select-none border-1px border-white"
        src={src}
        alt="Asset Image"
        loading="lazy"
      />
    </div>
  )
}

type AccountMyAssetProps = {
  data: { id: number; src: string }[]
}

export function AccountMyAsset({ data }: AccountMyAssetProps) {
  return (
    <div className="flex gap-36px w-full overflow-auto">
      {data.map((asset) => (
        <AssetItem key={`asset-${asset.id}`} src={asset.src} onItemClick={() => null} />
      ))}
    </div>
  )
}
