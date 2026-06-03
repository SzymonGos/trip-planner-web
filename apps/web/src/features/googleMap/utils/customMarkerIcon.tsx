export const customMarkerIcon = (color: string) => ({
  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="12" cy="12" r="8" fill="${color}" opacity="0.3">
        <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `)}`,
  scaledSize: new google.maps.Size(24, 24),
  anchor: new google.maps.Point(12, 12),
});
