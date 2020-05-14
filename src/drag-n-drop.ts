import { fromEvent, of } from 'rxjs';
import { mergeMap, map, takeUntil, exhaustMap, tap, repeat } from 'rxjs/operators';

const draggableBox = document.getElementById('draggable') as HTMLElement;
const dragContainer = document.getElementById('drag-container') as HTMLElement;
const dragRect = dragContainer.getBoundingClientRect();

function moveBox(coords: { x: number, y: number }) {
  return of(coords).pipe(
    tap(crds => {
      draggableBox.style.left = `${crds.x}px`;
      draggableBox.style.top = `${crds.y}px`;
    })
  );
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
