// GST Compliance & Commercial Bus Tax Determination
export interface GSTInvoiceCalculation {
  invoiceNumber: string;
  hsnCode: string;
  isInterstateTransaction: boolean;
  taxableAmount: number;
  cgstRatePercent: number;
  cgstAmount: number;
  sgstRatePercent: number;
  sgstAmount: number;
  igstRatePercent: number;
  igstAmount: number;
  totalGstPayable: number;
  customerGstinProvided: boolean;
  sacDescription: string;
}

export function generateStatutoryGSTInvoice(
  bookingId: string,
  taxableAmount: number,
  originStateCode: string,
  destinationStateCode: string,
  customerGSTIN?: string
): GSTInvoiceCalculation {
  const isInterstate = originStateCode !== destinationStateCode;
  const timestamp = Date.now();
  const invoiceNumber = `INV-BB-${new Date().getFullYear()}-${bookingId.slice(-6).toUpperCase()}`;
  const hsnCode = '996411'; // SAC for Local or Intercity passenger bus transportation services
  const sacDescription = 'Passenger transportation service through stage carriage omnibus under 5% GST without Input Tax Credit';

  let cgstRate = 0;
  let sgstRate = 0;
  let igstRate = 0;
  let cgstAmt = 0;
  let sgstAmt = 0;
  let igstAmt = 0;

  if (isInterstate) {
    igstRate = 5.0;
    igstAmt = Math.round((taxableAmount * igstRate) / 100);
  } else {
    cgstRate = 2.5;
    sgstRate = 2.5;
    cgstAmt = Math.round((taxableAmount * cgstRate) / 100);
    sgstAmt = Math.round((taxableAmount * sgstRate) / 100);
  }

  return {
    invoiceNumber,
    hsnCode,
    isInterstateTransaction: isInterstate,
    taxableAmount,
    cgstRatePercent: cgstRate,
    cgstAmount: cgstAmt,
    sgstRatePercent: sgstRate,
    sgstAmount: sgstAmt,
    igstRatePercent: igstRate,
    igstAmount: igstAmt,
    totalGstPayable: cgstAmt + sgstAmt + igstAmt,
    customerGstinProvided: Boolean(customerGSTIN && /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(customerGSTIN)),
    sacDescription
  };
}
