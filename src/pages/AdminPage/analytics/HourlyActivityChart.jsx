import { useMemo, useState } from 'react';

const HOURS = Array.from({ length: 24 }, (_, hour) => hour);

function toMap(hourlyActivity = []) {
  return hourlyActivity.reduce((acc, item) => {
    const hour = Number(item?.hour);
    if (!Number.isNaN(hour) && hour >= 0 && hour <= 23) {
      acc[hour] = Number(item?.count || 0);
    }
    return acc;
  }, {});
}

export default function HourlyActivityChart({ hourlyActivity = [] }) {
  const [hoveredHour, setHoveredHour] = useState(null);

  const data = useMemo(() => {
    const map = toMap(hourlyActivity);
    const points = HOURS.map((hour) => ({
      hour,
      count: map[hour] || 0,
    }));
    const maxCount = Math.max(...points.map((p) => p.count), 0);
    const peakHour = points.find((p) => p.count === maxCount)?.hour ?? null;

    return {
      points: points.map((p) => ({
        ...p,
        normalizedHeight: maxCount > 0 ? (p.count / maxCount) * 100 : 0,
      })),
      maxCount,
      peakHour,
    };
  }, [hourlyActivity]);

  return (
    <div className="hourly-chart">
      <div className="hourly-chart__plot" role="img" aria-label="Hourly activity bar chart">
        {data.points.map((point, idx) => {
          const isHovered = hoveredHour === point.hour;
          const dimmed = hoveredHour !== null && !isHovered;
          const isPeak = data.maxCount > 0 && point.hour === data.peakHour;

          return (
            <div
              key={point.hour}
              className="hourly-chart__col"
              onMouseEnter={() => setHoveredHour(point.hour)}
              onMouseLeave={() => setHoveredHour(null)}
              style={{
                '--height': `${Math.max(point.normalizedHeight, point.count > 0 ? 3 : 1)}%`,
                '--delay': `${idx * 20}ms`,
              }}
            >
              <div
                className={[
                  'hourly-chart__bar',
                  isPeak ? 'hourly-chart__bar--peak' : '',
                  isHovered ? 'hourly-chart__bar--active' : '',
                  dimmed ? 'hourly-chart__bar--dimmed' : '',
                ].join(' ')}
              />

              {isHovered && (
                <div className="hourly-chart__tooltip">
                  {String(point.hour).padStart(2, '0')}:00 - {point.count} visits
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="hourly-chart__x-axis">
        {HOURS.map((hour) => (
          <span key={hour} className="hourly-chart__x-label">
            {String(hour).padStart(2, '0')}
          </span>
        ))}
      </div>
    </div>
  );
}
