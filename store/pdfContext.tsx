import type { Heading } from '@/utils/constants';
import * as React from 'react';
import { Action, ADD_COMPONENT, ADD_PDF_DATA, REMOVE_COMPONENT, REORDER_COMPONENT, SELECT_COMPONENT } from './pdfAction';
import { nanoid } from 'nanoid';

export type PDFComponentProps = {
  data: string;
  heading: Heading;
  id: string;
  title: string;
};

type Dispatch = (action: Action) => void;
export type State = { pdfComponent: PDFComponentProps[]; selected?: PDFComponentProps; renderId: string };
type PdfProviderProps = { children: React.ReactNode };

const PdfContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

const renderId = () => nanoid(20);

function pdfReducer(state: State, action: Action): State {
  switch (action.type) {
    case ADD_COMPONENT: {
      return { ...state, pdfComponent: [...state.pdfComponent, action.payload], renderId: renderId() };
    }

    case REMOVE_COMPONENT: {
      const remainingComponent = state.pdfComponent.filter((comp) => comp.id !== action.id);
      const updatedSelected = state.selected?.id === action.id ? undefined : state.selected;
      return { ...state, pdfComponent: remainingComponent, selected: updatedSelected, renderId: renderId() };
    }

    case REORDER_COMPONENT: {
      return { ...state, pdfComponent: action.payload, renderId: renderId() };
    }

    case ADD_PDF_DATA: {
      const updatedComponent = state.pdfComponent.map((comp) => {
        if (comp.id === action.payload.id) {
          const previousData = { ...comp };
          comp = { ...previousData, ...action.payload };
        }

        return comp;
      });

      return { ...state, pdfComponent: updatedComponent, renderId: renderId() };
    }

    case SELECT_COMPONENT: {
      return { ...state, selected: action.payload };
    }

    default: {
      return state;
    }
  }
}

function PdfProvider({ children }: PdfProviderProps) {
  const [state, dispatch] = React.useReducer(pdfReducer, {
    pdfComponent: [
      {
        id: 'hello',
        data: 'Hello World',
        heading: 'title',
        title: 'title',
      },
    ],
    renderId: renderId(),
  });

  const value = { state, dispatch };
  return <PdfContext.Provider value={value}>{children}</PdfContext.Provider>;
}

function usePdf() {
  const context = React.useContext(PdfContext);
  if (context === undefined) {
    throw new Error('usePdf must be used within a PdfProvider');
  }
  return context;
}

export { PdfProvider, usePdf };
