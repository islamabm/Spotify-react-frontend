import { memo } from "react";
import { StationPreview } from "./StationPreview";
function _StationList({ stations, onRemoveStation }) {
    return (
        <>
            {/* <h2>Sing-along</h2> */}
        <section className="station-list">
            {stations.map(station =>
                <StationPreview key={station._id} station={station} onRemoveStation={onRemoveStation} />
            )}
        </section>
        </>
    )
}

export const StationList = memo(_StationList)
