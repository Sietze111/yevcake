import type { FunctionComponent } from "../../common/types";
import {
	SPONGE_COLORS,
	type FlavorId,
	type TopperId,
} from "./cakeConfiguratorData";

interface CakeVisualProps {
	tiers: 1 | 2 | 3;
	frostingColor: string;
	flavorId: FlavorId;
	topper: TopperId;
	inscription: string;
}

interface Sprinkle {
	x: number;
	y: number;
	fill: string;
	rotate: number;
}

const TIER_WIDTHS = [220, 170, 120] as const;

const FLOWER_DOTS: Array<[number, number]> = [
	[132, 12],
	[150, -2],
	[168, 14],
	[143, 26],
	[160, 28],
];

const BERRY_DOTS: Array<[number, number]> = [
	[134, 2],
	[152, -6],
	[166, 4],
];

const CANDLE_XS = [128, 148, 168] as const;

const SPRINKLES: Array<Sprinkle> = [
	{ x: 52, y: 96, fill: "#FFC7DE", rotate: -18 },
	{ x: 246, y: 88, fill: "#A9E8C4", rotate: 24 },
	{ x: 64, y: 190, fill: "#AFCFFF", rotate: 40 },
	{ x: 240, y: 196, fill: "#FFD23F", rotate: -32 },
	{ x: 38, y: 140, fill: "#DCC7FF", rotate: 12 },
	{ x: 258, y: 146, fill: "#FF6FA5", rotate: -8 },
];

const PLATE_Y = 282;

export const CakeVisual = ({
	tiers,
	frostingColor,
	flavorId,
	topper,
	inscription,
}: CakeVisualProps): FunctionComponent => {
	const spongeColor = SPONGE_COLORS[flavorId];
	const plateWidth = (TIER_WIDTHS[3 - tiers] ?? TIER_WIDTHS[0]) + 60;

	return (
		<svg
			aria-hidden="true"
			className="w-full max-w-sm mx-auto"
			viewBox="0 0 300 320"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				fill="#0D0D0D"
				height="10"
				rx="5"
				width={plateWidth}
				x={(300 - plateWidth) / 2 + 6}
				y={PLATE_Y + 4}
			/>
			<rect
				fill="#FFFFFF"
				height="10"
				rx="5"
				stroke="#0D0D0D"
				strokeWidth="3"
				width={plateWidth}
				x={(300 - plateWidth) / 2}
				y={PLATE_Y}
			/>

			{Array.from({ length: tiers }, (_, index) => {
				const tierIndexFromBottom = tiers - 1 - index;
				const width = TIER_WIDTHS[tierIndexFromBottom] ?? TIER_WIDTHS[0];
				const height = 64;
				const y = PLATE_Y - height - tierIndexFromBottom * (height + 8);
				const x = (300 - width) / 2;
				const isTopTier = index === 0;
				return (
					<g key={`tier-${String(tierIndexFromBottom)}`} className="nb-pop">
						<rect
							fill={frostingColor}
							height={height}
							rx="8"
							stroke="#0D0D0D"
							strokeWidth="3"
							width={width}
							x={x}
							y={y}
						/>
						<rect
							fill={spongeColor}
							height="14"
							rx="4"
							stroke="#0D0D0D"
							strokeWidth="2.5"
							width={width - 24}
							x={x + 12}
							y={y + height - 22}
						/>
						{isTopTier && topper === "message" && inscription !== "" ? (
							<text
								fontFamily="monospace"
								fontWeight="bold"
								textAnchor="middle"
								x="150"
								y={y + height / 2 - 6}
								fontSize={Math.min(
									18,
									Math.max(9, Math.round(150 / inscription.length))
								)}
							>
								{inscription.toUpperCase()}
							</text>
						) : null}
						{isTopTier ? (
							<g>
								{topper === "flowers"
									? FLOWER_DOTS.map(([cx, dy]) => (
											<circle
												key={`${String(cx)}-${String(dy)}`}
												cx={cx}
												cy={y - 6 + dy}
												fill={cx % 2 === 0 ? "#FFC7DE" : "#FFE9B8"}
												r="7"
												stroke="#0D0D0D"
												strokeWidth="2"
											/>
										))
									: null}
								{topper === "candles"
									? CANDLE_XS.map((cx) => (
											<g key={`candle-${String(cx)}`}>
												<rect
													fill="#FF6FA5"
													height="26"
													stroke="#0D0D0D"
													strokeWidth="2"
													width="7"
													x={cx - 3.5}
													y={y - 30}
												/>
												<ellipse
													cx={cx}
													cy={y - 36}
													fill="#FFD23F"
													r="4"
													stroke="#FF8A00"
													strokeWidth="1.5"
												/>
											</g>
										))
									: null}
								{topper === "berries"
									? BERRY_DOTS.map(([cx, dy]) => (
											<circle
												key={`${String(cx)}-${String(dy)}`}
												cx={cx}
												cy={y - 4 + dy}
												fill="#E63E62"
												r="6"
												stroke="#0D0D0D"
												strokeWidth="2"
											/>
										))
									: null}
							</g>
						) : null}
					</g>
				);
			})}

			{SPRINKLES.map((sprinkle) => (
				<g
					key={`${String(sprinkle.x)}-${String(sprinkle.y)}`}
					transform={`rotate(${String(sprinkle.rotate)} ${String(sprinkle.x)} ${String(sprinkle.y)})`}
				>
					<rect
						fill={sprinkle.fill}
						height="8"
						rx="4"
						stroke="#0D0D0D"
						strokeWidth="1.5"
						width="16"
						x={sprinkle.x - 8}
						y={sprinkle.y - 4}
					/>
				</g>
			))}
		</svg>
	);
};
