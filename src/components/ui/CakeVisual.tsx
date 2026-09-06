import type { FunctionComponent } from "../../common/types";
import {
	SPONGE_COLORS,
	type FlavorId,
	type TierId,
	type TopperId,
} from "./cakeConfiguratorData";

interface CakeVisualProps {
	tier: TierId;
	flavor: FlavorId;
	frostingColor: string;
	topper: TopperId;
}

interface Sprinkle {
	x: number;
	y: number;
	fill: string;
	rotate: number;
}

const PLATE_Y = 300;
const CX = 135;
const TIER_GAP = 8;

const TIER_WIDTHS: Record<TierId, Array<number>> = {
	1: [190],
	2: [190, 148],
	3: [190, 152, 118],
};

const TIER_HEIGHTS: Record<TierId, Array<number>> = {
	1: [64],
	2: [64, 54],
	3: [64, 52, 46],
};

const LID_COLOR = "#FFF3D6";
const LID_RIM = "rgba(61,43,31,0.22)";

interface TierRect {
	index: number;
	x: number;
	y: number;
	width: number;
	height: number;
}

const layoutTiers = (tier: TierId): Array<TierRect> => {
	const widths = TIER_WIDTHS[tier];
	const heights = TIER_HEIGHTS[tier];
	return heights.map((height, index) => {
		let bottom = PLATE_Y;
		for (let previous = 0; previous < index; previous += 1) {
			bottom -= (heights[previous] ?? 0) + TIER_GAP;
		}
		return {
			index,
			x: CX - (widths[index] ?? 0) / 2,
			y: bottom - height,
			width: widths[index] ?? 0,
			height,
		};
	});
};

const FLOWER_DOTS: Array<[number, number]> = [
	[-18, 16],
	[-2, 4],
	[16, 14],
	[4, 28],
	[20, 30],
];

const BERRY_DOTS: Array<[number, number]> = [
	[-14, 10],
	[2, 2],
	[16, 8],
];

const CANDLE_XS = [-20, 0, 20] as const;

const SPRINKLES: Array<Sprinkle> = [
	{ x: 62, y: 268, fill: "#F7B74B", rotate: -18 },
	{ x: 108, y: 254, fill: "#A3C37E", rotate: 24 },
	{ x: 150, y: 292, fill: "#B9A8C6", rotate: 40 },
	{ x: 202, y: 262, fill: "#C9A96E", rotate: -32 },
	{ x: 76, y: 288, fill: "#E27D8D", rotate: 12 },
	{ x: 188, y: 286, fill: "#86A3A0", rotate: -8 },
];

interface CrumbDot {
	x: number;
	y: number;
	r: number;
}

const CRUMBS: Array<CrumbDot> = [
	{ x: CX - 58, y: PLATE_Y - 4, r: 3 },
	{ x: CX - 40, y: PLATE_Y - 8, r: 2.2 },
	{ x: CX - 16, y: PLATE_Y - 4, r: 2.6 },
	{ x: CX + 24, y: PLATE_Y - 7, r: 2.4 },
	{ x: CX + 48, y: PLATE_Y - 3, r: 3.4 },
	{ x: CX + 62, y: PLATE_Y - 9, r: 2.2 },
];

