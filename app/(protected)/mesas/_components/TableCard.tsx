'use client';

import { useDraggable } from '@dnd-kit/core';
import { Table } from '../../../../types/mesas';

const TableCard = ({ table, size }: { table: Table; size: number }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: table._id });

	return (
		<article
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={{
				transform: `translate(${table.x + (transform?.x || 0)}px, ${table.y + (transform?.y || 0)}px)`,
				position: 'absolute',
				cursor: 'grab',
				width: `${size}px`,
				height: `${size}px`,
			}}
			className="bg-white flex items-center justify-center shadow-lg border rounded-lg"
		>
			<span className="flex items-center justify-center text-xl font-bold">{table.number}</span>
		</article>
	);
};

export default TableCard;
