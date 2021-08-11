import { Box, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { addPdfData } from 'store/pdfAction';
import { PDFComponentProps, usePdf } from 'store/pdfContext';
import { useDebouncedCallback } from 'use-debounce';

const Editor = () => {
  const { state, dispatch } = usePdf();

  const [value, setValue] = useState(state.selected?.data);

  useEffect(() => {
    setValue(state.selected?.data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selected?.id]);

  const debounceDispatch = useDebouncedCallback((val: PDFComponentProps) => {
    dispatch(addPdfData(val));
  }, 500);

  return (
    <Box flex={1} h="100%">
      <Textarea
        placeholder="Here is a sample placeholder"
        resize="none"
        _focus={{ outline: 'none !important' }}
        boxShadow="inner"
        w="100%"
        h="100%"
        boxSizing="border-box"
        flex={1}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);

          debounceDispatch({ ...state.selected!, data: e.target.value });
        }}
        variant="filled"
        p={4}
      />
    </Box>
  );
};

export default Editor;
