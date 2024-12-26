const VietcomBankService = {
  createQR: async (amount: number) => {
    const res = await fetch(
      `https://img.vietqr.io/image/vietcombank-${process.env.NEXT_PUBLIC_VCB_STK}-print.png?amount=${amount}`,
    )
    const data = await res.json()
    return data
  },
  openDeepLink: (amount: number, message: string) => {
    const urlFinal = `https://dl.vietqr.io/pay?app=vcb&ba=${process.env.NEXT_PUBLIC_VCB_STK}@vcb&am=$${amount}&tn=${message}`
    const link = document.createElement('a')
    link.href = urlFinal
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(urlFinal)
  },
}
export default VietcomBankService