export const CakeVisual = ({
	tier,
	flavor,
	frostingColor,
	topper,
}: CakeVisualProps): FunctionComponent => {
	const rects = layoutTiers(tier);
	const topRect = rects[rects.length - 1];
	if (topRect === undefined) return null;
	const topY = topRect.y;
	const spongeColor = SPONGE_COLORS[flavor];

	return (
		<svg
			aria-hidden="true"
			className="w-full max-w-sm mx-auto"
			viewBox="0 0 300 330"
			xmlns="http://www.w3.org/2000/svg"
		>
			{/* Plate */}
			<rect
				fill="#D9C3A0"
				height="10"
				rx="5"
				width="224"
				x={CX - 112}
				y={PLATE_Y + 5}
			/>
			<rect
				fill="#FFFDF9"
				height="10"
				rx="5"
				stroke="#CBB18A"
				strokeWidth="2"
				width="224"
				x={CX - 112}
				y={PLATE_Y}
			/>

			{/* Tiers */}
			{rects.map((rect) => {
				const sliceTop = rect.y + 10;
				const sliceBottom = rect.y + rect.height - 10;
				const sliceHeight = sliceBottom - sliceTop;
				const isTop = rect.index === rects.length - 1;
				return (
					<g key={`tier-${String(rect.index)}`}>
						{/* Frosted shell */}
						<rect
							fill={frostingColor}
							height={rect.height}
							rx="12"
							stroke="rgba(61,43,31,0.35)"
							strokeWidth="1.5"
							width={rect.width}
							x={rect.x}
							y={rect.y}
						/>
						{/* Buttercream dam where the next tier sits */}
						{!isTop && (
							<rect
								fill="#F0D9A6"
								height="8"
								rx="4"
								width={rect.width}
								x={rect.x}
								y={rect.y + rect.height - 8}
							/>
						)}
						{/* Flavor cut-away (sponge shown at the front) */}
						<rect
							fill={spongeColor}
							height={sliceHeight}
							rx="7"
							stroke="rgba(61,43,31,0.35)"
							strokeWidth="1"
							width="42"
							x={CX - 21}
							y={sliceTop}
						/>
						<line
							stroke="rgba(255,255,255,0.5)"
							strokeWidth="3"
							x1={CX - 21}
							x2={CX + 21}
							y1={sliceTop + 8}
							y2={sliceTop + 8}
						/>
						<circle
							cx={CX - 8}
							cy={sliceTop + 22}
							fill="rgba(255,255,255,0.35)"
							r="2.5"
						/>
						<circle
							cx={CX + 7}
							cy={sliceTop + 32}
							fill="rgba(61,43,31,0.14)"
							r="2"
						/>
					</g>
				);
			})}

			{/* Top lid */}
			<ellipse
				cx={CX}
				cy={topY + 3}
				fill={LID_COLOR}
				rx={topRect.width / 2 - 2}
				ry="9"
				stroke={LID_RIM}
				strokeWidth="1.2"
			/>

			{/* Topper */}
			{topper === "flowers" &&
				FLOWER_DOTS.map(([dx, dy]) => (
					<circle
						key={`flowers-${String(dx)}-${String(dy)}`}
						cx={CX + dx}
						cy={topY - 8 + dy}
						fill={Math.abs(dx) % 2 === 0 ? "#E27D8D" : "#F7B74B"}
						r="6.5"
						stroke="rgba(61,43,31,0.4)"
						strokeWidth="1.5"
					/>
				))}
			{topper === "candles" &&
				CANDLE_XS.map((dx) => (
					<g key={`candle-${String(dx)}`}>
						<rect
							fill="#E27D8D"
							height="24"
							rx="3"
							stroke="rgba(61,43,31,0.4)"
							strokeWidth="1.5"
							width="6"
							x={CX + dx - 3}
							y={topY - 30}
						/>
						<ellipse
							cx={CX + dx}
							cy={topY - 36}
							fill="#C9A96E"
							r="3.5"
							stroke="#A8546B"
							strokeWidth="1"
						/>
					</g>
				))}
			{topper === "berries" &&
				BERRY_DOTS.map(([dx, dy]) => (
					<circle
						key={`berries-${String(dx)}-${String(dy)}`}
						cx={CX + dx}
						cy={topY - 6 + dy}
						fill="#A8546B"
						r="5.5"
						stroke="rgba(61,43,31,0.4)"
						strokeWidth="1.5"
					/>
				))}

			{/* Sprinkles on the bottom tier */}
			{SPRINKLES.map((sprinkle) => (
				<g
					key={`${String(sprinkle.x)}-${String(sprinkle.y)}`}
					transform={`rotate(${String(sprinkle.rotate)} ${String(sprinkle.x)} ${String(sprinkle.y)})`}
				>
					<rect
						fill={sprinkle.fill}
						height="7"
						rx="3.5"
						stroke="rgba(255,255,255,0.6)"
						strokeWidth="1"
						width="14"
						x={sprinkle.x - 7}
						y={sprinkle.y - 3.5}
					/>
				</g>
			))}

			{/* Crumbs in flavor color on the plate */}
			{CRUMBS.map((crumb) => (
				<circle
					key={`crumb-${String(crumb.x)}-${String(crumb.y)}`}
					cx={crumb.x}
					cy={crumb.y}
					fill={spongeColor}
					r={crumb.r}
					stroke="rgba(61,43,31,0.12)"
					strokeWidth="0.5"
				/>
			))}
		</svg>
	);
};
