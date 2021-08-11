import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Editable, EditableInput, EditablePreview, IconButton } from '@chakra-ui/react';
import Drag from './DragIcon';
import Delete from './DeleteIcon';
import { PDFComponentProps, usePdf } from 'store/pdfContext';
import { selectComponent } from 'store/pdfAction';

export function SortableItem(props: PDFComponentProps & { active: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
  const { state, dispatch } = usePdf();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style as any}
      {...attributes}
      textTransform="capitalize"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="base"
      px={3}
      my={1}
      textAlign="center"
      borderRadius="5"
      onClick={() => {
        if (state.selected?.id !== props.id) {
          dispatch(selectComponent(props));
        }
      }}
      {...(props.active ? { bg: 'green.100' } : {})}>
      <Box
        aria-label="Drag"
        {...listeners}
        p={2}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <Drag />
      </Box>
      <Editable defaultValue={props.title}>
        <EditablePreview />
        <EditableInput outline="none" borderRadius="none" _focus={{ outline: 'none !important' }} />
      </Editable>
      <IconButton
        aria-label="Delete"
        variant="unstyled"
        _focus={{ outline: 'none !important' }}
        p={0}
        m={0}
        icon={<Delete />}
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: 'remove_component', id: props.id });
        }}
      />
    </Box>
  );
}
