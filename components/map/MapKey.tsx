export function MapKey() {
  return (
    <div className="bg-muted absolute bottom-0 left-0 z-10 w-full rounded-lg p-4">
      <p className="mb-1 font-bold">Legend</p>
      <p className="flex items-center gap-2 text-sm">
        <i className="bg-upgrade-1 block size-2 rounded-full" />
        At least 1 upgrade is available.
      </p>
      <p className="flex items-center gap-2 text-sm">
        <i className="bg-upgrade-2 block size-2 rounded-full" />
        All upgrades are available.
      </p>
      <p className="flex items-center gap-2 text-sm">
        <i className="bg-upgrade-3 block size-2 rounded-full" />
        All upgrades are maxed.
      </p>
    </div>
  );
}
