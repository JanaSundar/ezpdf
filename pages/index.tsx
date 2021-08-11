import dynamic from 'next/dynamic';
import Editor from '@/components/Editor';
import Header from '@/components/Header';
import Section from '@/components/Section';
import { Box, BoxProps, Center, Flex, Text } from '@chakra-ui/react';
import { usePdf } from 'store/pdfContext';

const Preview = dynamic(() => import('@/components/Preview'), {
  ssr: false,
});

export default function Home() {
  const { state } = usePdf();

  return (
    <Box maxW="100vw" p={2} h="100vh" display="flex" flexDirection="column" style={{ gap: '20px' }}>
      <Header />
      <Flex flex={1} style={{ gap: '20px' }} wrap="wrap">
        <ItemWrapper overflowY="auto" overflowX="hidden" flex={[1, 1, 1 / 2]}>
          <Section />
        </ItemWrapper>

        <ItemWrapper flex={1} p={2}>
          {state.selected === undefined || Object.keys(state.selected).length === 0 ? (
            <Center>
              <Text>Select any section to edit</Text>
            </Center>
          ) : (
            <Editor />
          )}
        </ItemWrapper>

        <ItemWrapper flex={1}>
          <Preview />
        </ItemWrapper>
      </Flex>
      <Header />
    </Box>
  );
}

const ItemWrapper = ({ children, ...props }: BoxProps) => {
  return (
    <Box boxShadow="base" minW="250px" {...props}>
      {children}
    </Box>
  );
};
