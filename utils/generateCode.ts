import { PDFComponentProps } from 'store/pdfContext';

const createTemplate = (docsArr: string[]) => {
  return `
    const Pdf = () => (
    <Document>
        <Page style={styles.body} wrap={true}>
        ${docsArr.join('\n')}
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            \`\${pageNumber} / \${totalPages}\`
        )} fixed />
        </Page>
    </Document>
    );

    Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
    });

    const styles = StyleSheet.create({
    body: {
        padding: "1rem",
        whiteSpace: 'pre-wrap'

    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald'
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'Oswald'
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    });

    ReactPDF.render(<Pdf />)
`;
};

export const generateCode = (arr: PDFComponentProps[] = []): string => {
  const templatedArr = arr.map((comp) => {
    if (comp.heading !== 'image') {
      return `<Text style={styles.${comp.heading}}>${comp.data}</Text>`;
    } else {
      return `<Image style={styles.${comp.heading}} src=${comp.data} />`;
    }
  });

  return createTemplate(templatedArr);
};
