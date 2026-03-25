import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortableItem = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "manipulation",
  };

  return (
    <li style={style} ref={setNodeRef}>
      {typeof children === 'function'
        ? children({
            // dragRef: setNodeRef,
            dragListeners: listeners,
            dragAttributes: attributes,
          })
        : children}
    </li>
  );
};
