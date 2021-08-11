import { Heading as HeadingType, HEADINGS } from '@/utils/constants';
import { Box, Button, Divider, Editable, EditableInput, EditablePreview, Heading, IconButton, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { PDFComponentProps, usePdf } from 'store/pdfContext';
import { nanoid } from 'nanoid';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItems';
import { reorderComponent } from 'store/pdfAction';

const SubHeading = ({ message }: { message: string }) => {
  return (
    <Text fontSize="xs" fontWeight="medium" py={2}>
      {message}
    </Text>
  );
};

const HeadingSection = ({ value }: { value: HeadingType }) => {
  const { dispatch } = usePdf();

  const addComponent = () => {
    dispatch({
      type: 'add_component',
      payload: {
        data: '',
        heading: value,
        id: nanoid(),
        title: value,
      },
    });
  };

  return (
    <WrapItem>
      <Button colorScheme="purple" variant="outline" textTransform="capitalize" size="xs" onClick={addComponent}>
        {value}
      </Button>
    </WrapItem>
  );
};

const Section = () => {
  const { state, dispatch } = usePdf();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const sortedComp = (items: PDFComponentProps[]) => {
        const oldIndex = items.findIndex((val) => val.id === active.id);
        const newIndex = items.findIndex((val) => val.id === over?.id);

        return arrayMove<PDFComponentProps>(items, oldIndex, newIndex);
      };

      dispatch(reorderComponent(sortedComp(state.pdfComponent)));
    }
  }

  return (
    <Box flex={1} overflowX="hidden" p={2}>
      <Heading size="sm" color="green.600">
        Sections
      </Heading>
      <SubHeading message="Click on a section below to add it to your pdf" />
      <Wrap py={4}>
        {HEADINGS.map((heading) => (
          <HeadingSection key={heading} value={heading} />
        ))}
      </Wrap>

      <Divider />

      <SubHeading message="Click on a section below to edit the contents" />

      <Box py={3} maxH="calc(100vh - 30vh)" overflowY="auto" px={2}>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
          <SortableContext items={state.pdfComponent} strategy={verticalListSortingStrategy}>
            {state.pdfComponent.map((comp) => (
              <SortableItem key={comp.id} {...comp} active={state.selected?.id === comp.id} />
            ))}
          </SortableContext>
        </DndContext>
      </Box>
    </Box>
  );
};

export default Section;
