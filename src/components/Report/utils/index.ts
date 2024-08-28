export const toDataURL = (url: any) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
          })
      )
  

export type GroupedData<T> = { [key: string]: T[] }

export function groupByField<T>(data: T[], field: keyof T): GroupedData<T> {
  const grouped: GroupedData<T> = {}

  for (const item of data) {
    const value = item[field]
    if (value !== undefined) {
      if (!grouped[value as unknown as string]) {
        grouped[value as unknown as string] = []
      }
      grouped[value as unknown as string].push(item)
    }
  }

  return grouped
}

export function iterateGroupedData<T>(
  groupedData: GroupedData<T>,
  callback: (key: string, values: T[]) => void
): void {
  Object.keys(groupedData).forEach((key) => {
    const values = groupedData[key]
    callback(key, values)
  })
}
