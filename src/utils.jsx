export const rupiah = (number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number)

export const createAddressDetail = (addr) =>
  addr.address_name +
  ', ' +
  addr.address_line1 +
  ', ' +
  (addr.address_line2 ? addr.address_line2 + ', ' : '') +
  addr.city +
  ', ' +
  addr.postal_code +
  ', ' +
  addr.state +
  ', ' +
  addr.country

export const formatDate = (date) =>
  new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  }).format(new Date(date))
