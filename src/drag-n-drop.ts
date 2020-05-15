import { fromEvent, of } from 'rxjs';
import { mergeMap, map, takeUntil, exhaustMap, tap, repeat } from 'rxjs/operators';

const draggableBox = document.getElementById('draggable') as HTMLElement;
const dragContainer = document.getElementById('drag-container') as HTMLElement;
const dragRect = dragContainer.getBoundingClientRect();

type Coordinates = { x: number, y: number };

function updateBoxPosition({ x, y }: Coordinates) {
  draggableBox.style.left = `${x}px`;
  draggableBox.style.top = `${y}px`;
}

function moveBox(coords: Coordinates) {
  return of(coords).pipe(tap(updateBoxPosition));
}

export const dragObs = fromEvent(draggableBox, 'mousedown').pipe(
  mergeMap(() => fromEvent(document, 'mousemove')),
  map((ev: any) => {
    return { x: ev.clientX - dragRect.x, y: ev.clientY - dragRect.y }
  }),
  exhaustMap(moveBox),
  takeUntil(fromEvent(document, 'mouseup')),
  repeat()
);
