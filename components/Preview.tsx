import { Box, Spinner } from '@chakra-ui/react';
import { usePDF } from '@react-pdf/renderer';
import { useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { usePdf } from 'store/pdfContext';
import PDF from './PDF';

// import { useDebouncedCallback } from 'use-debounce';
// import { Code } from '@/utils/constants';
// import transpile from '@/utils/transpile';
// import { generateCode } from '@/utils/generateCode';
// import MyDocuments from './MyDocuments';
// import { pdfjs } from 'react-pdf';

// type PdfType = ReactElement<ReactPDF.DocumentProps, string | JSXElementConstructor<any>> | undefined;

// pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;

// const DocumentWrapper = styled.div`
//   flex: 1;
// `;

const PDFViewer = () => {
  // const [value, setValue] = useState<PdfType>(undefined);
  // const [error, setError] = useState('');
  const { state } = usePdf();
  const [render, update] = usePDF({ document: <PDF {...state} /> });

  useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.renderId]);

  // const debounceTranspile = useDebouncedCallback(() => {
  //   const code = generateCode(state.pdfComponent);
  //   console.log(code);
  //   transpile(code, setValue, setError);
  // }, 250);

  // useEffect(() => {
  //   if (Code) debounceTranspile();
  // }, [debounceTranspile]);

  // const render = useAsync(async () => {
  //   if (!value) return null;

  //   const blob = await pdf(value).toBlob();
  //   const url = URL.createObjectURL(blob);

  //   return url;
  // }, [value]);

  // // useEffect(() => onUrlChange(render.value), [render.value]);

  // // useEffect(() => onRenderError(render.error), [render.error]);

  // // const onPreviousPage = () => {
  // //   setCurrentPage((prev) => prev - 1);
  // // };

  // // const onNextPage = () => {
  // //   setCurrentPage((prev) => prev + 1);
  // // };

  // // const onDocumentLoad = (d: any) => {
  // //   setNumPages(d.numPages);
  // //   setCurrentPage((prev) => Math.min(prev, d.numPages));
  // // };

  // if (render.loading) {
  //   return <Skeleton flex={1} />;
  // }

  return (
    <Box h="100%" flex={1} overflowY="auto" justifyContent="center" alignItems="center" display="flex">
      <Document file={render.blob} loading={() => <Spinner />}>
        <Box justifyContent="center" alignItems="center" display="flex">
          <Page renderMode="svg" pageNumber={1} height={window.innerHeight - 200} />
        </Box>
      </Document>
    </Box>
  );
};

export default PDFViewer;
