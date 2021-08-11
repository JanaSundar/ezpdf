import { PDFComponentProps } from './pdfContext';

export const ADD_COMPONENT = 'add_component';
export const REMOVE_COMPONENT = 'remove_component';
export const REORDER_COMPONENT = 'reorder_component';
export const ADD_PDF_DATA = 'add_pdf_data';
export const SELECT_COMPONENT = 'select_component';

export type Action =
  | { type: typeof ADD_COMPONENT; payload: PDFComponentProps }
  | { type: typeof REMOVE_COMPONENT; id: PDFComponentProps['id'] }
  | { type: typeof REORDER_COMPONENT; payload: PDFComponentProps[] }
  | { type: typeof ADD_PDF_DATA; payload: PDFComponentProps }
  | { type: typeof SELECT_COMPONENT; payload: PDFComponentProps };

export const addComponent = (payload: PDFComponentProps): Action => {
  return { type: ADD_COMPONENT, payload };
};

export const removeComponent = (id: PDFComponentProps['id']): Action => {
  return { type: REMOVE_COMPONENT, id };
};

export const reorderComponent = (payload: PDFComponentProps[]): Action => {
  return { type: REORDER_COMPONENT, payload };
};

export const addPdfData = (payload: PDFComponentProps): Action => {
  return { type: ADD_PDF_DATA, payload };
};

export const selectComponent = (payload: PDFComponentProps): Action => {
  return { type: SELECT_COMPONENT, payload };
};
