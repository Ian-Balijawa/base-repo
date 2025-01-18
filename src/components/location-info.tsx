import { Location } from "@/interfaces";
import { Badge } from "@/components/ui/badge";
import { FaMapMarkerAlt } from "react-icons/fa";

interface LocationInfoProps {
	location?: Location;
}

export function LocationInfo({ location }: LocationInfoProps) {
	if (!location || !location.coordinates) return null;

	const [longitude, latitude] = location.coordinates;

	return (
		<div>
			<dt className="text-sm font-medium text-muted-foreground">Location</dt>
			<dd className="flex items-center gap-2">
				<Badge variant="outline" className="flex items-center gap-1">
					<FaMapMarkerAlt className="h-3 w-3" />
					<span>
						{latitude.toFixed(6)}, {longitude.toFixed(6)}
					</span>
				</Badge>
				<a
					href={`https://www.google.com/maps?q=${latitude},${longitude}`}
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm text-muted-foreground hover:text-primary"
				>
					View on Map
				</a>
			</dd>
		</div>
	);
}
