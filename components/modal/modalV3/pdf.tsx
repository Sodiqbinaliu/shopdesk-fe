import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

// Define the styles for the PDF
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: 32,
    height: 'fit-content',
    backgroundColor: '#F6F8FA',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 24,
    paddingRight: 24,
  },
  container: {
    backgroundColor: '#ffffff',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 32,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
    '@media max-width: 768px': {
      fontSize: 24,
    },
  },
  headerDiv: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  divider: {
    borderTopWidth: 1, // Equivalent to Tailwind's 'border-t'
    borderTopStyle: 'dashed', // Equivalent to 'border-dashed'
    borderTopColor: '#D1D5DB', // Equivalent to 'border-gray-300'
    marginVertical: 8, // Equivalent to 'my-2' (2 * 4px = 8px)
  },
  subheader: {
    fontSize: 12,
    textAlign: 'left',
    color: '#888888',
  },
  itemsHeader: {
    fontFamily: 'Helvetica', // Equivalent to 'font-sans' (default sans-serif font in React PDF)
    fontSize: 18, // Equivalent to 'text-xl' (Tailwind: 20px, but React PDF sizes are slightly different)
    color: '#2A2A2A', // Equivalent to 'text-[#2A2A2A]'
    letterSpacing: 0, // Equivalent to 'tracking-normal' (default letter spacing)
    fontWeight: 'semibold',
    marginBottom: 8,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    width: '33%',
    textAlign: 'center',
  },
  name: {
    width: '33%',
    textAlign: 'left',
  },
  footer: {
    textAlign: 'center',
    marginTop: '',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  totalRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  total: {
    width: '33%',
    textAlign: 'left',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  totalColumn: {
    width: '33%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

// Define the types for cart items
export type CartItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

type ReceiptProps = {
  orderNumber: string;
  currentDate: string;
  cartItems: CartItem[];
  totalQuantity: number;
  totalPrice: number;
};

export const Receipt: React.FC<ReceiptProps> = ({
  orderNumber,
  currentDate,
  cartItems,
  totalQuantity,
  totalPrice,
}) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.container}>
        <View>
          <View style={styles.headerDiv}>
            <Text style={styles.header}>Customer Receipt</Text>
            <Text style={styles.subheader}>
              Order #{orderNumber} | {currentDate}
            </Text>
          </View>
          <View style={styles.divider}></View>
          <Text style={styles.itemsHeader}>
            {cartItems.length > 1 ? 'ITEMS' : 'ITEM'}
          </Text>
          <View style={styles.table}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.row}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.column}>{String(item.quantity)}</Text>
                <Text style={styles.column}>
                  N {item.price.toLocaleString()}
                </Text>
              </View>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.total}>Total</Text>
              <Text style={styles.totalColumn}>{String(totalQuantity)}</Text>
              <Text style={styles.totalColumn}>
                N {String(totalPrice.toLocaleString())}
              </Text>
            </View>
          </View>
          <View style={styles.divider}></View>
        </View>
        <Text style={styles.footer}>Thank you for your purchase</Text>
      </View>
    </Page>
  </Document>
);

// // Component to preview the PDF
// export const ReceiptPreview = (props: ReceiptProps) => (
//   <PDFViewer width='100%' height='600px'>
//     <Receipt {...props} />
//   </PDFViewer>
// );

// // Component to download the PDF
// export const ReceiptDownload = (props: ReceiptProps) => (
//   <PDFDownloadLink
//     document={<Receipt {...props} />}
//     fileName='Customer_Receipt.pdf'
//   >
//     {({ loading }) => (loading ? 'Preparing document...' : 'Download Receipt')}
//   </PDFDownloadLink>
// );
