// utils/exportToCSV.ts
import { unparse } from 'papaparse'

interface ExportHeader {
  key: string
  label: string
}

export function exportToCSV<T>(
  data: T[],
  filename = 'export.csv',
  headers?: ExportHeader[]
) {
  const csv = unparse(data, {
    quotes: false,
    skipEmptyLines: true,
    header: true,
    columns: headers?.map(h => h.key)
  }); 

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
