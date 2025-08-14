'use client';

import Image from 'next/image';

export default function StaticLogo({
	className = '',
	style,
	width = 40,
	height = 40
}) {
	return (
		<div className={`flex items-center justify-center ${className}`} style={style}>
			<Image
				src="/images/logo2.svg"
				alt="Supe AI Logo"
				width={width}
				height={height}
				className="w-full h-full object-contain"
				priority
			/>
		</div>
	);
}

