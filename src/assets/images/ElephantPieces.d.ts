// Types for ElephantPieces.jsx (an untyped forwardRef, so TypeScript could not see its props).
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

type ElephantPiecesProps = { className?: string; pieceClassName?: string };

declare const ElephantPieces: ForwardRefExoticComponent<ElephantPiecesProps & RefAttributes<SVGSVGElement>>;
export default ElephantPieces;
