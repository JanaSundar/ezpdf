import { Document, Page, Text, Font, StyleSheet, Image } from '@react-pdf/renderer';
import { State } from 'store/pdfContext';

const PDF = (state: State) => {
  return (
    <Document>
      <Page style={styles.body}>
        {state.pdfComponent.map((comp, index) => {
          return comp.heading !== 'image' ? (
            <Text style={styles[comp.heading]} key={index} {...(comp.heading === 'header' ? { fixed: true } : {})}>
              {comp.data}
            </Text>
          ) : (
            // eslint-disable-next-line jsx-a11y/alt-text
            comp.data && <Image key={index} src={comp.data} style={styles.image} cache></Image>
          );
        })}

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  );
};

export default PDF;

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  image: {
    marginVertical: 5,
    marginHorizontal: 20,
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
